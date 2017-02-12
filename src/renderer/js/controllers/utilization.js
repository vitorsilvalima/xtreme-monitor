var app = angular.module('monitorApp');

app.controller('utilizationCtrl', function($log, $scope, $interval, systeminformation , utilService, diskspace ){

    /* ALL */
    $scope.custShowXAxis = false;
    $scope.custShowYAxis = false;
    $scope.custChartHeight = 60;
    var nItems = 30;
    var interval = 1000;

    /* Memory Initial Config */
    $scope.memoryConfig = {};
    
    $scope.memoryConfig.centerLabel = 'used';

    $scope.memoryConfig.cardConfig = {
        title: 'Memory',
        units: 'GB'
    };

    $scope.memoryConfig.donutConfig = {
        chartId:'memoryDonutChart',
        units: 'GB',
        thresholds: {'warning':'60','error':'90'}
    };

    $scope.memoryConfig.sparklineConfig = {
        chartId:'memorySparkChart',
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

    $scope.cpuConfig = {};
    
    $scope.cpuConfig.centerLabel = 'used';

    $scope.cpuConfig.cardConfig = {
        title: 'CPU',
        units: '%'
    };

    $scope.cpuConfig.donutConfig = {
        chartId:'cpuDonutChart',
        units: '%',
        thresholds: {'warning':'60','error':'90'}
    };

    $scope.cpuConfig.sparklineConfig = {
        chartId:'cpuSparkChart',
        tooltipType: 'default',
        units: '%'
    };

    $scope.cpuData = {
        dataAvailable: true,
        used: 0,
        total: 100,
        xData: ['date'],
        yData: ['% used'],
        currentSpeed : 0,
        name: ""
    };

    /* Network */
    $scope.networkData = {
        name : undefined,
        upload: 0,
        download: 0
    };

    systeminformation.networkInterfaceDefault(data => {
        $scope.networkData.name = data;
        $log.debug("Default network"+ data );
    });




    var timer = $interval( function(){

        systeminformation.mem(data => {

            $log.debug("Memory used");
            $log.debug(data);

            $scope.memoryData.used = utilService.formatBytes(data.used, 0);
            $scope.memoryData.total = utilService.formatBytes(data.total, 0);          
            $scope.memoryData.xData.push( new Date() );
            $scope.memoryData.yData.push( utilService.formatBytes(data.used, 0) );

            
            if($scope.memoryData.xData.length > nItems){
                $scope.memoryData.xData.splice(1,1);
                $scope.memoryData.yData.splice(1,1);
            }
       
        });

        systeminformation.currentLoad(data => {

            $log.debug("CPU LOAD used");
            $log.debug(data);

            var load = parseFloat(data.currentload).toFixed(2);
            $scope.cpuData.used = load;        
            $scope.cpuData.xData.push( new Date() );
            $scope.cpuData.yData.push(load);

            
            if($scope.cpuData.xData.length > nItems){
                $scope.cpuData.xData.splice(1,1);
                $scope.cpuData.yData.splice(1,1);
            }
       
        });

        systeminformation.disksIO(data => {

            console.log(data);

        });


        systeminformation.cpu(data => {

            $log.debug("************ CPU INFO *************");
            $log.debug("Speed: "+ data.speed);
            $log.debug("Brand: "+data.brand);
            $scope.cpuData.name = data.brand;
            $log.debug("Cores: "+data.cores);
            $log.debug("Manufacturer: "+data.manufacturer);

        });

        systeminformation.cpuCurrentspeed(data => {

            $log.debug("Current speed: "+ data.avg);
            $scope.cpuData.currentLoad = data.avg;

        });

        if($scope.networkData.name){
            systeminformation.networkStats(data => {
                $scope.networkData.upload = utilService.formatBytesSize(data.tx_sec, 1);
                $scope.networkData.download = utilService.formatBytesSize(data.rx_sec, 1);
            });
        }


    }, interval);


  

});


