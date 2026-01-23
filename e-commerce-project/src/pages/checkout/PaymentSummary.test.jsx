import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter } from "react-router";

vi.mock("axios");

describe("PaymentSummary component", () => {
  it("displays dollar amounts correctly", () => {
    const paymentSummary = {
      totalItems: 10,
      productCostCents: 12591,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 13090,
      taxCents: 1309,
      totalCostCents: 14399,
    };

    const loadCart = vi.fn();

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
});
