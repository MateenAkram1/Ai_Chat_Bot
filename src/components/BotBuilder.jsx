import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

function BotBuilder({ onConfigure }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [tone, setTone] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = () => {
    if (name && role && tone) {
      onConfigure({ name, role, tone, instructions, isConfigured: true });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Your AI Bot</h2>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Bot Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Role (e.g. Travel Agent)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Tone (e.g. Friendly)"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Extra Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition shadow-md"
          >
            Create Bot
          </button>
        </div>
      </div>
    </div>
  );
}

export default BotBuilder;
