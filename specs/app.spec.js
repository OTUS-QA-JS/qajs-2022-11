import { nameIsValid, fullTrim, getTotal } from '../src/app.js';

describe('nameIsValid', function () {
  test('true with four symbols', function () {
    expect(nameIsValid('ffff')).toBeTruthy();
  });
  test('false with one symbol', function () {
    expect(nameIsValid('f')).toBeFalsy();
  });
  test('false with space', function () {
    expect(nameIsValid('f ff')).toBeFalsy();
  });
});

describe('fullTrim', function () {
  test('is function', () => {
    expect(typeof fullTrim).toBe('function');
  });
  test('imports without error', function () {
    expect(fullTrim).toBeTruthy();
  });
  test('check trim of space', function () {
    expect(fullTrim('hh hh')).toBe('hhhh');
  });
});

describe('getTotal parametric test', () => {
  test('check error Nan', () => {
    expect(() => getTotal(10, 'hh')).toThrowError('Скидка должна быть числом');
  });
  test('check error percent', () => {
    expect(() => getTotal(10, -1)).toThrowError(
      'Процент скидки не может быть отрицательным'
    );
  })

  test.each`
    price      | op     | quantity      | expected
    ${100}     | ${'-'} | ${10}         | ${90}
  `('$price $op $quantity = $expected', ({ price, op, quantity, expected }) => {
    if (expected === 'error') {
      expect(() => getTotal(price, op, quantity)).toThrow();
    } else {
      expect(getTotal(price, op, quantity)).toBe(expected);
    }
  });
  // const items = [
  //   { items: [], discount:1,expected: 0 },
  //   // { items: [10,10], expected: 100 },
  // ];
  // test.each(items)(`getTotal($items)`, ([items, expected]) => {
  //   expected(getTotal(items)).toBe(expected);
  // });
});
