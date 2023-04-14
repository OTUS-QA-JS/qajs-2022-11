import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('nameIsValid', () => {
    test('it loads without error', () => {
        expect(nameIsValid).toBeDefined();
        expect(typeof nameIsValid).toBe('function');
    });
    test('imports without error', () => {
        expect(nameIsValid).toBeTruthy()
    });
    test("name is valid", () => {
        expect(nameIsValid('maksim')).toBe(true);
    });


});
describe('fullTrim', () => {
    test('it loads without error', () => {
        expect(fullTrim).toBeDefined();
        expect(typeof fullTrim).toBe('function');
    });
    test('imports without error', () => {
        expect(fullTrim).toBeTruthy()
    });
    test('removing spaces', () => {
        expect(fullTrim('fff ttt')).toBe('fffttt')
    });

});
describe('getTotal', () => {
    test('it loads without error', () => {
        expect(getTotal).toBeDefined();
        expect(typeof getTotal).toBe('function');
    });
    test('imports without error', () => {
        expect(getTotal).toBeTruthy()
    });
    test('discount', () => {
        expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90)
    });
    test('no discount', () => {
        expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100)
    });

});

describe('getTotal with parametric tests', () => {
    test.each`
      a      | b    | expected
      ${[{ price: 10, quantity: 10 }]}  | ${10}| ${90}
      ${[{ price: 10, quantity: 10 }]}  | ${0} | ${100}
    `('$a  $b = $expected', ({ a,  b, expected }) => {
      if (expected == 'error') {
        expect(() => getTotal(a, b)).toThrow();
      } else {
        expect(getTotal(a, b)).toBe(expected);
      }
  
    });
  });