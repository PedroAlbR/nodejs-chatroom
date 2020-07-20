'use strict';

if (!sessionStorage.username) {
  window.location.href = '../homepage.html';
} else {
  const welcomeMsg = document.querySelector('#userMsg'),
    socket = new WebSocket('ws://localhost:8080', 'echo-protocol');

  // Create WebSocket connection.

  welcomeMsg.innerText = `Currently chatting as: ${sessionStorage.username}`;

  getAllMessages(1)
    .then((messages) => messages.forEach((m) => addMessageToChat(m)))
    .then(() => scrollChat());

  // Listen for messages
  socket.addEventListener('message', (event) => {
    addMessageToChat(JSON.parse(event.data));
    scrollChat();
  });

  const txtbox = document.querySelector('input.msger-input');

  txtbox.addEventListener('keypress', (e) => {
    if (e.code !== 'Enter') return;

    return postMessage(txtbox.value, 1, sessionStorage.username)
      .then(() => {
        txtbox.value = '';
        // For some reason, we have to wait
        setTimeout(() => scrollChat(), 100);
      })
      .catch((error) => alert(`Message could not be sent. ${error.message}`));
  });
}
