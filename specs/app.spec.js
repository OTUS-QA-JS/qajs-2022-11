import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

// nameIsValid

describe('Check if name is valid', () => {
  test.each([
  ['Nastya', true],
  ['Nastya Ivanova', false],
  ['Li', true],
  ['L', false],
  ])('expects value %p returns %p', (name, expected) => {
    expect(nameIsValid(name)).toBe(expected);
  });
});

// fullTrim

describe('string without spaces', () => {
  test.each([
    ['Hello , World !', 'Hello,World!'],
    [' Good bye ', 'Goodbye'],
    ['   ', ''],
    ['', ''],
  ])('expects value %p returns %p', (text, expected) => {
    expect(fullTrim(text)).toBe(expected);
  });
});

// getTotal

describe('getTotal function', () => {
  it('import without error', function () {
    expect(getTotal).toBeTruthy();
    expect(typeof getTotal).toBe('function');
  })
  it('Check calculation without discount', () => {
    const items = [
      { price: 10, quantity: 1 },
      { price: 10, quantity: 9 },
    ];
    const result = getTotal(items);
    expect(result).toBe(100);
  }) 
  it('Check calculation with positive discount', () => {
    const items = [
      { price: 10, quantity: 10 },
      { price: 10, quantity: 5 },
    ];
    const discount = 10;
    expect(getTotal(items, discount)).toBe(135);
  })
  it('Incorrect discount type throws an error', () => {
    const testFunc = () => getTotal([], '10%');
    expect(testFunc).toThrowError('Скидка должна быть числом');
  })
  it('Negative discount throws an error', () => {
    const testFunc = () => getTotal([], -10);
    expect(testFunc).toThrowError('Процент скидки не может быть отрицательным');
  })
})