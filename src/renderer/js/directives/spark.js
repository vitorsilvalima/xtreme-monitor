var app = angular.module('monitorApp');

app.directive('mySpark', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      config: '=',
      chartData: '=',
      chartHeight: '=?',
      showXAxis: '=?',
      showYAxis: '=?'
    },
    replace: true,
    template: '<div id="chart"></div>',
    controller: ['$scope',
      function ($scope) {

          var arr = ['sample', 30, 200, 100, 400, 150, 250, 20, 80, 0, 400, 500, 1000, 2000, 200];
          var chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    arr
                ]
            },
            legend: {
                show: false
            }, tooltip:{show:false},
                    axis: {
                    x: {show:false},
                    y: {show:false}
                }, size: {height:300, width:800},     point: {
                show: false
            }
        });

        setInterval(function(){
            var i = arr.push(Math.floor((Math.random() * 2000) + 30));
        arr.push(i);
        chart.load({
            columns: [ arr ]
        })


/*var chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    arr
                ]
            },
            legend: {
                show: false
            }, tooltip:{show:false},
                    axis: {
                    x: {show:false},
                    y: {show:false}
                }, size: {height:300, width:800},     point: {
                show: false
            }
        });*/








        },1000);

      }],

    link: function (scope) {
      scope.$watch('config', function () {
        scope.config.data = pfUtils.merge(scope.config.data, scope.getSparklineData(scope.chartData));
        scope.chartConfig = pfUtils.merge(scope.defaultConfig, scope.config);
      }, true);
      scope.$watch('chartHeight', function () {
        if (scope.chartHeight) {
          scope.chartConfig.size.height = scope.chartHeight;
        }
      });
      scope.$watch('showXAxis', function () {
        scope.chartConfig.axis.x.show = scope.showXAxis === true;
      });
      scope.$watch('showYAxis', function () {
        scope.chartConfig.axis.y.show = scope.showYAxis === true;
      });
      scope.$watch('chartData', function () {
        scope.chartConfig.data = pfUtils.merge(scope.chartConfig.data, scope.getSparklineData(scope.chartData));
      }, true);
    }
  };
}
);