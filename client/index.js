"use strict";

function addMessageToChat({ username, message, chatroom_id, date }) {
  const chatEl = document.querySelector("#chat"),
    messageEl = document.createElement("li"),
    time = new Date(date).toLocaleTimeString()

  messageEl.setAttribute("class", username);
  messageEl.innerText = `${time} ${username}: ${message}`;

  chatEl.appendChild(messageEl);
}

function postMessage(message, chatroom, username) {
  return fetch("http://localhost:3000/messages", {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      message,
      chatroom_id: chatroom,
      username,
    }),
  });
}

function getAllMessages(chatroom = 1) {
  return fetch("http://localhost:3000/messages/chatroom/1").then((res) =>
    res.json()
  );
}

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080", "echo-protocol");

getAllMessages(1).then((messages) =>
  messages.forEach((m) => addMessageToChat(m))
);

// Listen for messages
socket.addEventListener("message", (event) =>
  addMessageToChat(JSON.parse(event.data))
);

const txtbox = document.querySelector("input");

txtbox.addEventListener("keypress", (e) => {
  if (e.code !== "Enter") return;

  return postMessage(txtbox.value, 1, "bot")
    .then(() => {
      txtbox.value = "";
    })
    .catch((error) => alert(`Message could not be sent. ${error.message}`));
});
