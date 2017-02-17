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
      info.push(user, name, location, image);

    
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(result) {
      var repos = result;
      repos.forEach(function(repo) {
        var repoName = repo.name;
        var description = repo.description;
        var language = repo.language;
        repoInfo.push([repoName, description, language]);
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