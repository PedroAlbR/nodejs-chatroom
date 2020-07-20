'use strict';

const submitBtn = document.querySelector('#login-btn');

if (sessionStorage.username) window.location.href = '../chat/index.html';

submitBtn.addEventListener('click', () => {
  const username = document.querySelector('#username-input').value,
    password = document.querySelector('#password-input').value,
    errorMessage = document.querySelector('#error-msg');

  if (!username || !password) {
    errorMessage.innerText = `Both username and password are required.`;
    return;
  }

  return fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status >= 300) {
        const e = new Error(data.message || data.statusText);
        e.statusCode = data.status;

        throw e;
      }

      errorMessage.innerText = '';
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('chatrooms', JSON.stringify(data.chatrooms));
      setTimeout(() => {
        // Just giving the browser some time to clear the error message
        alert('Successfuly logged in!');
        window.location.href = '../chat/index.html';
      }, 200);
    })
    .catch((error) => {
      errorMessage.innerText = `Error ${error.statusCode}: ${error.message}`;
    });
});
