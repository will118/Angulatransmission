'use strict';
var settingsBuilder = function(p) {
    var presets = [ 'id', 'name', 'rateDownload', 'percentDone'];
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        if (p[key]) {
        presets.push(key);
        }
      }
    }
    return presets;
  };
var byteCalc = function (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

var hoursCalc = function (seconds) {
    return (Math.round(seconds/3600) + ' hours');
};

var myApp = angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, Session, $location, $base64) {

  $scope.alerts = [];
  // $scope.ipAddress = '192.168.1.80';
  $scope.ipAddress = '127.0.0.1';
  $scope.selectedIp = undefined;
  $scope.ips = ['192.168.1.80','127.0.0.1'];

  $scope.go = function (path) {
     $location.path(path);
  };

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
     $scope.listSettings = settingsBuilder($scope.checkModel);
  };

  $scope.settingsBuilder();

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
       return "Seeding";
    } else if (num == 4){
       return "Downloading";
    } else if (num == 3){
       return "Queued";
    } else if (num === 0){
       return "Paused";
    } else {
       return "Unknown";
    };
  };

  $scope.removeTorrent = function(id) {
    Session.removeTorrent($scope.session, $scope.ipAddress, id);
  };

  var listTorrents = function() {
    Session.listTorrents($scope.session, $scope.ipAddress, $scope.listSettings).then(function(data) {
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
  }, 3337);
});

