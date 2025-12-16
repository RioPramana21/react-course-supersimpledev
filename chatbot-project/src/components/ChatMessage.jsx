import './ChatMessage.css';
/* Notice how we are not using { }, but giving it a name instead
This is called a Default Export 
When we import an image like this, Vite will give us a filepath to the image
So, `RobotProfileImage` will contain 'src/assets/robot.png' which we can pass to
the src attribute in an img element
*/
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';

export function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}