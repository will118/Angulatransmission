'use strict';

var myApp = angular.module('angulatransmissionApp')
  .controller('SettingCtrl', function ($scope, $location, Session) {

  // $scope.ipAddress = '192.168.1.80';
  $scope.ipAddress = '127.0.0.1';
  $scope.selectedIp = undefined;
  $scope.ips = ['192.168.1.80','127.0.0.1'];

  $scope.checkModel = {
    downloadDir: true,
    rateUpload: true,
    eta: false,
    totalSize: true,
    status: true,
    remove: true,
    uploadedEver: true
  };

  $scope.go = function (path) {
     $location.path(path);
  };

  // $scope.settingsBuilder = function() {
  //   $scope.listSettings = settingsBuilder($scope.checkModel);
  // };

  var torrentStats = function() {
    Session.torrentStats($scope.session, $scope.ipAddress).then(function(data) {
      if (angular.isString(data)) {
        $scope.session = data;
      } else {
        $scope.stats = data['arguments']['cumulative-stats'];
      }
    });
  };

  $scope.hoursCalc = function (seconds) {
    return hoursCalc(seconds);
  };
  $scope.byteCalc = function (bytes) {
    return byteCalc(bytes);
  };

  setInterval(function(){
    $scope.$apply(function() {
       torrentStats();
    });
  }, 3337);

});

