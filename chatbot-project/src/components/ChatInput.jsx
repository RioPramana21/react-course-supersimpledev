import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css';
import LoadingIcon from '../assets/loading-spinner.gif';

/*
    When we created ChatInput here, it only exists in this file.
    This prevents errors when multiple files have components/variables with the same name.
    To use ChatInput in other files, we need to export it.
    We can do this by adding `export` before the function declaration.
    Now, other files can import ChatInput like this:
    `import { ChatInput } from './components/ChatInput.jsx'`
*/
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);
    setInputText("");

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingIcon} className="loading-img" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }

  function actionKeyPressed(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={actionKeyPressed}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}