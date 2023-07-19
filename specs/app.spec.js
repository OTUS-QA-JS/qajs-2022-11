import { expect, it } from "@jest/globals";
import fetch from "node-fetch";
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("Test Example", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});

describe("dummyjson API Testing", () => {
  it("Sample Text", async () => {
    const URI = "https://dummyjson.com/products";
    const response = await fetch(URI);
    const data = await response.json();
    console.log(data);
    expect(response.status).toBe(200);
  });
});