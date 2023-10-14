// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

test.each([
  ["John", true], // valid name
  ["John Smith", false], // non-valid name with whitespace
  ["J", false], // non-valid name containing <2 characters
  ["", false], // non-valid name empty string
])('Name validation "%s"', (name, expected) => {
  const isValid = nameIsValid(name);
  expect(isValid).toBe(expected);
});

describe("fullTrim", () => {
  test("should trim whitespace", () => {
    const testCases = [
      { input: "Hello World", expected: "HelloWorld" },
      { input: "   Trim  Me  ", expected: "TrimMe" },
      { input: "NoWhitespacesHere", expected: "NoWhitespacesHere" },
      { input: "", expected: "" },
    ];

    for (const testCase of testCases) {
      const result = fullTrim(testCase.input);
      expect(result).toBe(testCase.expected);
    }
  });
});

describe("getTotal", () => {
  test.each([
    { items: [{ price: 10, quantity: 10 }], discount: 0, expected: 100 },
    {
      items: [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ],
      discount: 0,
      expected: 100,
    },
    { items: [{ price: 10, quantity: 10 }], discount: 10, expected: 90 },
  ])("%o", ({ items, discount, expected }) => {
    const total = getTotal(items, discount);
    expect(total).toBe(expected);
  });
});
test.each([
  {
    items: [{ price: 10, quantity: 10 }],
    discount: "not-a-number",
    expected: "Скидка должна быть числом",
  },
  {
    items: [{ price: 10, quantity: 10 }],
    discount: -10,
    expected: "Процент скидки не может быть отрицательным",
  },
])("%o", ({ items, discount, expected }) => {
  const action = () => getTotal(items, discount);
  expect(action).toThrow(expected);
});
