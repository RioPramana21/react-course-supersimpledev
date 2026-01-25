import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
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
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
