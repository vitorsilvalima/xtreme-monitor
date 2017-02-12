const systeminformation = require("systeminformation");

var cpuSparkData = undefined;
var donutArray = undefined;
var cpuSparkChart = undefined;
var nCores = undefined;

var initialize = new Promise(
        function(resolve, reject) {

            systeminformation.cpu( data => {
                    cpuSparkData = [];
                    nCores = data.cores;
                    console.log(cpuSparkData.length);

                    for(var i = 0; i < nCores ; i++){
                        cpuSparkData.push(['Core '+i]);
                    }
                    console.log(cpuSparkData.length);

                    donutArray = [
                        ["Used",0],
                        ["Available", 100]
                    ];

                    resolve();
            });
            
        }
);

initialize.then(()=>{

    /**** CPU ******/
    var cpuDonutConfig = $().c3ChartDefaults().getDefaultDonutConfig('A');

    

    //var sparkline

    cpuDonutConfig.bindto = '#cpu-donut';
    cpuDonutConfig.color =  {
        pattern: ["#EC7A08","#D1D1D1"]
    };
    cpuDonutConfig.data = {
        type: "donut",
        columns: donutArray,
        groups: [
            ["used", "available"]
        ],
        order: null
    };
    cpuDonutConfig.tooltip = {
        contents: function (d) {
            return '<span class="donut-tooltip-pf" style="white-space: nowrap;">' +
                    Math.round(d[0].ratio * 100) + '%' + ' Gbps ' + d[0].name +
                    '</span>';
        }
    };

    var cpuDonutChart = c3.generate(cpuDonutConfig);

    var cpuDonutChartTitle = d3.select("#cpu-donut").select('text.c3-chart-arcs-title');
    cpuDonutChartTitle.text("");
    cpuDonutChartTitle.insert('tspan').text("1100").classed('donut-title-big-pf', true).attr('dy', 0).attr('x', 0);
    cpuDonutChartTitle.insert('tspan').text("Gbps Used").classed('donut-title-small-pf', true).attr('dy', 20).attr('x', 0);



    var sparklineConfig = $().c3ChartDefaults().getDefaultSparklineConfig();
    
    sparklineConfig.bindto = '#cpu-sparkline';

    sparklineConfig.tooltip = {
        contents: function (d) {
            
            var str = "";
            for(var i=0; i< d.length;i++){
                str+='<span class="donut-tooltip-pf" style="white-space: nowrap;">' 
                        +
                            d[i].name + ": "+ d[i].value
                        +
                '</span>';
            }

            return str;
        }
    };

    sparklineConfig.data = {
    columns: cpuSparkData,
    type: 'area'
    };

    cpuSparkChart = c3.generate(sparklineConfig);

})//end creation


function updateChart(){

    if(cpuSparkData && cpuSparkChart){

        systeminformation.currentLoad( data => {

            var remove = false;

            if(cpuSparkData[0].length>30){
                var remove = true;                
            }        
            
            for(var i = 0; i < data.cpus.length && data.cpus.length == nCores; i++){
                var load = parseFloat(data.cpus[i].load).toFixed(0);
                console.log(cpuSparkData.length);
                cpuSparkData[i].push(load);
                if(remove){
                    cpuSparkData[i].splice(1,1);
                }
            }

            cpuSparkChart.load({columns: cpuSparkData});

        });

    }


}updateChart();

setInterval(updateChart,1000);