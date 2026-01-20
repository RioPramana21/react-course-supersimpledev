import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// render will renders a component in a fake web page (DOM) for testing purposes
// screen lets us check what is rendered on the fake web page
import userEvent from "@testing-library/user-event";
// lets us simulates user events e.g. click a button
import axios from "axios"; // This is the fake axios due to the mocking below
import { Product } from "./Product";

vi.mock("axios"); // Mock the axios module to prevent real API calls

describe("Product component", () => {
  /**
   * To test a function, we can just call the function and write the expected output
   * However, to test a React component, we need to render the component first
   * This is because React components return JSX which needs to be converted to HTML
   * before we can check if the output is correct
   *
   * To render the component in a test, we need to use npm packages
   * like `@testing-library/react` which provides utilities to render and interact with React components in tests
   *
   * After installing the packages, we need to create config files to test components
   * such as vitest.config.js and setupTests.js
   */
  it("displays the product details correctly", () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    // This function doesn't do anything
    const loadCart = vi.fn(); // Mock function for loadCart prop

    render(<Product product={product} loadCart={loadCart} />);
    /**
     * Since Product component needs props, we are providing a sample product object as props
     * However, one of the props is a function loadCart which contains an axios call to the backend
     * We don't want to make actual API calls from the real backend in unit tests because:
     * 1. It makes the tests slower
     * 2. It introduces external dependencies which can make tests flaky
     * 3. We want to isolate the component being tested
     * 4. It can lead to unwanted side effects like modifying data in the real backend
     *
     * Therefore, we can use a mock function to replace loadCart prop
     * A mock function is a fake function that simulates the behavior of a real function
     * Here, we are using vi.fn() from Vitest to create a mock function
     * This way, when Product component calls loadCart, it will call the mock function instead of making an actual API call
     */

    // screen will search if there is any text that matches the given string
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    // We use expect().toBeInTheDocument() to assert that the element is present in the rendered output
    expect(screen.getByText("$10.90")).toBeInTheDocument();
    /**
     * We can also test if the image is displayed properly
     * But we can't use getByText anymore since images don't have text
     * To do this, we can add a test id to the img tag in the Product component
     * e.g. data-testid="product-image"
     * Then, we can use getByTestId to get the image element by its test id
     * We can check if the src attribute of the image is correct using toHaveAttribute matcher
     * e.g. expect(imageElement).toHaveAttribute('src', 'expected-src-value')
     *  */
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars-img")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  //   We can also test user interactions
  // e.g. testing if Add to Cart button behaves correctly when clicked
  it("adds a product to the cart", async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    // This function doesn't do anything
    const loadCart = vi.fn(); // Mock function for loadCart prop

    render(<Product product={product} loadCart={loadCart} />);

    // Simulate user clicking the "Add to Cart" button
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    // user.click(...) returns a Promise, so we need to await it
    await user.click(addToCartButton);
    /**
     * Notice that clicking the addToCartButton will call the addToCart function in Product component
     * which makes an axios POST request to add the product to the cart in the backend
     * However, we don't want to add an actual item to the cart in the real backend during tests
     * To solve this, we have mocked the axios module at the top of this test file
     * Therefore, when addToCart calls axios.post, it will call the mocked version instead of the real one, which will do nothing
     * This prevents any real API calls from being made during tests
     *
     * Then, what can we test here?
     * We can check:
     * 1. The axios.post() is called
     * 2. The data sent to axios.post() is correct
     * 3. loadCart() is called to refresh the cart after adding the item
     */

    /**
     * If we pass a mock function to expect(), we can use special matchers to check if the function was called
     * e.g. toHaveBeenCalled(), toHaveBeenCalledWith()
     * Here, we check if axios.post was called when the Add to Cart button was clicked
     * and if it was called with the correct URL and data simultaneously
     */
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
