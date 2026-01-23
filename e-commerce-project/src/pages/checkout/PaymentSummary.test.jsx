import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 10,
      productCostCents: 12591,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 13090,
      taxCents: 1309,
      totalCostCents: 14399,
    };

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it("displays dollar amounts correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("product-cost-cents")).toHaveTextContent(
      "$125.91",
    );

    expect(screen.getByTestId("shipping-cost-cents")).toHaveTextContent(
      "$4.99",
    );

    expect(screen.getByTestId("total-cost-before-tax-cents")).toHaveTextContent(
      "$130.90",
    );

    expect(screen.getByTestId("tax-cents")).toHaveTextContent("$13.09");

    expect(screen.getByTestId("total-cost-cents")).toHaveTextContent("$143.99");
  });

  it("places order correctly", async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );

    const createOrderButton = screen.getByTestId("create-order-btn");
    await user.click(createOrderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
