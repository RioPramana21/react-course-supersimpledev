/**
 * To use automated tests, we can use either Jest or Vitest
 * Vitest is a newer testing framework that is built on top of Vite
 * It has a similar API to Jest, so it's easy to switch between the two
 *
 * Here, we'll use Vitest for our tests
 * A unit test is a piece of code that tests a small unit of functionality in isolation
 * 1 unit is usually a single function, so if we are testing the formatMoney function,
 * that will be called a unit test
 * If we want to test a whole component, that will be called an integration test
 * because it tests how multiple units (e.g. functions, components) work together
 *
 * The convention of making a unit test is to create a file with the same name as the file being tested
 * but with a .test.js or .test.jsx extension, located beside the original file
 * e.g. money.js -> money.test.js, Product.jsx -> Product.test.jsx
 *
 * In the test file, we can import the function to be tested and write test cases using `it` or `test` functions
 * Each test case should have a description and an assertion to check if the function behaves as expected
 */

import { it, expect, describe } from "vitest";
import { formatMoney } from "./money.js";

/**
 * The best practice is to group related test cases using `describe` blocks
 * This helps organize the tests and makes it easier to read the test output
 * when running the tests
 * A group is called a "suite" in testing terminology
 *
 * Here, we are grouping all tests related to formatMoney function
 * into a single suite called 'formatMoney'
 */
describe("formatMoney", () => {
  /**
   * Here, we are using the `it` function to define a test case
   * The first argument is a string description of the test case,
   * The convention is to write it like English sentences that describe what the function should do
   * The second argument is a callback function that contains the test logic
   */
  it("formats 1999 cents as $19.99", () => {
    /**
     * We are also using expect function to create assertions
     * An assertion is a statement that checks if a value is as expected
     * Here, we expect formatMoney(1999) to be '$19.99'
     * If the value is not as expected, the test will fail
     *
     * expect() will send the test to Vitest which will run the test and report the result
     * of what tests passed and what tests failed
     */
    expect(formatMoney(1999)).toBe("$19.99");
  });

  /**
   * To run the tests, we can use the command `npx vitest` in the terminal
   * This will run all the test files in the project and report the results
   * We can also run a specific test file by providing the file path
   * e.g. `npx vitest e-commerce-project/src/utils/money.test.js`
   *
   * After running the tests, we should see the results in the terminal
   * If all tests pass, we will see a green checkmark
   * If any test fails, we will see a red cross and the details of the failure
   */

  /**
   * We can also write multiple checks in a single test case
   * In order for the test case to pass, all assertions must pass
   */
  it("displays 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
    expect(formatMoney(0)).toBe("$0.00");
  });

  it("displays negative numbers correctly", () => {
    expect(formatMoney(-999)).toBe("-$9.99")
    expect(formatMoney(-100)).toBe("-$1.00")
  })
});
