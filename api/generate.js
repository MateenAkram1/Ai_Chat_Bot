export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Only POST is accepted.' });
  }

  const { prompt } = req.body;

  // Safety check
  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const apiUrl = process.env.VITE_GEMINI_API_URL;

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Internal Server Error while generating content.' });
  }
}
