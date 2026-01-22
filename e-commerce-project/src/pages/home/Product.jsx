import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = async () => {
    // .post() is used to create data in the backend
    /**
     * API Endpoint: /api/cart-items
     * With .post(), we can send data to the backend to create a new cart item
     * Alongside the API endpoint, we can send data in the request body
     * In this case, we need to send an object containing productId and quantity to create a new cart item
     */
    await axios.post("/api/cart-items", {
      productId: product.id,
      // quantity: quantity,
      // Since the key and value have the same name, we can use shorthand syntax: just `quantity`
      quantity,
    });
    // Since loadCart() is also async, it's a good idea to await it here
    await loadCart();
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          data-testid="product-image"
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="product-rating-stars-img"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {/* 
                            Since price is in cents, we need to divide by 100 to get dollars
                            Then, we can use toFixed(2) to show 2 decimal places
                            We usually store price in Cents because it avoids floating point precision issues
                            e.g. 0.1 + 0.2 !== 0.3 in JS due to how floating point numbers are represented in binary
        
                            Also, since this price will be displayed in multiple pages, it's better to put it in a function
                            that we can reuse everywhere instead of repeating the same code
        
                            To structure it better, we'll create a `utils` folder to put utility functions like this one under `src/utils/money.js`
                            Other structure notes:
                            1. Create a `components` folder under `src/` to put reusable components (e.g. Header, Footer, ProductCard, etc.)
                            2. Create a `pages` folder under `src/` to put page components (e.g. HomePage, CheckoutPage, OrdersPage, etc.)
                            3. Create a `assets` folder under `src/` to put static assets (e.g. images, icons, fonts, etc.)
                            4. Create a `checkout` folder under `src/pages/` to put checkout-related pages and components since checkout have multiple components/pages
                          */}
        {/* ${(product.priceCents / 100).toFixed(2)} */}
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          data-testid="quantity-selector"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: addedToCart ? 1 : 0 }}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
}
