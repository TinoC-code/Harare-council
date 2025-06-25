// Form submission handling
document.getElementById('garbageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const suburb = document.getElementById('suburb').value;
    const issue = document.getElementById('issue').value;
    
    // Create the message to be "sent"
    const message = `New Garbage Collection Complaint:\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nSuburb: ${suburb}\nIssue: ${issue}`;
    
    // In a real implementation, this would send to the phone number via SMS API
    // For this demo, we'll just show an alert
    alert(`Thank you for your report! This would be sent to the council's complaint line at +263787541060.\n\nMessage content:\n${message}`);
    
    // Reset the form
    this.reset();
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Hardcoded Q&A pairs
const faqs = [
    {
        question: /collection schedule|when is garbage collected|collection day/i,
        answer: "Garbage collection schedules vary by suburb. Typically collections occur once per week. Please provide your suburb name for specific days."
    },
    {
        question: /missed collection|garbage not collected|uncollected/i,
        answer: "I'm sorry to hear your garbage wasn't collected. You can report this issue using our online form or call our hotline at 0800 123 456. Would you like me to direct you to the reporting form?"
    },
    {
        question: /recycling|recycle/i,
        answer: "Harare City Council operates recycling centers at various locations. We accept paper, plastic, glass and metal. The main recycling center is at Pomona Waste Management Plant."
    },
    {
        question: /bins|where to get bins|garbage bins/i,
        answer: "Residential garbage bins can be purchased from our municipal offices at Kwame Nkrumah Avenue. The current cost is $25 for a standard 240L bin."
    },
    {
        question: /illegal dumping|dumping waste/i,
        answer: "Illegal dumping is a serious offense. To report illegal dumping, please call our 24-hour hotline at 0800 789 123 or use our online reporting system with photos if possible."
    },
    {
        question: /holiday schedule|public holiday/i,
        answer: "On public holidays, garbage collection may be delayed by one day. Collections return to normal schedule the following week."
    },
    {
        question: /hello|hi|greetings/i,
        answer: "Hello! I'm here to help with Harare waste management questions. How can I assist you today?"
    },
    {
        question: /thank|thanks/i,
        answer: "You're welcome! Is there anything else I can help you with?"
    },
    {
        question: /bye|goodbye/i,
        answer: "Thank you for contacting Harare Waste Management. Have a great day!"
    }
];

// Default answer if no match found
const defaultAnswer = "I'm sorry, I don't have information about that. For more complex inquiries, please contact our customer service at 0800 123 456 or visit our offices at Town House.";

// Toggle chatbot window
chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.toggle('active');
});

chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.remove('active');
});

// Send message function
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Find matching answer
    let answer = defaultAnswer;
    for (const faq of faqs) {
        if (faq.question.test(message)) {
            answer = faq.answer;
            break;
        }
    }
    
    // Simulate typing delay
    setTimeout(() => {
        addMessage(answer, 'bot');
    }, 500);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Event listeners for sending messages
sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Initialize with a welcome message if no messages exist
if (chatbotMessages.children.length === 0) {
    addMessage("Hello! I'm your Harare Waste Management assistant. How can I help you today?", 'bot');
}
