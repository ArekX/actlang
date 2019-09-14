const {success, fail} = require('../util');

const getGrammar = () => {
    const state = {
        anyValue: () => ({success: true, next: Object.keys(grammarConfig.grammar)}),
        contextResult: null,
        paramCount: 0,
        currentLevel: 0,
        validateSubGrammar: value => {
            const validate = require('../index');
    
            if (!value.success) {
                return value;
            }
        
            return validate(value.results, getGrammar());
        }
    };

    state.preprocessor = require('./preprocessor')(state).value;

    const grammar = [
        require('./array'),
        require('./colon'),
        require('./comma'),
        require('./comment'),
        require('./dot'),
        require('./equal'),
        require('./json'),
        require('./number'),
        require('./param'),
        require('./space'),
        require('./string'),
    ].reduce((grammarResult, getSubGrammar) => {
        const result = getSubGrammar(state);

        grammarResult[result.name] = result.value;

        return grammarResult;
    }, {});

    grammar.preprocessor = state.preprocessor;

    const grammarConfig = {
        start: () => ({
            type: 'start of program',
            state: success(['param', 'comment', 'space', 'eol', 'preprocessor'])
        }),
        end: () => {
            if (state.paramCount === 1) {
                return fail("Action must always be defined after a context.", state.contextResult);
            }
    
            return success([]);
        },
        grammar 
    }

    return grammarConfig;
};

module.exports = getGrammar;