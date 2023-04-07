import { setupWorker } from "msw";
import { default as handlers } from "./handlers";

export const workderHandler = setupWorker(...handlers);
