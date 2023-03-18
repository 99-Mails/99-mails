// import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { 
  afterAll, 
  afterEach, 
  beforeAll, 
  expect 
} from "vitest";
import { server } from "../mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// afterEach(() => cleanup())
