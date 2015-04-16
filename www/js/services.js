angular.module('starter.services', [])
.factory('githubProfile', ['$http', function($http) {
  console.log('%c githubProfile factory init', 'color:green;');
  
  return {
    getGithubProfile: function(githubProfileId) {
      return $http.get('https://api.github.com/users/' + githubProfileId);
    },
    getRepos: function(githubProfileId) {
      return $http.get('https://api.github.com/users/' + githubProfileId + '/repos');
    }
  };
}]);
