// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("nameIsValid space is not allowed", () => {
  expect(nameIsValid("Sveta Serebrennikova")).toBe(false);
});

test("nameIsValid length >= 2", () => {
  expect(nameIsValid("s")).toBe(false);
  expect(nameIsValid("ss")).toBe(true);
});

test("nameIsValid not empty", () => {
  expect(nameIsValid("")).toBe(false);
});

test("fullTrim returns string", () => {
  expect.stringContaining(fullTrim("Sveta"));
});

test("trim spaces", () =>{
  expect(fullTrim("qwerty  12345 ")).toBe("qwerty12345");
});

test("returned string not contain spaces",() =>{
  expect(fullTrim("Svetlana Serebrennikova")).toEqual(expect.not.stringMatching(/\s/g));
});

test.each(
  ["good morning", "goodevening", "good night  ", "good 23456ight", "" ]
)("parametrized test", (a) => {
  expect(fullTrim(a)).toEqual(expect.not.stringMatching(/\s/g));
});

test("Скидка должна быть числом", () =>{
  expect(() =>{
    getTotal([], "dfgh");
  }).toThrow("Скидка должна быть числом");
});

test("Скидка должна быть >=0", () =>{
  expect(()=>{
    getTotal([], -1);
  }).toThrow("Процент скидки не может быть отрицательным");
});

test("", ()=>{
  expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
});

test.each([
  [[{ price: 10, quantity: 10 }], 10, 90],
  [[{ price: 10, quantity: 10 }], 0, 100],
  [[{ price: 10, quantity: 1 }], 0, 10],
  //[[{ price: 10, quantity: 0 }], [{ price: 10, quantity: 9 }], 90],
  //[[{ price: 10, quantity: 1 }], [{ price: 10, quantity: 9 }], 100],
])("count price with discount", (a,b,c) => {
  expect(getTotal( a,b )).toBe((c));
});
