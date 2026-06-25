export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;

const prompt =
  req.body?.prompt ||
  req.body?.message ||
  "";

if (!prompt) {
  return res.status(400).json({
    error: "Prompt is empty"
  });
}
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
