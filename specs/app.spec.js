import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("nameIsValid", () => {
  it("nameIsValid returns true for valid name", () => {
    expect(nameIsValid("tanya")).toEqual(true);
  });
  it("nameIsValid returns false for empty name", () => {
    expect(nameIsValid("")).toBe(false);
  });
  it("nameIsValid returns false for invalid name", () => {
    expect(nameIsValid("123")).toBe(false);
  });
});

describe("fullTrim", () => {
  it("removes all whitespaces", () => {
    expect(fullTrim("  hello  ")).toBe("hello");
  });

  it("returns an empty string if input is null", () => {
    expect(fullTrim(null)).toBe("");
  });

  it("returns an empty string if input is undefined", () => {
    expect(fullTrim(undefined)).toBe("");
  });

  it("returns an empty string if input is an empty string", () => {
    expect(fullTrim("")).toBe("");
  });
});

const testCasesValid = [
  {
    name: "calculates total with no discount",
    products: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ],
    discount: 0,
    expected: 35,
  },
  {
    name: "calculates total with discount",
    products: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ],
    discount: 10,
    expected: 31.5,
  },
];

const testCasesNegative = [
  {
    name: "throws an error if discount is not a number",
    products: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ],
    discount: "abc",
    expectedError: "Скидка должна быть числом",
  },
  {
    name: "throws an error if discount is negative",
    products: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ],
    discount: -10,
    expectedError: "Процент скидки не может быть отрицательным",
  },
  {
    name: "throws an error if discount is greater than or equal to 100",
    products: [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ],
    discount: 110,
    expectedError: "Процент скидки не может быть больше 100",
  },
];

describe("getTotal", () => {
  test.each(testCasesValid)("$name", ({ products, discount, expected }) => {
    expect(getTotal(products, discount)).toBe(expected);
  });

  test.each(testCasesNegative)(
    "$name",
    ({ products, discount, expectedError }) => {
      expect(() => getTotal(products, discount)).toThrowError(expectedError);
    },
  );
});
