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
});

// console.log(fullTrim("test 1"));

// describe("Проверка строки", () => {
//   test("mentions grapefruit", () => {
//     expect(nameIsValid()).toMatch(/grapefruit/);
//     expect(nameIsValid()).toMatch(new RegExp("grapefruit"));
//   });
// });
