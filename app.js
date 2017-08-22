const actions = require('./src/actions.js');
const reducer = require('./src/reducer.js');
const Redux = require('redux');

const store = Redux.createStore(reducer);

module.exports = {
    actions,
    store
};