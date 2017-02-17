(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  if(name !== null && location !== null){
    $('#user-info').append("<img src='" + img + "'><h3>" + username + "</h3><p>" + name + "<br>" + location +  "</p>");
  } else {
    $('#user-info').append("<img src='" + img + "'>" + "<h3>" + username + "</h3>");
  }
  
  for (var i = 0; i < repos.length; i++) {
    var title = repos[i][0];
    var description = repos[i][1];
    var language = repos[i][2];
    if(description === null){
      description = "";
    }
    $('#user-repos').append("<br><div class='col-md-11 well'><h4>" + title + "</h4><h5 class='bold'>Language: "+ language + "</h5><h5>" + description + "</h5></div>");
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
},{"./../js/github.js":2}],2:[function(require,module,exports){
function Github() {
}

Github.prototype.getUser = function(username, displayFunction) {
  var info = [];
  var repoInfo = [];
  
  $.get('https://api.github.com/users/' + username + '?access_token=' + "8aa0680d64cca6c9d0bf7d3ea4c180db0907ebbb").then(function(response) {
    
      var user = response.login;
      var name = response.name;
      var location = response.location;
      var image = response.avatar_url;
      info.push(user, name, location, image);

    
    $.get('https://api.github.com/users/' + username + '/repos?access_token=' + "8aa0680d64cca6c9d0bf7d3ea4c180db0907ebbb").then(function(result) {
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
},{}]},{},[1]);
