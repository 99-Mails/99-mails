export const ONE_SECOND = 1000;

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
