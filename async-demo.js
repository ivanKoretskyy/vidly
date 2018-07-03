console.log('before');
getUser(1, displayUser)

console.log('after');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log('reading forom db...');
      resolve({id: 1, name: 'ivan'});
    },2000);
  })
  
}

function getRepo(username) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log('get repo for ' + username + ' ...');
      resolve(['repo1', 'repo2']);
    },2000)
  })

}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log('get commits for repo' + repo + ' ...');
      resolve(['comit1', 'commit2']);
    },2000)
  })
}

function displayCommits(comits) {
  console.log(comits)
}
function displayrepos(repos) {
  console.log(repos);
  getCommits(repos[0], displayCommits)
}
function displayUser(user) {
  console.log('user ' + user.name);
  getRepo(user.name, displayrepos)
}
