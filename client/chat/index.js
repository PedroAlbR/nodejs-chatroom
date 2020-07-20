'use strict';

if (!sessionStorage.username) {
  window.location.href = '../homepage.html';
} else {
  const welcomeMsg = document.querySelector('#userMsg'),
    // Create WebSocket connection.
    socket = new WebSocket('ws://localhost:8080', 'echo-protocol'),
    SESSION_USERNAME = sessionStorage.username,
    COMMAND_RE = /^\/.*/;

  welcomeMsg.innerText = `Currently chatting as: ${SESSION_USERNAME}`;

  getAllMessages(1)
    .then((messages) => messages.forEach((m) => addMessageToChat(m)))
    .then(() => scrollChat());

  // Listen for messages
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data),
      isCommandMsg = COMMAND_RE.test(data.message);

    // Only show commands on the sender's chat
    if ((isCommandMsg && data.username === SESSION_USERNAME) || !isCommandMsg) {
      addMessageToChat(data);
    }

    scrollChat();
  });

  const txtbox = document.querySelector('input.msger-input');

  txtbox.addEventListener('keypress', (e) => {
    if (e.code !== 'Enter') return;

    return postMessage(txtbox.value, 1, SESSION_USERNAME)
      .then(() => {
        txtbox.value = '';
        // For some reason, we have to wait
        setTimeout(() => scrollChat(), 100);
      })
      .catch((error) => alert(`Message could not be sent. ${error.message}`));
  });
}
