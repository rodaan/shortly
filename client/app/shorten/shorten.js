angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};
  $scope.addLink = function () {
    Links.addOne($scope.link)
      .then(function(data) {
        console.log('=======added link ======', data);
      })
      .catch(function(error) {
        console.error('error at addLink', error);
      });
  };
});
