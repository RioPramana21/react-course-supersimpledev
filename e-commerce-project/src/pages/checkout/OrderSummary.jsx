import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";

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
                <CartItemDetails cartItem={cartItem} />

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
