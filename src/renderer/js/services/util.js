var app = angular.module('monitorApp');

app.factory("utilService", function(){
    var service = {};

    //@disfated & @MathieuLescure
    service.formatBytes = function (bytes,decimals) {

        if(bytes == 0) return '0 Bytes';
        var k = 1000,
                dm = decimals + 1 || 3,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));// + ' ' + sizes[i];
        
    };

    service.formatBytesSize = function (bytes,decimals) {

        if(bytes == 0) return '0 Bytes';
        var k = 1000,
                dm = decimals  || 3,
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))+ ' ' + sizes[i];
        
    };


    service.getPercentage = function (total, value){

        var t = 100.0 / total;
        return t * value;

    }

    return service;
})