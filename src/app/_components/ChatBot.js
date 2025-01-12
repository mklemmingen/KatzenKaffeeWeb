"use client";

import React, { useState } from "react";
import "@/app/_styles/chatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Willkommen! Wie kann ich dir helfen?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...newMessages, { text: data.response, sender: "bot" }]);
      } else {
        const errorText = await response.text();
        setMessages([
          ...newMessages,
          { text: `Fehler: ${JSON.parse(errorText).message}`, sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Es ist ein Netzwerkfehler aufgetreten.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">ChatCat</header>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot">...</div>}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Schreibe deine Nachricht..."
          className="inputOfText"
        /> 
        <button onClick={handleSendMessage} className="sendenButton">Senden</button>
      </div>
    </div>
  );
}

export default ChatBot;
