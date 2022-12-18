import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

describe('tests for function nameIsValid', () => {
    it.each([undefined, null, '', true])('checks name with unknown value must be false', (name) => {
        expect(nameIsValid(name)).toBeFalsy();
    });

    it('checks name with less than 1 symbol must be false', () => {
        expect(nameIsValid('n')).toBeFalsy();
    });

    it('checks name with 2 symbols must be true', () => {
        expect(nameIsValid('tr')).toBeTruthy();
    });

    it.each([' name', 'name ', 'na me', ' '])('checks name with empty spaces must be false', (name) => {
        expect(nameIsValid(name)).toBeFalsy();
    });

    it('checks name equal "userName" must be true', () => {
        expect(nameIsValid('userName')).toBeTruthy();
    });

    it('checks numeric name must be false', () => {
        expect(nameIsValid(5)).toBeFalsy();
    });
});

describe('tests for function fullTrim', () => {
    it.each`
    text           | expected
    ${'text'}      | ${'text'}
    ${' text'}     | ${'text'}
    ${'text '}     | ${'text'}
    ${'te xt'}     | ${'text'}
    ${'t e x t'}   | ${'text'}
    ${' t e x t '} | ${'text'}
    `('checks $text must be equal to $expected', ({ text, expected }) => {
        expect(fullTrim(text)).toBe(expected);
    });

    it('checks empty string must be equal empty string', () => {
        expect(fullTrim('')).toBe('');
    });

    it.each([5, [], true])('checks name is not a string should be error', (text) => {
        expect(() => {
            fullTrim(text)
        }).toThrow();
    });
});

describe('tests for function getTotal', () => {
   it.each(['4', null, false, 'four', -1])(
       'checks discount is not a number function must return error', (discount) => {
          expect(() => {
              getTotal([{price: 10, quantity: 2}], discount);
          }).toThrow();
       });

   it.each([{price: 10, quantity: 2}, true, 'price', 2])
   ('checks if discount is not array function must return error',
       (items) => {
       expect(() => {
           getTotal(items, 0)
       }).toThrow();
   });

   it.each`
   items                                                     | discount | expected
   ${[{ price: 10, quantity: 2 }]}                           | ${0}     | ${20}
   ${[{ price: 20, quantity: 1 }, {price: 10, quantity: 0}]} | ${1}     | ${19.8}
   ${[{price: 20, quantity: 2}, {price: 10, quantity: 1}]}   | ${0}     | ${50}
   ${[{price: 100, quantity: 0}]}                            | ${0}     | ${0}
   ${[{price: 100, quantity: 0}]}                            | ${10}    | ${0}
   ${[{price:10, quantity: 1}, {price: 20, quantity: 2}]}    | ${100}   | ${0}
   `('checks for different items with different discount result must be equal $expected', ({items, discount, expected}) => {
       expect(getTotal(items, discount)).toBe(expected);
   });

   it('checks discount is not requirement parameter', () => {
       expect(getTotal([{price: 10, quantity: 1}])).toBe(10);
   })
});
