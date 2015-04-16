var app = angular.module('starter.controllers', []);

app.controller('gitHubCtrl',  function($scope, $window, $http, githubProfile) {
  console.log('%c gitHubCtrl controller init', 'color:green;');
  
  var githubServiceCall = function() {
    githubProfile.getGithubProfile($scope.githubUserName)
      .then(function(profile) {
          $scope.account = profile.data;

          githubProfile.getRepos($scope.githubUserName)
            .then(function(repos) {
              $scope.repos = repos.data;
            }, function(err) {
              // proper error handling
              console.log(err);
            });
      }, function(err) {
        // proper error handling
        console.log(err);
      });  
  };
  
  
  $scope.githubUserName = 'romesz';
  
  $scope.inputType = function() {
    
    var el = angular.element(document.querySelector('#githubUserName'));
    var githubUserName = el.val();
    
    if(githubUserName == '')
      return;
    
    $scope.githubUserName = el.val();
    
    githubServiceCall();
  };
  
  githubServiceCall();
  
  
  $scope.openRepo = function(event, url) {
    $window.open(url, '_system');
    // I have to use the target param as '_system'
    // And install inappbrowser plugin : cordova plugin add org.apache.cordova.inappbrowser
    
    event.preventDefault();
  };
});