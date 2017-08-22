function addItem(itemText) {
    return {
        type: 'ADD_ITEM',
        text: itemText
    }
}

module.exports = {
    addItem
};