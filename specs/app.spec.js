// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe('nameIsValid function', () => {
  it('import without error', () => {
    expect(nameIsValid).toBeDefined();
  });
  it('Name have three letters', () => {
    const nameLenght = nameIsValid('Kim')
    expect(nameLenght).toBeTruthy();
  });
  it('Name have three letters', () => {
    const nameLenght = nameIsValid('K')
    expect(nameLenght).toBeFalsy();
  });
  it('Name have three letters', () => {
    const nameLenght = nameIsValid('Ki')
    expect(nameLenght).toBeTruthy();
  });
});

describe('clear string', () => {
  it('import without error', () => {
    expect(fullTrim).toBeDefined();
  });
  it('Space before text', () => {
    const text = fullTrim(' name');
    expect(text).toBeTruthy();
  });
  it('Space after text', () => {
    const text = fullTrim('na me');
    expect(text).toBeTruthy();
  });
  it('Text not string', () => {
    const text = fullTrim('');
    expect(text).toBeFalsy();
  });
});

describe('Calculating order amount', () => {
  test.each([
    { items: [{ price: 10, quantity: 10 }], discount: 0, expected: 100 },
    { items: [{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], discount: 0, expected: 100 },
    { items: [{ price: 10, quantity: 10 }], discount: 10, expected: 90 }
  ])('correctСalculation', ({ items, discount, expected }) => {
    const total = getTotal(items, discount)
    expect(total).toBe(expected)
  })
})
test.each([
  { items: [{ price: 10, quantity: 10 }], discount: 'test', expected: 'Скидка должна быть числом' },
  { items: [{ price: 10, quantity: 10 }], discount: -10, expected: 'Процент скидки не может быть отрицательным' }
])('negativeCase', ({ items, discount, expected }) => {
const total = () => getTotal(items, discount)
expect(total).toThrow()
})