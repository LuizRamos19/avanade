let button = document.getElementById('battle');

button.addEventListener('click', () => {
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  battle(user1, user2);
});

function battle(...users) {
  let results = [];
  users.forEach((user) => {
    results.push({user: user, points: points(user)});
  });
  return results;
}

function points(user) {
  let data = makeRequest(`https://api.github.com/users/${user}`);
  let stars = makeRequest(`https://api.github.com/users/${user}/starred`).length;
  return data.public_repos * 20 + data.followers * 10 + data.following * 5 + stars * 10 + data.public_gists * 5;
}

function makeRequest(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch((error) => {
      return false;
  });
}
battle('douglasdemoura', 'luizramos19', 'willrockies');
