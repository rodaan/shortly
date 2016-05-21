angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};
  $scope.showMessage = false;
  $scope.submitting = function() {
    if ($scope.showMessage) {
      $scope.showMessage = false;
    } else {
      $scope.showMessage = true;
    }
  };
  $scope.addLink = function () {
    Links.addOne($scope.link)
      .then(function(data) {
        console.log('=======added link ======', data);
        $scope.submitting();
        $scope.link.url = '';
      })
      .catch(function(error) {
        console.error('error at addLink', error);
      });
  };
});
