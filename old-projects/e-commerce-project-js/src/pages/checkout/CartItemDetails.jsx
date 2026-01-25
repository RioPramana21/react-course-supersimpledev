import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  /**
   * We use isUpdating state to toggle between showing the quantity as a label or an input box
   * When the user clicks "Update", we either switch to input mode or save the new quantity
   * If isUpdating is true, we send a PUT request to update the quantity in the backend
   * Otherwise, we just switch to input mode by setting isUpdating to true
   */
  const updateQuantity = async () => {
    if (isUpdating) {
      await axios.put(`api/cart-items/${cartItem.productId}`, {
        quantity,
      });
      await loadCart();
    }
    setIsUpdating(!isUpdating);
  };

  /** Handles key events in the quantity input box
   * We want to allow the user to press Enter to save the new quantity
   * or Escape to cancel the update and revert to the original quantity
   */
  const checkQuantityEvent = (event) => {
    const keyPressed = event.key;
    if (keyPressed === "Enter") {
      updateQuantity();
    } else if (keyPressed === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  };

  /** Handles changes to the quantity input box 
   * We update the quantity state as the user types
   * This is a controlled input pattern in React
  */
  const changeQuantity = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          {/* Controlled input pattern
            We show either an input box or a label based on isUpdating state
          */}
          <span>
            Quantity:
            {isUpdating ? (
              <input
                className="quantity-input"
                type="text"
                style={{ width: 50 }}
                value={quantity}
                onChange={changeQuantity}
                onKeyDown={checkQuantityEvent}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
