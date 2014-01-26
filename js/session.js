'use strict';

var app = angular.module('angulatransmissionApp.sessions', []);

var baseUrl = function (ip) {
  return 'http://' + ip + ':9091/transmission/rpc';
}

app.factory('Session', function($http, $q, $base64) {
  var ipAddress = '192.168.1.80';
  var methods = {};

  methods.listSettings = function(sessionId, ipAddress) {
    var deferSettingList = $q.defer();
    var postData = {'method': 'session-get'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data, status, headers, config) {
      deferSettingList.resolve(data);
    }).
      error(function(_data_, _status_, headers, _config_) {
      deferSettingList.resolve(headers()['x-transmission-session-id']);
    });
    return deferSettingList.promise;
  };

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

  methods.torrentStats = function(sessionId, ipAddress) {
    var deferStats = $q.defer();
    var postData = {'arguments': {'fields': 'cumulative-stats'}, 'method': 'session-stats'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data, status, headers, config) {
      deferStats.resolve(data);
    }).
      error(function(_data_, _status_, headers, _config_) {
      deferStats.resolve(headers()['x-transmission-session-id']);
    });
    return deferStats.promise;
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

  methods.removeTorrent = function(sessionId, ipAddress, id) {
    var deferRemove = $q.defer();
    var postData = {'arguments': { 'ids' : id, 'delete-local-data' : true }, 'method': 'torrent-remove'};
    $http({
          url: baseUrl(ipAddress),
          method: "POST",
          data: postData,
          headers: {'X-Transmission-Session-Id': sessionId}
    })
    .success(function(data) {
      deferRemove.resolve(data);
    })
    .error(function(_data_, _status_, headers, _config_) {
      deferRemove.resolve(headers()['x-transmission-session-id']);
    });
    return deferRemove.promise;
  };

  return methods;
});


