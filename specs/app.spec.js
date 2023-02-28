import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

const name0 = [["a","23y78",123],true];
const name1 = [1,false];
const name2 = ["p 0",false];
const name3 = ["hasd!@das.ru",true];
const string0 = ["",""];
const string1 = ["843 243875 ","843243875"];
const string2 = [" Для проверки, что jest настроен правильно. Можно удалить","Дляпроверки,чтоjestнастроенправильно.Можноудалить"];
const string3 = ["   ",""];

describe('test name', () => {
test(`isNameValid > given name: ${name0[0]} | expected result: ${name0[1]}`, () => {
    expect(nameIsValid(name0[0])).toBe(name0[1])
});
test(`isNameValid > given name: ${name1[0]} | expected result: ${name1[1]}`, () => {
    expect(nameIsValid(name1[0])).toBe(name1[1])
});
test(`isNameValid > given name: ${name2[0]} | expected result: ${name2[1]}`, () => {
    expect(nameIsValid(name2[0])).toBe(name2[1])
});
test(`isNameValid > given name: ${name3[0]} | expected result: ${name3[1]}`, () => {
    expect(nameIsValid(name3[0])).toBe(name3[1])
});
});

describe('trim spaces', () => {
test(`fullTrim > given string: ${string0[0]} | expected result: ${string0[1]}`, () => {
    expect(fullTrim(string0[0])).toBe(string0[1])
});
test(`fullTrim > given string: ${string1[0]} | expected result: ${string1[1]}`, () => {
    expect(fullTrim(string1[0])).toBe(string1[1])
});
test(`fullTrim > given string: ${string2[0]} | expected result: ${string2[1]}`, () => {
    expect(fullTrim(string2[0])).toBe(string2[1])
});
test(`fullTrim > given string: ${string3[0]} | expected result: ${string3[1]}`, () => {
    expect(fullTrim(string3[0])).toBe(string3[1])
});
});

describe.each([{x: 1, y: 1, z: 0, expected: 1, extra: 'sine'}, {x: 100, y: 100, z: 10, expected: 9000, extra: 0}, {x: 10, y: 10, z: 100, expected: 0, extra: false}])(
  'get total price',
  ({x, y, z, expected, extra}) => {
    test(`should return total price`, () => {
      expect(getTotal([{quantity: y, name: extra, price: x},{quantity: y, name: extra, price: x},{quantity: y, name: extra, price: x}],z)).toBe(expected*3);
    });
    test(`should return total price`, () => {
      expect(getTotal([{quantity: y*10, name: extra, price: x*2}],z)).toBe(expected*20);
    });
    test(`should throw error`, () => {
      expect.assertions(1);
      try {getTotal([{quantity: y, name: extra, price: x}],z-175);
      } catch (err) {
          expect(err.message).toBe("Процент скидки не может быть отрицательным");
        }
    });
    test(`should throw error`, () => {
      expect.assertions(1);
      try {getTotal([{quantity: y, name: extra, price: x}],z+"%");
      } catch (err) {
          expect(err.message).toBe("Скидка должна быть числом");
        }
    });
  },
);

