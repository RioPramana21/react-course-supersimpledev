import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      The BrowserRouter component is used to enable routing in our app. It uses the HTML5 history API
      to keep our UI in sync with the URL. We need to wrap our entire app
      with this component to use routing features like Routes and Route.

      This enables us to have multiple pages in the app without having different HTML files
      Therefore, we can have a single-page application (SPA) since everything uses only one HTML file
      and the routing is handled by React Router
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
