/* eslint-disable prettier/prettier */
/* eslint-disable jest/no-conditional-expect */
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('Проверка имени пользователя', () => {
  test('Строка непустая', () => {
    expect(nameIsValid('liana')).toBe(true)
  })
  test('Строка пустая', () => {
    expect(nameIsValid('')).toBe(false)
    expect(nameIsValid(null)).toBe(false)
    expect(nameIsValid(undefined)).toBe(false)
  })
  test('Ввод числа вернет false', () => {
    expect(nameIsValid(0)).toBe(false)
    expect(nameIsValid(5)).toBe(false)
  })
  test('Длина строки меньше двух символов', () => {
    expect(nameIsValid('q')).toBe(false)
  })
  test('Строка содержит пробелы', () => {
    expect(nameIsValid('John Smith')).toBe(false)
  })
})

describe('Удаление пробелов из строки', () => {
  test('Строка непустая и пробелы отсутствуют', () => {
    expect(fullTrim('текст')).toMatch('текст')
  })
  test('Строка пустая', () => {
    expect(fullTrim('')).toMatch('')
  })
  test('Из строки удалены все пробелы', () => {
    expect(fullTrim('первый второй третий четвертый пятый')).toMatch(
      'первыйвторойтретийчетвертыйпятый',
    )
  })
})

/* NOTE: с данными, указанными ниже, функция возвращает необрабатываемую ошибку
  ${10}        | ${'apple'}   | ${10}        | ${null}      | ${100}
  ${undefined} | ${'apple'}   | ${10}        | ${10}        | ${'error'}
  ${10}        | ${'apple'}   | ${undefined} | ${10}        | ${'error'}
*/
describe.each`
  quantity | name         | price | discount     | expected
  ${10}    | ${'apple'}   | ${10} | ${100}       | ${0}
  ${10}    | ${'apple'}   | ${10} | ${10}        | ${90}
  ${10}    | ${'apple'}   | ${10} | ${undefined} | ${100}
  ${10}    | ${undefined} | ${10} | ${10}        | ${90}
  ${10}    | ${'apple'}   | ${10} | ${0}         | ${100}
  ${10}    | ${'apple'}   | ${10} | ${-10}       | ${'error'}
  ${10}    | ${'apple'}   | ${10} | ${'100'}     | ${'error'}
`('Подсчёт суммы заказа', ({ quantity, name, price, discount, expected }) => {
  test(`${quantity} ${name} ${price} ${discount} = ${expected}`, () => {
    if (expected === 'error') {
      expect(() => getTotal([{ quantity, name, price }], discount)).toThrow()
    } else {
      expect(getTotal([{ quantity, name, price }], discount)).toBe(expected)
    }
  })
})
