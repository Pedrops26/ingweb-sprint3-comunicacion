// components/ChatBox.js
import { useState, KeyboardEvent, ChangeEvent } from "react";

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const [messages, setMessages] = useState<string[]>([]); // Anotación de tipo añadida
  const [newMessage, setNewMessage] = useState<string>(""); // Anotación de tipo añadida

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      <div className="h-64 overflow-y-auto bg-green-100 p-4 rounded-md">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewMessage(e.target.value)
        } // Anotación de tipo añadida
        onKeyPress={handleKeyPress}
        placeholder="Escribe un mensaje..."
        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export { ChatBox };
