import { Link } from 'react-router';
import './header.css'

/*
    If you notice, even though switching pages work, it still reloads the entire page
    This is because the <a> tag causes a full page reload when navigating to a different link
    And this works for when we have different HTML files for each page
    But in React, we are working with a single page application (SPA) where we only have 1 HTML file
    So when we use <a> tags, it reloads the entire app which is not what we want
    To fix this, we can use the Link component from react-router which prevents full page reloads
    It uses JavaScript to dynamically update the URL and display the correct component without reloading the page
*/

export function Header() {
  return (
    <div className="header">
      <div className="left-section">
        {/* 
            To change <a> to a Link, we need to replace the tag name and use the `to` prop instead of `href`
        */}
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
