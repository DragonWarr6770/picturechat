export default async function handler(req, res) {
  // This code runs on Vercel's servers, not the user's browser.
  // You would put your OpenAI/Gemini logic here.
  res.status(200).json({ reply: "I see your image! It looks like..." });
}