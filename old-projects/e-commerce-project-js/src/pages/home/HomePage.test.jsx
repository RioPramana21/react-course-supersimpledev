import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { HomePage } from "./HomePage";
// MemoryRouter is a router that keeps the history of your "URL" in memory (does not read or write to the address bar)
// It is used in testing environments where we don't have a real browser
import { MemoryRouter } from "react-router";

/**
 * Notice in HomePage component, we will use axios.get() to fetch the products from the backend
 * Since we don't want to use the real backend, we are mocking the axios
 *
 * However, HomePage actually need the real axios.get() in order to show products
 * To solve this, we will Mock the Implementation
 * Which is basically making the mock do whatever we want
 */
vi.mock("axios");

describe("HomePage component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    // Whenever axios.get() is run, this code will run instead
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        /**
         * Even though we are creating a mock, we still need to
         * return an object that looks like the real axios response
         * which contains a `data` property that holds the actual data
         *
         * axios.get() also returns a Promise, so we need to return a Promise here
         * We can do this in 2 ways:
         * 1. Using async function which automatically wraps the return value in a Promise
         * 2. Using Promise.resolve() to manually create a resolved Promise
         */
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });

  it("displays the products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    // screen.getAllByTestId('product-container')
    /**
     * So here, we want to check that the products are displayed correctly
     * In the mock, we are returning 2 products
     * Therefore, we expect to see 2 product containers in the rendered output
     *
     * We added data-testid="product-container" to the root div of Product component for this purpose
     *
     * However, notice in the HomePage component, the products started out empty
     * Then, we use useEffect to fetch the products from the backend (which is mocked here)
     * Since fetching data is asynchronous, the products won't be available immediately after rendering
     * Therefore, if we use getAllByTestId here, it will run before the products are loaded
     * and it will return 0 product containers, causing the test to fail
     *
     * To solve this, we can use findAllByTestId which returns a Promise that resolves
     * when the elements are found in the DOM
     * This way, the test will wait for the products to be loaded before checking for the product containers
     */
    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2);

    /**
     * Last time, we checked if a product is correct using expect().getByText()
     * However, since we have multiple products here, using screen.getByText() will search the entire document
     * and it might find the text in the wrong product container
     * To solve this, we can use within() to search inside a specific product
     *
     * Then, wrap it with expect()
     */
    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });

  it("adds product to the cart correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");
    let addToCartButton = within(productContainers[0]).getByTestId(
      "add-to-cart-button",
    );
    const user = userEvent.setup();
    let quantitySelector = within(productContainers[0]).getByTestId("quantity-selector");

    await user.selectOptions(quantitySelector, "2");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    });

    addToCartButton = within(productContainers[1]).getByTestId(
      "add-to-cart-button",
    );
    quantitySelector = within(productContainers[1]).getByTestId("quantity-selector");

    await user.selectOptions(quantitySelector, "3");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
