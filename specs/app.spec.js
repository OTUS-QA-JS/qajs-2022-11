import { nameIsValid, fullTrim, getTotal } from "../src/app.js";
describe("getTotal 100% coverage", () => {
  describe("getTotal check imports", () => {
    test("getTotal check import", () => {
      expect(typeof getTotal).toBe("function");
      expect(getTotal).toBeDefined();
    });
  });
  describe("getTotal check throw error", () => {
    test("check discount not a number", () => {
      expect(() => getTotal([{ price: 10, quantity: 10 }], "5")).toThrow(
        "Скидка должна быть числом",
      );
    });
    test("check discount < 0", () => {
      expect(() => getTotal([{ price: 10, quantity: 10 }], -6)).toThrow(
        "Процент скидки не может быть отрицательным",
      );
    });
  });

  describe("getTotal check function", () => {
    test("check discount 10", () => {
      expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
    });
    test("check discount 100", () => {
      expect(getTotal([{ price: 10, quantity: 10 }], 100)).toBe(0);
    });
  });
});
describe("nameIsValid 100% coverage", () => {
  describe("nameIsValid check imports", () => {
    test("check import", () => {
      expect(nameIsValid).toBeDefined();
      expect(typeof nameIsValid).toBe("function");
    });
  });
  describe("nameIsValid check false", () => {
    test("check nameIsValid false 1", () => {
      expect(nameIsValid("t")).toBe(false);
    });
    test("check nameIsValid false number", () => {
      expect(nameIsValid(3)).toBe(false);
    });
  });

  describe("nameIsValid check true", () => {
    test("check nameIsValid true", () => {
      expect(nameIsValid("Lena")).toBe(true);
    });
    test("check nameIsValid true 2 characters", () => {
      expect(nameIsValid("Ll")).toBe(true);
    });
  });
});
describe("fullTrim 100% coverage", () => {
  describe("fullTrim check imports", () => {
    test("check import", () => {
      expect(fullTrim).toBeDefined();
      expect(typeof fullTrim).toBe("function");
    });
  });

  describe("fullTrim parametric test", () => {
    test.each`
      a           | expected
      ${"test "}  | ${"test"}
      ${" test"}  | ${"test"}
      ${"test"}   | ${"test"}
      ${" test "} | ${"test"}
      ${"te st"}  | ${"test"}
    `("$a = $expected", ({ a, expected }) => {
      expect(fullTrim(a)).toBe(expected);
    });
  });
});
