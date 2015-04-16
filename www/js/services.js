angular.module('starter.services', [])
.factory('githubProfile', ['$http', function($http) {
  console.log('%c githubProfile factory init', 'color:green;');
  
  return {
    get: function(githubProfileId) {
      return $http.get('https://api.github.com/users/' + githubProfileId)
    }
  };
}]);
