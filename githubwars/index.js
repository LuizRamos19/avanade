let button = document.getElementById('battle');

button.addEventListener('click', () => {
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  console.log(user1);
  //battle(user1, user2);
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
  Promise.all([data, stars]).then(function(data) {
    let bonus = 0;

    if (null !== data[0].bio) {
      bonus = 100
    }

    return bonus + data[0].public_repos * 20 + data[0].followers * 10 + data[0].following * 5 + data[1] * 10 + data[0].public_gists * 5;
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
battle('douglasdemoura', 'luizramos19', 'willrockies');
