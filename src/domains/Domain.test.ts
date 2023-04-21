import { it, expect } from "vitest";
import { filterByName } from "./domain";
import type { Domain } from "./domain";
import { AccessInterface } from "@/types";

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
