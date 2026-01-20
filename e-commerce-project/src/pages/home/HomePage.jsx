import axios from "axios";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  /*
    In a real-world application, we would fetch products from a Backend API like below
    We can use `fetch()` provided by JS to make network requests to our backend server
    Inside the fetch, we would provide the URL to our backend API endpoint
    e.g. 'http://localhost:3000/api/products' for local development
    It's important to use 'http://' or 'https://' in the URL to avoid issues with CORS and mixed content
  
    However, we can't store fetch() in a variable since the function doesn't actually finish right away
    It takes some time for the function to run and return a result
    This is called asynchronous code

    So, how do we handle this?
    fetch() returns a Promise which represents a value that may be available now, or in the future, or never
    We can use .then() method on the Promise to specify what to do when the Promise resolves (i.e. when the data is available)
    How it works is fetch() will make the network request in the background, and while waiting for the response, the rest of the code can continue running
    At some point in time, fetch() will get the response from the server and the Promise will resolve
    The .then() method will then be called with the resolved value (i.e. the response data)
    This way, we can handle asynchronous operations without blocking the main thread of execution
    
    We can put a function inside .then() that will run when the data is ready
    When fetch() is done running, it will save the result in the parameter we provide to .then(), called `response` below
    We can then use this `response` object to get the actual data we want
    
    Note that fetch() only gets the response metadata by default, to get the actual data, we need to call response.json() which also returns a Promise
    The .json() method reads the response stream to completion and parses it as JSON
    It gives us the data attached to the response, and it's also asynchronous
    So we need to chain another .then() to handle the data once response.json() is done
  */
  // fetch('http://localhost:3000/api/products')
  //   .then((response) => {
  //     // console.log("Fetch response:", response);
  //     response.json().then((data) => {
  //       console.log(data)
  //     })
  //   })

  /*
    A shortcut we can use to avoid nested .then() is to return the response.json() from the first .then()
    The next .then() can be put outside the first one, which will wait for the previous Promise to resolve before running
    The second one will get the actual data directly as its parameter
  */
  // fetch("http://localhost:3000/api/products")
  //   .then((response) => {
  //     // console.log("Fetch response:", response);
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });

  /*
      Note that the backend & frontend can run in the same computer
      In this project, the backend is running on localhost:3000, while the frontend dev server runs on localhost:5173 by default
      When the frontend makes a request to the backend, it uses the full URL including the hostname and port
      Since localhost is our own computer, the frontend is essentially talking to the same machine to get the data from the backend
      This is done during development since it is easier to run both servers locally

      However, when we deploy the app to production, both the frontend and backend will be put in different computers (i.e. servers)
      The frontend will be hosted on a web server (e.g. Vercel, Netlify) which serves the static files (HTML, CSS, JS)
      The backend will be hosted on a different server (e.g. AWS, Heroku) which runs the backend application and exposes the API endpoints
      In this case, the frontend will make requests to the backend using the backend server's URL (e.g. https://api.my-ecommerce-site.com)
      This way, the frontend and backend can communicate over the internet even though they are hosted on different machines
    */

  /*
      Fetch does the job, but it is a bit harder to read with all the .then() chaining
      To solve this, we can use axios library which is a popular HTTP client for making requests
      It provides a simpler and cleaner API for making HTTP requests compared to fetch()
      Axios automatically parses JSON responses, so we don't need to call response.json() separately
      It also supports features like request cancellation, interceptors, and automatic transformation of request and response data

      We can import axios by typing `import axios from 'axios'` at the top of the file
      Then, we can use axios.get() to make a GET request to the backend API
    */
  // axios.get('http://localhost:3000/api/products')
  //   .then((response) => {
  //     // Unlike fetch(), the data will be saved directly in response.data
  //     console.log(response.data)
  //   })

  /**
     Since we are calling axios inside a React component, we need to be careful about when the request is made
      If we call axios directly in the component body, it will run on every render which can lead to infinite loops and performance issues
      To avoid this, we can use the useEffect() hook provided by React
      By default, useEffect() runs every time the component is created/updated (i.e. on every render)
      But we can provide a second parameter, called the dependency array, to control when the effect runs
      If we provide an empty array, the effect will only run once when the component is first mounted
      This is similar to componentDidMount() in class components
      This is the perfect place to put our axios request since we only want to fetch the products once when the HomePage component is loaded
     
     Note: You might notice that in the console, the axios request is made twice
     This is because React's Strict Mode intentionally double-invokes certain lifecycle methods and effects to help identify potential issues
     But this is only in development mode for debugging purposes
     In production mode, the effect will only run once as expected
      */
  const [products, setProducts] = useState([]);

  /**
   * Since the cart is needed in both HomePage and CheckoutPage,
   * we need to lift the state up to a common ancestor component
   * In this case, we can lift the cart state up to App.jsx
   * This is because we want to only get the cart once and share it across multiple pages
   */
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    /**
     * Instead of writing 'http://localhost:3000' every time,
     * we can actually use a shortcut in Vite by putting it in `vite.config.js` file
     */
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });

    // Get the cart data to show the number of items in the Cart icon
    // axios.get('/api/cart-items').then((response) => {
    //   setCart(response.data)
    // })
  }, []); // The empty dependency array ensures this effect only runs once when the component mounts

  /**
   * But, actually in React, we want to use async await whenever possible because it's easier to read
   * async await lets us write asynchronous code in a more synchronous style
   * We can do so by writing `await` before axios which returns a Promise, and it let us store the result in a variable directly
   * Then, we can use `async` keyword before the function to denote that the function contains asynchronous code
   */
  
  // useEffect(async () => {
  //   const response = await axios.get("/api/products");
  //   setProducts(response.data);
  // }, []);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')

  useEffect(() => {
    /**
     * Note that we can't just put `async` before the useEffect callback directly
     * This is because useEffect expects the callback to return either nothing or a cleanup function
     * If we make the callback async, it will return a Promise instead which useEffect doesn't handle
     * To solve this, we can create an inner async function and call it immediately
     * This way, the outer useEffect callback remains synchronous
     */
    const fetchHomeData = async () => {
      /**
       * We can also use the search variable to filter products from the backend
       * by passing it as a query param to the API endpoint
       * e.g. /api/products?search=shoes
       * Then, in the backend, we can read the search query param and filter the products accordingly
       */
      let response
      if (search){
        response = await axios.get(`/api/products?search=${search}`)
      }
      else{
        response = await axios.get("/api/products");
      }
      setProducts(response.data);
    }

    fetchHomeData()
  }, [search]); // The effect will run again whenever `search` changes

  return (
    <>
      <title>E-commerce Project</title>
      {/* 
        We can set a unique favicon for each page like the title above
        Using link tag with rel="icon" and href to the icon image
      */}
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/home-favicon.png"
      />

      {/* The cart icon is in the Header, so we pass the cart data as a prop to it */}
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
