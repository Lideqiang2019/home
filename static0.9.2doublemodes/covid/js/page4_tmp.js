// var data_line = []; //线所需数据
// var data_point = []; //点所需数据
// var data_hour = []; //所需街区时间数据
// var data_weekend = []; //周末24小时人流柱形图数据
// var data_weekend_line = []; //周末24小时人流地图画线数据
// var data_weekend_point = []; //周末24小时人流地图画圈数据
// var data_point_all = []; //画圈数据
// var data_line_all = []; //画圈数据
// //var data_bar=[];//画柱形图数据
// var HOUR = 24; //时间
// var block_Id; //街道id
// var mode;
// var OD_TABLE = [];
// var OD_flag = 1;
// var OD_FLAG_HZ = '选择住址，绘制工作地分布';
// var cur_hour = 'H0'; //默认通勤流
// var j = 1; //根据OD-DO模式转换
// $.ajaxSetup({
//     async: false
// });


// 添加数据时间 
axios.get(latest_date)
    .then(function(response) {
        // handle success

        document.getElementById('table_time').innerHTML = "Results based on data by " + response.data.date;
        // document.getElementById('increased-list-title').innerHTML = "Increased Cases On " + response.data.date;
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });

//调用ajax接口数据，对其进行处理
function date_name(patient) {
    var date_name = [];
    for (var key in patient['confirmedData']) {
        // console.log(key + ":" + patient['confirmedData'][key]);
        date_name.push(key);
    };
    return date_name;
}
//调用ajax接口数据，对其进行处理
function patient_num(patient) {
    var nums = [];
    for (var key in patient['confirmedData']) {
        nums.push(patient['confirmedData'][key]);
    };
    return nums;
}

function increse_nums(patient_num) {
    var res = [];
    for (var i = 0; i < patient_num.length - 1; i++) {
        res[i] = patient_num[i + 1] - patient_num[i];
    }
    return res;
}


