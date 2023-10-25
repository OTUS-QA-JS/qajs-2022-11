// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

// /**
//  * Для проверки, что jest настроен правильно. Можно удалить
//  */
// test("adds 1 + 2 to equal 3", () => {
//   expect(1 + 2).toBe(3);
// });

// describe('nameIsValid Function Tests', () => {
//   it('Should return true for a valid name', () => {
//     expect(nameIsValid('Motya')).toBe(true);
//   });
//   it('Should return false for an empty name', () => {
//     expect(nameIsValid('')).toBe(false);
//   });
//   it('Should return false for a non-string input', () => {
//     expect(nameIsValid(123)).toBe(false);
//   })
// });

// describe('fullTrim Function Tests', () => {
//   it('Should remove spaces from the beginning of a string', () => {
//     expect(fullTrim('   Hello World')).toBe('HelloWorld');
//   });
//   it('Should remove spaces from the beginning and end of a string', () => {
//     expect(fullTrim('  Hello, World!  ')).toBe('Hello,World!');
//   });
//   it('Should remove all spaces from a string with spaces in the middle', () => {
//     expect(fullTrim('  Hello  ,   World!    ')).toBe('Hello,World!');
//   });
// });

// describe.each`
//   a        | b           | expected
//   ${1}     | ${1}        | ${2}
//   ${1}     | ${2}        | ${3}
//   ${2}     | ${1}        | ${3}
// `('returns $expected when $a is added to $b', ({ a, b, expected }) => {
//   test(`a=${a}, b=${b} -> expected=${expected}`, () => {
//     expect(a + b).toBe(expected);
//   });
// });

// describe.each`
//   a        | b           | expected
//   ${10}     | ${10}        | ${100}
//   ${10}     | ${1}        | ${10}
//   ${2}     | ${1}        | ${3}
// `('returns $expected when $a is added to $b', ({ a, b, expected }) => {
//   test(`a=${a}, b=${b} -> expected=${expected}`, () => {
//     expect(a * b).toBe(expected);
//   });
// });