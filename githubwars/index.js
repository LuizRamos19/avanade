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
<<<<<<< HEAD

battle('douglasdemoura', 'luizramos19', 'willrockies');
=======
  
connectApi();
>>>>>>> 2245bd3b74fe3278735aa9674c5fe58ed285983f
