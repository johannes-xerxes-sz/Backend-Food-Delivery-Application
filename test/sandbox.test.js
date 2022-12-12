const {
    twoNumbers
} = require('./day1.js');

describe('test twoNumbers function', () => {

    //! CASE 1
    test('should return the function to return string two numbers are equal when num1 and num2 are the same value', () => {
        expect(twoNumbers(5, 5)).toBe('two numbers are equal')
        expect(twoNumbers(5, 5)).toBeTruthy()

    })
})