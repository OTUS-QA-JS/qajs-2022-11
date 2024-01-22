import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Test nameIsValid function", () => {
  test("Positive", () => {
    expect(nameIsValid("Dasha")).toBe(true);
  });

  test("Negative", () => {
    expect(nameIsValid("")).toBe(false);
  });

  const testCases = [
    { name: "max", expected: true },
    { name: "  \t", expected: false },
    { name: null, expected: false },
  ];

  test.each(testCases)(
    "Params Test with name '$name'",
    ({ name, expected }) => {
      expect(nameIsValid(name)).toBe(expected);
    },
  );
});

describe("Test fullTrim function", () => {
  test("Positive", () => {
    expect(fullTrim("   Dasha    ")).toBe("Dasha");
  });

  test("Negative", () => {
    expect(fullTrim("")).toBe("");
  });

  const testCases = [
    { str: "m  a   x", expected: "max" },
    { str: "  \t", expected: "" },
    { str: null, expected: "" },
  ];

  test.each(testCases)("Params Test with string 'str'", ({ str, expected }) => {
    expect(fullTrim(str)).toBe(expected);
  });
});

describe("Test getTotal function", () => {
  test("Positive", () => {
    expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100);
  });

  test("Negative", () => {
    expect(getTotal([])).toBe(0);
  });

  const posTestCases = [
    {
      num: 1,
      items: [{ price: 10, quantity: 10 }],
      discount: 0,
      expected: 100,
    },
    {
      num: 2,
      items: [{ price: 10, quantity: 10 }],
      discount: 300,
      expected: -200,
    },
    {
      num: 1,
      items: [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ],
      discount: 10,
      expected: 90,
    },
  ];

  test.each(posTestCases)(
    "Positive Params Test $num",
    ({ items, discount, expected }) => {
      expect(getTotal(items, discount)).toBe(expected);
    },
  );

  const negTestCases = [
    {
      num: 1,
      items: [{ price: 10, quantity: 10 }],
      discount: null,
      expected: "Скидка должна быть числом",
    },
    {
      num: 2,
      items: [{ price: 10, quantity: 10 }],
      discount: -100,
      expected: "Процент скидки не может быть отрицательным",
    },
  ];

  test.each(negTestCases)(
    "Negative Params Test $num",
    ({ items, discount, expected }) => {
      expect(() => {
        getTotal(items, discount);
      }).toThrow(expected);
    },
  );
});
