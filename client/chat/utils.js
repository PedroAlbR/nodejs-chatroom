'use strict';

const MAX_AMOUNT_MESSAGES = 50;

function addMessageToChat({ username, message, chatroom_id, date }) {
  const chatEl = document.querySelector('#chat'),
    messageEl = document.createElement('li'),
    time = new Date(date).toLocaleTimeString();

  if (username === sessionStorage.username) {
    messageEl.setAttribute('class', 'highlight');
  }

  // https://stackoverflow.com/a/3426956
  messageEl.setAttribute('style', `color: #${intToRGB(hashCode(username))}`);
  messageEl.innerText = `${time} ${username}: ${message}`;

  if (chatEl.childElementCount >= MAX_AMOUNT_MESSAGES) {
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

// https://stackoverflow.com/a/3426956
function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}
