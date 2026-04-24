const uploadBtn = document.getElementById('upload-btn');
const bgSlider = document.getElementById('bg-slider');
const chatSidebar = document.getElementById('chat-sidebar');
const toggleChat = document.getElementById('toggle-chat');
const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
const sendBtn = document.getElementById('send-btn');

// Handle Image Upload
uploadBtn.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            bgSlider.style.backgroundImage = `url('${event.target.result}')`;
            // Trigger a slide-in effect
            bgSlider.style.transform = "scale(1.1)";
            setTimeout(() => bgSlider.style.transform = "scale(1)", 500);
        };
        reader.readAsDataURL(file);
    }
});

// Toggle Chat Sidebar
toggleChat.addEventListener('click', () => {
    chatSidebar.classList.toggle('active');
});

// Simple Chat Functionality
function sendMessage() {
    const text = chatInput.value;
    if (text.trim() !== "") {
        const msg = document.createElement('p');
        msg.innerHTML = `<strong>You:</strong> ${text}`;
        chatOutput.appendChild(msg);
        chatInput.value = "";
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});