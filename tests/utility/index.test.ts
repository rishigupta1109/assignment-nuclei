//Integration tests

import { expect, test, vi } from "vitest";
import * as mymodule from "../../utility/utils";
import { SalesTaxCalculator } from "../../utility/classes/SalesTaxCalculator";
import { main } from "../..";

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
        salesTaxLiabilityPerItem: 5.5,
        finalPrice: 52.5,
      },
    ],
    [
      "-name Detergent -price 105 -quantity 5 -type imported",
      {
        name: "Detergent",
        price: 105,
        quantity: 5,
        type: "imported",
        salesTaxLiabilityPerItem: 20.5,
        finalPrice: 627.5,
      },
    ],
    [
      "-name Detergent -price 205 -quantity 5 -type imported",
      {
        name: "Detergent",
        price: 205,
        quantity: 5,
        type: "imported",
        salesTaxLiabilityPerItem: 31.77,
        finalPrice: 1183.875,
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

test("Testing the application with multiple inputs", () => {
  const testcases = [
    [
      [
        "-name soap -price 10 -quantity 10 -type raw",
        "y",
        "-name Detergent -price 5 -quantity 5 -type manufactured",
        "n",
      ],
      [
        {
          name: "soap",
          price: 10,
          quantity: 10,
          type: "raw",
          salesTaxLiabilityPerItem: 1.25,
          finalPrice: 112.5,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "manufactured",
          salesTaxLiabilityPerItem: 0.7375,
          finalPrice: 28.6875,
        },
      ],
    ],
    [
      [
        "-name soap -price 10 -quantity 10 -type raw",
        "y",
        "-name Detergent -price 5 -quantity 5 -type manufactured",
        "y",
        "-name Detergent -price 5 -quantity 5 -type imported",
        "n",
      ],
      [
        {
          name: "soap",
          price: 10,
          quantity: 10,
          type: "raw",
          salesTaxLiabilityPerItem: 1.25,
          finalPrice: 112.5,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "manufactured",
          salesTaxLiabilityPerItem: 0.7375,
          finalPrice: 28.6875,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 5.5,
          finalPrice: 52.5,
        },
      ],
    ],
    [
      [
        "-name soap -price 10 -quantity 10 -type raw",
        "y",
        "-name Detergent -price 5 -quantity 5 -type manufactured",
        "y",
        "-name Detergent -price 5 -quantity 5 -type imported",
        "y",
        "-name Detergent -price 105 -quantity 5 -type imported",
        "n",
      ],
      [
        {
          name: "soap",
          price: 10,
          quantity: 10,
          type: "raw",
          salesTaxLiabilityPerItem: 1.25,
          finalPrice: 112.5,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "manufactured",
          salesTaxLiabilityPerItem: 0.7375,
          finalPrice: 28.6875,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 5.5,
          finalPrice: 52.5,
        },
        {
          name: "Detergent",
          price: 105,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 20.5,
          finalPrice: 627.5,
        },
      ],
    ],
    [
      [
        "-name soap -price 10 -quantity 10 -type raw",
        "y",
        "-name Detergent -price 5 -quantity 5 -type manufactured",
        "y",
        "-name Detergent -price 5 -quantity 5 -type imported",
        "y",
        "-name Detergent -price 105 -quantity 5 -type imported",
        "y",
        "-name Detergent -price 205 -quantity 5 -type imported",
        "n",
      ],
      [
        {
          name: "soap",
          price: 10,
          quantity: 10,
          type: "raw",
          salesTaxLiabilityPerItem: 1.25,
          finalPrice: 112.5,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "manufactured",
          salesTaxLiabilityPerItem: 0.7375,
          finalPrice: 28.6875,
        },
        {
          name: "Detergent",
          price: 5,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 5.5,
          finalPrice: 52.5,
        },
        {
          name: "Detergent",
          price: 105,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 20.5,
          finalPrice: 627.5,
        },
        {
          name: "Detergent",
          price: 205,
          quantity: 5,
          type: "imported",
          salesTaxLiabilityPerItem: 31.77,
          finalPrice: 1183.875,
        },
      ],
    ],
  ];
  testcases.forEach((testCase: any) => {
    const mockReadALine = vi
      .spyOn(mymodule, "readALine")
      .mockReturnValueOnce(testCase[0]?.[0])
      .mockReturnValueOnce(testCase[0]?.[1])
      .mockReturnValueOnce(testCase[0]?.[2])
      .mockReturnValueOnce(testCase[0]?.[3])
      .mockReturnValueOnce(testCase[0]?.[4])
      .mockReturnValueOnce(testCase[0]?.[5])
      .mockReturnValueOnce(testCase[0]?.[6])
      .mockReturnValueOnce(testCase[0]?.[7])
      .mockReturnValueOnce(testCase[0]?.[8])
      .mockReturnValueOnce(testCase[0]?.[9]);

    let testing = new SalesTaxCalculator();
    const mockShowOutput = vi.spyOn(testing, "showOutput");
    testing.run();

    expect(JSON.stringify(mockShowOutput.mock.results[0].value)).toBe(
      JSON.stringify(testCase[1])
    );
  });
});

test.fails("Testing the application with invalid inputs", () => {
  const testcases = [
    ["-name soap -price 10 -quantity 10 -type raw", "yo", "n"],
    ["-price 10 -quantity 10 -type raw", "yo", "n"],
  ];
  testcases.forEach((testCase: any) => {
    const mockReadALine = vi
      .spyOn(mymodule, "readALine")
      .mockReturnValueOnce(testCase[0])
      .mockReturnValueOnce(testCase[1])
      .mockReturnValueOnce(testCase[2]);
    let testing = new SalesTaxCalculator();
    const mockShowOutput = vi.spyOn(testing, "showOutput");
    testing.run();

    expect(() => mockShowOutput).toThrowError();
  });
});

test("testing main", () => {
  const mockReadALine = vi
    .spyOn(mymodule, "readALine")
    .mockReturnValueOnce("-name soap -price 10 -quantity 10 -type raw")
    .mockReturnValueOnce("n");
  expect(main()).toBe(0);
});
