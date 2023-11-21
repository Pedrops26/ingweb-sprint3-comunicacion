import { useState, KeyboardEvent, ChangeEvent } from "react";

interface ChatBoxProps {}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const [messages1, setMessages1] = useState<
    { text: string; sender: number }[]
  >([]);
  const [messages2, setMessages2] = useState<
    { text: string; sender: number }[]
  >([]);
  const [newMessage1, setNewMessage1] = useState<string>("");
  const [newMessage2, setNewMessage2] = useState<string>("");

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    sender: number
  ) => {
    if (e.key === "Enter") {
      const newMessageText = sender === 1 ? newMessage1 : newMessage2;

      if (newMessageText.trim() !== "") {
        const newMessage = { text: newMessageText, sender };

        if (sender === 1) {
          setMessages1([...messages1, newMessage]);
          setMessages2([...messages2, { text: newMessageText, sender: 1 }]);
          setNewMessage1("");
          setNewMessage2(newMessageText);
        } else {
          setMessages2([...messages2, newMessage]);
          setMessages1([...messages1, { text: newMessageText, sender: 2 }]);
          setNewMessage2("");
          setNewMessage1(newMessageText);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, sender: number) => {
    const value = e.target.value;
    if (sender === 1) {
      setNewMessage1(value);
    } else {
      setNewMessage2(value);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto mt-8">
      <div className="flex flex-col w-1/2 max-w-md p-4 bg-gray-100 rounded-md">
        <div className="h-64 overflow-y-auto p-4 rounded-md">
          {messages1.map((message, index) => (
            <div
              key={index}
              className={`mb-2 text-right ${
                message.sender === 1 ? "bg-green-200" : "bg-blue-200"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage1}
          onChange={(e) => handleChange(e, 1)}
          onKeyPress={(e) => handleKeyPress(e, 1)}
          placeholder="Escribe un mensaje..."
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="flex flex-col w-1/2 max-w-md p-4 bg-gray-100 rounded-md">
        <div className="h-64 overflow-y-auto p-4 rounded-md">
          {messages2.map((message, index) => (
            <div
              key={index}
              className={`mb-2 text-left ${
                message.sender === 1 ? "bg-green-200" : "bg-blue-200"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage2}
          onChange={(e) => handleChange(e, 2)}
          onKeyPress={(e) => handleKeyPress(e, 2)}
          placeholder="Escribe un mensaje..."
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
    </div>
  );
};

export { ChatBox };
