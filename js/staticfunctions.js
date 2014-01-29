var devip = '192.168.1.80';

var settingsBuilder = function(p) {
    var presets = [ 'id', 'name', 'rateDownload', 'percentDone'];
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        if (p[key]) {
          if (typeof p[key] === 'boolean') {
             presets.push(key);
          }
        }
      }
    }
     console.log(presets);
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

var abler = function (bool) {
  if (bool == false) {
    return 'Disabled'
  } else if (bool == true) {
    return 'Enabled'
  } else {
    return undefined
  }
};


