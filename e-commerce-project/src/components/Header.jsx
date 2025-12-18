import { NavLink } from "react-router";
import "./header.css";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";

/*
    If you notice, even though switching pages work, it still reloads the entire page
    This is because the <a> tag causes a full page reload when navigating to a different link
    And this works for when we have different HTML files for each page
    But in React, we are working with a single page application (SPA) where we only have 1 HTML file
    So when we use <a> tags, it reloads the entire app which is not what we want
    To fix this, we can use the Link component from react-router which prevents full page reloads
    It uses JavaScript to dynamically update the URL and display the correct component without reloading the page
*/

/*
  Another special component is NavLink which is similar to Link but it also allows us to apply special styling to the active link
  For example, we can highlight the current page's link in the header navigation
  NavLink automatically applies an "active" class to the link when its target route is active
  e.g. <className="orders-link ... active">
  We can use this class in our CSS to style the active link differently
  e.g. .orders-link.active { font-weight: bold; }
*/

export function Header({ cart }) {
  // Show the correct # of items in cart
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  
  return (
    <div className="header">
      <div className="left-section">
        {/* 
            To change <a> to a Link, we need to replace the tag name and use the `to` prop instead of `href`
        */}
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
