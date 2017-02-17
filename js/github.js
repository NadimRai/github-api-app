var apiKey = require('./../.env').apiKey;


function Github() {
}

Github.prototype.getUser = function(username, displayFunction) {
  var info = [];
  var repoInfo = [];
  
  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response) {
    
      var user = response.login;
      var name = response.name;
      var location = response.location;
      var image = response.avatar_url;
      var following = response.following;
      var followers = response.followers;
      var numRepos = response.public_repos;
      info.push(user, name, location, image, following, followers, numRepos);

    
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(result) {
      var repos = result;
      repos.forEach(function(repo) {
        var repoName = repo.name;
        var description = repo.description;
        var language = repo.language;
        var createdAt = repo.created_at;
        var updatedAt = repo.updated_at;
        repoInfo.push([repoName, description, language, createdAt, updatedAt]);
      });
      displayFunction(info, repoInfo);
    });
  }).fail(function(error){
    $('#user-not-found').empty();
    $('#user-info').empty();
    $('#user-repos').empty();
    $('#user-not-foundor').append("Github user can not be found" );
  });
};

exports.githubModule = Github;