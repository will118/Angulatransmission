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

  var torrentStats = function() {
    Session.torrentStats($scope.session, $scope.ipAddress).then(function(data) {
      if (angular.isString(data)) {
        $scope.session = data;
      } else {
        $scope.stats = data;
      }
    });
  };

  setInterval(function(){
    $scope.$apply(function() {
       torrentStats();
    });
  }, 3337);

});
myApp.directive('bars', function ($parse) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div id="chart"></div>',
    link: function (scope, element, attrs) {
    var data = attrs.data.split(','),
    chart = d3.select('#chart')
      .append("div").attr("class", "chart")
      .selectAll('div')
      .data(data).enter()
      .append("div")
      .transition().ease("elastic")
      .style("width", function(d) { return d + "%"; })
      .text(function(d) { return d + "%"; });
    }
  };
});
