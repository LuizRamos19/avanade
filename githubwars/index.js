let button = document.getElementById('battle');

button.addEventListener('click', () => {
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  battle(user1, user2);
});

function battle(...users) {
  users.forEach((user) => {
    let request = `https://api.github.com/users/${user}`;
    fetch(request)
      .then(function(response) {
        data = response.json();
      })
      .catch((error) => {
        return false;
      });
  }, 0);
}
//battle('douglasdemoura', 'luizramos19', 'willrockies');
