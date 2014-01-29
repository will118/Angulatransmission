'use strict';

var myApp = angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, Session, $location, $base64, $localStorage) {

  $scope.$storage = $localStorage.$default({
        downloadDir: true,
        rateUpload: true,
        eta: false,
        totalSize: true,
        status: true,
        remove: true,
        uploadedEver: true
  });

  $scope.alerts = [];
  $scope.ipAddress = devip;
  $scope.selectedIp = undefined;
  $scope.ips = ['192.168.1.80','127.0.0.1'];

  $scope.go = function (path) {
     $location.path(path);
  };

  $scope.listSettings = function() {
    return settingsBuilder($scope.$storage);
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

  $scope.statusFilter = function (num) {
    if (num == 6){
       return "<span class='glyphicon glyphicon-cloud-upload'></span>";
    } else if (num == 4){
       return "<span class='glyphicon glyphicon-cloud-download'></span>";
    } else if (num == 3){
       return "<span class='glyphicon glyphicon-time'></span>";
    } else if (num === 0){
       return "<span class='glyphicon glyphicon-pause'></span>";
    } else {
       return "Unknown";
    };
  };

  $scope.removeTorrent = function(id) {
    Session.removeTorrent($scope.session, $scope.ipAddress, id);
  };

  var listTorrents = function() {
    Session.listTorrents($scope.session, $scope.ipAddress, $scope.listSettings()).then(function(data) {
      if (angular.isString(data)) {
        $scope.session = data;
      } else {
        $scope.torrents = data['arguments']['torrents'];
      }
    });
  };

  var addTorrent = function(id, file) {
    Session.addTorrent(id, $scope.ipAddress, file);
  };

  $scope.refreshList = function () {
    listTorrents();
  };

  $scope.byteCalc = function (bytes) {
    return byteCalc(bytes);
  };

  $scope.settingsToggle = function () {
    if ($scope.setting === true) {
      $scope.setting = false;
    } else {
      $scope.setting = true;
    };
  };

  $scope.percentCalc = function (inputDouble) {
    var percent = inputDouble * 100;
    return percent.toFixed(2) + '%';
  };

  setInterval(function(){
    $scope.$apply(function() {
      $scope.refreshList();
    });
  }, 113337);
});

