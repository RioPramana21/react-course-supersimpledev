import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**
 * This project now uses TypeScript instead of JavaScript.
 * TypeScript is basically JavaScript with extra features (e.g., static types).
 * 
 * All the code & syntaxes are still the same as JavaScript, but it adds extra features on top of it.
 * The main feature is we can add types to our variables, function parameters, return values, etc.
 * And TypeScript will check for type correctness during development (Type Checking).
 * Another feature of TypeScript is Type Inference, where TypeScript can automatically infer the types of variables based on their initial values.
 * 
 * How to create a new TypeScript React project with Vite:
 * 1. Ensure you have Node.js and create-vite@6.5.0 installed on your machine.
 * 2. Run the following command in your terminal:
 *    npm create vite@6.5.0 ecommerce-project-ts
 * 3. When prompted to select a framework, choose "React".
 * 4. When prompted to select a variant, choose "TypeScript".
 * 5. A shortcut to create a React + TypeScript project is:
 *    npm create vite@6.5.0 ecommerce-project-ts -- --template react-ts
 */

function App() {
  /**
   * An example of type inference in TypeScript.
   * Here, we initialize the state variable "count" with a number value (0).
   * TypeScript automatically infers that "count" is of type number.
   * If we try to assign a value of a different type (e.g., string, boolean, object, etc.) to this variable,
   * or call a method that doesn't exist on number type,
   * TypeScript will throw an error during development, helping us catch potential bugs early.
   */
  const [count, setCount] = useState(0)
  count.toLowerCase() // This will throw an error because "toLowerCase" is not a method of number type.

  /**
   * An example of a typed variable in TypeScript.
   * We can tell the computer that the variable "message" value is of type string.
   * If we try to assign a value of a different type (e.g., number, boolean, object, etc.) to this variable,
   * TypeScript will throw an error during development, helping us catch potential bugs early.
   */
  // We can add type annotation using ": type" syntax.
  const message: string = 'hello'
  console.log(message)

  // When we typed "message.", the code editor will know to provide autocompletion suggestions based on string methods,
  // because we have defined "message" as a string type.
  message.toLowerCase()

  // If we try to call a method that doesn't exist on string type, TypeScript will throw an error.
  // In JavaScript, we can still run the code just fine, but it will lead to runtime errors.
  // So if we try to build the project using npm run build, TypeScript will prevent the build and show us the error.
  message.toFixed(2) // This will throw an error because "toFixed" is not a method of string type.

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
