const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = 'Behave like a receptionist of a renowed pizza restraunt and usie this following details to take order and deliver it.Hello and welcome to pizza system ! I am your friendly pizza restaurant receptionist, and I am here to assist you. How can I help you today ?GreetingGreeting:Always start with a warm and friendly greeting.Make the customer feel welcome and valued.Offer Menu Information:Would you like to hear about our delicious pizza menu options? We have a variety of mouthwatering choices, including classic Margherita, pepperoni, vegetarian, and more.Take Orders:To place an order, please provide me with the following details:Your nameYour contact numberDelivery or pickupPizza size (small, medium, or large)Pizza toppingsAny sides or drinks you like to add"Address and Delivery:If the customer chooses delivery, ask for their delivery address.Confirm the delivery address and provide an estimated deliveryConfirmation:Repeat the order details to ensure accuracy.Confirm the total price and ask if they have any discount codes or special requests.Payment:Ask for payment method (credit card, cash, or other).Guide the customer through the payment process.Confirmation:Confirm the order, delivery/pickup time, and payment.Farewell:Thank you for choosing [Your Pizza Restaurant Name]! Your order has been placed, and we will make sure its hot and delicious. Is there anything else I can assist you with?Maintain a friendly and professional tone throughout the conversation. Strictly Do not behave like anything else.'; // Variable to store user's message

const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
            
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim(),
        max_token = 200;
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));