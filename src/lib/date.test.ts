import { vi, it, expect } from "vitest";
import { FancyDate } from "./date";

it("should get the client timezone as a string", () => {
  const DateTimeFormat = Intl.DateTimeFormat;
  vi.spyOn(global.Intl, "DateTimeFormat").mockImplementation(
    (locale, options) =>
      new DateTimeFormat(locale, { ...options, timeZone: "Asia/Tehran" })
  );

  const date: FancyDate = new FancyDate("2023-03-28T11:06:48+00:00");

  expect(date.getClientTZ()).toEqual("Asia/Tehran");
});

it("should get timestamp of the expiration time", () => {
  const date: FancyDate = new FancyDate("2023-03-28T11:06:48+00:00");

  expect(date.getExpiresAtAsTimeStamp()).toEqual(1680001608000);
});

it("should return the remainded minutes", () => {
  Date.now = vi.fn(() => 1680004532101);

  const date: FancyDate = new FancyDate("2023-03-28T11:58:33+00:00");

  expect(date.getRemaindedMinutes()).toEqual(3);
});

it("should return the remainded seconds", () => {
  Date.now = vi.fn(() => 1680004532101);

  const date: FancyDate = new FancyDate("2023-03-28T11:58:33+00:00");

  expect(date.getRemindedSeconds()).toEqual(180);
});

it("should return the remainded time in MM:SS format", () => {
  Date.now = vi.fn(() => 1680004532101);

  const date: FancyDate = new FancyDate("2023-03-28T11:58:30+00:00");

  expect(date.getRemaindedMMSS()).toEqual("02:57");
});

it("should return the reminded time in MM:SS format from seconds", () => {
  const date: FancyDate = new FancyDate("2023-03-28T11:58:30+00:00");

  expect(date.getRemaindedMMSSFromSeconds(121)).toEqual("02:01");
});

it.skip("should geneare a date with x minutes offset from now", () => {
  const date: FancyDate = new FancyDate();

  expect(date.getDateWithMinutesFromNow(10)).toEqual(
    "2023-03-28T20:48:39.230Z"
  );
});
