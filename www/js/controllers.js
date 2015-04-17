var app = angular.module('starter.controllers', ['ionic']);

app.controller('appCtrl', function($scope) {
  $scope.isIOS = ionic.Platform.isIOS();
});

app.controller('gitHubCtrl',  function($scope, $window, $http, githubProfile, $ionicLoading) {
  console.log('%c gitHubCtrl controller init', 'color:green;');
  
  $scope.showLoading = function(){
    $ionicLoading.show();
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };
  
  $scope.showLoading({
    duration: 600
  });
  
  var githubServiceCall = function() {
    githubProfile.getGithubProfile($scope.githubUserName)
      .then(function(profile) {
          $scope.account = profile.data;

          githubProfile.getRepos($scope.githubUserName)
            .then(function(repos) {
              $scope.repos = repos.data;
              $scope.hideLoading();
            }, function(err) {
              // proper error handling
              console.log(err);
              $scope.hideLoading();
            });
      }, function(err) {
        // proper error handling
        console.log(err);
        $scope.hideLoading();
      });  
  };
  
  
  $scope.githubUserName = 'romesz';
  
  if($scope.$parent.isIOS) {
    var ionContForDebug = angular.element(document.querySelector('#ionContForDebug'));
    ionContForDebug.css('top', '60px');
  }
  // alert(ionContForDebug.attr('class'));
  // BUG: On IOS sometimes <ion-content> goes behined <ion-header-bar>
  // There is Ionic class called 'has-header'. It should be a problem with it.
  // FIXED: add 60px to top
  
  $scope.inputType = function() {
    $scope.showLoading();
    
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
    // http://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
    // BUG: Iphone works Ipad no.
    
    event.preventDefault();
  };
});