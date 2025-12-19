import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";
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
          <div className="order-summary">
            {/* 
              Notice that the cartItem data don't actually have the product details
              which we need to display here (like product name, image, price, etc.)
              So, when we fetch the cart data in App.jsx, we need to get the product info
              using Query Parameter to expand the product details in each cart item
            */}
            {/* We need to add the check of deliveryOptions.length > 0 since the data fetching
            runs async, so without this check, the app will crash
            Essentially, the cart items will render only after axios fetches the data */}
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                /**
                 * Delivery date displayed is based on the selected delivery option
                 * So, we create a variable to find the selected delivery option for this cart item
                 * We can do so by using .find() on the deliveryOptions array
                 * .find() works by looping through each element in the array
                 * and checking if the condition is true
                 * It returns the first element that matches the condition
                 * It will return the entire object that matches the condition so we'll have access to
                 * all the properties of the delivery option
                 * e.g. { id: '2', priceCents: 499, estimatedDeliveryTimeMs: 1655942400000 }
                 *
                 * That's why we can't just use cartItem.deliveryOptionId since
                 * we need the whole object to access the estimate
                 */
                const selectedDeliveryOption = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                  }
                );

                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs
                      ).format("dddd, MMMM D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartItem.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let priceString = "FREE Shipping";
                          /**
                           * To make it easier, we can save a default string for free shipping
                           * Then, only change it if the delivery option has a price
                           * We can utilize the formatMoney function we created earlier
                           * and use string literal to create the final string
                           */
                          if (deliveryOption.priceCents > 0) {
                            priceString = `${formatMoney(
                              deliveryOption.priceCents
                            )} - Shipping`;
                          }

                          return (
                            <div
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              {/* 
                              So, for the input element, we usually have `name` to group the options
                              and `checked` to mark if the option is selected or not
                              Since we are going to loop this, we can instead use the productId instead of 1,2,3
                              to see which product is selected
                              We also need to give `checked=True` or `checked=False` based on the actual selected option
                              (loop will make all elements checked if we leave it `checked`)
                              To do that, 
                            */}
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs
                                  ).format("dddd, MMMM D")}
                                  {/* Shows format 'Tuesday, June 21' */}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {/* Check first if paymentSummary has loaded
            then display the HTML */}
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
