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
  it('should return true if name is valid', () => {
    expect(nameIsValid("Liza")).toBe(true)
    expect(nameIsValid('asdasdasdadadsasd1233')).toBe(true)
    expect(nameIsValid('Joe')).toBe(true)
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