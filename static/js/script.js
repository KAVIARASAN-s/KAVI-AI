const input = document.getElementById("message");
const chat = document.getElementById("chat-box");
const button = document.getElementById("sendBtn");

// Enter key
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    let message = input.value.trim();

    if (message === "") return;

    // User Message
    chat.innerHTML += `
        <div class="user">${message}</div>
    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

    // Disable Button
    button.disabled = true;

    // Thinking...
    let thinking = document.createElement("div");
    thinking.className = "bot";
    thinking.id = "thinking";
    thinking.innerHTML = "🤖 KAVI AI is thinking...";
    chat.appendChild(thinking);

    chat.scrollTop = chat.scrollHeight;

    let response = await fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    });

    let data = await response.json();

    document.getElementById("thinking").remove();

    chat.innerHTML += `
        <div class="bot">${data.reply}</div>
    `;

    chat.scrollTop = chat.scrollHeight;

    button.disabled = false;

}function newChat(){

document.getElementById("chat-box").innerHTML="";

}