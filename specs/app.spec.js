// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
//test("adds 1 + 2 to equal 3", () => {
  //expect(1 + 2).toBe(3);
//});

describe("Cheking a name", () => {
  test("correct name", () => {
    expect(nameIsValid("Lenochka")).toBeTruthy();
  });
  test("numbers", () => {
    expect(nameIsValid(2324)).toBeFalsy();
  });
  test("any simbol", () => {
    expect(nameIsValid("!")).toBeFalsy();
  });
});


describe('Check name parametric test', () => {
  test.each`
    a      | expected
    ${"Olga"}   | ${true}
    ${'a'} | ${false}
    ${444} | ${false}
   
  `('$a = $expected', ({ a, expected }) => {
    if (expected === 'error') {
      expect(() => nameIsValid(a)).toBeFalsy();
    } else {
      expect(nameIsValid(a)).toBeTruthy;
    }
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
  expect(() => getTotal(([{ price: 10, quantity: 100 }]), "скидки нет")).toThrow("Скидка должна быть числом");
});

test("discount is negative", () => {
  expect(() => getTotal(([{ price: 10, quantity: 100 }]), -10)).toThrow("Процент скидки не может быть отрицательным");
});
});