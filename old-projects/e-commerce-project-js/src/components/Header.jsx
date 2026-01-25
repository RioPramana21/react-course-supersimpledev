import { NavLink, useNavigate } from "react-router";
import "./header.css";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import { useState } from "react";
import { useSearchParams } from "react-router";

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
  const navigate = useNavigate();
  /**
   * We use useState to keep track of the search input value
   * The initial value is either an empty string or the current search param from the URL if it exists
   * We use useSearchParams to read the current URL search params
   */
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  /**
   * When the user clicks the search button, we navigate to the home page with the search query param
   * This gives us a URL like "/?search=shoes" which enables us to filter the products on the home page
   */
  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

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
        {/* 
          To make the search bar functional, we need to add state to keep track of the input value
          Then, we can add an onChange event handler to update the state when the user types
          Finally, we can add an onClick event handler to the search button to navigate to the search results page
          This is a controlled input pattern in React where the input value is controlled by React state
        */}
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={updateSearchInput}
        />

        <button className="search-button" onClick={searchProducts}>
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
