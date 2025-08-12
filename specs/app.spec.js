/* eslint-disable prettier/prettier */
/* eslint-disable jest/no-conditional-expect */
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";
import { expect } from "@jest/globals";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
describe("Проверка функции валидности имени", () => {
  test("Если имя пустое", () => {
    const name = "";
    expect(nameIsValid(name)).toBeFalsy();
  });
  test("Если имя менее двух символов", () => {
    const name = "o";
    expect(nameIsValid(name)).toBeFalsy();
  });
  test("Если имя содержит символы, кроме латиницы", () => {
    const name = "o2";
    expect(nameIsValid(name)).toBeFalsy();
  });
});

describe("Проверка трима", () => {
  test("Трим строки", () => {
    const string = "  aye   ";
    expect(fullTrim(string)).toEqual("aye");
  });
  test("Трим пустой строки", () => {
    const string = "";
    expect(fullTrim(string)).toEqual("");
  });
  test("Трим табуляции", () => {
    const string = "\t";
    expect(fullTrim(string)).toEqual("");
  });
});

describe("Проверка дисконта", () => {
  describe.each`
    items                           | discount                | result
    ${[{ quantity: 1, price: 10 }]} | ${"Двадцать процентов"} | ${"error"}
    ${[{ quantity: 1, price: 10 }]} | ${100}                  | ${"error"}
    ${[{ quantity: 1, price: 10 }]} | ${-20}                  | ${"error"}
    ${[{ quantity: 1, price: 10 }]} | ${undefined}            | ${10}
    ${[{ quantity: 1, price: 10 }]} | ${20}                   | ${8}
  `("check discount = $discount", ({ items, discount, result }) => {
    test(`check discount = ${discount}`, () => {
      if (result === "error") {
        expect(() => getTotal(items, discount)).toThrow()
      } else {
        expect(getTotal(items, discount)).toBe(result);
      }
    });
  });
});
