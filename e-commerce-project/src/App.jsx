import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import "./App.css";

function App() {
  /* 
    To add routes into our app, we need to use the Routes component
    Inside it, we add a Route component for each page/path we have
    The path refers to the url (e.g. www.website.com/path)
    Element refers to the element/component we want to display on that path

    For an index page, we can use `index` prop instead of `path="/"` to denote the main page
  */
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
