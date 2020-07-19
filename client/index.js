function addMessageToChat(data) {
  const chatEl = document.querySelector("#chat");
  const messageEl = document.createElement("li");

  messageEl.setAttribute("class", data.username);
  messageEl.innerText = `${data.username}: ${data.message}`;

  chatEl.appendChild(messageEl);
}

fetch("http://localhost:3000/messages/chatroom/1")
  .then((res) => res.json())
  .then((messages) => messages.forEach((m) => addMessageToChat(m)));

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080", "echo-protocol");

// Listen for messages
socket.addEventListener("message", (event) => {
  addMessageToChat(JSON.parse(event.data));
});

const txtbox = document.querySelector("input");

txtbox.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    return fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        message: txtbox.value,
        chatroom_id: 1,
        username: "bot",
      }),
    }).then(() => {
      txtbox.value = "";
    });
  }
});
