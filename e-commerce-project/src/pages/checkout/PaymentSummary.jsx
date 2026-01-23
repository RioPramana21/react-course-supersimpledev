import axios from "axios";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

export function PaymentSummary({ paymentSummary, loadCart }) {
  /**
   * After placing the order, we want to navigate the user to the orders page
   * So we use the `useNavigate` hook from react-router
   * useNavigate() returns a function that we can call to navigate programmatically
   */
  const navigate = useNavigate();

  const createOrder = async () => {
    /**
     * The cart is already on the backend, so we just need to send a POST request
     * to create the order based on the current cart
     * Since the cart will be emptied after the order is created,
     * we also need to reload the cart in the frontend
     */
    await axios.post("/api/orders");
    await loadCart();
    // navigate() is not async, so we don't need to await it
    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      {/* Check first if paymentSummary has loaded
                    then display the HTML */}
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div
              className="payment-summary-money"
              data-testid="product-cost-cents"
            >
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div
              className="payment-summary-money"
              data-testid="shipping-cost-cents"
            >
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div
              className="payment-summary-money"
              data-testid="total-cost-before-tax-cents"
            >
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money" data-testid="tax-cents">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div
              className="payment-summary-money"
              data-testid="total-cost-cents"
            >
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
