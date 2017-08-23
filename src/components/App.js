const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const Controls = require('./Controls');
const ItemList = require('./ItemList');

const App = (props) => (
    <div className="app">
        <ItemList itemsToList={props.state.items} itemsById={props.state.itemsById}></ItemList>
        <Controls></Controls>
    </div>
);

module.exports = App;