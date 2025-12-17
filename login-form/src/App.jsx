import { useState } from "react";
import "./App.css";

function App() {
  const [showPassword, setShowPassword] = useState(true);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <p className="title">Hello, welcome to my website</p>
      <div>
        <input className="email-btn" type="text" placeholder="Email" />
      </div>
      <div>
        <input
          className="pwd-btn"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button className="hide-pwd-btn" onClick={togglePassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button className="action-btn">Login</button>
      <button className="action-btn">Sign up</button>
    </>
  );
}

export default App;
