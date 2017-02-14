(function() {
    'use strict';
    const ProgressBar = require('progressbar.js');
    const systeminformation = require('systeminformation');
    const {properties} = require('./js/config.js');
    const sparkline = require("jquery-sparkline");

    var cpuLoad = 0;
    var ramUsed = 0;
    var ramTotal = 0;


    var cpuDonutChart = createDonutChart(properties.cpuDonutID, properties.cpuDelay);
    var ramDonutChart = createDonutChart(properties.ramDonutID, properties.ramDelay);

    var ramData = [];
    var cpuData = [];


    /* Memory  */
    setInterval(function(){

        systeminformation.mem(data =>{
            
            ramUsed  = data.total - data.available;
            ramTotal = data.total;

            ramDonutChart.animate(ramUsed/ramTotal);
            updateSparkLineChart(properties.ramSparklineID, (ramUsed/ramTotal)*100);
            
        })


    }, properties.ramDelay);

    /* CPU */
    setInterval(()=>{
        
        systeminformation.currentLoad(data =>{
            
            var cpuLoad = data.currentload;

            cpuDonutChart.animate(cpuLoad / 100);
            updateSparkLineChart(properties.cpuSparklineID, cpuLoad);

        })


    }, properties.ramDelay);



    function updateSparkLineChart(id, value){

        var options = {
            type: 'line',
            width: '100%',
            height: '50',
            chartRangeMin: 1,
            chartRangeMax: 100,
            lineColor: '#AAAAAA',
            fillColor: '#AAAAAA'
        };

        var data = undefined;
        if(id == properties.cpuSparklineID){

            data = cpuData;
            
        }else if(id == properties.ramSparklineID){

            data = ramData;

        }

        if(value){

            data.push(value);

            if(data.length>30){
                data.splice(0,1);
            }

        }


        $(id).sparkline(data, options);

    }


    function createDonutChart(id, duration){

        var bar = new ProgressBar.Circle(id, {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: duration,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
                if(id == properties.cpuDonutID)
                {
                    circle.setText(Math.round(circle.value() * 100) + "%")
                }
                else if(id == properties.ramDonutID)
                {
                    circle.setText(formatBytes(ramUsed, 2));
                }

            }
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';
        return bar;
        
    }

    function formatBytes(bytes,decimals) {

            if(bytes == 0) return '0 Bytes';
            var k = 1024;
            var dm = decimals  || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));// +' '+ sizes[i];
            
    };




var sparklineLogin = function() {
 var myvalues = [10,8,5,7,4,4,1,10,8,5,7,4,4,1];
    $('.chart-pf-sparkline').sparkline(myvalues,{
    type: 'line',
    width: '100%',
    height: '50'});
}
	var sparkResize;

	/*$(window).resize(function(e) {
		clearTimeout(sparkResize);
		sparkResize = setTimeout(sparklineLogin, 10);
	});
	sparklineLogin();*/


    })();