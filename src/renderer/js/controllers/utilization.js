var app = angular.module('monitorApp');

app.controller('utilizationCtrl', function($log, $scope, $interval, systeminformation , utilService ){

    /* ALL */
    $scope.custShowXAxis = false;
    $scope.custShowYAxis = false;
    $scope.custChartHeight = 60;

    /* Memory Initial Config */
    $scope.memoryConfig = {};
    
    $scope.memoryConfig.centerLabel = 'used';

    $scope.memoryConfig.cardConfig = {
        title: 'Memory',
        units: 'GB'
    };

    $scope.memoryConfig.donutConfig = {
        units: 'GB',
        thresholds: {'warning':'60','error':'90'}
    };

    $scope.memoryConfig.sparklineConfig = {
        tooltipType: 'default',
        units: 'GB'
    };

    $scope.memoryData = {
        dataAvailable: true,
        used: 0,
        total: 0,
        xData: ['date'],
        yData: ['GB used']
    };
  
    /* CPU Initial Config */
    $scope.memoryConfig = {};
    
    $scope.memoryConfig.centerLabel = 'used';

    $scope.memoryConfig.cardConfig = {
        title: 'Memory',
        units: 'GB'
    };

    $scope.memoryConfig.donutConfig = {
        units: 'GB',
        thresholds: {'warning':'60','error':'90'}
    };

    $scope.memoryConfig.sparklineConfig = {
        tooltipType: 'default',
        units: 'GB'
    };

    $scope.memoryData = {
        dataAvailable: true,
        used: 0,
        total: 0,
        xData: ['date'],
        yData: ['GB used']
    };




    var timer = $interval( function(){

        systeminformation.mem(data => {

            $log.debug("Memory used");
            $log.debug(data);

            $scope.memoryData.used = utilService.formatBytes(data.used, 0);
            $scope.memoryData.total = utilService.formatBytes(data.total, 0);          
            $scope.memoryData.xData.push( new Date() );
            $scope.memoryData.yData.push( utilService.formatBytes(data.used, 0) );

            
            if($scope.memoryData.xData.length > 60){
                $scope.memoryData.xData.slice(1,1);
                $scope.memoryData.yData.slice(1,1);
            }
       
        });





    }, 1000);

});


