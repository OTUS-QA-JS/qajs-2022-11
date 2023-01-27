import {nameIsValid, fullTrim, getTotal} from '../src/app.js';

describe('nameIsValid function', () => {
    it('import without errors', () => {
        expect(nameIsValid).toBeDefined();
    });
    it('nameIsValid is function', () => {
        expect(typeof nameIsValid).toBe('function');
    });
    test('empty name string', () => {
        expect(nameIsValid('')).toBeFalsy();
    });
    test('name of 1 character', () => {
        expect(nameIsValid('a')).toBeFalsy();
    });
    test('space in the name', () => {
        expect(nameIsValid('So nya')).toBeFalsy();
    });
    test('correct name', () => {
        expect(nameIsValid('Sonya')).toBeTruthy();
    });
});

describe('fullTrim function', () => {
    it('import without errors', () => {
        expect(fullTrim).toBeDefined();
    });
    it('fullTrim is function', () => {
        expect(typeof fullTrim).toBe('function');
    });
    test('empty string', () => {
        expect(fullTrim('')).toBe('');
    });
    test('space at the beginning of the line', () => {
        expect(fullTrim(' developer1')).toBe('developer1');
    });
    test('space at the end of the line', () => {
        expect(fullTrim('2software ')).toBe('2software');
    });
    test('space in the middle of the line', () => {
        expect(fullTrim('prog rammer')).toBe('programmer');
    });
    test('multiple spaces in a line', () => {
        expect(fullTrim(' Quality Assurance ')).toBe('QualityAssurance');
    });
    test('string without spaces', () => {
        expect(fullTrim('goodJob')).toBe('goodJob');
    });
});

describe('getTotal function', () => {
    it('import without errors', () => {
        expect(getTotal).toBeDefined();
    });
    it('getTotal is function', () => {
        expect(typeof getTotal).toBe('function');
    });
    test('discount is not a number - throw', () => {
        expect(() => getTotal([{price: 10, quantity: 10}], 'ten')).toThrow('Скидка должна быть числом');
    });
    test('discount is negative - throw', () => {
        expect(() => getTotal([{price: 10, quantity: 10}], -10)).toThrow('Процент скидки не может быть отрицательным');
    });
    test('order without discount', () => {
        expect(getTotal([{price: 15, quantity: 10}])).toBe(150);
    });
    test('order with discount', () => {
        expect(getTotal([{price: 27, quantity: 5}], 10)).toBe(121.5);
    });
    test.each`
    quantity | name           | price | discount | expected
    ${4}     | ${'pear(s)'}   | ${35} | ${10}    | ${126}
    ${5}     | ${'apple(s)'}  | ${20} | ${25}    | ${75}
    ${8}     | ${'orange(s)'} | ${10} | ${5}     | ${76}
    `('Cost will be $expected, if buy $quantity $name for $price rubles with a discount of $discount',
        ({quantity, name, price, discount, expected}) => {
            expect(getTotal([{price: price, name: name, quantity: quantity}], discount)).toBe(expected);
        });
    test.each`
    items                                                                             | discount | expected
    ${[{price: 15, quantity: 10}]}                                                    | ${20}    | ${120}
    ${[{price: 123, quantity: 2}, {price: 10, quantity: 1}]}                          | ${10}    | ${230.4}
    ${[{price: 60, quantity: 3}, {price: 40, quantity: 4}, {price: 19, quantity: 3}]} | ${7}     | ${369.21}
    `('Cost will be $expected, if buy $items.length items with a discount of $discount',
        ({items, discount, expected}) => {
            expect(getTotal(items, discount)).toBe(expected);
        });
});