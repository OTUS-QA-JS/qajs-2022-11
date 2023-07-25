import { expect, test, describe } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'


describe('Check user name', () => {
  test('Name is valid', () => {
    expect(nameIsValid('Олег')).toBeTruthy();
  });
  test('Name length is less then zero', () => {
    expect(nameIsValid('Ю')).toBeFalsy();
  });
  test(`Name doesn't have space`, () => {
    expect(nameIsValid('Анна Мария')).toBeFalsy();
  });
});

describe('Check fullTrim function', () => {
  test(`Text doesn't have spaces`, () => {
    expect(fullTrim('Have a good day !')).not.toContain(' ');
  });
  test('Text is empty', () => {
    expect(fullTrim('').length).toBe(0);
  });
  test('Text has length', () => {
    expect(fullTrim('Анна Мария').length).toBeGreaterThan(0);
  });
});

describe('Check getTotal function', () => {
  test.each(
      [
        {quantity: 10, price: 10, expected: 100},
        {quantity: 10, price: 1, discount: '', expected: 'Скидка должна быть числом'},
        {quantity: 10, price: 9, discount: -3, expected: 'Процент скидки не может быть отрицательным'},
      ]
  )('Check order sum', ({quantity, price, discount, expected}) => {
    if (expected === 'Скидка должна быть числом' || expected === 'Процент скидки не может быть отрицательным') {
      expect(() => getTotal([{ price, quantity }], discount)).toThrow(expected);
    } else {
      expect(getTotal([{ price, quantity }])).toBe(expected);
    }
  });
});
