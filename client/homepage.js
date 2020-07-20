'use strict';

const logoutUrl = document.querySelector('#logoutUrl');

function handleButtonFunctionality() {
  const loginUrl = document.querySelector('#loginUrl'),
    signinUrl = document.querySelector('#signinUrl'),
    welcomeMsg = document.querySelector('#welcomeMsg');

  welcomeMsg.innerText = `Welcome, ${sessionStorage.username}`;

  loginUrl.innerText = 'Go to chat';
  loginUrl.href = 'chat/index.html';
  signinUrl.parentNode.remove();
  logoutUrl.addEventListener('click', () => {
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('chatrooms', '');
  });
}

function handleApiError(data) {
  if (data.status >= 300) {
    const e = new Error(data.message || data.statusText);
    e.statusCode = data.status;

    throw e;
  }

  return data;
}

function getAllChatrooms() {
  return fetch('http://localhost:3000/chatrooms')
    .then((res) => res.json())
    .then(handleApiError)
    .catch((error) => {
      console.error(`Error ${error.statusCode}: ${error.message}`);
    });
}

function getChatroomById(id) {
  return fetch(`http://localhost:3000/chatrooms/${id}`)
    .then((res) => res.json())
    .then(handleApiError)
    .catch((error) => {
      console.error(`Error ${error.statusCode}: ${error.message}`);
    });
}

if (sessionStorage.username) {
  handleButtonFunctionality();
  const userChatroomsIDs = JSON.parse(sessionStorage.chatrooms),
    userChatroomsList = document.querySelector('#user-chatrooms'),
    chatroomsList = document.querySelector('#all-chatrooms');

  // Get all chatroms of the logged user
  Promise.all(userChatroomsIDs.map(getChatroomById)).then((userChatrooms) => {
    userChatrooms.forEach(({ name, id }) => {
      userChatroomsList.innerHTML += `<li>Chatroom #${id}: ${name}</li>`;
    });

    // Get all chatrooms
    return getAllChatrooms().then((chatrooms) => {
      chatrooms.forEach(({ name, id }) => {
        // Only add it if its not in the user's list
        if (!userChatrooms.find((c) => c.id === id))
          chatroomsList.innerHTML += `<li>Chatroom #${id}: ${name}</li>`;
      });
    });
  });
} else {
  logoutUrl.parentNode.remove();
}
