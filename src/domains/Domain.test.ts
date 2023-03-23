import { Domain } from "./Domain";
import { it, expect } from "vitest";
import { filterByName } from "./Domain";
import { AccessInterface } from "./Shared";

it("should filter Domain list by name", () => {
  const domains: Domain[] = [
    {
      id: "first_row_id",
      name: "google.com",
      introducedAt: "today",
      availableVia: AccessInterface.API,
    },
    {
      id: "second_row_id",
      name: "apple.com",
      introducedAt: "today",
      availableVia: AccessInterface.WEB,
    },
  ];

  const result = filterByName(domains, "apple.com");
  expect(result.id).toBe("second_row_id");
});
