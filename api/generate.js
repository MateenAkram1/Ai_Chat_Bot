export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST supported" });
  }

  const { prompt } = req.body;

  const response = await fetch(
    `${process.env.VITE_GEMINI_API_URL}?key=${process.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
