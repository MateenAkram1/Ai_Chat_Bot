import React, { useState, useEffect, useRef } from 'react';
import { User, Bot, Volume2, PauseCircle, PlayCircle, XCircle } from 'lucide-react';

function ChatMessage({ darkMode, messages, formatTime }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  const handleSpeak = (text) => {
    speechSynthesis.cancel(); // stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utteranceRef.current = utterance;
    setIsSpeaking(true);
    setIsPaused(false);
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    speechSynthesis.resume();
    setIsPaused(false);
  };

  const handleCancel = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const cancelOnUnload = () => speechSynthesis.cancel();
    window.addEventListener('beforeunload', cancelOnUnload);
    return () => window.removeEventListener('beforeunload', cancelOnUnload);
  }, []);

  return (
    <div className={`flex ${messages.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 flex-col
        ${
          messages.sender === 'user'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
            : darkMode
            ? 'bg-gray-800 text-gray-100 border border-gray-700'
            : 'bg-white text-gray-800 shadow-md'
        }`}
      >
        {/* Avatar + Info */}
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 mt-1 ${
              messages.sender === 'user'
                ? 'text-indigo-200'
                : darkMode
                ? 'text-indigo-400'
                : 'text-indigo-600'
            }`}
          >
            {messages.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </div>

          <div className="flex-1">
            <div className="mb-1 flex justify-between items-center">
              <span className="font-medium">
                {messages.sender === 'user' ? 'You' : 'AI Assistant'}
              </span>
              <span
                className={`text-xs ${
                  messages.sender === 'user'
                    ? 'opacity-70'
                    : darkMode
                    ? 'text-gray-400'
                    : 'text-gray-500'
                } ml-3`}
              >
                {formatTime(messages.timestamp)}
              </span>
            </div>

            <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
              {messages.text}
            </p>

            {/* 🔊 Voice Controls */}
            {messages.sender === 'bot' && messages.text && (
              <div className="mt-2 flex items-center gap-3 text-xs font-medium">
                {!isSpeaking && (
                  <button
                    onClick={() => handleSpeak(messages.text)}
                    className={darkMode ? 'text-indigo-300' : 'text-indigo-600'}
                  >
                    <Volume2 className="h-5 w-5 inline" /> Play
                  </button>
                )}
                {isSpeaking && !isPaused && (
                  <button
                    onClick={handlePause}
                    className={darkMode ? 'text-yellow-300' : 'text-yellow-600'}
                  >
                    <PauseCircle className="h-5 w-5 inline" /> Pause
                  </button>
                )}
                {isSpeaking && isPaused && (
                  <button
                    onClick={handleResume}
                    className={darkMode ? 'text-green-300' : 'text-green-600'}
                  >
                    <PlayCircle className="h-5 w-5 inline" /> Resume
                  </button>
                )}
                {isSpeaking && (
                  <button
                    onClick={handleCancel}
                    className={darkMode ? 'text-red-300' : 'text-red-600'}
                  >
                    <XCircle className="h-5 w-5 inline" /> Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
