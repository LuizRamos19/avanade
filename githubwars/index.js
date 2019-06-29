let button = document.getElementById('battle');

button.addEventListener('click', () => {
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  battle(user1, user2);
});

function battle(...users) {
  let results = [];
  users.forEach((user) => {
    results.push(points(user));
  });
  printResults(results[0], 'user-1-results');
  printResults(results[1], 'user-2-results');
  return results;
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

function printResults(data, target) {
  let node = document.getElementById(target);
  target.innerHTML = `<h2>${data.user}</h2>`;
  target.innerHTML += `<h3>${data.points} pontos</h3>`;
  target.innerHTML += `<p>${data.public_repos} repositórios públicos</p>`;
  target.innerHTML += `<p>${data.followers} seguidores</p>`;
  target.innerHTML += `<p>${data.following} seguindo</p>`;
  target.innerHTML += `<p>${data.public_gists} gists</p>`;
  target.innerHTML += `<p>${data.stars} estrelas</p>`;
  target.innerHTML += `<p>${data.bonus} bônus (tem bio)</p>`;
}
//battle('douglasdemoura', 'luizramos19', 'willrockies');
