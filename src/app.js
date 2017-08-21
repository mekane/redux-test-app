const defaultState = {items: []};

const testApp = (currentState, action) => {
    if (typeof currentState !== 'object') {
        return defaultState;
    }
};

module.exports = testApp;