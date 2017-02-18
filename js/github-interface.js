var Github = require('./../js/github.js').githubModule;


var displayUser = function(info, repos) {
  $('h2').show();
  $('#user-not-found').empty();
  $('#user-info').empty();
  $('#user-repos').empty();
  var img = info[3];
  var username = info[0];
  var name = info[1];
  var location = info[2];
  var following = info[4];
  var followers = info[5];
  var numRepos = info[6];
  var member = info[7];
  var memberDate = moment(member).format("DD/MM/YYYY");
  if(name !== null && location !== null){
    $('#user-info').append("<img src='" + img + "'><h3>" + username + "</h3><p>" + name + "<br>" + location + "<br>" + "<h5> Numbers of following: " + following +"</h5><h5> Numbers of followers: " + followers + "</h5><h5> Number of repository: "+numRepos + "</h5><h5>Member since: "+ memberDate + "</h5>" + "</p>");
  } else {
    $('#user-info').append("<img src='" + img + "'>" + "<h3>" + username + "</h3>");
  }
  
  for (var i = 0; i < repos.length; i++) {
    var title = repos[i][0];
    var description = repos[i][1];
    var language = repos[i][2];
    var createdAt = repos[i][3];
    var updatedAt = repos[i][4];
    var dateC = moment(createdAt).format('LLL');
    var dateU = moment(updatedAt).format('LLL');
    var countFork = repos[i][5];
    if(description === null){
      description = "";
    }
    $('#user-repos').append("<br><div class='col-md-11 well'><h4>" + title + "</h4><h5 class='bold'>Language: "+ language + "</h5><h5>" + description + "</h5><h5>Published on: " + dateC + "</h5><h5>Updated on: "+dateU +"</h5><h5> Number of Fork: "+ countFork + "</h5></div>");
  }
};

$(document).ready(function() {
  var newGithub = new Github();
  $('#form').submit(function(event) {
    event.preventDefault();
    var username = $('#username').val();
    newGithub.getUser(username, displayUser);
  });

});