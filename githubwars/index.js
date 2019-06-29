let button = document.getElementById('btnFight');

button.addEventListener('click', () => {
  event.preventDefault();
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  button.innerText = "Buscando...";
  button.setAttribute("disabled", true);
  battle(user1, user2);
});

function battle(...users) {
  let results = [];
  users.forEach((user) => {
    results.push(points(user));
  });
  createScore(results);
}

function points(user) {
  let data = makeRequest(`https://api.github.com/users/${user}`);
  let stars = makeRequest(`https://api.github.com/users/${user}/starred`).length;
  Promise.all([data, stars]).then(function(data) {
    let bonus = 0;

    if (null !== data[0].bio) {
      bonus = 100
    }

    return {
      user: user,
      points: bonus + data[0].public_repos * 20 + data[0].followers * 10 + data[0].following * 5 + data[1] * 10 + data[0].public_gists * 5,
      public_repos: data[0].public_repos,
      followers: data[0].followers,
      following: data[0].following,
      public_gists: data[0].public_gists,
      stars: data[1],
      bonus: bonus
    };
  });
}

function makeRequest(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch((error) => {
      return false;
  });
}

function createScore(results) {
    console.log('results ', results)
}
//battle('douglasdemoura', 'luizramos19', 'willrockies');
