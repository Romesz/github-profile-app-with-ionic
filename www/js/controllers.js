var app = angular.module('starter.controllers', []);

app.controller('gitHubCtrl',  function($scope, $http, githubProfile) {
  console.log('%c gitHubCtrl controller init', 'color:green;');
  
  $scope.githubUserName = 'romesz';
  
  $scope.inputType = function() {
    
    var el = angular.element(document.querySelector('#githubUserName'));
    var githubUserName = el.val();
    
    if(githubUserName == '')
      return;
    
    $scope.githubUserName = el.val();

    githubProfile.get($scope.githubUserName)
      .then(function(data) {
          $scope.account = data.data;
      }, function(err) {
        // proper error handling
        console.log(err);
      });
  };
  
  githubProfile.get('romesz')
    .then(function(data) {
        $scope.account = data.data;
    }, function(err) {
      // proper error handling
      console.log(err);
    });
});