const expect = require('chai').expect;
const deepFreeze = require('deep-freeze');
const testApp = require('../src/app.js');

describe('The Test App root reducer', () => {
    const defaultState = {
        items: [],
        itemsById: {},
        lastItemId: 0
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

        it('should add items to the list by ID if called with the ADD_ITEM action type', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const expectedState = {
                items: [1],
                itemsById: {
                    1: {id: 1, text: 'test'}
                },
                lastItemId: 1
            };

            const actualState = testApp({}, addItemAction);

            expect(actualState).to.deep.equal(expectedState);
        });

        it('should continue to add more items to the list with subsequent actions', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const expectedState = {
                items: [1, 2, 3],
                lastItemId: 3,
                itemsById: {
                    1: {id: 1, text: 'test'},
                    2: {id: 2, text: 'test'},
                    3: {id: 3, text: 'test'}
                }
            };

            const firstState = testApp(defaultState, addItemAction);
            const secondState = testApp(firstState, addItemAction);
            const actualState = testApp(secondState, addItemAction);

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

    describe('tracking item IDs', () => {
        it('should keep track of the last ID that was used', () => {
            expect(defaultState.lastItemId).to.equal(0);
        });

        it('should increment the IDs of subsequent items that are added', () => {
            const addItemAction = {
                type: 'ADD_ITEM',
                text: 'test'
            };

            const expectedState = {
                items: [1, 2],
                itemsById: {
                    1: {id: 1, text: 'test'},
                    2: {id: 2, text: 'test'}
                },
                lastItemId: 2
            };

            const nextState = testApp(defaultState, addItemAction);
            const actualState = testApp(nextState, addItemAction);

            expect(actualState).to.deep.equal(expectedState);
        });
    });
});