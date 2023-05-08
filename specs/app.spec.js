import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * nameIsValid tests
 */
test('One character in name', () => {
  expect(nameIsValid('A')).toBe(false);
})

test('Empty character in name', () => {
  expect(nameIsValid('   ')).toBe(false);
})

test.each([
  //test data
  ['A', false],
  ['   ', false],
  ['Art*em', true],
  ['Maria', true],
  ['Andrei', true],
])(
  'param test with table names',
  (name, expected) => {
    expect(nameIsValid(name)).toBe(expected);
  }
);

/**
 * fullTrim tests
 */

test('test empty string', () => {
  expect(fullTrim('')).toBe('');
});

test('test trim empty spaces in given string', () => {
  expect(fullTrim('          otus test         ')).toBe('otustest');
});

test.each([
  //test data
  ['     otus    ', 'otus'],
  ['          test', 'test'],
  ['   test text   ', 'testtext'],
])(
  'param test with table data',
  (text, expected) => {
    expect(fullTrim(text)).toBe(expected);
  }
);

/**
 * getTotal tests
 */

test('summ without discount', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];
  const discount = 0;
  const expectedTotal = 35;
  const total = getTotal(items, discount);
  expect(total).toBe(expectedTotal);
});

test('summ with discount', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];
  const discount = 20;
  const expectedTotal = 28;
  const total = getTotal(items, discount);
  expect(total).toBe(expectedTotal);
});

test('test error message due invalid value', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 },
  ];
  const discount = 'otus';
  expect(() => getTotal(items, discount)).toThrow('Скидка должна быть числом');
});