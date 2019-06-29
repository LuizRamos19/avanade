function battle(...users) {
  users.forEach((user) => {
    let request = `https://api.github.com/users/${user}`;
    fetch(request)
      .then(function(response) {
        return response.json();
      })
      .catch((error) => {
        return false;
      });
  }, 0);
}

battle('douglasdemoura', 'luizramos19', 'willrockies');
