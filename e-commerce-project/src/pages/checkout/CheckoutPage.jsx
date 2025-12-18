import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";
import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
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
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
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
                      <div className="delivery-option">
                        <input
                          type="radio"
                          checked
                          className="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div className="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div className="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          className="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div className="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div className="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input
                          type="radio"
                          className="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div className="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div className="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
