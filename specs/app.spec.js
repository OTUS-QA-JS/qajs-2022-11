// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */

//Проверка имени
describe('Parametric test', () => {
  test.each([
    ["e", false],
    ["vasya", true],
    ["petya", true],
    ["ki", true],
    ["misha", true],
    ["", false],
    [22, false]
  ])('%s = %s', (name, expectation) => {
    if(expectation === true) {
      expect(nameIsValid(name)).toBe(true);
    }
  })
});


//Удаление пробелов из строки
describe('trim function', () => {
  test('"text    " equal "text"', () => {
    expect(fullTrim("text    ")).toEqual("text");
  })
  test('"           " equal ""', () => {
    expect(fullTrim("           ")).toEqual("");
  })
  test('"     text      " equal "text"', () => {
    expect(fullTrim("     text      ")).toEqual("text");
  })
  test('"                                      Iwanttowriteallkindsoftestsinjs" equal "Iwanttowriteallkindsoftestsinjs"', () => {
    expect(fullTrim("                                      I want to write all kinds of tests in js")).toEqual("Iwanttowriteallkindsoftestsinjs");
  })
  test('" I l o v e a u t o m a t e d t e s t i n g" equal "Iloveautomatedtesting"', () => {
    expect(fullTrim(" I l o v e a u t o m a t e d t e s t i n g")).toEqual("Iloveautomatedtesting");
  })
})

//Подсчет суммы
describe('total', () => {
  test('Скидка должна быть числом', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], "0")).toThrow();
  })
  test('Процент скидки не может быть отрицательным', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -1)).toThrow();
  })
  test('Процент скидки не может быть больше 100', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], 101)).toThrow();
  })
  test('Сумма без скидки', () => {
    expect(getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }])).toBe(100)
  })
  test('Процент скидки 20', () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 20)).toBe(80);
  })
  test('Процент скидки ', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], 100)).toThrow();
  })
})