(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "8aa0680d64cca6c9d0bf7d3ea4c180db0907ebbb";
},{}],2:[function(require,module,exports){
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
},{"./../js/github.js":3}],3:[function(require,module,exports){
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
      var member = response.created_at;
      info.push(user, name, location, image, following, followers, numRepos, member);

    
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(result) {
      var repos = result;
      repos.forEach(function(repo) {
        var repoName = repo.name;
        var description = repo.description;
        var language = repo.language;
        var createdAt = repo.created_at;
        var updatedAt = repo.updated_at;
        var countFork = repo.forks_count;
        repoInfo.push([repoName, description, language, createdAt, updatedAt, countFork]);
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
},{"./../.env":1}]},{},[2]);
