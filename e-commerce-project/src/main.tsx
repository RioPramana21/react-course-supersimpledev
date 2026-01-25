import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

/**
 * Notice here that TypeScript throws an error for the "document.getElementById" call.
 * This is because "getElementById" can potentially return null if the element with the specified ID is not found in the DOM.
 * However, we know that in `index.html`, there is indeed an element with the ID "root".
 * So we know for sure it will not return null.
 * To inform TypeScript about this certainty, we use the non-null assertion operator "!" right after the method call.
 * This tells TypeScript that we are confident that the result will not be null or undefined,
 * allowing us to safely call the "render" method on the returned element without any type errors.
 */
createRoot(document.getElementById("root")!).render(
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
