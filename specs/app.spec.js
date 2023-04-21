import { nameIsValid, fullTrim, getTotal, getScore } from '../src/app.js'

describe('nameIsValid tests', () => {
    test('nameIsValid - it loads without error', () => {
        expect(nameIsValid).toBeDefined();
        expect(typeof nameIsValid).toBe('function');
      });

      test('returns false if name is not a string', () => {
        expect(nameIsValid(123)).toBeFalsy();
        expect(nameIsValid(true)).toBeFalsy();
        expect(nameIsValid({ name: 'John' })).toBeFalsy();
        expect(nameIsValid(['John'])).toBeFalsy();
    });

    test('the name must be greater than >= 2', () => {
        expect(nameIsValid('ab')).toBeTruthy();
        expect(nameIsValid('Ab1')).toBeTruthy();
        expect(nameIsValid('a')).toBeFalsy();  
    });

    test('the name must not have spaces ', () => {
        expect(nameIsValid(' ')).toBe(false);
        expect(nameIsValid('')).toBe(false);
    });
});

describe('fullTrim tests', () => {
    test('returns empty string if input is not a string', () => {
        expect(() => fullTrim(123)).toThrow();
        expect(() => fullTrim(true)).toThrow();
        expect(() => fullTrim({ text: 'hello' })).toThrow();
        expect(() => fullTrim(['hello'])).toThrow();
    });

    test('returns string without spaces', () => {
        expect(fullTrim('  hello world  ')).toBe('helloworld');
        expect(fullTrim('   ')).toBe('');
    });
});

describe('getTotal tests', () => {
    test('throws an error if discount is not a number', () => {
        expect(() => getTotal([10, 20, 30], 'abc')).toThrow('Скидка должна быть числом');
        expect(() => getTotal([50, 100], true)).toThrow('Скидка должна быть числом');
        expect(() => getTotal([15, 25, 35], { discount: 0.5 })).toThrow('Скидка должна быть числом');
    });

    test('throws an error if discount is < 0', () => {
        expect(() => getTotal([10, 20], -1)).toThrow('Процент скидки не может быть отрицательным');
    });
});

describe('parametric test', () => {
    test.each`
    items                                                     | discount | expected
     ${[{ price: 10, quantity: 2 }]}                           | ${0}     | ${20}
    ${[{ price: 20, quantity: 1 }, {price: 10, quantity: 0}]} | ${1}     | ${19.8}
    ${[{price: 20, quantity: 2}, {price: 10, quantity: 1}]}   | ${0}     | ${50}
    ${[{price: 100, quantity: 0}]}                            | ${0}     | ${0}
    ${[{price: 100, quantity: 0}]}                            | ${10}    | ${0}
    ${[{price:10, quantity: 1}, {price: 20, quantity: 2}]}    | ${100}   | ${0}
    `('$items $discount = $expected' , ({items, discount, expected}) => {
         expect(getTotal(items, discount)).toBe(expected);
    });
});

describe('getScore tests', () => {
    test('getScore is valid', () => {
    expect(getScore).toBeDefined();
    expect(typeof getScore).toBe('function');
    expect(getScore({'Ale': 10, 'Olga': 8})).toBe(18);
    });
});