import { expect, test } from "vitest";

import { add } from "../../utility/utils";

test("Test Addition of two numbers", () => {
  expect(add(1, 2)).toBe(3);
});
