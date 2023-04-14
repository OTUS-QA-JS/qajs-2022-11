import {
  nameIsValid,
  fullTrim,
  getTotal
} from '../src/app.js'

describe('App-tests', () => {

  describe('nameIsValid', () => {
    it('loads without error', () => {
      expect(nameIsValid).toBeDefined();
      expect(typeof nameIsValid).toBe('function');
    });
    it('number is false', () => {
      expect(nameIsValid(23)).toBe(false);
    });
    it('length<=2 is false', () => {
      expect(nameIsValid('g')).toBe(false);
    });
    it('spaces is false', () => {
      expect(nameIsValid('gf faldmrd')).toBe(false);
    });
    it('all conditions are true', () => {
      expect(nameIsValid('Ashddkd')).toBe(true);
    });
  })

  describe('fullTrim', () => {
    it('loads without error', () => {
      expect(nameIsValid).toBeDefined();
      expect(typeof nameIsValid).toBe('function');
    });
    it('several spaces everywhere', () => {
      expect(fullTrim('  Ash ddk   d   ')).toBe('Ashddkd');
    });
    it('only spaces', () => {
      expect(fullTrim('     ')).toBe('');
    });
    it('empty', () => {
      expect(fullTrim()).toBe('');
    });
  })

  describe('getTotal', () => {
    it('loads without error', () => {
      expect(getTotal).toBeDefined();
      expect(typeof getTotal).toBe('function');
    });
    it('loads without error', () => {
      expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100);
    });
    it('loads without error', () => {
      expect(getTotal()).toBe(0);
    });
    it.each`
      N     | items                                                       | discount      | expected
      ${1}  | ${[{ price: 10, quantity: 10 }]}                            | ${10}         | ${90}
      ${3}  | ${[{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]} | ${0}          | ${100}
      ${4}  | ${[{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }]} | ${0}          | ${90}
      ${5}  | ${[{ price: 564, quantity: 10 }]}                           | ${100}        | ${0}
      ${6}  | ${[{ price: 564, quantity: 10 }]}                           | ${'+'}        | ${'error'}
      ${7}  | ${[{ price: 10, quantity: 10 }]}                            | ${-39}        | ${'error'}
    `
      ('$N .  parameterized', ({ items, discount, expected }) => {
        if (expected === 'error') {
          expect(() => getTotal(items, discount, expected)).toThrow();
        } else {
          expect(getTotal(items, discount, expected)).toBe(expected);
        }
      });
  });
})