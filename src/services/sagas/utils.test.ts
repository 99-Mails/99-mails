import { it, expect } from "vitest";
import { ONE_SECOND, wait } from "./utils";

it("should equal 1000", () => {
  expect(ONE_SECOND).toEqual(1000);
});

it("should wait correctly", () => {
  expect(wait(1)).resolves.toBeUndefined()
})
