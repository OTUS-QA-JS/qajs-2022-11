// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";


describe('unit tests for nameIsValid function', () => {

  test('valid name', () => {
    expect(nameIsValid('Vasya')).toBeTruthy()
  })

  test('name with space', () => {
    expect(nameIsValid('Vasya Fedor')).toBeFalsy()
  })

  describe('name should contains 2 and great characters', () => {

    test('empty name', () => {
      expect(nameIsValid('')).toBeFalsy()
    })

    test('name contains 2 characters', () => {
      expect(nameIsValid('Yn')).toBeTruthy()
    })

    test('name contains more than 2 characters', () => {
      expect(nameIsValid('Fedor')).toBeTruthy()
    })
  })
})


describe('unit tests for fullTrim function', () => {
  test('trim string spaces', () => {
    expect(fullTrim(' my test  string  ')).toEqual('myteststring')
  })

  test('empty string', () => {
    expect(fullTrim('')).toEqual('')
  })

  test('string contains only spaces', () => {
    expect(fullTrim('  ')).toEqual('')
  })
})


describe('unit tests for getTotal function', () => {

  test.each([
    { items: [{ price: 100, quantity: 10 }], discount: 0, total: 1000 },
    { items: [{ price: 100, quantity: 10 }], discount: 20, total: 800 },
    { items: [{ price: 100, quantity: 10 }], discount: 100, total: 0 },
    { items: [{ price: 100, quantity: 10 }, { price: 10, quantity: 100 }], discount: 0, total: 2000 },
  ])('calc order sum for items', ({ items, discount, total }) => {
    expect(getTotal(items, discount)).toBe(total)
  });

  test('discount not a number', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], true)).toThrowError('Скидка должна быть числом')
  })

  test('negative discount', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -30)).toThrowError('Процент скидки не может быть отрицательным')
  })

})
