import expect from 'expect';
import { nameIsValid, fullTrim, getTotal, } from '../src/app.js'
describe('nameIsValid', () => {
    test('function return true', () => {
        expect(nameIsValid('Jo')).toBeTruthy();
        expect(nameIsValid('Joeee')).toBeTruthy();
        expect(nameIsValid('J')).toBeFalsy();
        expect(nameIsValid(' ')).toBeFalsy();
        expect(nameIsValid('J ')).toBeFalsy();
        expect(nameIsValid(' Jo')).toBeFalsy();
    });
    test('loads without errors', () => {
        expect(nameIsValid()).toBeDefined();
        expect(typeof nameIsValid()).toBe('boolean');
    });
})

describe('FullTrim', () => {
    test('loads without errors', () => {
        expect(fullTrim()).toBeDefined();
        expect(typeof fullTrim()).toBe('string');
    });
    test('delete spaces', () => {
        expect(fullTrim('Jo e')).toBe('Joe');
        expect(fullTrim(' Joe')).toBe('Joe');
        expect(fullTrim('J   o e ')).toBe('Joe');
    });
    test('string without spaces is not changed', () => {
        expect(fullTrim('Joe')).toBe('Joe');
    });
});

describe('GetTotal', () => {
    test('loads without errors', () => {
        expect(getTotal()).toBeDefined();
        expect(typeof getTotal()).toBe('number');
    });
    test('getTotal is a number', () => {
        expect(() => getTotal(10, 'hh')).toThrowError(new Error('Скидка должна быть числом'));

    });
    test('getTotal is a number', () => {
        expect(() => getTotal(10, -1)).toThrowError(new Error('Процент скидки не может быть отрицательным'));

    });
    let results = [
        [[{ price: 10, quantity: 10 }], 0, 100],
        [[{ price: 10, quantity: 1 }], 0, 10],
        [[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], 0, 100],
        [[{ price: 10, quantity: 10 }], 10, 90],
        [[{ price: 10, quantity: 10 }], 100, 0],
        [[{ price: 10, quantity: 10 }], 10, 90],
    ];

    test.each(results)('getTotal = expected', (items, discount, expected) => {
        expect(getTotal(items, discount)).toBe(expected);
    });
});
