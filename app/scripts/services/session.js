'use strict';


var app = angular.module('angulatransmissionApp.sessions', []);

var baseUrl = function (ip) {
  return 'http://' + ip + ':9091/transmission/rpc';
}

app.factory('Session', function($http, $q) {
  var ipAddress = '192.168.1.80';
  var methods = {};
  methods.get = function() {
    var defer = $q.defer();
    $http.get(baseUrl(ipAddress), {
      cache: false
    }).success(function(data) {
      defer.resolve(data);
    }).
      error(function(_data_, _status_, headers, _config_) {
      defer.resolve(headers()['x-transmission-session-id']);
    });
    return defer.promise;
  };
  methods.listTorrents = function(sessionId, ipAddress) {
    var deferList = $q.defer();
    var postData = {'arguments': { 'fields': [ 'id', 'name', 'totalSize', 'rateDownload', 'downloadDir', 'percentDone']}, 'method': 'torrent-get'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data) {
      deferList.resolve(data);
    });
    return deferList.promise;
  };
  return methods;
});


