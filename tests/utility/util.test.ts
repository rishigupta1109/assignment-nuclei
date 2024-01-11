import { expect, test } from "vitest";

import { add, isValidItemDetailsString } from "../../utility/utils";

test("Test Addition of two numbers", () => {
  expect(add(1, 2)).toBe(3);
});

test("Testing isValidItemDetailsString", () => {
  expect(
    isValidItemDetailsString("-name Soap -price 10 -quantity 10 -type raw")
  ).toBe(true);
  expect(
    isValidItemDetailsString(
      "-name Soap -price 10.5 -quantity 10 -type manufactured"
    )
  ).toBe(true);
  expect(
    isValidItemDetailsString(
      "-name Soap -quantity 10 -type manufactured -price 10.5"
    )
  ).toBe(true);
  expect(
    isValidItemDetailsString("-nae Soap -price 10 -quantity 10 -type raw")
  ).toBe(false);

  expect(
    isValidItemDetailsString(
      "-name Soap -price 10 -quantity 10 -type raw -name Soap -price 10 -quantity 10 -type raw"
    )
  ).toBe(false);
  expect(
    isValidItemDetailsString("-price 10 -quantity 10 -type raw -name Soap")
  ).toBe(false);
  expect(isValidItemDetailsString("-price 10 -quantity 10 -type raw ")).toBe(
    false
  );
});
