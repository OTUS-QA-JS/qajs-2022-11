/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

//tests
describe("function 1", () => {
  test("is defined", () => {
    expect(nameIsValid).toBeDefined();
    expect(typeof nameIsValid).toBe("function");
  });
  test("is true with the correct string", function () {
    expect(nameIsValid("test")).toBeTruthy();
  });
  test("is false when the string is incorrect", function () {
    expect(nameIsValid("")).not.toBeTruthy();
  });
});

describe("function 2", () => {
  it("import without error", () => {
    expect(fullTrim).toBeDefined();
    expect(typeof fullTrim).toBe("function");
  });
  it("is string", function () {
    expect(typeof fullTrim()).toBe("string");
  });
  it("has no spaces", function () {
    expect(fullTrim("test test").includes(" ")).not.toBeTruthy();
  });
});

describe("function 3", () => {
  it("import without error", () => {
    expect(getTotal).toBeDefined();
    expect(typeof getTotal).toBe("function");
  });
  it("result is the number", function () {
    expect(typeof getTotal()).toBe("number");
  });
});


describe.each([
  [[{price: 10, quantity: 10}], 0, 100],
  [[{price:10, quantity: 1}], 0, 10],
  [[{price:10, quantity: 1},{price:10, quantity: 9}], 0, 100],
  [[{price:10, quantity: 0},{price:10, quantity: 9}], 0, 90],
  [[{price:10, quantity: 10}], 10, 90],
  [[{ price: 10, quantity: 10 }], 100, 0],

])("test for getTotal function)", (items, discount, expected) => {
  test(`returns ${expected}`, () => {
    expect(getTotal(items, discount)).toBe(expected);
  });
  
  test('throws on string discount', () => {
    expect(() => {
      getTotal(items, 'discount');
    }).toThrow();
  });

  test('throws on negative discount number', () => {
    expect(() => {
      getTotal(items, -20);
    }).toThrow();
  });
});
