import { describe, expect, test } from '@jest/globals'
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'
// eslint-disable-next-line no-unused-vars

describe('nameIsValid function', () => {
  test('Positive check: valid name', () => {
    const validName = 'Rick_Sanchez'
    const result = nameIsValid(validName)
    expect(result).toBe(true)
  })
  test('Negative check: name is empty', () => {
    const emptyName = ''
    const result = nameIsValid(emptyName)
    expect(result).toBe(false)
  })
  test('Negative check: name is less that 2 symbols', () => {
    const invalidName = 'S'
    const result = nameIsValid(invalidName)
    expect(result).toBe(false)
  })
})

// Параметрезированный тест для nameIsValid function
describe('Parametrize test for nameIsValid function', () => {
  test.concurrent.each`
  name | expected
  ${'Rick_Sanchez'} | ${true}
  ${''} | ${false}
  ${'S'} | ${false}
  `('returns $expected when name is $name', ({ name, expected }) => {
    const result = nameIsValid(name)
    expect(result).toBe(expected)
  })
})

describe('fullTrim function', () => {
  test('1. To check correct text', () => {
    const validText = ' Something New '
    const result = fullTrim(validText)
    expect(result).toBe('SomethingNew')
  })
  test('2. To check text is null', () => {
    const nullInput = null
    const result = fullTrim(nullInput)
    expect(result).toBe('')
  })
  test('3. To check text is undefined', () => {
    const undefinedInput = undefined
    const result = fullTrim(undefinedInput)
    expect(result).toBe('')
  })
})
describe('getTotal function', () => {
  test('1. To check total price w/o discount', () => {
    const order = [{
      quantity: 5,
      price: 10
    }]
    const result = getTotal(order)
    expect(result).toStrictEqual(50)
    console.log(result)
  })
  test('2. To check total price with discount', () => {
    const order = [{
      quantity: 5,
      price: 10
    }]
    const discount = 5
    const result = getTotal(order, discount)
    expect(result).toStrictEqual(47.5)
    console.log(result)
  })
  test('3. To check total price when discount is not a number', () => {
    const order = [{
      quantity: 5,
      price: 10
    }]
    const discount = 'provide discount'
    expect(() => getTotal(order, discount)).toThrow('Скидка должна быть числом')
  })
})
test('4. To check total price when discount is a negative number', () => {
  const order = [{
    quantity: 5,
    price: 10
  }]
  const discount = -50
  expect(() => getTotal(order, discount)).toThrow('Процент скидки не может быть отрицательным')
})
