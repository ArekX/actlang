const parser = require('../parser');
const createScope = require('./scope');
const processContext = require('./process_instruction');

const parseText = text => {
    let level = 0;

    const result =  parser.parseText(text);
    const instructions = [];

    for(let action of result) {
        if (action.type === 'indent') {
            level = action.value;
            continue;
        }

        if (action.type === 'eol') {
            level = 0;
            continue;
        }

        if (action.type === 'context') {
            instructions.push({
                level,
                instruction: processContext(parser.parseContext(action.value))
            });
        }
    }

    return instructions;
};

const getInstructionRunner = (instructions, prevOptions) => {

    const rootScope = prevOptions ? prevOptions.rootScope : createScope();
    
    const stateStack = [];

    let prevLevel = prevOptions ? prevOptions.level : 0;

    let state = {
        scope: prevOptions ? prevOptions.scope : rootScope,
        rootScope: rootScope,
        level: 0,
        version: 1,
        fullLevel: prevLevel,
        result: null,
        aliases: {}
    };

    return pc => {
        if (pc >= instructions.length) {
            return null;
        }
        
        let {level: instructionLevel, instruction} = instructions[pc];

        while (instructionLevel < state.level) {
            state = stateStack.pop();
        }

        if (instructionLevel > state.level) {
            stateStack.push(state);
            let scope = state.scope.createChild();
            state = { ...state, scope, level: instructionLevel, fullLevel: prevLevel + instructionLevel };
        }

        return {instruction, state};
    };
};

module.exports = async (text, prevOptions = null) => {
    const instructions = parseText(text);
    
    let getInstruction = getInstructionRunner(instructions, prevOptions);
    let pc = 0;
    let lastResult = null;

    while (pc < instructions.length) {
        const { instruction, state } = getInstruction(pc);

        let instructionState = await instruction(state, pc, getInstruction);

        lastResult = instructionState.result;
        state.result = lastResult;
        
        if (instructionState.changePc) {
            pc = instructionState.changePc;
            continue;
        }

        pc++;
    }

    return lastResult;
};