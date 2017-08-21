const expect = require('chai').expect;
const testApp = require('../src/app.js');

describe('The Test App root reducer', () => {
    const defaultState = {
        items: []
    };

    it('should be a function', () => {
        expect(testApp).to.be.a('function');
    });

    it('should return the default state if called with none', () => {
        const expectedState = defaultState;
        const actualState = testApp();

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should return the identical original state if called with no action', () => {
        const originalState = {
            items: ['foo']
        };
        const actualState = testApp(originalState);

        expect(actualState).to.equal(originalState);
    });

    describe('adding items', () => {
        it('should add the items array if it was missing', () => {
            const expectedState = defaultState;
            const actualState = testApp({}, {type: 'test'});

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should add items to the list if called with the ADD_ITEM action type', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const expectedState = {
                items: ['test']
            };

            const actualState = testApp(null, addItemAction);

            expect(actualState).to.deep.equal(expectedState);
        });
    });

});