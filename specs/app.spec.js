// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe('Tests for "nameIsValid" function', () => {
  test("it loads without error", () => {
    expect(typeof nameIsValid).toBe("function");
  });
  test("Name is invalid (name is number)", () => {
    expect(nameIsValid(2)).toBe(false);
  });
  test("Name is invalid (name < 2)", () => {
    expect(nameIsValid("A")).toBe(false);
  });
  test("Name is invalid (name is empty)", () => {
    expect(nameIsValid("")).toBe(false);
  });
  test("Name is invalid (includes space)", () => {
    expect(nameIsValid("Harry Potter")).toBe(false);
  });
  test("Name is invalid (includes space in end)", () => {
    expect(nameIsValid("Ron ")).toBe(false);
  });
  test("Name is valid (2 char)", () => {
    expect(nameIsValid("Ed")).toBe(true);
  });
  test("Name is valid (> 2 char)", () => {
    expect(nameIsValid("John")).toBe(true);
  });
});

describe('Tests for "fullTrim" function', () => {
  test("it loads without error", () => {
    expect(typeof fullTrim).toBe("function");
  });
  test("Without argument", () => {
    expect(fullTrim()).toBe("");
  });
  test("String is empty", () => {
    expect(fullTrim("")).toBe("");
  });
  test("String is spaces", () => {
    expect(fullTrim("   ")).toBe("");
  });
  test("String without spaces", () => {
    expect(fullTrim("Beta122#")).toBe("Beta122#");
  });
  test("String contains spaces", () => {
    expect(fullTrim("  My string is  the best ")).toBe("Mystringisthebest");
  });
  test("Throw error when not a string", () => {
    expect(() => fullTrim(4)).toThrow();
  });
});

describe('Tests for "getTotal" function', () => {
  describe.each`
    item                                                        | discount | expected
    ${[{ price: 10, quantity: 10 }]}                            | ${0}     | ${100}
    ${[{ price: 10, quantity: 10 }]}                            | ${10}    | ${90}
    ${[{ price: 10, quantity: 1 }]}                             | ${0}     | ${10}
    ${[{ price: 10, quantity: 1 }]}                             | ${100}   | ${0}
    ${[{ price: 10, quantity: 0 }]}                             | ${0}     | ${0}
    ${[{ price: 0, quantity: 1 }]}                              | ${0}     | ${0}
    ${[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]} | ${0}     | ${100}
    ${[{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }]} | ${0}     | ${90}
    ${[{ price: 10, name: "Item", quantity: 1 }]}               | ${0}     | ${10}
    ${[{ price: 10, quantity: 10 }]}                            | ${-5}    | ${"error"}
    ${[{ price: 10, quantity: 10 }]}                            | ${"10"}  | ${"error"}
    ${2}                                                        | ${0}     | ${"error"}
  `("$item $discount", ({ item, discount, expected }) => {
    test(`${item} ${discount} = ${expected}`, () => {
      if (expected === "error") {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(() => getTotal(item, discount)).toThrow();
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(getTotal(item, discount)).toBe(expected);
      }
    });
  });
});
