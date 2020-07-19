'use strict';

const logoutUrl = document.querySelector('#logoutUrl');

if (sessionStorage.username) {
  const loginUrl = document.querySelector('#loginUrl'),
    signinUrl = document.querySelector('#signinUrl'),
    welcomeMsg = document.querySelector('#welcomeMsg');

  welcomeMsg.innerText = `Welcome, ${sessionStorage.username}`;

  loginUrl.innerText = 'Go to chat';
  loginUrl.href = 'chat/index.html';
  signinUrl.parentNode.remove();
  logoutUrl.addEventListener('click', () => {
    sessionStorage.setItem('username', '');
  });
} else {
  logoutUrl.parentNode.remove();
}
