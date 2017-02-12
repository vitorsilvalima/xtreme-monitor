var app = angular.module('monitorApp');

app.controller('monitorCtrl', function( $scope, $interval, systeminformation , cpu, utilService ){

systeminformation.cpu()
    .then(data => {
      console.log(data.speed)
    }
    )
    .catch(error => console.error(error));

    systeminformation.currentLoad()
    .then(data => {
      console.log("current load: "+ data.currentload)
      for( var i = 0; i < data.cpus.length ; i++){

        console.log(i+": "+data.cpus[i].load)

      }
      //console.log(data.cpus)
    }
    )
    .catch(error => console.error(error));








const si          = systeminformation;
$scope.availLabel = "used";
 $scope.custConfig = {
    'chartId': 'availChart',
    'units': 'GB',
    'thresholds':{'warning':'60','error':'90'},
    "legend":{"show":true},
    'tooltipFn': function (d) {
      return '<span class="donut-tooltip-pf"style="white-space: nowrap;">' +
               d[0].value + ' ' + d[0].name +
             '</span>';
      },/*
    'centerLabelFn': function () {
      return $scope.custData.available + " GB"
      +'/'+$scope.custData.total + " GB";
    },
    'onClickFn': function (d, i) {
      alert("You Clicked On The Donut!");
      }*/
    };

  $scope.custData = {
    'dataAvailable': false,
  };


  $scope.custChartHeight = 200;


var k = 2;


 $scope.config = {
    chartId: 'exampleSparkline',
    tooltipType: 'default',
    units: '%'
  };
 
  var today = new Date();
  var dates = ['dates'];
  for (var d = 3 - 1; d >= 0; d--) {
    dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
  }
  
  var arr = ['%', 30, 200, 100, 400, 150, 250, 20, 80, 0, 400, 500, 1000, 2000, 200];
  var arr2 = ['n'];
  var i = 0;
  for(; i<arr.length;i++){
    arr2.push(i);
  }


  $scope.data = {
    dataAvailable: true,
    total: 2000,
    xData: arr2,
    yData: arr,
    type: 'area'
  };
  console.log(dates.length);
 
  $scope.custShowXAxis = false;
  $scope.custShowYAxis = false;


  $scope.custChartHeight2 = 60;


    $interval( function()
    {

        arr.push(Math.floor((Math.random() * 2000) + 30));
        si.mem( ( ram ) =>
        {
            var usedMem  = ram.total - ram.available
            var totalMem = ram.total
            var percent = utilService.getPercentage(ram.total,ram.available );
 
            console.log(ram);
            $scope.custData.dataAvailable = true;
            $scope.custData.used = utilService.formatBytes(usedMem, 0);
            $scope.custData.total = utilService.formatBytes((totalMem), 0);

        });

    systeminformation.currentLoad()
    .then(data => {
      console.log("current load: "+ data.currentload)
      i++;
      $scope.data.xData.push(i);
      $scope.data.yData.push(data.currentload);
    }
    )
    .catch(error => console.error(error));

    }, 1000);




});


