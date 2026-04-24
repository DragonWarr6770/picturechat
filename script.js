// --- 1. ELEMENT SELECTIONS ---
const imageUpload = document.getElementById('image-upload');
const bgSlider = document.getElementById('bg-slider');
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const closeChat = document.getElementById('close-chat');
const userInput = document.getElementById('user-input');
const sendMsgBtn = document.getElementById('send-msg-btn');
const chatHistory = document.getElementById('chat-history');

// --- 2. BACKGROUND & UPLOAD LOGIC ---
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            // Update the background image
            bgSlider.style.backgroundImage = `url('${event.target.result}')`;
            
            // Trigger the "Slide" animation defined in CSS
            bgSlider.classList.remove('bg-slide-active');
            void bgSlider.offsetWidth; // Trigger reflow to restart animation
            bgSlider.classList.add('bg-slide-active');
            
            addMessage('System', 'Image uploaded successfully. You can now chat about it.', 'bot-msg');
        };
        
        reader.readAsDataURL(file);
    }
});

// --- 3. UI INTERACTION (TOGGLE CHAT) ---
chatToggle.addEventListener('click', () => {
    chatPanel.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatPanel.classList.remove('active');
});

// --- 4. CHAT & API LOGIC ---
async function handleSendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message in UI
    addMessage('You', message, 'user-msg');
    userInput.value = '';

    try {
        // Send request to your Vercel Backend (/api/chat.js)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        
        // Display AI response
        addMessage('AI', data.reply, 'bot-msg');

    } catch (error) {
        addMessage('System', 'Error: Could not reach the AI. Check your Vercel deployment.', 'bot-msg');
        console.error(error);
    }
}

// Utility to add message bubbles to the UI
function addMessage(sender, text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatHistory.appendChild(msgDiv);
    
    // Auto-scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Event Listeners for sending
sendMsgBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});