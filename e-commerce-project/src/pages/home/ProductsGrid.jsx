import { formatMoney } from "../../utils/money";

export function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <div key={product.id} className="product-container">
            <div className="product-image-container">
              <img className="product-image" src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {product.name}
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src={`images/ratings/rating-${product.rating.stars * 10}.png`}
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
              <select>
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

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
