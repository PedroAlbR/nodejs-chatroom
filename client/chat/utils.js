'use strict';

const MAX_AMOUNT_MESSAGES = 50;

function createMessageElement({ message, date, username, isCurrentUser }) {
  const messagePos = isCurrentUser ? 'right' : 'left',
    messageEl = document.createElement('div');

  messageEl.setAttribute('class', `msg ${messagePos}-msg`);

  messageEl.innerHTML = `
    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">${username}</div>
        <div class="msg-info-time">${date}</div>
      </div>
      <div class="msg-text">${message}</div>
    </div>`;

  return messageEl;
}

function addMessageToChat({ username, message, chatroom_id, date }) {
  const chatEl = document.querySelector('#chat'),
    messageEl = createMessageElement({
      message,
      date: new Date(date).toLocaleTimeString(),
      username,
      isCurrentUser: username === sessionStorage.username,
    });

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

function scrollChat() {
  const chatEl = document.querySelector('#chat');
  chatEl.scrollTo(0, chatEl.scrollHeight);
}
