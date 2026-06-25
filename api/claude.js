export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;

console.log("BODY =", JSON.stringify(req.body));
console.log("PROMPT =", prompt);
  const prompt =
    req.body?.prompt ||
    req.body?.message ||
    "";

  console.log("PROMPT =", prompt);

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
  console.log("GEMINI =", JSON.stringify(data));

  return res.status(200).json(data);
}
