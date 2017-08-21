const defaultState = {items: []};

const testApp = (currentState, action) => {
    if (currentStateIsBogus())
        return defaultState;

    if (actionIsBogus())
        return currentState;

    const newState = {
        items: []
    };

    if ( action.type === 'ADD_ITEM' ){
        newState.items.push(action.text);
    }

    return newState;

    function currentStateIsBogus() {
        return hasBadType(currentState);
    }

    function actionIsBogus() {
        return hasBadType(action);
    }
};

function hasBadType(argumentThatShouldBeAnObject) {
    return isNotObject(argumentThatShouldBeAnObject);
}

function isNotObject(testObject) {
    return (typeof testObject !== 'object');
}

module.exports = testApp;