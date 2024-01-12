import { SalesTaxCalculator } from "./../../utility/classes/SalesTaxCalculator";
import { expect, test, vi } from "vitest";
import * as mymodule from "../../utility/utils";
import {
  getItemFromString,
  isValidItemDetailsString,
  readALine,
} from "../../utility/utils";

//Tests for readALine function

test("Testing readALine", () => {
  let testCases: any = [
    "-name Soap -price 10 -quantity 10 -type raw",
    "-name Detergent -price 5 -quantity 5 -type manufactured",
    "-name Detergent -price 5 -quantity 5 -type imported",
    "-name Detergent -quantity 5 -price 5 -type imported",
    "-name Detergent -price 5 -type imported -quantity 5",
    "-name Detergent -price 5 -type imported -quantity 5",
  ];
  testCases.forEach((testCase) => {
    const mockReadALine = vi
      .spyOn(mymodule, "readALine")
      .mockReturnValueOnce(testCase);
    expect(readALine()).toBe(testCase);
  });
});

//Tests for is valid item details string functions

test("Testing isValidItemDetailsString", () => {
  let testCases: any = [
    ["-name Soap -price 10 -quantity 10 -type raw", true],
    ["-name Detergent -price 5 -quantity 5 -type manufactured", true],
    ["-name Detergent -price 5 -quantity 5 -type imported", true],
    ["-name Detergent -quantity 5 -price 5 -type imported", true],
    ["-name Detergent -price 5 -type imported -quantity 5", true],
    //false cases
    [" -name Detergent -price 5 -type imported -quantity 5", false],
    ["-name -price 5 -type imported -quantity 5", false],
    ["-name soap -price 5 -type imported -quantity asd", false],
    ["-price 5 -name Detergent -type imported -quantity 5", false],
    ["-name Detergent -price 5 -type import -quantity 5", false],
    ["-name Detergent -price 5 -type imported -quantity 5 -name soap", false],
    ["-name Detergent -price 5 -type imported -quantity 5 -type raw", false],
    ["-name Detergent -price 5 -type imported -quantity 5 -quantity 10", false],
    ["-name Detergent -price 5 -type imported -quantity 5 -price 10", false],
    [" -name Detergent -price 5 -type import -quantity 5", false],
    ["-price 5 -type imported -quantity 5", false],
    ["-name Detergent -type imported -quantity 5", false],
    ["-name Detergent -type imported -price 5", false],
    ["-name Detergent -price 5 -quantity 5", false],
    ["-type imported -quantity 5", false],
    ["-quantity 5", false],
  ];
  testCases.forEach((testCase) => {
    expect(isValidItemDetailsString(testCase[0])).toBe(testCase[1]);
  });
});

//Tests for getItemFromString function

test("Testing getItemFromString", () => {
  let testCases: any = [
    [
      "-name Soap -price 10 -quantity 10 -type raw",
      { name: "Soap", price: 10, quantity: 10, type: "raw" },
    ],
    [
      "-name Detergent -price 5 -quantity 5 -type manufactured",
      { name: "Detergent", price: 5, quantity: 5, type: "manufactured" },
    ],
    [
      "-name Detergent -price 5 -quantity 5 -type imported",
      { name: "Detergent", price: 5, quantity: 5, type: "imported" },
    ],
  ];
  testCases.forEach((testCase) => {
    expect(JSON.stringify(getItemFromString(testCase[0]))).toBe(
      JSON.stringify(testCase[1])
    );
  });
});

test("Testing error getItemFromString", () => {
  let testCases: any = [
    "-nam Soap -price 10 -quantity 10 -type raw",
    "-name Detergent -price 5 -quantity 5 -type manuftured",
    "-name Detergent -price as -quantity 5 -type imported",
    "-name Detergent -quantity 5 -price asd -type imported",
    "-name  -price 5 -type imported -quantity 5",
    "-price 5 -type imported -quantity 5",
    "-name soap -price 5 -type imported",
    "-name soap -price 5 -quantity 5",
    "-name soap -type imported -quantity 5",
  ];
  testCases.forEach((testCase) => {
    expect(() => getItemFromString(testCase)).toThrowError();
  });
});
