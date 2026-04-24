// This runs on Vercel's secure servers
export default async function handler(req, res) {
    // 1. Only allow POST requests (security)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, image } = req.body;

        // 2. MONETIZATION CHECK (Place-holder for Stripe)
        // In a real app, you would check the database here:
        // const user = await db.findUser(req.userId);
        // if (!user.isSubscribed) return res.status(402).json({ error: 'Payment Required' });

        // 3. AI INTEGRATION (Example using a Generic AI API)
        // We send the user's message and image to the AI model
        const aiResponse = await fetch('https://api.your-ai-provider.com/v1/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`, // Your secret key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "vision-model-01",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: message },
                            { type: "image_url", image_url: { url: image } }
                        ]
                    }
                ]
            })
        });

        const data = await aiResponse.json();

        // 4. Return the answer to your Frontend
        res.status(200).json({ 
            reply: data.choices[0].message.content,
            status: "success" 
        });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "The server encountered an error processing the image." });
    }
}