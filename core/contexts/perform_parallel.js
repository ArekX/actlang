module.exports = {
    context: 'perform',
    action: 'parallel',
    getHandler: () => async (_, pc, getInstruction) => {
        const promises = [];
        pc++;
        
        let instruction = getInstruction(pc++);
        let level = instruction.state.level;

        if (instruction === null) {
            return {result: null};
        }
        
        while(true) {
            if (level === instruction.state.level) {
                const { instruction: runInstruction, state } = instruction;
                promises.push(runInstruction(state, pc - 1, getInstruction));
            }

            instruction = getInstruction(pc);

            if (instruction === null || (level > instruction.state.level)) {
                break;
            }

            pc++;
        }

        const instructionResults = await Promise.all(promises);
        
        let changePc = pc;

        for(let result of instructionResults) {
            if (result.changePc > changePc) {
                changePc = result.changePc;
            }
        }

        return {
            result: null,
            changePc,
            instructionResults
        }
    }
};