var app = angular.module('monitorApp', [
	'patternfly',
	'angular-electron',
	'patternfly.charts',
	'LocalStorageModule'
]);

app.config(function(remoteProvider){

	remoteProvider.register('systeminformation');
	//remoteProvider.register({name: 'cpu', require: 'cpu-usage'});
	remoteProvider.register('cpu', function(remote) {
    	return remote.require('cpu-usage');
  	});

});
/*
const libCpuUsage = require('cpu-usage')
const si          = require('systeminformation')


var c3ChartDefaults = $().c3ChartDefaults();
var utilizationDonutChartConfig = c3ChartDefaults.getDefaultDonutConfig('A');
	utilizationDonutChartConfig.bindto = '#donut-chart-6';
	utilizationDonutChartConfig.data = {
		type: "donut",
		columns: [
			["Used", 0],
			["Available", 100]
		],
		groups: [
			["used", "available"]
		],
		order: null
	};
	utilizationDonutChartConfig.size = {
		width: 200,
		height: 171
	};

	utilizationDonutChartConfig.tooltip = {
		contents: $().pfGetUtilizationDonutTooltipContentsFn('%')
	};
	var utilizationDonutChart = c3.generate(utilizationDonutChartConfig);


var memoryChartConfig = c3ChartDefaults.getDefaultDonutConfig('A');
	memoryChartConfig.bindto = '#donut-chart-7';
	memoryChartConfig.data = {
		type: "donut",
		columns: [
			["Used", 0],
			["Available", 100]
		],
		groups: [
			["used", "available"]
		],
		order: null
	};
	memoryChartConfig.size = {
		width: 200,
		height: 171
	};

	memoryChartConfig.tooltip = {
		contents: $().pfGetUtilizationDonutTooltipContentsFn('%')
	};
	var memoryDonutChart = c3.generate(memoryChartConfig);



libCpuUsage(1000, function(val)
{
		console.log(val) ;
		$().pfSetDonutChartTitle("#donut-chart-6", val, "% CPU Used");

		utilizationDonutChart.load({    columns: [
			["Used", val],
			["Available", (100-val)]
		]});
});

//@disfated & @MathieuLescure
function formatBytes(bytes,decimals) {
	 if(bytes == 0) return '0 Bytes';
	 var k = 1000,
			 dm = decimals + 1 || 3,
			 sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			 i = Math.floor(Math.log(bytes) / Math.log(k));
	 return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
 function percentage(total, value){
	 var t = 100.0 / total;
	 return t * value;
 }


 setInterval( function()
	{
		si.mem( ( ram ) =>
		{
			var usedMem  = ram.total - ram.available
			var totalMem = ram.total
			var percent = percentage(ram.total,ram.available );
			$().pfSetDonutChartTitle("#donut-chart-7", formatBytes(ram.available,1), "/"+formatBytes(ram.total,1));

			memoryDonutChart.load({
				columns: [
			["Used", percent],
			["Available", (100 - percent)]
		]});

		});

	}, 1000);
	*/