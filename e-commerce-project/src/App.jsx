import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { PageNotFound } from "./pages/PageNotFound";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  // useEffect(() => {
  //   /**
  //    * To get product details along with each cart item,
  //    * we can use the `expand` query parameter provided by json-server
  //    * This will include the related product data in each cart item object
  //    * This works by matching the productId in cart item with the id in products
  //    * How it works is json-server looks for the `productId` field in cart items
  //    * and finds the corresponding product in the products collection
  //    * Then, it adds the full product object under a new `product` field in the cart item
  //    * So each cart item will have a `product` field containing all the product details
  //    *
  //    * We can look at the network tab in browser devtools to see the full response data
  //    * to verify that the product details are included in each cart item
  //    * Go to the console, open the Network tab, and click on the /api/cart-items request
  //    * Then, look at the Response tab to see the JSON data returned from the server
  //    * You might need to refresh the page to see the request in the Network tab..
  //    * ..since we can only see the requests made after opening the devtools
  //    */
  //   axios.get("/api/cart-items?expand=product").then((response) => {
  //     setCart(response.data);
  //   });
  // }, []); // The empty dependency array ensures this effect only runs once when the component mounts

  // Check async await explanation in HomePage.jsx
  useEffect(() => {
    const fetchCartItemData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };

    fetchCartItemData();
  }, []);

  /* 
    To add routes into our app, we need to use the Routes component
    Inside it, we add a Route component for each page/path we have
    The path refers to the url (e.g. www.website.com/path)
    Element refers to the element/component we want to display on that path

    For an index page, we can use `index` prop instead of `path="/"` to denote the main page
  */
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
