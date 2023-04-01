import { it, expect } from "vitest";
import { ONE_SECOND } from "./utils";

it.skip("should always fail", () => {
  expect(true).toBe(false);
});

it("should equal 1000", () => {
  expect(ONE_SECOND).toEqual(1000);
});
