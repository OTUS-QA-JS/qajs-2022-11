import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('Username verification', () => {
  test('it loads without error', () => {
    expect(nameIsValid).toBeDefined();
    expect(typeof nameIsValid).toBe('function');
  });
  test('Name length longer 2', function () {
    expect(nameIsValid('Test')).toBeTruthy();
  });
  test('Name includes a space', function () {
    expect(nameIsValid('Test name')).toBeFalsy();
  });
  test('Name is int', function () {
    expect(nameIsValid(2)).toBeFalsy();
  });
});


describe('Удаление пробелов из строки', () => {
  test.each`
    text    | expected
    ${'test test'} | ${'testtest'}
    ${'test 2'} | ${'test2'}
    ${'test 3'} | ${'test3'}
  `('space trim', ({ text, expected }) => {
    expect(fullTrim(text)).toBe(expected);
  });
});


describe('Order amount calculation', () => {
  test('it loads without error', () => {
    expect(getTotal).toBeDefined();
    expect(typeof getTotal).toBe('function');
  });
  test('Order amount without discount', () => {
    expect(getTotal([{ price: 10, quantity: 9 }])).toBe(90);
  });
  test('Order amount with discount', () => {
    expect(getTotal([{ price: 10, quantity: 9 }], 10)).toBe(81);
  });
  test('Two order amount with discount', () => {
    expect(getTotal([{ price: 10, quantity: 9 }, { price: 10, quantity: 10 }], 10)).toBe(171);
  });
  test('Discount must be a number', () => {
    expect(() => getTotal([{ price: 10, quantity: 9 }], '12')).toThrowError(new Error('Скидка должна быть числом'));
  });
  test('Discount percentage cannot be negative', () => {
    expect(() => getTotal([{ price: 10, quantity: 9 }], -12)).toThrowError(new Error('Процент скидки не может быть отрицательным'));
  });
});
