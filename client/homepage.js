'use strict';

if (sessionStorage.username) {
  const loginUrl = document.querySelector('#loginUrl'),
    signinUrl = document.querySelector('#signinUrl');

  loginUrl.innerText = 'Go to chat';
  loginUrl.href = 'chat/index.html';
  signinUrl.parentNode.remove();
} else {
  const logoutUrl = document.querySelector('#logoutUrl');

  logoutUrl.parentNode.remove();
}
