async function sendMessage() {
    const text = chatInput.value;
    if (text.trim() !== "") {
        // 1. Display user message locally
        const userMsg = document.createElement('p');
        userMsg.innerHTML = `<strong>You:</strong> ${text}`;
        chatOutput.appendChild(userMsg);

        // 2. Send to the /api/chat backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // 3. Display the "AI" response
        const botMsg = document.createElement('p');
        botMsg.innerHTML = `<strong>AI:</strong> ${data.reply}`;
        chatOutput.appendChild(botMsg);

        chatInput.value = "";
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
}