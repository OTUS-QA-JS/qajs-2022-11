// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

//nameIsValid 
describe('nameIsValid', () => {
	it('должна возвращать true для допустимого имени', () => {
		expect(nameIsValid('John')).toBe(true);
	});

	it('должна возвращать false для недопустимого имени', () => {
		expect(nameIsValid('')).toBe(false);
		expect(nameIsValid('J')).toBe(false);
		expect(nameIsValid('J ')).toBe(false);
		expect(nameIsValid(' K')).toBe(false);
		expect(nameIsValid('J ')).toBe(false);
		expect(nameIsValid(NaN)).toBe(false);
		expect(nameIsValid('John Doe')).toBe(false);
	});
});

describe("nameIsValid function tests", () => {
	test.each`
    name             | expected
    ${"John"}        | ${true}
		${""}            | ${false}
    ${"J"}  				 | ${false}
    ${"J "}          | ${false}
		${" J"}          | ${false}
    ${NaN}           | ${false}
		${'John Doe'}    | ${false}
  `("nameIsValid($name) = $expected", ({ name, expected }) => {
		expect(nameIsValid(name)).toBe(expected);
	});
});

//fullTrim
describe('fullTrim', () => {
  it('должна удалять все пробелы из строки', () => {
    expect(fullTrim('  ДваПробелаОдинПробел ')).toBe('ДваПробелаОдинПробел');
    expect(fullTrim('Два  Пробела Один Пробел')).toBe('ДваПробелаОдинПробел');
  });

  it('должна обрабатывать пустую строку', () => {
    expect(fullTrim('')).toBe('');
  });

  it('должна обрабатывать строку без пробелов', () => {
    expect(fullTrim('БезПробелов')).toBe('БезПробелов');
  });
});

describe("fullTrim function tests", () => {
	test.each`
    string            											 | expected
    ${"  ДваПробелаОдинПробел "}             | ${'ДваПробелаОдинПробел'}
		${'Два  Пробела Один Пробел'}            | ${'ДваПробелаОдинПробел'}
    ${""}  				 													 | ${''}
    ${'БезПробелов'}                         | ${'БезПробелов'}
  `("fullTrim($string) = $expected", ({ string, expected }) => {
		expect(fullTrim(string)).toBe(expected);
	});
});


//Подсчёт суммы заказа
describe("getTotal function tests", () => {
  test("fgetTotal with negative discount number is throw", () => {
    const items = [{ price: 10, quantity: 10 }];
    const discount = -20;
    expect(() => getTotal(items, discount)).toThrow();
  });
  test("fgetTotal with string type of discount is throw", () => {
    const items = [{ price: 10, quantity: 10 }];
    const discount = "строка";
    expect(() => getTotal(items, discount)).toThrow();
  });
  test("fgetTotal with valid items and discount is correct", () => {
    const items = [{ price: 20, quantity: 4 }];
    const discount = 10;
    expect(getTotal(items, discount)).toBe(72);
  });
  test("fgetTotal with two objects in items is correct", () => {
    const items = [
      { price: 15, quantity: 8 },
      { price: 8, quantity: 1 },
    ];
    const discount = 20;
    expect(getTotal(items, discount)).toBe(102.4);
  });
});