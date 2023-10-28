// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

/**
 * Проверка имени пользователя
 */
describe("Проверка условий функции 'Проверка имени пользователя'", () => {
  test("Позитивная проверка значения имени", () => {
    expect(nameIsValid("Ия")).toBe(true);
  });
  test("В имени не строка = false", () => {
    expect(nameIsValid(3)).not.toBe(true);
  });
  test("Меньше 2х символов = false", () => {
    expect(nameIsValid("N")).not.toBe(true);
  });
  test("Текст с пробелом = false", () => {
    expect(nameIsValid("Name Tom")).not.toBe(true);
  });
});

/**
 * Удаление пробелов из строки
 */

describe("Проверка условий функции 'Удаление пробелов из строки'", () => {
  test("Функция возвращает значение", () => {
    expect(fullTrim("test")).toBeDefined(); // лишний кейс, но хотелось попробовать разные типы проверок
  });
  test("Позитивная проверка удаления пробелов в середине", () => {
    expect(fullTrim(" first / second /third")).toMatch("first/second/third");
  });
  test("Проверка передачи пустой строки", () => {
    expect(fullTrim("")).toMatch("");
  });
  test("Проверка передачи двух пробелов", () => {
    expect(fullTrim("  ")).toMatch("");
  });
  test("Ошибка, если передавть не строку", () => {
    expect(() => fullTrim(34534)).toThrow();
  });
});

/**
 * Подсчёт суммы заказа
 */

describe("Проверка условий функции 'Подсчёт суммы заказа'_3", () => {
  test.each([
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 1 }], 10, 9],
    [
      [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ],
      10,
      90,
    ],
    [
      [
        { price: 10, quantity: 0 },
        { price: 10, quantity: 9 },
      ],
      0,
      0,
    ],
  ])(
    "Проверки функции getTotal",
    ([{ price, quantity }], discount, expected) => {
      expect(getTotal([{ price, quantity }], discount)).toBe(expected);
    },
  );
  test.each([
    [[{ price: 10, quantity: 10 }], true],
    [[{ price: 10, quantity: 10 }], -5],
  ])(`Проверки ошибок ${Error})`, ([{ price, quantity }], discount) => {
    expect(() => getTotal([{ price, quantity }], discount)).toThrow();
  });
});

// describe("Проверка условий функции 'Подсчёт суммы заказа'", () => {
//  test.each`
//    name                | price       | quantity  | discount | total
//    ${"name"}           | ${10}       | ${10}     | ${10}    | ${90}
//    ${""}               | ${10}       | ${1}      | ${10}    | ${9}
//    ${["name", "name"]} | ${[10, 10]} | ${[1, 9]} | ${0}     | ${90}
//  `(
//    "Сумма всех {$price * $quantity} - (Сумма всех {$price * $quantity} * на $discount) = $total",
//    ({ name, price, quantity, discount, total }) => {
//      expect(getTotal([{ name, price, quantity }], discount)).toBe(total);
//    },
//  );
//});
//

// describe("Проверка условий функции 'Подсчёт суммы заказа'", () => {
//   test.each([
//     {
//       items: [{ price: 10, quantity: 10 }],
//       discount: 10,
//       total: 90,
//     },
//     { items: [{ price: 10, quantity: 1 }], discount: 10, total: 9 },
//     {
//       items: [
//         { price: 10, quantity: 1 },
//         { price: 10, quantity: 1 },
//       ],
//       discount: 10,
//       total: 9,
//     },
//   ])(
//     "Сумма всех {$price * $quantity} - (Сумма всех {$price * $quantity} * на $discount) = $total)",
//     ({ price, quantity, discount, total }) => {
//       expect(getTotal(price, quantity, discount)).toBe(total);
//     },
//   );
// });

// describe("Проверка условий функции 'Подсчёт суммы заказа'_1", () => {
//   test.each([
//     { price: 10, quantity: 10, discount: 10, total: 90 },
//     { price: [10, 10], quantity: [1, 9], discount: 10, total: 90 },
//   ])(
//     "Сумма всех {$price * $quantity} - (Сумма всех {$price * $quantity} * на $discount) = $total)",
//     ({ items: [price, quantity], discount, total }) => {
//       expect(getTotal(price, quantity, discount)).toBe(total);
//     },
//   );
// });
