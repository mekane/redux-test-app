const expect = require('chai').expect;
const testApp = require('../src/app.js');

describe('The Test App root reducer', () => {
    it('should be a function', () => {
        expect(testApp).to.be.a('function');
    });

    it('should return the default state if called with none', () => {
        const expectedState = {
            items: []
        };
        const actualState = testApp();

        expect(actualState).to.deep.equal(expectedState);
    });
    
    
});