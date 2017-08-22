const expect = require('chai').expect;
const actions = require('../src/actions.js');

describe('The Action generator functions', () => {
    it('knows how to make an Add Item action', () => {
        expect(actions.addItem).to.be.a('function');
    });
});
