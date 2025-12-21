import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({ cart, deliveryOptions }) {
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
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
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

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
