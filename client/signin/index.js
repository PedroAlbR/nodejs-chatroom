const submitBtn = document.querySelector('#submit-btn');

if (sessionStorage.username) window.location.href = '../chat/index.html';

submitBtn.addEventListener('click', () => {
  const username = document.querySelector('#username-input').value,
    name = document.querySelector('#name-input').value,
    password = document.querySelector('#password-input').value,
    errorMessage = document.querySelector('#error-msg');

  if (!username || !password) {
    errorMessage.innerText = `Both username and password are required.`;
    return;
  }

  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ username, password, name }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status >= 300) {
        const e = new Error(data.message || data.statusText);
        e.statusCode = data.status;

        throw e;
      }

      errorMessage.innerText = '';
      setTimeout(() => {
        // Just giving the browser some time to clear the error message
        alert(
          'Account created succesfuly. You are being redirected to the homepage'
        );
        window.location.href = '../homepage.html';
      }, 200);
    })
    .catch((error) => {
      errorMessage.innerText = `Error ${error.statusCode}: ${error.message}`;
    });
});
