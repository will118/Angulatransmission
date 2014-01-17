'use strict';

angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, Session) {

  $scope.alerts = [];
  $scope.ipAddress = '192.168.1.80';
  $scope.dynamic = 40;
  $scope.max = 100;
  $scope.setting = false;
  $scope.selectedIp = undefined;
  $scope.ips = ['192.168.1.80','127.0.0.1'];

  var sessionGet = function() {
    Session.get($scope.ipAddress).then(function(data) {
      $scope.session = data;
    });
  };

  $scope.addAlert = function(text) {
    $scope.alerts.push({msg: text});
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.changeIp = function () {
    $scope.ipAddress = $scope.selectedIp;
  };

  var listTorrents = function(id) {
    Session.listTorrents(id, $scope.ipAddress).then(function(data) {
      $scope.torrents = data['arguments']['torrents'];
    });
  };

  $scope.refreshList = function () {
    listTorrents($scope.session);
  };

  $scope.byteCalc = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  };

  $scope.settingsToggle = function () {
    if ($scope.setting === true) {
      $scope.setting = false;
    } else {
      $scope.setting = true;
    };
  };

   $scope.checkModel = {
    left: false,
    middle: true,
    right: false
   };

  $scope.percentCalc = function (inputDouble) {
    return inputDouble * 100 + '%';
  };

  sessionGet();
  $scope.$watch('session',
   function () {
     $scope.refreshList();
   });
});

