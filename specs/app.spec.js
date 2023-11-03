// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */

describe('nameIsValid', function () {
  it('imports without error', function () {
    expect(nameIsValid).toBeTruthy()
  })
  it('is function', () => {
    expect(typeof nameIsValid).toBe('function')
  })
  test.each(["Liza", "asdasdasdadadsasd1233", "joe"])('should return true if name is valid', (name) => {
    expect(nameIsValid(name)).toBe(true)
  });

  it('should return false if name is invalid', () => {
    expect(nameIsValid('')).toBe(false)
    expect(nameIsValid('A')).toBe(false)
    expect(nameIsValid('Test Name')).toBe(false)
    expect(nameIsValid(undefined)).toBe(false)
    expect(nameIsValid(null)).toBe(false)
  });
})

describe('fullTrim', function () {
  it('imports without error', function () {
    expect(fullTrim).toBeTruthy()
  })
  it('is function', () => {
    expect(typeof fullTrim).toBe('function')
  })

  it('should return empty string for null or undefined', () => {
    expect(fullTrim(null)).toBe('')
    expect(fullTrim(undefined)).toBe('')
  });

  it('should remove all whitespace characters from string', () => {
    expect(fullTrim('  Hello   World  ')).toBe('HelloWorld')
  })

  it('should not change string without whitespaces', () => {
    expect(fullTrim('Teststring')).toBe('Teststring')
  });

})

describe('getTotal', function () {
  it('imports without error', function () {
    expect(fullTrim).toBeTruthy()
  })
  it('is function', () => {
    expect(typeof getTotal).toBe('function')
  })
  it('throw an error if discount is NaN', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
      { price: 5, quantity: 4 },
    ];
    expect(() => getTotal(items, '10')).toThrow('Скидка должна быть числом');
    expect(() => getTotal(items, true)).toThrow('Скидка должна быть числом');
    expect(() => getTotal(items, {})).toThrow('Скидка должна быть числом');
  });

  it('throw an error if negative discount', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 },
      { price: 5, quantity: 4 },
    ];

    expect(() => getTotal(items, -10)).toThrow(

    );
    expect(() => getTotal(items, -0.1)).toThrow(

    );
  });
});
