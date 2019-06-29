function getGitInformation(username) {
  let request = `https://api.github.com/users/${username}`;
  let output;

  fetch(request)
    .then(function(response) {
      return response.json();
    })
    .catch((error) => {
      return false;
  });
}

function battle(...users) {
  let gitUsers = [];
  users.forEach((user) => {
    gitUsers.push(getGitInformation(user));
  }, 0);
  return gitUsers;
}

battle('douglasdemoura', 'luizramos19', 'willrockies');
