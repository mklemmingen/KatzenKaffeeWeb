import React, { useState } from 'react';
import '@/app/_styles/ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([{ text: "Willkommen! Wie kann ich dir helfen?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...newMessages, { text: data.response, sender: "bot" }]);
      } else {
        const errorText = await response.text();
        setMessages([...newMessages, { text: `Fehler: ${errorText}`, sender: "bot" }]);
      }
    } catch (error) {
      setMessages([...newMessages, { text: "Es ist ein Fehler aufgetreten.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
      <div className="chatbot-container">
        <header className="chatbot-header">ChatCat</header>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{__html: msg.text}}/>
          ))}
          {isTyping && <div className="message bot">...</div>}
        </div>
        <div className="chatbot-inputI">
          <div className="chatbot-input-wrapper">
            <input className="inputOfText"
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Schreibe deine Nachricht..."
            />
            <button className="sendenButton" onClick={handleSendMessage}>Senden</button>
          </div>
        </div>
      </div>
  );
}

export default ChatBot;
