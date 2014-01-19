'use strict';

angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, Session, $base64) {

  $scope.alerts = [];
  $scope.ipAddress = '192.168.1.80';
  $scope.dynamic = 40;
  $scope.max = 100;
  $scope.setting = false;
  $scope.selectedIp = undefined;
  $scope.ips = ['192.168.1.80','127.0.0.1'];

  $scope.checkModel = {
    downloadDir: true,
    rateUpload: true,
    eta: false,
    totalSize: true
  };

  console.log($scope.checkModel.totalSize);
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
      console.log(presets);
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

  $scope.percentCalc = function (inputDouble) {
    var percent = inputDouble * 100;
    return percent.toFixed(2) + '%';
  };

  setInterval(function(){
    $scope.$apply(function() {
      $scope.refreshList();
    });
  }, 1337);

  var fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function(e) {
   var file = fileInput.files[0];
   var reader = new FileReader();

    reader.onload = function(e) {
      addTorrent($scope.session, reader.result);
    };
  reader.readAsBinaryString(file);
  });
});

