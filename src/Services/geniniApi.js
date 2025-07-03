export const generateContent = async (prompt,botConfig) => {
  const systemPrompt = `
    You are ${botConfig.name}, a bot that acts as a ${botConfig.role}.
    Your tone should be ${botConfig.tone}.
    Follow these instructions: ${botConfig.instructions}.
    
    ----
    
    Prompt: ${prompt}
  `;
  prompt = systemPrompt
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Server error, Try again please.';
};
