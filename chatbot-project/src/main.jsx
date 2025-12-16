import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/* 
  Note here that we are importing index.css instead of App.css
  This is the best practice for writing CSS, where we should split our CSS into different files
  App.css should only contain CSS related to the App component
  index.css should contain global CSS that applies to the whole app
*/
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  /*
    StrictMode is a special component from React
    It basically gives additional checks & warnings when developing our app
  */
  <StrictMode>
    <App />
  </StrictMode>,
)
