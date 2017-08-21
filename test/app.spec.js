const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
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
            const actualState = testApp({}, {type: 'test', text: 'test'});

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should ignore the action if the item text is missing', () => {
            const bogusAddItemAction = {
                type: 'ADD_ITEM'
            };

            const originalState = {
                items: []
            };

            const actualState = testApp(originalState, bogusAddItemAction);

            expect(actualState).to.equal(originalState);
        });

        it('should add items to the list if called with the ADD_ITEM action type', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const expectedState = {
                items: ['test']
            };

            const actualState = testApp({}, addItemAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should continue to add more items to the list with subsequent actions', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const originalState = {
                items: ['original1', 'original2']
            };

            const expectedState = {
                items: ['original1', 'original2', 'test']
            };

            const actualState = testApp(originalState, addItemAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should never modify the previous state, only return new ones', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const originalState = {
                items: ['do not modify']
            };

            deepFreeze(originalState); //will throw an exception if anyone tries to mutate originalState

            testApp(originalState, addItemAction);
        });
    });
});