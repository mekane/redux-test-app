'use strict';
const defaultState = () => {
    return {
        items: [],
        itemsById: {},
        lastItemId: 0
    };
};

const testApp = (currentState, action) => {
    if (currentStateIsBogus())
        return defaultState();

    if (actionIsBogus())
        return currentState;

    const newState = copyState(currentState);

    if (action.type === 'ADD_ITEM') {
        if (action.text) {
            const newId = lastItemId();
            const newItem = {id: newId, text: action.text};
            newState.items.push(newId);
            newState.itemsById[newId] = newItem;
            newState.lastItemId = newId;
        }
    }

    return newState;

    function currentStateIsBogus() {
        return hasBadType(currentState);
    }

    function actionIsBogus() {
        return hasBadType(action) || !action.type || !action.text;
    }

    function lastItemId() {
        return (currentState.lastItemId || 0) + 1;
    }

    function copyState(oldState) {
        if (!oldState) {
            return defaultState();
        }

        const oldItems = oldState.items || [];

        return {
            items: oldItems.slice(),
            itemsById: Object.assign({}, oldState.itemsById),
            lastItemId: oldState.lastItemId || 0
        }
    }
};

function hasBadType(argumentThatShouldBeAnObject) {
    return isNotObject(argumentThatShouldBeAnObject);
}

function isNotObject(testObject) {
    return (typeof testObject !== 'object');
}

module.exports = testApp;