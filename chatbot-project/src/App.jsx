// When we don't specify a filepath, Vite will look at `node_modules` and find `react`
import { useEffect, useState, useRef } from "react";
// In Vite, we don't have to write .js/.jsx since it is added automatically
import { ChatInput } from "./components/ChatInput";
import { Chatbot } from "supersimpledev";
// If we use Default Export, we don't have to use { }
// The exports using { } is called Named Export
// Both are fine and free to choose
import ChatMessages from "./components/ChatMessages";
/*
  Not only can we import JavaScript code, Vite gives us the ability to import any file
  For example, we are able to import a css file, and it will load the CSS into this file
  We can also import images, Vite will do certain actions depending on the file type
*/
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    Chatbot.addResponses({
      'Who is Messi?': 'The greatest football player of all time!',
      'Give me a random id': function() {
        return `Here's an ID for you: ${crypto.randomUUID()}`
      }
    })
  }, [])

  useEffect(()=>{
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
    <div className="app-container">
      {chatMessages.length === 0 ? (
        <p className="welcome-text">
          Welcome to the chatbot project! Send a message using the textbox below
        </p>
      ) : (
        <ChatMessages 
          chatMessages={chatMessages}
          ref={chatMessagesRef}
        />
      )}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
