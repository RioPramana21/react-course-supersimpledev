import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
  // State for delivery options
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  // State for payment summary
  // We use `null` since paymentSummary will be an object
  // And it's easier to check if it exists using null
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    /**
     * In the frontend, we need to display the estimated delivery time
     * However, calculations & data management are usually done on the backend
     * In this project, we can use `expand` again which will return
     * the estimated delivery time in miliseconds
     */
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      {/* 
        Since React routing made the app an SPA, we can only fit 1 title tag in the index.html
        To give each page its own title, we can simply put the title tag at the top of the display
    */}
      <title>Checkout</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/cart-favicon.png"
      />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
