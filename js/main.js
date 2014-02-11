'use strict';

var devip = '192.168.1.80';

var myApp = angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, Session, $base64, $localStorage) {

  $scope.$storage = $localStorage.$default({
        downloadDir: true,
        rateUpload: true,
        eta: false,
        totalSize: true,
        status: true,
        remove: true,
        uploadedEver: true
  });

  $scope.$storage.ipAddress = devip;

  $scope.alerts = [];

  $scope.listSettings = function() {
    return settingsBuilder($scope.$storage);
  };

  $scope.addAlert = function(text) {
    $scope.alerts.push({msg: text});
  };
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
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

  $scope.stopStartFilter = function (num) {
    if (num === 0){
       return "<span class='glyphicon glyphicon-play'></span>";
    } else {
       return "<span class='glyphicon glyphicon-stop'></span>";
    }
  };

  $scope.removeTorrent = function(id) {
    Session.removeTorrent($scope.session, $scope.$storage.ipAddress, id);
  };

  var stopTorrent = function(id) {
    Session.stopTorrent($scope.session, $scope.$storage.ipAddress, id);
  };

  var restartTorrent = function(id) {
    Session.restartTorrent($scope.session, $scope.$storage.ipAddress, id);
  };

  $scope.torrentStopStarter = function(id, status){
     if (status === 0){
       restartTorrent(id);
    } else {
       stopTorrent(id);
    }
  };

  var listTorrents = function() {
    Session.listTorrents($scope.session, $scope.$storage.ipAddress, $scope.listSettings()).then(function(data) {
      if (angular.isString(data)) {
        $scope.session = data;
      } else {
        $scope.torrents = data['arguments']['torrents'];
      }
    });
  };

  var addTorrent = function(id, file) {
    Session.addTorrent(id, $scope.$storage.ipAddress, file);
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
  }, 1337);
});

