// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Проверка", () => {
  test("Существует ли nameIsValid()", () => {
    expect(nameIsValid).toBeDefined();
    expect(typeof nameIsValid).toBe("function");
  });

  test("Проверка имени пользователя", () => {
    expect(nameIsValid("vasa")).toBe(true);
  });

  test("Существует ли fullTrim()", () => {
    expect(fullTrim).toBeDefined();
    expect(typeof fullTrim).toBe("function");
  });
  test("Удаление пробелов из строки", () => {
    expect(fullTrim("vasa пробел")).toBe("vasaпробел");
  });

  test("Существует ли getTotal()", () => {
    expect(getTotal).toBeDefined();
    expect(typeof getTotal).toBe("function");
  });
  test("Подсчёт суммы заказа price: 10, quantity: 10", () => {
    expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100);
  });
  test("Подсчёт суммы заказа price: 10, quantity: 1", () => {
    expect(getTotal([{ price: 10, quantity: 1 }])).toBe(10);
  });
  test("Подсчёт суммы заказа два параметра массива", () => {
    expect(
      getTotal([
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ]),
    ).toBe(100);
  });
  test("Подсчёт суммы заказа два параметра массива и скидка", () => {
    expect(
      getTotal([
        { price: 10, quantity: 0 },
        { price: 10, quantity: 9 },
      ]),
    ).toBe(90);
  });
  test("Подсчёт суммы заказа price: 10, quantity: 10", () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
  });
  test("Подсчёт суммы заказа два параметра массива и скидка", () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 99)).toBe(1);
  });
  test("Скидка должна быть числом", () => {
    expect(() => {
      getTotal.discount(Number);
    }).toThrow();
  });
  test("Процент скидки не может быть отрицательным", () => {
    expect(() => {
      getTotal.discount(-5);
    }).toThrow();
  });
  test("Процент скидки не может быть больше 100", () => {
    expect(() => {
      getTotal.discount(1000);
    }).toThrow();
  });
});

// console.log(fullTrim("test 1"));

describe("Paranetric getTotal", () => {
  test.each([
    [10, 10, , 100],
    [10, 1, , 10],
    [[10, 1], [10, 9], , 100],
    [[10, 0], [10, 9], , 90],
    [10, 10, 90, 10],
    [10, 10, 0, 100],
  ])(
    "price: %i, quantity: %i, expected: %i, discount: %i",
    (a, b, c, expected) => {
      expect(getTotal([{ price: a, quantity: b }], c)).toBe(expected);
    },
  );
});

// console.log(fullTrim("test 1"));

// describe("Paranetric getTotal", () => {
//   test.each([
//     [10, 10, 100],
//     [10, 1, 10],
//     [{ 10, 1 }, { 10, 9 }, 100],
//   ])("price: %i, quantity: %i, expected: %i", (a, b, expected) => {
//     expect(getTotal([{ price: a, quantity: b }])).toBe(expected);
//   });
// });
