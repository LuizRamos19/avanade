let button = document.getElementById('btnFight');
let btnVoltar = document.getElementById('btnVoltar');

button.addEventListener('click', () => {
  event.preventDefault();
  let user1 = document.getElementById('user-1').value;
  let user2 = document.getElementById('user-2').value;
  button.innerText = "Buscando...";
  button.setAttribute("disabled", true);
  battle(user1, user2);
});

btnVoltar.addEventListener('click', () => {
  button.innerText = "Fight";
  button.removeAttribute("disabled");
  document.getElementById(`showcase`).classList.add('-active');
  document.getElementById(`result`).classList.remove('-active');
});

function battle(...users) {
  let results = [];
  users.forEach((user, index) => {
    points(user, index+1)
  });
  return results;
}

function points(user, index) {
  let data = makeRequest(`https://api.github.com/users/${user}`);
  let stars = makeRequest(`https://api.github.com/users/${user}/starred`);
  return Promise.all([data, stars]).then(function(data) {
    let result = {};
    let bonus = 0;

    if (null !== data[0].bio) {
      bonus = 100
    }

    result =  {
        user: user,
        avatar_url: data[0].avatar_url,
        points: bonus + data[0].public_repos * 20 + data[0].followers * 10 + data[0].following * 5 + data[1].length * 10 + data[0].public_gists * 5,
        public_repos: data[0].public_repos,
        public_repos_total: data[0].public_repos * 20,
        followers: data[0].followers,
        followers_total: data[0].followers * 10,
        following: data[0].following,
        following_total: data[0].following * 5,
        public_gists: data[0].public_gists,
        public_gists_total: data[0].public_gists * 5,
        stars: data[1].length,
        stars_total: data[1].length * 10,
        bonus: bonus
    };
    printResults(result, index);
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

function printResults(data, index) {
  let table = document.getElementById(`user-${index}-results`);
  document.getElementById(`image-${index}`).src = data.avatar_url;
  document.getElementById(`result`).classList.add('-active');
  document.getElementById(`showcase`).classList.remove('-active');
  document.getElementById(`total-${index}`).innerText = `Total: ${data.points}`;
  let html = createHtmlTable(data);
  table.innerHTML = html;
}

function createHtmlTable(data) {
  return `
      <tr>
          <th>
              Critério
          </th>
          <th>
              Qtd
          </th>
          <th>
              Total
          </th>
      </tr>
      <tr>
          <td>
              Repositório público
          </td>
          <td>
              ${data.public_repos}
          </td>
          <td>
              ${data.public_repos_total}
          </td>
      </tr>
      <tr>
          <td>
              Followers
          </td>
          <td>
              ${data.followers}
          </td>
          <td>
              ${data.followers_total}
          </td>
      </tr>
      <tr>
          <td>
              Seguindo
          </td>
          <td>
              ${data.following}
          </td>
          <td>
              ${data.following_total}
          </td>
      </tr>
      <tr>
          <td>
              Estrela em repositório
          </td>
          <td>
              ${data.stars}
          </td>
          <td>
              ${data.stars_total}
          </td>
      </tr>
      <tr>
          <td>
              Gists
          </td>
          <td>
              ${data.public_gists}
          </td>
          <td>
              ${data.public_gists_total}
          </td>
      </tr>
      <tr>
          <td>
              Bonus
          </td>
          <td>
          </td>
          <td>
              ${data.bonus}
          </td>
      </tr>
  `;
}