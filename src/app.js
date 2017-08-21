'use strict';
const defaultState = {items: []};

const testApp = (currentState, action) => {
    if (currentStateIsBogus())
        return defaultState;

    if (actionIsBogus())
        return currentState;

    const newState = {
        items: []
    };

    if (currentState.items && currentState.items.length)
        newState.items = currentState.items.map(item => item);

    if (action.type === 'ADD_ITEM') {
        if (action.text)
            newState.items.push(action.text);
    }

    return newState;

    function currentStateIsBogus() {
        return hasBadType(currentState);
    }

    function actionIsBogus() {
        return hasBadType(action) || !action.type || !action.text;
    }
};

function hasBadType(argumentThatShouldBeAnObject) {
    return isNotObject(argumentThatShouldBeAnObject);
}

function isNotObject(testObject) {
    return (typeof testObject !== 'object');
}

module.exports = testApp;