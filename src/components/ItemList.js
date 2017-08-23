const React = require('react'); //because the JSX transpiles to React.createElement(...) we need this here implicitly
const Item = require('./Item');

const ItemList = (props) => (
    <ul className="item-list">
        { props.itemsToList.map(itemId => <Item key={itemId} data={props.itemsById[itemId]}></Item>)}
    </ul>
);

module.exports = ItemList;