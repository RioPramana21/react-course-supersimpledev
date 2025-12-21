import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ cartItem, deliveryOptions }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";
        /**
         * To make it easier, we can save a default string for free shipping
         * Then, only change it if the delivery option has a price
         * We can utilize the formatMoney function we created earlier
         * and use string literal to create the final string
         */
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        /**
         * REACT RENDERING LOGIC & FRAGMENTS EXPLAINED:
         * * 1. Why .map() works without Fragments:
         * - The .map() function returns a single JavaScript Array (e.g., [Element1, Element2]).
         * - Since an Array is a "single object" in JavaScript, it is a valid return value.
         * - React knows how to automatically iterate through an array and render each item.
         * * 2. Why siblings (Element A, Element B) fail in conditions:
         * - JavaScript functions/expressions can only return ONE value.
         * - Writing `condition && ( <DivA /> <DivB /> )` is syntax error.
         * - It is equivalent to writing `return 1 5;` without a comma or container—the computer gets confused.
         * * 3. The Solution (Fragments <>...</>):
         * - Fragments group multiple siblings into a single "Parent Node" (React.Fragment).
         * - This satisfies the "Return One Value" rule without adding an extra <div> to the DOM.
         * * NOTE: Even inside .map(), each *iteration* must return one root element. 
         * If a loop item has siblings, they must also be wrapped in a <Fragment key={id}>.
         * Example:
         * ❌ This will CRASH inside .map() too!
             {cart.map(item => {
                return (
                    <div>Title</div>
                    <div>Price</div> // Error: Adjacent JSX elements must be wrapped
                )
            })}
            ✅ Valid
            {cart.map(item => {
                return (
                    <React.Fragment key={item.id}>
                        <div>Title</div>
                        <div>Price</div>
                    </React.Fragment>
                )
            })}
            */

        return (
          <div key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
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
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
                {/* Shows format 'Tuesday, June 21' */}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
