import {nameIsValid, fullTrim, getTotal, getScore} from '../src/app.js'

describe('Testing function nameIsValid', () => {
    test('nameIsValid is defined', () => {
        expect(nameIsValid).toBeDefined();
    });
    test('type of nameIsvalid is function', () => {
        expect(typeof nameIsValid).toBe('function');
    });
    test('name length < 2', () => {
        expect(nameIsValid('A')).toBeFalsy();
    });
    test('name length = 2', () => {
        expect(nameIsValid('Ai')).toBeTruthy();
    });
    test('name length > 2', () => {
        expect(nameIsValid('Aiz')).toBeTruthy();
    });
    test('name includes white spaces', () => {
        expect(nameIsValid('A i')).toBeFalsy();
    });
    test('name is number', () => {
        expect(nameIsValid(123)).toBeFalsy();
    });
});

describe('Testing function fullTrim', () => {
    test('fullTrim is defined', () => {
        expect(fullTrim).toBeDefined();
    });
    test('type of fullTrim is function', () => {
        expect(typeof fullTrim).toBe('function');
    });
    test('fullTrim replace white spaces', () => {
        expect(fullTrim('Строчка с пробелами')).toBe('Строчкаспробелами')
    });
});

describe('Testing function getTotal', () => {
    test('getTotal is defined', () => {
        expect(getTotal).toBeDefined();
    });
    test('type of getTotal is function', () => {
        expect(typeof getTotal).toBe('function');
    });
    test('getTotal with all arguments', () => {
        expect(getTotal([{name: 'помидоры', price: 20, quantity: 10}], 5)).toBe(190);
    });
    test('getTotal without name', () => {
        expect(getTotal([{price: 20, quantity: 10}], 10)).toBe(180);
    });
    test('getTotal without discount ', () => {
        expect(getTotal([{price: 20, quantity: 10}])).toBe(200);
    });
    test('getTotal with only one item', () => {
        expect(getTotal([{price: 20}])).toBeNaN();
    });
    test('discount = 0', () => {
        expect(getTotal([{price: 20, quantity: 10}], 0)).toBe(200);
    });
    test('discount is not number type', () => {
        expect(function() {
            getTotal([{price: 20, quantity: 10}], '10')
        }).toThrowError('Скидка должна быть числом');
    });
    test('discount = -1', () => {
        expect(function() {
            getTotal([{price: 20, quantity: 10}], -1)
        }).toThrowError('Процент скидки не может быть отрицательным');
    });
    test.each`
    name         | price | quantity | discount | expected
    ${'огурцы'}  | ${20} | ${5}     | ${10}    | ${90}
    ${'яблоки'}  | ${50} | ${10}    | ${7}     | ${465}
    ${'кабачки'} | ${40} | ${15}    | ${5}     | ${570}
    ${'бананы'}  | ${8}  | ${50}    | ${0}     | ${400}
    `('$name: $price * $quantity - $discount% = $expected', ({ name, price, quantity, discount, expected }) => {
        expect(getTotal([{name: name, price: price, quantity: quantity}], discount)).toBe(expected);
    });
});

describe('Testing function getScore', () => {
    test('all values of key in object are number', () => {
        const testObj = {
            Anna: 10,
            Olga: 1,
            Ivan: 5,
        };
        expect(getScore(testObj)).toEqual(16);
    });
    test('one value of key in object is string', () => {
        const testObj = {
            Anna: 10,
            Olga: 1,
            Ivan: '5',
        };
        expect(function () {
            getScore(testObj)
        }).toThrowError('Значения ключей объекта должны быть числом!');
    });
    test('all values of key in object are string', () => {
        const testObj = {
            Anna: 'ten',
            Olga: 'sting value',
            Ivan: '5',
        };
        expect(function () {
            getScore(testObj)
        }).toThrowError('Значения ключей объекта должны быть числом!');
    });
})
