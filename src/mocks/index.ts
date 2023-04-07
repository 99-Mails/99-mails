import { setupServer } from "msw/node";
import { default as handlers } from "./handlers";

export const serverHandler = setupServer(...handlers);
