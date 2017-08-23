const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

const actions = require('./src/actions.js');
const reducer = require('./src/reducer.js');

const App = require('./src/components/App');

const store = Redux.createStore(reducer);

/**
 * This script is browserified, but it is the entry point for the browser to run the app.
 */
const appElement = document.getElementById('app');

function render() {
    ReactDOM.render(<App state={store.getState()}></App>, appElement);
}

store.subscribe(render);

render();

module.exports = {
    actions,
    store
};