import { nameIsValid, fullTrim, getTotal } from '../src/app.js';

describe('nameIsValid', function () {
  it('true with four symbols', function () {
    expect(nameIsValid('ffff')).toBeTruthy();
  });
  it('false with one symbol', function () {
    expect(nameIsValid('f')).toBeFalsy();
  });
  it('false with space', function () {
    expect(nameIsValid('f ff')).toBeFalsy();
  });
});

describe('fullTrim', function () {
  it('is function', () => {
    expect(typeof fullTrim).toBe('function');
  });
  it('imports without error', function () {
    expect(fullTrim).toBeTruthy();
  });
  it('check trim of space', function () {
    expect(fullTrim('hh hh')).toBe('hhhh');
  });
});

describe('getTotal parametric test', () => {
  it('check error Nan', () => {
    expect(() => getTotal(10, 'hh')).toThrowError('Скидка должна быть числом');
  });
  it('check error percent', () => {
    expect(() => getTotal(10, -1)).toThrowError(
      'Процент скидки не может быть отрицательным'
    );
  });

  const items = [
    { items: [], expected: 0 },
    { items: [{ price: 10, quantity: 10 }], discount: 10, expected: 100 },
    { items: [{ price: 100, quantity: 10 }], discount: 10, expected: 1000 },
  ];
  it.each(items)(`getTotal($items)`, ({ items, expected }) => {
    expect(getTotal(items)).toBe(expected);
  });
});
