import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('nameIsValid', () => {
    test("name's length should be more than 2 symbols", () => {
        expect(nameIsValid('Ben')).toBe(true)
    })
    test("name's length should be more than 2 symbols", () => {
        expect(nameIsValid('B')).toBe(false)
    })
    test("name shouldn't contain spaces", () => {
        expect(nameIsValid('Ben  ')).toBe(false)
    })
});

describe('fullTrim', () => {
    test.each `
    string    | expected
    ${' Ben'} | ${'Ben'}
    ${'B en'} | ${'Ben'}
    ${'Ben '} | ${'Ben'}
    ` ('replace $string with $expected', ({string, expected}) => {
        expect(fullTrim(string)).toBe(expected)
    })
})

describe('getTotal', () => {
    test("discount is not number", () => {
        expect(function() {
            getTotal([{ price: 10, quantity: 10 }], 'discount')
        }).toThrow()
    })
    test("discount is less than 0", () => {
        expect(function() {
            getTotal([{ price: 10, quantity: 10 }], -10)
        }).toThrow()
    })
    test("total is correct if there's no discount", () => {
        expect(getTotal([{ name: 'Apples', price: 13, quantity: 5 }])).toBe(65)
    })
    test("total is correct with discount", () => {
        expect(getTotal([{ name: 'Apples', price: 13, quantity: 5 }], 10)).toBe(58.5)
    })
})
