import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { serverHandler } from "../mocks";

beforeAll(() => serverHandler.listen({ onUnhandledRequest: "error" }));
afterAll(() => serverHandler.close());
afterEach(() => serverHandler.resetHandlers());

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
