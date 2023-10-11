/* eslint-disable jest/expect-expect */
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("nameIsValid function tests", () => {
  test.each`
    name      | expected
    ${"anna"} | ${true}
    ${"a"}    | ${false}
    ${"an a"} | ${false}
    ${NaN}    | ${false}
  `("nameIsValid($name) = $expected", ({ name, expected }) => {
    expect(nameIsValid(name)).toBe(expected);
  });
});

describe("fullTrim function tests", () => {
  test.each`
    position    | name
    ${"start"}  | ${"  anna"}
    ${"center"} | ${"an     na"}
    ${"end"}    | ${"anna   "}
  `("spaces in the $position of string trimmed", ({ name }) => {
    expect(fullTrim(name)).not.toContain(" ");
  });
});

describe("getTotal function tests", () => {
  test("fgetTotal with negative discount number is throw", () => {
    const items = [{ price: 10, quantity: 10 }];
    const discount = -80;
    expect(() => getTotal(items, discount)).toThrow();
  });
  test("fgetTotal with string type of discount is throw", () => {
    const items = [{ price: 10, quantity: 10 }];
    const discount = "rtyuj";
    expect(() => getTotal(items, discount)).toThrow();
  });
  test("fgetTotal with valid items and discount is correct", () => {
    const items = [{ price: 15, quantity: 8 }];
    const discount = 17;
    expect(getTotal(items, discount)).toBe(99.6);
  });
  test("fgetTotal with two objects in items is correct", () => {
    const items = [
      { price: 15, quantity: 8 },
      { price: 8, quantity: 1 },
    ];
    const discount = 11;
    expect(getTotal(items, discount)).toBe(113.92);
  });
});
