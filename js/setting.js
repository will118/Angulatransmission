'use strict';

var myApp = angular.module('angulatransmissionApp')
  .controller('SettingCtrl', function ($scope, $location, Session) {

  $scope.ipAddress = '192.168.1.80';
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

  $scope.settingsBuilder = function() {

    var p = $scope.checkModel;
    var presets = [ 'id', 'name', 'rateDownload', 'percentDone'];

    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        if (p[key]) {
        presets.push(key);
        }
      }
    }
    $scope.listSettings = presets;
  };

  $scope.go = function (path) {
     $location.path(path);
  };

  $scope.settingsBuilder();
});

