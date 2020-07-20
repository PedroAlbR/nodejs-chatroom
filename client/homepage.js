'use strict';

const logoutUrl = document.querySelector('#logoutUrl'),
  userChatroomsList = document.querySelector('#user-chatrooms'),
  chatroomsList = document.querySelector('#all-chatrooms');

function handleButtonFunctionality() {
  const loginUrl = document.querySelector('#loginUrl'),
    signinUrl = document.querySelector('#signinUrl'),
    welcomeMsg = document.querySelector('#welcomeMsg');

  welcomeMsg.innerText = `Welcome, ${sessionStorage.username}`;

  loginUrl.parentElement.setAttribute('style', 'display: none');
  signinUrl.parentNode.remove();
  logoutUrl.addEventListener('click', () => {
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('chatrooms', '');
  });
}

function chatroomUrlTemplate({ id, name }) {
  return `
    <li>
      <a href="./chat/index.html?chatroom=${id}">
        Chatroom #${id}: ${name}
      </a>
    </li>
  `;
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
  const userChatroomsIDs = JSON.parse(sessionStorage.chatrooms);

  // Get all chatroms of the logged user
  Promise.all(userChatroomsIDs.map(getChatroomById)).then((userChatrooms) => {
    userChatrooms.forEach((userChatroom) => {
      userChatroomsList.innerHTML += chatroomUrlTemplate(userChatroom);
    });

    // Get all chatrooms
    return getAllChatrooms().then((chatrooms) => {
      chatrooms.forEach(({ name, id }) => {
        // Only add it if its not in the user's list
        if (!userChatrooms.find((c) => c.id === id))
          chatroomsList.innerHTML += chatroomUrlTemplate({ id, name });
      });
    });
  });
} else {
  logoutUrl.parentNode.remove();
  userChatroomsList.parentNode.remove();
  chatroomsList.parentNode.remove();
}
