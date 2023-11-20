// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Cheking a name", () => {
  test("Cheking a name", () => {
    expect(nameIsValid("Lenochka")).toBe(true);
  });

  test("numbers", () => {
    expect(nameIsValid(2324)).toBe(false);
  });

  test("any simbol", () => {
    expect(nameIsValid("!")).toBe(false);
  });
});

describe("Check name parametric test", () => {
  test.each`
    a         | expected
    ${"Olga"} | ${true}
    ${"v"}    | ${false}
    ${444}    | ${false}
  `("return $expected when name is $a", ({ a, expected }) => {
    expect(nameIsValid(a)).toBe(expected);
  });
});

describe("delete gaps", () => {
  test("string with gaps in the middle", () => {
    expect(fullTrim("[Жизнь    полна неожиданностей]")).not.toBe(
      "[Жизнь    полна неожиданностей]",
    );
  });
  test("no gaps", () => {
    expect(fullTrim("[безпробелов]")).toEqual("[безпробелов]");
  });
  test("gaps at the beggining", () => {
    expect(fullTrim("[     начало]")).toEqual("[начало]");
  });
});

describe("getTotal test", () => {
  test("no discount", () => {
    expect(getTotal([{ price: 10, quantity: 10 }])).toEqual(100);
  });

  test("discount is not a number", () => {
    expect(() =>
      getTotal([{ price: 10, quantity: 100 }], "скидки нет"),
    ).toThrow("Скидка должна быть числом");
  });

  test("discount is negative", () => {
    expect(() => getTotal([{ price: 10, quantity: 100 }], -10)).toThrow(
      "Процент скидки не может быть отрицательным",
    );
  });
});
