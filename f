[33mcommit 4831bf6757d1820c041e7d7fcff2425aa77f8bac[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Yubelik <89403380+Yubelik@users.noreply.github.com>
Date:   Fri May 3 19:26:32 2024 +0300

    комит

[1mdiff --git a/specs/app.spec.js b/specs/app.spec.js[m
[1mindex b2ceec4..773325d 100644[m
[1m--- a/specs/app.spec.js[m
[1m+++ b/specs/app.spec.js[m
[36m@@ -51,13 +51,45 @@[m [mdescribe("Проверка", () => {[m
   test("Подсчёт суммы заказа два параметра массива и скидка", () => {[m
     expect(getTotal([{ price: 10, quantity: 10 }], 99)).toBe(1);[m
   });[m
[32m+[m[32m  test("Скидка должна быть числом", () => {[m
[32m+[m[32m    function checker() {[m
[32m+[m[32m      expect(getTotal([], "number"));[m
[32m+[m[32m    }[m
[32m+[m[32m    expect(checker).toThrow();[m
[32m+[m[32m  });[m
[32m+[m[32m  test("Процент скидки не может быть отрицательным", () => {[m
[32m+[m[32m    function checker() {[m
[32m+[m[32m      expect(getTotal(-1));[m
[32m+[m[32m    }[m
[32m+[m[32m    expect(checker).toThrow();[m
[32m+[m[32m  });[m
[32m+[m[32m  test("Процент скидки не может быть больше 100", () => {[m
[32m+[m[32m    function checker() {[m
[32m+[m[32m      expect(getTotal(0));[m
[32m+[m[32m    }[m
[32m+[m[32m    expect(checker).toThrow();[m
[32m+[m[32m  });[m
 });[m
 [m
 // console.log(fullTrim("test 1"));[m
 [m
[31m-// describe("Проверка строки", () => {[m
[31m-//   test("mentions grapefruit", () => {[m
[31m-//     expect(nameIsValid()).toMatch(/grapefruit/);[m
[31m-//     expect(nameIsValid()).toMatch(new RegExp("grapefruit"));[m
[32m+[m[32m// describe("Paranetric getTotal", () => {[m
[32m+[m[32m//   test.each([[m
[32m+[m[32m//     [10, 10, 100],[m
[32m+[m[32m//     [10, 1, 10],[m
[32m+[m[32m//     [{ 10, 1 }, { 10, 9 }, 100],[m
[32m+[m[32m//   ])("price: %i, quantity: %i, expected: %i", (a, b, expected) => {[m
[32m+[m[32m//     expect(getTotal([{ price: a, quantity: b }])).toBe(expected);[m
 //   });[m
 // });[m
[32m+[m
[32m+[m[32m// test("функция бросает исключение при вызове", () => {[m
[32m+[m[32m//   expect(() => {[m
[32m+[m[32m//     getTotal.discount(5.4);[m
[32m+[m[32m//   }).toThrow();[m
[32m+[m[32m// });[m
[32m+[m[32m// test("процент скидки не может быть отрицательным -5", () => {[m
[32m+[m[32m//   expect(() => {[m
[32m+[m[32m//     getTotal(-5);[m
[32m+[m[32m//   }).toThrow();[m
[32m+[m[32m// });[m
