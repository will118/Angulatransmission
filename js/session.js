'use strict';

var app = angular.module('angulatransmissionApp.sessions', []);

var baseUrl = function (ip) {
  return 'http://' + ip + ':9091/transmission/rpc';
}

app.factory('Session', function($http, $q, $base64) {
  var ipAddress = '192.168.1.80';
  var methods = {};

  methods.listTorrents = function(sessionId, ipAddress, settings) {
    var deferList = $q.defer();
    var postData = {'arguments': { 'fields': settings}, 'method': 'torrent-get'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data, status, headers, config) {
      deferList.resolve(data);
    }).
      error(function(_data_, _status_, headers, _config_) {
      deferList.resolve(headers()['x-transmission-session-id']);
    });
    return deferList.promise;
  };

  methods.addTorrent = function(sessionId, ipAddress, inputFile) {
    var deferAdd = $q.defer();
    var metainfo = $base64.encode(inputFile);
    var postData = {'arguments': { 'metainfo' : metainfo }, 'method': 'torrent-add'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data) {
      deferAdd.resolve(data);
    })
    .error(function(_data_, _status_, headers, _config_) {
      deferAdd.resolve(headers()['x-transmission-session-id']);
    });
    return deferAdd.promise;
  };

  return methods;
});


