function getGitInformation(username) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        let url = `https://api.github.com/users/${username}`;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(xhttp.responseText))
            }
        }
        xhttp.open("GET", url, true)
        xhttp.send();
    });
}

function connectApi() {
    let promise = getGitInformation(username);
    promise
        .then(result => {
            // do something
        })
        .catch(err => console.log(err));
}
  
connectApi();
