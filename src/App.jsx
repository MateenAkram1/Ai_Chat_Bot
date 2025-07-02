import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import { formatTime } from '../utils/ChatUtils.js';
import Loadingindicator from './components/loadingindicator.jsx';
import ChatInput from './components/ChatInput.jsx';
import { generateContent } from './Services/geniniApi.js';

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setinput] = useState('');
  const [messages, setmessages] = useState([
    {
      id: 1,
      text: 'Hello, How can I help you?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const bottomRef = useRef(null); // 👈 Add this

  const toggleDarkMode = () => {
    setDarkmode(!darkMode);
  };

  const handleSendMessage = async () => {
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setmessages((prev) => [...prev, userMessage]);
    setinput('');
    setIsLoading(true);

    try {
      const botText = await generateContent(input);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setmessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error generating content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              darkMode={darkMode}
              messages={message}
              formatTime={formatTime}
            />
          ))}

          {isLoading && <Loadingindicator darkMode={darkMode} />}

          <div ref={bottomRef} /> 
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        input={input}
        setinput={setinput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
