import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/* 
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});
 */

describe('function nameIsValid coverage', () => {
    test('nameIsValid is true', () => {
        expect(nameIsValid('???')).toBe(true)
    });
    test('nameIsValid is false if length = 1', () => {
        expect(nameIsValid('?')).toBe(false)
    });
    test('nameIsValid is false if includes spaceButt', () => {
        expect(nameIsValid(' ')).toBe(false)
    });
});

describe('function fullTrim coverage', () => {
    test('fullTrim delete space from string', () => {
        expect(fullTrim(' ')).toBe('')
    });
    test('fullTrim delete two spaces from string with symbol', () => {
        expect(fullTrim(' ? ')).toBe('?')
    });
    test('fullTrim throws an error when get a number', () => {
        expect(() => fullTrim(1)).toThrow();
    });
})
 


describe('function getTotal parametric coverage', () => {
test.each([
    {item:[{ price: 10, quantity: 10 }],  discount: 0, expected: 100},
    {item: [{ price: 10, quantity: 1 }],  discount: 0, expected: 10},
    {item: [{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }],  discount: 0, expected: 100},
    {item: [{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }],  discount: 0, expected: 90},
    {item:[{ price: 10, quantity: 10 }],  discount: 10, expected: 90},
    {item:[{ price: 10, quantity: 10 }],  discount: 100, expected: 0},
    {item:[{ price: 'ten', quantity: 0 }],  discount: 10, expected: 'error'}, // тут действительно ошибка функции
    {item:[{ price: 10, quantity: -1 }],  discount: 0, expected: 'error'},     // тут действительно ошибка функции
    {item:[{ price: 10, quantity: 10 }],  discount: '100', expected: 'error'},
    {item:[{ price: 10, quantity: 10 }],  discount: 'blabla', expected: 'error'},
])('function getTotal parametric coverage', ({item, discount, expected}) => {
    if(expected === 'error') {
        expect(() => getTotal(item, discount, expected)).toThrow();
    } else {
        expect(getTotal(item, discount, expected)).toBe(expected);
    }
})
})
