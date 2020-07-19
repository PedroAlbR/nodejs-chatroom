'use strict';

function addMessageToChat({ username, message, chatroom_id, date }) {
  const chatEl = document.querySelector('#chat'),
    messageEl = document.createElement('li'),
    time = new Date(date).toLocaleTimeString();

  messageEl.setAttribute('class', username);
  messageEl.innerText = `${time} ${username}: ${message}`;

  if (chatEl.childElementCount >= 25) {
    chatEl.removeChild(chatEl.childNodes[0]);
  }
  chatEl.appendChild(messageEl);
}

function postMessage(message, chatroom, username) {
  return fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      message,
      chatroom_id: chatroom,
      username,
    }),
  });
}

function getAllMessages(chatroom = 1) {
  return fetch('http://localhost:3000/messages/chatroom/1').then((res) =>
    res.json()
  );
}
