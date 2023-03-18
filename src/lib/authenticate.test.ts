import { it, expect } from "vitest";
import { generateAuthentication } from "./authenticate";

it("should have string type", () => {
  expect(typeof generateAuthentication()).toBe("string");
});

it("should generate 8 character long string", () => {
  expect(generateAuthentication()).toHaveLength(8);
});
