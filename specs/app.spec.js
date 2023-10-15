// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Тест функции nameIsValid", function () {
  it("Функция импортирована без ошибок", function () {
    expect(nameIsValid).toBeTruthy()
  })
  it("Это функция", function () {
    expect(typeof nameIsValid).toBe("function")
  })
  it("Выдаёт ошибку если в параметр передан диапазон от 0 до 1 символа", function () {
    expect(() => nameIsValid("")).toThrow
    expect(() => nameIsValid("1")).toThrow
  })
  it("Выдаёт ошибку если параметр не типа string", function () {
    expect(() => nameIsValid({})).toThrow
    expect(() => nameIsValid([])).toThrow
    expect(() => nameIsValid(123)).toThrow
    expect(() => nameIsValid(true)).toThrow
    expect(() => nameIsValid(null)).toThrow
    expect(() => nameIsValid(NaN)).toThrow
  })
  it("Функция принимает значение Привет!", function () {
    expect(nameIsValid("Привет!").toBe)
  })
})

describe("Тест функции fullTrim", function () {
  it("Функция импортирована без ошибок", function () {
    expect(fullTrim).toBeTruthy()
  })
  it("Это функция", function () {
    expect(typeof fullTrim).toBe("function")
  })
  it("Выдаёт ошибку если параметр не типа string", function () {
    expect(() => fullTrim({})).toThrow
    expect(() => fullTrim([])).toThrow
    expect(() => fullTrim(123)).toThrow
    expect(() => fullTrim(true)).toThrow
    expect(() => fullTrim(null)).toThrow
    expect(() => fullTrim(NaN)).toThrow
  })
  it("Функция принимает значение Keys", function () {
    expect(nameIsValid("Keys!").toBe)
  })
  it("Функция принимает пустую строку", function () {
    expect(nameIsValid("").toBe)
  })
})

describe('Параметизированный тест функции getTotal', () => {
  test.each`
    items                                                             | discount      | expected
    ${[{ price: 10, quantity: 10 }]}                                  | ${0}          | ${100}
    ${[{ price: 10, quantity: 1 }]}                                   | ${0}          | ${10}
    ${[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]}       | ${0}          | ${100}
    ${[{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }]}       | ${2}          | ${88.2}
    ${[{ price: 10, quantity: 10 }]}                                  | ${10}         | ${90}
    ${[{ price: 10, quantity: 10 }]}                                  | ${100}        | ${0}
    ${[{ price: 10, quantity: "10" }]}                                | ${0}          | ${100}
    ${[{ price: 10, quantity: 10 }]}                                  | ${-1}         | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${-1}         | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${[]}         | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${{}}         | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${true}       | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${null}       | ${'error'}
    ${[{ price: 10, quantity: 10 }]}                                  | ${NaN}        | ${NaN}
    ${[{ price: 10, quantity: 10 }]}                                  | ${" "}        | ${'error'}
    ${[]}                                                             | ${2}          | ${0}
    ${{}}                                                             | ${2}          | ${'error'}
    ${true}                                                           | ${2}          | ${'error'}
    ${null}                                                           | ${2}          | ${'error'}
    ${NaN}                                                            | ${2}          | ${'error'}
    ${" "}                                                            | ${2}          | ${'error'}
    ${1}                                                              | ${2}          | ${'error'}
  `('$items $discount = $expected', ({ items, discount, expected }) => {
    if (expected === 'error') {
      expect(() => getTotal(items, discount)).toThrow();
    } else {
      expect(getTotal(items, discount)).toBe(expected);
    }
  });
});