var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap['b' + i];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
var convertData1 = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap1[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function country_name(patient) {
    var date_name = [];
    for (var key in patient) {
        // console.log(key + ":" + patient['confirmedData'][key]);
        date_name.push(key);
    };
    return date_name;
}


function getlatestDate() {
    return axios.get(latest_date);
}

function getScatternums() {
    return axios.get(scatter_global);
}

// 将聚类的结果替换成visualMap可以表现的形式
function change_cluster_dataform(cluster_data) {
    cluster_num = 0
    for (var key in cluster_data) {
        num = cluster_data[key]['cluster'] + 1
        if (num > cluster_num) {
            cluster_num = num
        }
    }
    var res = []
    for (var i = 0; i < cluster_num; i += 1) {
        res.push([])
    }
    // var res = [[],[],[],[]];
    // for(var key in cluster_data){
    //     res[key] = [cluster_data[key]['X'],cluster_data[key]['Y'],cluster_data[key]['country'],cluster_data[key]['label']]
    // }
    for (var key in cluster_data) {
        res[cluster_data[key]['cluster']][key] = [cluster_data[key]['X'], cluster_data[key]['Y'], cluster_data[key]['Country'], cluster_data[key]['cluster'],
                cluster_data[key]['alpha'], cluster_data[key]['beta'], cluster_data[key]['gama1'], cluster_data[key]['gama2'], cluster_data[key]['b_decrease_rate']
            ]
            // if (cluster_data[key]['cluster'] == 0) {
            //     res[0][key] = [cluster_data[key]['X'], cluster_data[key]['Y'], cluster_data[key]['Country'], cluster_data[key]['cluster'],
            //         cluster_data[key]['alpha'], cluster_data[key]['beta'], cluster_data[key]['gama1'], cluster_data[key]['gama2'], cluster_data[key]['b_decrease_rate']
            //     ]
            // } else if (cluster_data[key]['cluster'] == 1) {
            //     res[1][key] = [cluster_data[key]['X'], cluster_data[key]['Y'], cluster_data[key]['Country'], cluster_data[key]['cluster'],
            //         cluster_data[key]['alpha'], cluster_data[key]['beta'], cluster_data[key]['gama1'], cluster_data[key]['gama2'], cluster_data[key]['b_decrease_rate']
            //     ]
            // } else if (cluster_data[key]['cluster'] == 2) {
            //     res[2][key] = [cluster_data[key]['X'], cluster_data[key]['Y'], cluster_data[key]['Country'], cluster_data[key]['cluster'],
            //         cluster_data[key]['alpha'], cluster_data[key]['beta'], cluster_data[key]['gama1'], cluster_data[key]['gama2'], cluster_data[key]['b_decrease_rate']
            //     ]
            // } else {
            //     res[3][key] = [cluster_data[key]['X'], cluster_data[key]['Y'], cluster_data[key]['Country'], cluster_data[key]['cluster'],
            //         cluster_data[key]['alpha'], cluster_data[key]['beta'], cluster_data[key]['gama1'], cluster_data[key]['gama2'], cluster_data[key]['b_decrease_rate']
            //     ]
            // }
    }
    return res;
}

// function get_cluster_res(cluster_data){
//     res = [[],[],[],[]];
//     for(var i=0;i<cluster_data.length;i++){
//         if(cluster_data[i][3]==0){
//             res[0][i] = cluster_data[i]
//         }
//         else if(cluster_data[i][3]==1){
//             res[1][i] = cluster_data[i]
//         }
//         else if(cluster_data[i][3]==2){
//             res[2][i] = cluster_data[i]
//         }
//         else{
//             res[3][i] = cluster_data[i]
//         }
//     }
//     return res
// }
// function renderItem(params, api) {
//     var coords = [
//         [-1,0],
//         [-1,1],
//         [0,1],
//         [0.5,0.5],
//         [0,0]
//     ];
//     var points = [];
//     for (var i = 0; i < coords.length; i++) {
//         points.push(api.coord(coords[i]));
//     }
//     // var color = api.visual('color');

//     return {
//         type: 'polygon',
//         shape: {
//             points: echarts.graphic.clipPointsByRect(points, {
//                 x: params.x,
//                 y: params.y,
//                 width: params.width,
//                 height: params.height
//             })
//         },
//         style: api.style({
//             fill: color,
//             stroke: echarts.color.lift(color)
//         })
//     };
// }

// 将分类结果放到右侧表格中
function display_cluster(cases_data) {
    var source = "";
    for (var i = 0; i < cases_data.length; i++) {
        for (var v in cases_data[i]) {
            var v2 = Number(v) + 1;
            source = source + "<tr><th scope='row' style='text-align:right;'>" +
                cases_data[i][v][3] + "</th><td>" + cases_data[i][v][2] + "</td><td style='text-align:right;'>" + cases_data[i][v][4] + "</td><td style='text-align:right;'>" + cases_data[i][v][5] +
                "</td><td style='text-align:right;'>" + cases_data[i][v][6] + "</td><td style='text-align:right;'>" + cases_data[i][v][7] + "</td><td style='text-align:right;'>" + cases_data[i][v][8] +
                "</td></tr>";
            // xs.push(cases_data[v].name)
            // ys.push(cases_data[v].value)
        }
    }

    // $("#tableHead").html("<tr><th scope='col'>Rank</th><th scope='col'>Country</th><th scope='col'>Peak</th></tr>")
    $("#tableBody").html(source);
    // yname = 'Country';
    // xname = 'time';
}

function get_name_cluster(c_data) {
    res = [];
    for (var key in c_data) {
        res.push({
            name: c_data[key]["Country"],
            value: c_data[key]["cluster"],
        })
    }
    return res;
}


// 修改feature，将颜色属性添加到global.js里面，然后用map.on('load')和map.addLayers()重新加载地图。
// var Geomaps = globalData;
// function add_colors(cluster_data){
//     for(var i=0; i<globalData.features.length;i++){
//         if(cluster_data[i]){

//         }
//         Geomaps.features.push(
//             {

//             }
//         )
//     }
// }

// 初始化配色
// colors = ['blue', 'green', 'yellow', 'red']
colors = ["#FF9933", "#FFFF99", "#99FF99", "#33FFFF", "#9933CC", "#006699", "#FF6699"]
    // colors = ["#F08080", "#FFE878", "#CFECEB", "#F2FFF0"]

function display_cluster_map(c_data) {
    cluster_num = 0
    for (var key in c_data) {
        num = c_data[key]['cluster'] + 1
        if (num > cluster_num) {
            cluster_num = num
        }
    }
    c = []
    for (var i = 0; i < cluster_num; i += 1) {
        c.push(colors[i])

    }

    var cluster_data = get_name_cluster(c_data);
    console.log(cluster_data)
        // 用echarts map加载世界地图
    var myChart = echarts.init(document.getElementById('container'));
    option = {
        title: {
            left: 'center',
            top: 'top'
        },
        /* tooltip: {  
                trigger: 'item',  
                formatter: function (params) {  
                    var value = (params.value + '').split('.');  
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')  
                            + '.' + value[1];  
                    return params.seriesName + '<br/>' + params.name + ' : ' + value;  
                }  
            },*/
        visualMap: {
            min: 0,
            max: 3,
            // text: ['3', '0'],
            realtime: false,
            calculable: true,
            color: c.reverse(),
            // show: false
            // color: ['orangered', 'yellow', 'lightskyblue']
        },
        series: [{
            name: 'World Population (2010)',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle: {
                emphasis: { label: { show: true } },
                color: c
            },
            data: cluster_data
        }]
    };
    myChart.setOption(option);
}



function display_cluster_table(cluster_data) {
    var barcharts = echarts.init(document.getElementById("barChart-show"));
    cluster_num = cluster_data.length
    vis_map = []
    ser = []

    c = []
    for (var i = 0; i < cluster_num; i += 1) {
        c.push(colors[i])

    }

    for (var i = 0; i < cluster_num; i += 1) {
        // vis = {
        //     dimension: i + 1,
        //     color: [colors[i]],
        //     // colorAlpha: 1,
        //     // hoverLink: true,
        //     show: false
        // }
        // vis_map.push(vis);
        s = {
            name: "Cluster " + String(i),
            symbolSize: 10,
            data: cluster_data[i],
            type: 'scatter',
        }
        ser.push(s);
    }
    console.log(vis_map);
    option = {
        title: {
            show: true,
            text: "Cluster",
            x: 'left',
            y: 'top',
            textStyle: {
                color: '#BBBBC0',
                fontFamily: "gothic",
                fontSize: 15,
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: function(obj) {
                var value = obj.value;
                // return time[time.length - 1]+' '+obj.name + '：' + value[2];
                // return "country: " + value[2] + ",cluster: " + value[3] + ",alpha: " + 
                // ",beta: "+value[4] + ",gamma1: "+value[5] + ",gamma2: "+value[6] ;

                return '<div style="border-bottom: 1px solid rgba(255,255,255,.2); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px">' +
                    "Country:" + ' ' + value[2] + " Cluster: " + value[3] +
                    '</div>' +
                    "alpha" + '：' + value[4] + '<br>' +
                    "beta" + '：' + value[5] + '<br>' +
                    "gamma1" + '：' + value[6] + '<br>' +
                    "gamma2" + '：' + value[7] + '<br>' +
                    "c" + '：' + value[8] + '<br>'
            }
        },
        xAxis: {
            show: true,
            position: "left",
            type: 'value',
            lineStyle: {
                color: "#fff",
            },
            splitLine: false,
            offset: -1,
            // min: -6,
            // max: 8,
            axisLine: { onZero: false },
            scale: false,
            interval: 5
        },
        yAxis: {
            show: true,
            position: "bottom",
            type: 'value',
            color: "#fff",
            splitLine: false,
            axisLine: { onZero: false },
            // min:-6,
            // max:8,
            scale: true,
            interval: 5
        },
        color: c,
        // grid: {
        //     left: '10%',
        //     right: 150,
        //     top: '18%',
        //     bottom: '10%'
        // },
        visualMap: [
            // {
            // dimension: 0,
            // orient: 'vertical',
            //     color: ["#FF9933", "#FFFF99", "#99FF99", "#33FFFF"],
            //     colorAlpha: 0.5,
            //     hoverLink: true,
            //     show: false
            // },
            // {
            //     // min: -6,
            //     // max: 0,
            //     // dimension: 1,

            //     color: ["#FFFF99"],
            //     show: false,
            // },
            // {
            //     // dimension: 2,
            //     // orient: 'vertical',
            //     color: ["#99FF99"],
            //     // colorAlpha: 0.5,
            //     // hoverLink: true,
            //     show: false
            // },
            // {
            //     // min: -6,
            //     // max: 0,
            //     // dimension: 3,

            //     color: ["#33FFFF"],
            //     show: false,
            // }
        ],
        series: ser,
        //     [{
        //         name: "Cluster 1",
        //         symbolSize: 10,
        //         data: cluster_data[0],
        //         type: 'scatter',
        //     },
        //     {
        //         name: "Cluster 2",
        //         symbolSize: 10,
        //         data: cluster_data[1],
        //         type: 'scatter',
        //     },
        //     {
        //         name: "Cluster 3",
        //         symbolSize: 10,
        //         data: cluster_data[2],
        //         type: 'scatter',
        //     },
        //     {
        //         name: "Cluster 4",
        //         symbolSize: 10,
        //         data: cluster_data[3],
        //         type: 'scatter',
        //     }
        // ]
    };
    barcharts.setOption(option);

}
// 加载聚类结果
function cluster_show(alpha, beta, gama1, gama2, c) {
    // Optionally the request above could also be done as
    axios.get(compute_block_in, {
            params: {
                "id": "Korea",
                "skk": 0.5,
                "kkk": 1,
                "sigma": 1,
                "m": 1,
                "alpha": alpha,
                "beta": beta,
                "gama1": gama1,
                "gama2": gama2,
                "b_decrease_rate": c,
                "peak": 6
            }
        })
        .then(function(response) {

            var c_data = response.data;
            var cluster_data = change_cluster_dataform(c_data);

            display_cluster(cluster_data);
            display_cluster_map(c_data);
            display_cluster_table(cluster_data);

        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}



function scatter_show() {
    // Optionally the request above could also be done as
    axios.get(compute_block_in, {
            params: {
                "id": "zz",
                "skk": 0.6,
                "kkk": 0.1,
                "sigma": 1,
                "m": 1,
                'peak': 5,
            }
        })
        .then(function(response) {

            var patient_value = response.data;
            console.log(patient_value);
            console.log(convertData2(patient_value))

            var option = {

                GLMap: {
                    roam: true
                },
                coordinateSystem: 'GLMap',

                tooltip: {
                    trigger: 'item',
                    formatter: function(obj) {
                        var value = obj.value;
                        // return time[time.length - 1]+' '+obj.name + '：' + value[2];
                        return obj.name + '：' + value[2] + " " + value[3];
                    }
                },

                geo: {
                    map: 'GLMap',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                visualMap: {
                    left: 'right',
                    min: 0,
                    max: 1,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text: ['High', 'Low'], // 文本，默认为数值文本
                    calculable: true
                },

                series: [{
                        name: 'confirmed cases',
                        type: 'map',
                        coordinateSystem: 'GLMap',
                        map: 'global',
                        roam: true,
                        data: convertData2(patient_value),
                        // symbolSize: function(data) {
                        //     // if (data[2] > 60000) { return Math.sqrt(data[2]) / 5 } else if (data[2] > 10000) { return Math.sqrt(data[2]) / 2.5 } else if (data[2] > 1000) { return Math.sqrt(data[2]) / 2 } else if (data[2] < 100) { return Math.sqrt(data[2]) } else if (data[2] < 10) { return data[2] / 0.3 } else { return Math.sqrt(data[2]) / 1.1 }
                        //     return data[2]/0.01;
                        // },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        // itemStyle: {
                        //     shadowBlur: 10,
                        //     shadowColor: 'rgba(120, 36, 50, 0.5)',
                        //     shadowOffsetY: 5,
                        //     normal: {
                        //         // color: "#FFA5B4" //颜色
                        //         color: "#E66641" //颜色#E66641,6A7FC4,#C56C6B

                        //     },
                        //     color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        //         offset: 0,
                        //         color: 'rgba(251, 118, 123,0.5)'
                        //     }, {
                        //         offset: 1,
                        //         color: 'rgba(204, 46, 72,0.5)'
                        //     }])
                        // },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    // {
                    //     type: 'effectScatter',
                    //     coordinateSystem: 'GLMap',
                    //     symbol: "circle",
                    //     data: convertData1(cases_value.sort(function (a, b) {
                    //         return b.value - a.value;
                    //     }).slice(0, 5)),
                    //     symbolSize: function (data) {
                    //         if(data[2]>60000){return Math.sqrt(data[2])/2}
                    //         else if(data[2]>10000){return Math.sqrt(data[2])/1.5}
                    //         else if(data[2]>1000){return Math.sqrt(data[2])/1.2}
                    //         else if (data[2]>500){return Math.sqrt(data[2])/1.1}
                    //         else if(data[2]<100){return Math.sqrt(data[2])}
                    //         else if (data[2]<10){return data[2]/0.3}
                    //         else{return Math.sqrt(data[2])/1.1}
                    //     },
                    //     showEffectOn: 'render',
                    //     rippleEffect: {
                    //         //涟漪特效
                    //         period: 4, //特效动画时长
                    //         scale: 3, //波纹的最大缩放比例
                    //         brushType: "stroke" //波纹的绘制方式：stroke | fill
                    //     },
                    //     //hoverAnimation: true,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: "rgba(255,255,255,0.4)" //颜色
                    //         },
                    //         emphasis: {
                    //             borderColor: "#fff",
                    //             borderWidth: 1
                    //         }
                    //     },
                    //     zlevel: 1
                    // }
                ]
            };

            echartslayer.chart.setOption(option);

        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}