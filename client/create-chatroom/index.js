const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', () => {
  const name = document.querySelector('#name-input').value,
    errorMessage = document.querySelector('#error-msg');

  if (!name) {
    errorMessage.innerText = `Chatroom name is required.`;
    return;
  }

  return fetch('http://localhost:3000/chatrooms', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ name }),
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
          'Chatroom created succesfuly. Going to the homepage!'
        );
        window.location.href = '../homepage.html';
      }, 200);
    })
    .catch((error) => {
      errorMessage.innerText = `Error ${error.statusCode}: ${error.message}`;
    });
});
