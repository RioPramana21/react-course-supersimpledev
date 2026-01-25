import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
  ],
  /**
   * This is called Server Proxying (Server Proxy Configuration)
   *
   * When we make a request to '/api/...' or '/images/...' from the frontend,
   * Vite will forward the request to 'http://localhost:3000/api/...' or 'http://localhost:3000/images/...' respectively
   *
   * This way, we don't have to write the full URL including hostname and port every time in our code
   *
   * We will need to add <base> tag in index.html where we set the base URL for the app to '/'
   * This ensures that all relative URLs are resolved correctly based on this base path
   *
   * <base href="/" />
   * e.g. 'images/products/shirt.png' will be converted to '/images/products/shirt.png'
   */
  server: {
    proxy: {
      // If the URL starts with /api or /images, forward the request to the backend server
      // The request will automatically go to 'http://localhost:3000' as the target
      "/api": {
        target: "http://localhost:3000",
      },
      "/images": {
        target: "http://localhost:3000",
      },
    },
  },
  build: {
    outDir: "../e-commerce-backend/dist",
  },
});
