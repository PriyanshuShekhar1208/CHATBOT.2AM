const sendInput = document.querySelector(".chat-input textarea");

const sendChatBtn = document.querySelector(".chat-input span");

const handleChat = () => {
      userMessage = chatInput.Value.trim();
      console.log(userMessage);
}

sendChatBtn.addEventListener("click",handleChat)