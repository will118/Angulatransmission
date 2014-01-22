'use strict';

angular.module('angulatransmissionApp')
  .controller('MainCtrl', function ($scope, $http, Session, $base64) {

  $scope.ipAddress = '192.168.1.80';
  $scope.session = undefined;

  var addTorrent = function(id, file) {
    Session.addTorrent(id, $scope.ipAddress, file).then(function(data) {
      if (angular.isString(data)) {
        $scope.session = data;
        addTorrent($scope.session, file);
      } else {
        console.log('Success');
      }
    });
  };

  var oneButtonUpload = function(url) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "blob";

    oReq.onload = function(oEvent) {
        var blob = oReq.response;
        var reader = new FileReader();
        reader.onload = function(e) {
          addTorrent($scope.session, reader.result);
        };
        reader.readAsBinaryString(blob);
        };
     oReq.send();
  };

  var chromeInject = function() {
    chrome.contextMenus.create({
      id: 'open',
      title: chrome.i18n.getMessage('openContextMenuTitle'),
      contexts: ['link']
    });
    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      oneButtonUpload(info.linkUrl);
    });
  };
  chromeInject();

});
document.body.innerHTML = '<div ng-controller=MainCtrl>';
angular.bootstrap(document.body, ['angulatransmissionApp']);

