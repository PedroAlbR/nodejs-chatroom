'use strict';

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

getAllMessages(1).then((messages) =>
  messages.forEach((m) => addMessageToChat(m))
);

// Listen for messages
socket.addEventListener('message', (event) =>
  addMessageToChat(JSON.parse(event.data))
);

const txtbox = document.querySelector('input');

txtbox.addEventListener('keypress', (e) => {
  if (e.code !== 'Enter') return;

  return postMessage(txtbox.value, 1, 'bot')
    .then(() => {
      txtbox.value = '';
    })
    .catch((error) => alert(`Message could not be sent. ${error.message}`));
});
