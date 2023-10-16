// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Проверка покрытия nameIsValid", () => {
  test("Валидное имя", () => {
    const name = "Иван";
    const isValid = nameIsValid(name);
    expect(isValid).toBe(true);
  });
  test("Двойное валидное имя", () => {
    const name = "Анна-Мария";
    const isValid = nameIsValid(name);
    expect(isValid).toBe(true);
  });
  test("Слишком короткое имя", () => {
    const name = "И";
    const isValid = nameIsValid(name);
    expect(isValid).toBe(false);
  });
  test("Имя not a number", () => {
    const name = NaN;
    const isValid = nameIsValid(name);
    expect(isValid).toBe(false);
  });
  test("Имя с пробелом", () => {
    const name = "Иван Алексеев";
    const isValid = nameIsValid(name);
    expect(isValid).toBe(false);
  });
  test("Пустой объект", () => {
    const name = {};
    const isValid = nameIsValid(name);
    expect(isValid).toBe(false);
  });
});

describe("Проверка покрытия fullTrim - удаление пробелов из строки", () => {
  test("Удаление пробелов", () => {
    const text = "   https:// otus.  ru/ learning  ";
    const trimmedText = fullTrim(text);
    expect(trimmedText).toBe("https://otus.ru/learning");
  });
  test("Пустая строка", () => {
    const text = "";
    const trimmedText = fullTrim(text);
    expect(trimmedText).toBe("");
  });
  test("Строка без пробелов", () => {
    const text = "HelloWorld ";
    const trimmedText = fullTrim(text);
    expect(trimmedText).toBe("HelloWorld");
  });
});

describe("Проверка покрытия getTotal-подсчет суммы заказа", () => {
  test.each([
    [[{ price: 10, quantity: 10 }], 0, 100],
    [[{ price: 10, quantity: 1 }], 0, 10],
    [
      [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ],
      0,
      100,
    ],
    [[{ price: 10, quantity: 0 }], 10, 0],
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 10 }], 100, 0],
    [[{ price: 10, quantity: 10 }], "4", "error"],
    [[{ price: 10, quantity: 10 }], -1, "error"],
  ])("Подсчет суммы заказа", (items, discount, expected) => {
    if (expected === "error") {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => getTotal(items, discount)).toThrow();
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getTotal(items, discount)).toBe(expected);
    }
  });
});
