// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

//nameIsValid
describe("nameIsValid function", () => {
  //позитивные кейсы

  it("should return true with name lenght > 2", () => {
    const result = nameIsValid("Olga");
    expect(result).toBeTruthy();
  });

  it("should return true with name lenght = 2", () => {
    const result = nameIsValid("Jo");
    expect(result).toBeTruthy();
  });

  //негативные кейсы

  it("should return false with name undefined", () => {
    const result = nameIsValid(undefined);
    expect(result).toBe(false);
  });

  it("should return false with name null", () => {
    const result = nameIsValid(null);
    expect(result).toBe(false);
  });

  it("should return false with empty name", () => {
    const result = nameIsValid("");
    expect(result).toBe(false);
  });

  it("should return false with name lenght < 2", () => {
    const result = nameIsValid("O");
    expect(result).toBe(false);
  });

  it('should return false with name with " "', () => {
    const result = nameIsValid("Olga Mihaleva");
    expect(result).toBeFalsy();
  });

  it("should return false with number name", () => {
    const result = nameIsValid(123);
    expect(result).toBeFalsy();
  });
});

//fullTrim

describe("fullTrim function", () => {
  //позитивные тесты

  it("should return string with no space", () => {
    const result = fullTrim("O l g a  ");
    expect(result).toBe("Olga");
  });

  //негативные тесты

  it("should return empty string if text undefined", () => {
    const result = fullTrim(undefined);
    expect(result).toBe("");
  });

  it("should return empty string if text null", () => {
    const result = fullTrim(null);
    expect(result).toBe("");
  });

  it("should return empty string if text empty", () => {
    const result = fullTrim("");
    expect(result).toBe("");
  });
});

//getTotal

describe("getTotal function", () => {
  const positiveCaseData = [
    {
      name: "case 1: valid discount",
      products: [
        { name: "Товар1", quantity: 3, price: 100 },
        { name: "Товар2", quantity: 5, price: 25 },
      ],
      discount: 10,
      expected: {
        totalWithoutDiscount: 425,
        totalWithDiscount: 382.5,
      },
    },
    {
      name: "case 2: discount is 0",
      products: [
        { name: "Товар1", quantity: 3, price: 100 },
        { name: "Товар2", quantity: 5, price: 25 },
      ],
      discount: 0,
      expected: {
        totalWithoutDiscount: 425,
        totalWithDiscount: 425,
      },
    },
  ];

  test.each(positiveCaseData)(
    "Positive tests with valid discount",
    ({ products, discount, expected }) => {
      const result = getTotal(products, discount);
      console.log(`Expected: ${expected.totalWithDiscount}, Actual: ${result}`);
      expect(result).toBeCloseTo(expected.totalWithDiscount, 2);
    },
  );

  const negativeCaseData = [
    {
      name: "case 1: invalid discount (not a number)",
      products: [
        { name: "Товар1", quantity: 3, price: 100 },
        { name: "Товар2", quantity: 5, price: 25 },
      ],
      discount: "twenty",
      expectedError: "Скидка должна быть числом",
    },
    {
      name: "case 2: discount is 0",
      products: [
        { name: "Товар1", quantity: 3, price: 100 },
        { name: "Товар2", quantity: 5, price: 25 },
      ],
      discount: -10,
      expectedError: "Процент скидки не может быть отрицательным",
    },
  ];

  test.each(negativeCaseData)(
    "Negative tests with invalid discount data",
    ({ products, discount, expectedError }) => {
      expect(() => getTotal(products, discount)).toThrow(expectedError);
    },
  );
});
