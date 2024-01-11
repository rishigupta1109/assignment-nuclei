import { SalesTaxCalculator } from "./../../utility/classes";
import { expect, test, vi } from "vitest";
import * as mymodule from "../../utility/utils";
import {
  calculateTax,
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
    ["-name -price 5 -type imported -quantity 5", false],
    ["-price 5 -name Detergent -type imported -quantity 5", false],
    ["-name Detergent -price 5 -type import -quantity 5", false],
    ["-name Detergent -price 5 -type imported -quantity 5 -name soap", false],
    [" -name Detergent -price 5 -type import -quantity 5", false],
    ["-price 5 -type imported -quantity 5", false],
    ["-type imported -quantity 5", false],
    ["-quantity 5", false],
  ];
  testCases.forEach((testCase) => {
    expect(isValidItemDetailsString(testCase[0])).toBe(testCase[1]);
  });
});

//Tests for calculate Tax function

test("Testing calculateTax", () => {
  let testCases: any = [
    [{ name: "Soap", price: 10, quantity: 10, type: "raw" }, 12.5],
    [
      { name: "Detergent", price: 5, quantity: 5, type: "manufactured" },
      3.6875,
    ],
    [{ name: "Detergent", price: 5, quantity: 5, type: "imported" }, 7.5],
  ];
  testCases.forEach((testCase) => {
    expect(calculateTax(testCase[0])).toBe(testCase[1]);
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

//Integration tests

test("Testing the application", () => {
  let testcases = [
    [
      "-name soap -price 10 -quantity 10 -type raw",
      {
        name: "soap",
        price: 10,
        quantity: 10,
        type: "raw",
        salesTaxLiabilityPerItem: 1.25,
        finalPrice: 112.5,
      },
    ],
    [
      "-name Detergent -price 5 -quantity 5 -type manufactured",
      {
        name: "Detergent",
        price: 5,
        quantity: 5,
        type: "manufactured",
        salesTaxLiabilityPerItem: 0.7375,
        finalPrice: 28.6875,
      },
    ],
    [
      "-name Detergent -price 5 -quantity 5 -type imported",
      {
        name: "Detergent",
        price: 5,
        quantity: 5,
        type: "imported",
        salesTaxLiabilityPerItem: 1.5,
        finalPrice: 32.5,
      },
    ],
  ];

  testcases.forEach((testCase: any) => {
    const mockReadALine = vi
      .spyOn(mymodule, "readALine")
      .mockReturnValueOnce(testCase[0])
      .mockReturnValueOnce("n");
    let testing = new SalesTaxCalculator();
    const mockShowOutput = vi.spyOn(testing, "showOutput");
    testing.run();

    expect(JSON.stringify(mockShowOutput.mock.results[0].value[0])).toBe(
      JSON.stringify(testCase[1])
    );
  });
});
