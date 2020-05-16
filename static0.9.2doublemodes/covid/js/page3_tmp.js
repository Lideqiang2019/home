var data_line = []; //线所需数据
var data_point = []; //点所需数据
var data_hour = []; //所需街区时间数据
var data_weekend = []; //周末24小时人流柱形图数据
var data_weekend_line = []; //周末24小时人流地图画线数据
var data_weekend_point = []; //周末24小时人流地图画圈数据
var data_point_all = []; //画圈数据
var data_line_all = []; //画圈数据
//var data_bar=[];//画柱形图数据
var HOUR = 24; //时间
var block_Id; //街道id
var mode;
var OD_TABLE = [];
var OD_flag = 1;
var OD_FLAG_HZ = '选择住址，绘制工作地分布';
var cur_hour = 'H0'; //默认通勤流
var j = 1; //根据OD-DO模式转换
$.ajaxSetup({
    async: false
});

/*------------------------------------省会ID与中心坐标表-----------------------------------------*/

// console.log('b'+0);

var block_id_latlng = [];

function block_id_latlng_init() {
    for (var i = 0; i < globalData.features.length; i++) {
        // block_id_latlng[i] = i
        block_id_latlng[i] = [globalData.features[i].properties.center.lat, globalData.features[i].properties.center.lon];

        // console.log(centerData.features[i].properties.name);
        // block_id_latlng[i] = centerData.features[i].properties.center;
    }
};
block_id_latlng_init();

// console.log(block_id_latlng[0]);
// console.log(transRisk);

var block_id_latlng_dic = {};

function block_id_latlng_dic_init() {
    block_id_latlng_dic['' + 0] = [];
    for (var i = 0; i < block_id_latlng.length; i++) {
        j = globalData.features[i].properties.districtID
            // console.log(globalData.features[i].properties, j)
        block_id_latlng_dic['b' + (j)] = [];
        block_id_latlng_dic['b' + (j)][0] = block_id_latlng[i][1];
        block_id_latlng_dic['b' + (j)][1] = block_id_latlng[i][0];
    }
};

/*------------------------------------mapbox----------------------------------------*/
block_id_latlng_dic_init();
var geoCoordMap = block_id_latlng_dic; //加载街道经纬度


$(document).ready(function() {
    //绑定下拉框change事件，当下来框改变时调用 SelectChange()方法
    $("#selectID").change(function() { SelectChange(); });
});

mapboxgl.accessToken = 'pk.eyJ1IjoieXVyYW53YW5nIiwiYSI6ImNpdnVvanl4NzAwNTAyenFkemJsbHB5ejAifQ.HNTqg3xW1JKT5OvfPc_R7Q';
var map = new mapboxgl.Map({
    container: 'container', // 标签id
    style: 'mapbox://styles/mapbox/light-v9',
    center: /*[-100.486052, 37.830348],*/ [40, 35], // 中心位置['dark','light','outdoors','satellite','bright']
    zoom: 0.8, // 地图缩放
    pitch: 10,
    //bearing: 20
});

var echartslayer = new EchartsLayer(map);

map.addControl(new mapboxgl.NavigationControl());
// option2.GLMap.map=map;
map.on('load', function() {
    // map.addSource('google.tile', {
    //     'type': 'raster',
    //     'tiles': ['https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'],
    //     'tileSize': 256
    // })
    map.addSource("states", {
        "type": "geojson",
        "data": globalData
    });
    map.addLayer({
        "id": "state-fills",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
            "fill-color": "#343332",
            "fill-opacity": 0.1
        }
    });
    map.addLayer({
        "id": "state-borders",
        "type": "line",
        "source": "states",
        "layout": {},
        "paint": {
            "line-color": '#666',
            "line-width": 1.5
        }
    });
    map.addLayer({
        "id": "state-fills-hover",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
            "fill-color": "#666",
            "fill-opacity": 0.7
        },
        "filter": ["==", "districtID", ""]
    });
    map.addLayer({
        "id": "state-fills-hover",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
            "fill-color": "#666",
            "fill-opacity": 0.7
        },
        "filter": ["==", "name", ""]
    });
    // map.on("mousemove", function(e) {  //鼠标在地图上移动
    // var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
    // if (features.length) {
    //     //   console.log(features[0].properties.block_num);
    //     map.setFilter("state-fills-hover", ["==", "districtID",  features[0].properties.districtID]);
    //     //显示街道信息
    //     $('#showContent').html('<h4>江苏省区域信息</h4>' +  ('<b>区域编号:' + features[0].properties.districtID + '</b><br />' +'区域面积: ' + (features[0].properties.Shape_Area/1000000).toFixed(2) + ' km<sup>2</sup>' + '<br />' ));
    // } else {
    //     map.setFilter("state-fills-hover", ["==", "districtID", ""]);
    //     $('#showContent').html('<h4>江苏省区域信息</h4>' + '无');
    // }
    // });
    map.on("mousemove", function(e) { //鼠标在地图上移动
        var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
        if (features.length) {
            //   console.log(features[0].properties.block_num);
            map.setFilter("state-fills-hover", ["==", "districtID", features[0].properties.name]);
            //显示街道信息
            $('#showContent').html('<h4>The global epidemic</h4>' + ('<b>Country:' + features[0].properties.name_en + '</b>'));
        } else {
            map.setFilter("state-fills-hover", ["==", "name", ""]);
            $('#showContent').html('<h4>The global epidemic</h4>' + 'None');
        }
    });
    // map.on("mouseout", function() {
    // map.setFilter("state-fills-hover", ["==", "districtID", ""]);
    // $('#showContent').html('<h4>江苏省区域信息</h4>' + '无');
    // });
    // map.on("mouseout", function() {
    //     map.setFilter("state-fills-hover", ["==", "name", ""]);
    //     $('#showContent').html('The global epidemic' + 'None');
    // });
    map.on('click', function(e) { //鼠标点击事件
        var features = map.queryRenderedFeatures(e.point);
        if (features.length) {
            //mode = od_flag_to_char(OD_flag);
            block_Id = 'b' + features[0].properties.districtID;
            // var cityName = features[0].properties.name;
            var cityName = features[0].properties.name_en;


            // console.log(cityName)

            // if (cityName) {
            //     document.getElementById("country-list").style.display = "none";

            // } else {
            //     document.getElementById("country-list").style.display = 'block';
            // }
            // console.log(block_Id);
            // time_barchart(cityName);
            // document.getElementById("barChart").style.display = "block"; //1
            // document.getElementById('btn_time').style.display = "block";
            // document.getElementById('time').style.display = "block";
            // clear_layer();

            time_barchart_2(cityName); //1
            // time_barchart(block_Id);
        }

    });


});

/*--------------------------------菊花图绘制------------------------*/
function clear_layer() { //清除
    echartslayer.chart.setOption({}, 1);
}



// 添加数据时间 
// axios.get(latest_date)
//     .then(function(response) {
//         // handle success
//         document.getElementById("current_btn_text").innerHTML = "Diagnosis on " + response.data.date;
//         document.getElementById('table_time').innerHTML = "Results based on data by " + response.data.date;
//         // document.getElementById('increased-list-title').innerHTML = "Increased Cases On " + response.data.date;
//     })
//     .catch(function(error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function() {
//         // always executed
//     });

//调用ajax接口数据，对其进行处理
function date_name(patient) {
    var date_name = [];
    for (var key in patient['confirmedData']) {
        // console.log(key + ":" + patient['confirmedData'][key]);
        date_name.push(time_revise2(key));
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
    for (var i = 1; i < patient_num.length; i++) {
        res[i] = patient_num[i] - patient_num[i - 1];
    };
    res[0] = res[1] - res[0];
    return res;
}
// 累计病例柱状图

function time_barchart_2(cityName) {
    axios.get(latest_date)
        .then(function(response) {
            // handle success
            var latest_date = response.data;
            // console.log(latest_date)

            axios.get(global_cum, {
                    params: {
                        "countryName": cityName,
                        "endDate": latest_date['date'],
                        "querydays": 61
                    }
                })
                .then(function(response) {

                    var patient = response.data;
                    var barcharts = echarts.init(document.getElementById("barChart-show"));

                    var data_bar = patient_num(patient);

                    // console.log(patient)
                    // var increase_bar = 
                    var time = date_name(patient);
                    var option = {
                        title: {
                            show: true,
                            text: "Cumulative confirmed cases in " + String(cityName),
                            subtext: 'Data Source: WHO and JHU by ' + time[time.length - 1],
                            textStyle: {
                                color: '#000',
                                fontFamily: "gothic",
                                fontSize: 12,
                            },
                            subtextStyle: {
                                color: '#000',
                                fontFamily: "gothic",
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        toolbox: { //可视化的工具箱
                            // show: true,
                            feature: {
                                // dataView: { //数据视图
                                // },
                                restore: { //重置
                                    show: true
                                },
                                dataZoom: { //数据缩放视图
                                    show: true,
                                },
                                saveAsImage: { //保存图片
                                    show: true
                                },
                                magicType: { //动态类型切换
                                    type: ['bar', 'line']
                                }
                            }
                        },
                        dataZoom: [{
                            startValue: '2020-02-20',
                        }, {
                            type: 'inside'
                        }],
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            axisLabel: {
                                rotate: 0,
                                show: true,
                                interval: 5,
                                ratate: -30,
                                textStyle: {
                                    color: '#000',

                                }
                            },

                            type: 'category',
                            data: time.slice(1, )
                        }],
                        yAxis: [{
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#000'
                                }
                            },
                            type: 'value',
                            min: 0,
                        }],
                        series: [{
                                name: 'Daily increase data',
                                type: 'bar',
                                backgroundColor: "#fff",
                                barGap: '10%',
                                barWidth: '12px',
                                data: increse_nums(data_bar).slice(1, )
                            },
                            //加折线图
                            {
                                name: 'Cumulative data',
                                type: 'line',
                                data: data_bar.slice(1, ),
                                itemStyle: {
                                    normal: { lineStyle: { type: 'solid', color: '#a81212' } },
                                },
                            },

                        ]
                    };
                    barcharts.setOption(option);



                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {
                    // always executed
                });

        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });

}


var block_id_latlng1 = [];

function block_id_latlng1_init() {
    for (var i = 0; i < globalData.features.length; i++) {
        // block_id_latlng[i] = i
        block_id_latlng1[i] = [globalData.features[i].properties.center.lat, globalData.features[i].properties.center.lon];
        // console.log(centerData.features[i].properties.name);
        // block_id_latlng[i] = centerData.features[i].properties.center;
    }
};
block_id_latlng1_init();


//console.log(block_id_latlng[0]);

var block_id_latlng_dic1 = {};

function block_id_latlng_dic1_init() {
    block_id_latlng_dic1['' + 0] = [];
    for (var i = 0; i < block_id_latlng1.length; i++) {
        block_id_latlng_dic1[globalData.features[i].properties.name_en] = [];
        block_id_latlng_dic1[globalData.features[i].properties.name_en][0] = block_id_latlng1[i][1];
        block_id_latlng_dic1[globalData.features[i].properties.name_en][1] = block_id_latlng1[i][0];
    }
};


// console.log(cityName.length)

// console.log(patient[cityName[0]][patient[cityName[0]].length - 1])
// var j=0;
// for(var i=0;i<cityName.length;i++){
//     console.log(patient[cityName[i]])
//     j++;
// }
// console.log(j)

block_id_latlng_dic1_init();
var geoCoordMap1 = block_id_latlng_dic1; //加载街道经纬度

// console.log(cityName)

// console.log(geoCoordMap1);
// var cases_value = [];
// for(var i = 0; i<cityName.length; i++){
//     cases_value.push({
//         name: cityName[i],
//         value: patient[cityName[i]][patient[cityName[i]].length - 1]
//     })
// }

// console.log(cases_value)
//console.log(cases_value.length)
//console.log(cases_value[0].name)
//console.log(geoCoordMap1['北京市']);
// console.log(patient[cityName[1]][patient[cityName[1]].length - 1 ])
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

function patient_nums(patient) {
    var nums = [];
    for (var key in patient) {
        nums.push(patient[key]);
    };
    return nums;
}

function data_form_change(cityName, patient_nums) {
    var cases_value = [];
    for (var i = 0; i < cityName.length; i++) {
        cases_value.push({
            name: cityName[i],
            value: patient_nums[i]
        })
    }
    return cases_value;
}

// function country_select(){
//     var country_info = [];

// }
var convertData2 = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap1[data[i].Country];
        if (geoCoord) {
            res.push({
                name: data[i].Country,
                value: geoCoord.concat(data[i]["Peak value"], data[i]["Peak time"])
            });
        }
    }
    return res;
};

var convertData3 = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap1[data[i].Country];
        if (geoCoord) {
            res.push({
                name: data[i].Country,
                value: geoCoord.concat(data[i]["R0"])
            });
        }
    }
    return res;
};

function addtr(parentID, n, country, num) {
    var tr_1 = document.createElement("tr");
    addtd(tr_1, n, 'color:rgba(255, 255, 255, 0.5)');
    addtd(tr_1, country, 'color:#E87554');
    addtd(tr_1, num, 'color:#E87554');
    document.getElementById(parentID).appendChild(tr_1);
}

function addtd(tr, text, style) {
    var td_1 = document.createElement("td");
    td_1.setAttribute("style", style);
    td_1.innerHTML = text;
    tr.appendChild(td_1);
}

function getlatestDate() {
    return axios.get(latest_date);
}

function getScatternums() {
    return axios.get(scatter_global);
}

// 时间字符串格式修改
function time_revise(s) {
    var res = "";
    res = s.slice(5, 7) + "/" + s.slice(8, ) + "/" + s.slice(0, 4);
    return res;
}

function time_show() {

    axios.get(latest_date, {
            params: {}
        })
        .then(function(response) {
            document.getElementById('table_time').innerHTML = "Data as of " + time_revise(response.data.date) + "<br>MM/DD/YYYY";
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });


}



function current_scatter_show() {

    axios.all([getlatestDate(), getScatternums()])
        .then(axios.spread(function(acct, perms) {
            // 两个请求现在都执行完成
            // var latestDate = JSON.stringify(acct.data);
            var latestDate = acct.data;
            var patient = perms.data;
            var cases_data = data_form_change(country_name(patient), patient_nums(patient));
            // console.log(latestDate);

            var cmp = function(x, y) {
                var c = -Number(x.value) + Number(y.value);
                return c;
            }
            cases_data.sort(cmp);
            var source = "";
            var xs = []
            var ys = []
            for (var v in cases_data) {
                var v2 = Number(v) + 1;
                if (cases_data[v].value == 0) {
                    continue;
                }
                source = source + "<tr><th scope='row' style='text-align:right;'>" + v2 + "</th><td>" + cases_data[v].name + "</td><td style='text-align:right;'>" + cases_data[v].value + "</td></tr>";
                xs.push(cases_data[v].name)
                ys.push(cases_data[v].value)
            }
            $("#tableHead").html("<tr><th scope='col'>Rank</th><th scope='col'>Country</th><th scope='col'>Cases</th></tr>")
            $("#tableBody").html(source);
            title_text = 'Global Cumulative Confirmed Cases'
            yname = 'Country';
            xname = 'time';

            document.getElementById('word-list-title').innerHTML = "Diagnosis by " + time_revise(latestDate.date);
            // document.getElementById("current_btn_text").innerHTML = "Diagnosis by " + time_revise(latestDate.date);
            // document.getElementById('table_time').innerHTML = "Data as of " + time_revise(latestDate.date) + "<br>MM/DD/YYYY";

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
                        return " Click: " + String(latestDate.date).slice(5, ) + '  ' + obj.name + '：' + value[2];
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

                series: [{
                        name: 'confirmed cases',
                        type: 'scatter',
                        coordinateSystem: 'GLMap',
                        data: convertData1(cases_data),
                        symbolSize: function(data) {
                            if (data[2] > 60000) { return Math.sqrt(data[2]) / 10 } else if (data[2] > 10000) { return Math.sqrt(data[2]) / 5 } else if (data[2] > 1000) { return Math.sqrt(data[2]) / 3 } else if (data[2] < 100) { return Math.sqrt(data[2]) } else if (data[2] < 10) { return data[2] / 0.3 } else { return Math.sqrt(data[2]) / 1.1 }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            normal: {
                                // color: "#FFA5B4" //颜色
                                color: "#C56C6B" //颜色#E66641,6A7FC4,#C56C6B

                            },
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgba(251, 118, 123,0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(204, 46, 72,0.5)'
                            }])
                        },
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
        }));

}
// 时间字符串格式修改
function time_revise2(s) {
    var res = "";
    res = s.slice(5, 7) + "/" + s.slice(8, ); // + "/" + s.slice(0, 4);
    return res;
}

//调用ajax接口数据，对其进行处理
function date_name_1(patient) {
    var date_name = [];
    for (var key in patient) {
        // console.log(key + ":" + patient['confirmedData'][key]);
        date_name.push(time_revise2(key));
    };
    return date_name;
}
//调用ajax接口数据，对其进行处理
function patient_num_1(patient) {
    var nums = [];
    for (var key in patient) {
        nums.push(patient[key]);
    };
    return nums;
}

function increase_nums_1(patient_num) {
    var res = [];
    for (var i = 1; i < patient_num.length; i++) {
        res[i] = patient_num[i] - patient_num[i - 1];
    };
    res[0] = res[1] - res[0];
    return res;
}


function time_barchart_1(time, world_data) {
    // var barcharts = echarts.init(document.getElementById("barChart"));

    var barcharts = echarts.init(document.getElementById("barChart-show"));

    var option = {
        title: {
            show: true,
            // text: "Dynamic Data",
            // subtext: 'Data Source: WHO and JHU by ' + time[time.length - 1],
            subtext: "Global Dynamic Data",
            fontsize: "15px",
            textStyle: {
                color: '#a81212',
            },
            subtextStyle: {
                color: '#a81212',


            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: { //可视化的工具箱
            // show: true,
            feature: {
                // dataView: { //数据视图
                // },
                restore: { //重置
                    show: false,
                },
                dataZoom: { //数据缩放视图
                    show: false,
                },
                saveAsImage: { //保存图片
                    show: false
                },
                magicType: { //动态类型切换
                    type: ['line']
                }
            }
        },
        dataZoom: [{
            // startValue: '2020-03-15',
        }, {
            type: 'inside'
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            axisLabel: {
                rotate: 0,
                show: true,
                interval: 7,
                textStyle: {
                    color: '#000',
                }
            },

            type: 'category',
            data: time.slice(1, )
        }],
        yAxis: [{
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000'
                }
            },
            type: 'value',
            min: 0,
        }],
        series: [{
                name: 'Daily increase data',
                type: 'bar',
                backgroundColor: "#000",
                barGap: '10%',
                barWidth: '10px',
                itemStyle: {
                    normal: {
                        color: '#a81212'
                    },
                },
                // data: increse_nums(data_bar)
                data: increase_nums_1(world_data).slice(1, )

            },
            //加折线图
            {
                name: 'Cumulative data',
                type: 'line',
                data: world_data.slice(1, ),
                itemStyle: {
                    normal: {
                        lineStyle: {
                            type: 'solid',
                            color: '#a81212'
                        }
                    },
                },
            },

        ]
    };
    barcharts.setOption(option);

    // return date_name(patient), patient_num(patient);
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
                'peak': 2,
            }
        })
        .then(function(response) {
            var patient_value = response.data;
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

                series: [{
                        name: 'confirmed cases',

                        type: 'scatter',
                        coordinateSystem: 'GLMap',
                        data: convertData2(patient_value),
                        symbolSize: function(data) {
                            if (data[2] > 60000) { return Math.sqrt(data[2]) / 10 } else if (data[2] > 10000) { return Math.sqrt(data[2]) / 5 } else if (data[2] > 1000) { return Math.sqrt(data[2]) / 3 } else if (data[2] < 100) { return Math.sqrt(data[2]) } else if (data[2] < 10) { return data[2] / 0.3 } else { return Math.sqrt(data[2]) / 1.1 }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            normal: {
                                // color: "#FFA5B4" //颜色
                                color: "#E66641" //颜色#E66641,6A7FC4,#C56C6B

                            },
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgba(251, 118, 123,0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(204, 46, 72,0.5)'
                            }])
                        },
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

// scatter_show();

function display_R0() {
    var response;
    $.ajax({
        url: compute_block_in,
        dataType: "json",
        async: true,
        data: {
            "id": "zz",
            "skk": 0.5,
            "kkk": 0.1,
            "sigma": 1,
            "m": 1,
            'peak': 3,
        },
        type: "GET",
        success: function(req) {
            var cmp = function(x, y) {
                var c = -Number(x['R0']) + Number(y['R0']);
                return c;
            }
            req.sort(cmp);
            var source = "";
            xs = []
            ys = []
            for (var v in req) {
                var v2 = Number(v) + 1;
                source = source + "<tr><th scope='row' style='text-align:right;'>" + v2 + "</th><td>" + req[v]["Country"] + "</td><td style='text-align:right;'>" + req[v]["R0"] + "</td></tr>";
                xs.push(req[v]["Country"])
                ys.push(req[v]["R0"])
            }
            $("#tableHead").html("<tr><th scope='col'>Rank</th><th scope='col'>Country</th><th scope='col'>R0</th></tr>")
            $("#tableBody").html(source);
            display_barChart(xs, ys, 'Estimated R0 Value', "Country", "R0")


            document.getElementById('word-list-title').innerHTML = "Estimated R<sub>0</sub>";

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
                        return obj.name + '：' + value[2];
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

                series: [{
                        name: 'R0',

                        type: 'scatter',
                        coordinateSystem: 'GLMap',
                        data: convertData3(req),
                        symbolSize: function(data) {
                            // if (data[2] > 60000) { return Math.sqrt(data[2]) / 3 } else if (data[2] > 10000) { return Math.sqrt(data[2]) / 2.5 } else if (data[2] > 1000) { return Math.sqrt(data[2]) / 2 } else if (data[2] < 100) { return Math.sqrt(data[2]) } else if (data[2] < 10) { return data[2] / 0.3 } else { return Math.sqrt(data[2]) / 1.1 }
                            return data[2] / 0.1;
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            normal: {
                                // color: "#FFA5B4" //颜色
                                color: "#E66641" //颜色#E66641,6A7FC4,#C56C6B

                            },
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgba(251, 118, 123,0.5)'
                            }, {
                                offset: 1,
                                color: 'rgba(204, 46, 72,0.5)'
                            }])
                        },
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
        }
    });
}

function display_peak() {
    var response;
    $.ajax({
        url: compute_block_in,
        dataType: "json",
        async: true,
        data: {
            "id": "zz",
            "skk": 0.6,
            "kkk": 0.1,
            "sigma": 1,
            "m": 1,
            'peak': 2,
        },
        type: "GET",
        success: function(req) {

            // console.log(req)

            var cmp = function(x, y) {
                var c = -Number(x['Peak value']) + Number(y['Peak value']);
                return c;
            }
            req.sort(cmp);
            var source = "";
            var xs = []
            var ys = []
            for (var v in req) {
                var v2 = Number(v) + 1;

                // source = source + "<tr><th scope='row' style='text-align:right;'>" + v2 + "</th><td>" + req[v]["Country"] + "</td><td style='text-align:right;'>" + req[v]["Peak value"] + "</td></tr>";
                source = source + "<tr><th scope='row' style='text-align:right;'>" + v2 + "</th><td>" + req[v]["Country"] +
                    "</td><td style='text-align:right;'>" + req[v]["Peak value"] + "</td><td style='text-align:right;'>" + time_revise2(req[v]["Peak time"]) + "</td></tr>";
                xs.push(req[v]["Country"])
                ys.push(req[v]["Peak value"])
            }
            $("#tableHead").html("<tr><th scope='col'>Rank</th><th scope='col'>Country</th><th scope='col'>Peak<th scope='col'>Time</th></tr>")
            $("#tableBody").html(source);

            //display_barChart(xs, ys, 'Estimated Cumulative Peak Value of Confirmed Cases', "Country", "Peak Value")


            document.getElementById('word-list-title').innerHTML = "Estimated Peak";
            display_peak_and_time();
            scatter_show();
        }
    });
}

function display_peak_and_time() {
    var response;
    $.ajax({
        url: compute_block_in,
        dataType: "json",
        async: true,
        data: {
            "id": "zz",
            "skk": 0.6,
            "kkk": 0.1,
            "sigma": 1,
            "m": 1,
            'peak': 2,
        },
        type: "GET",
        success: function(req) {
            var cmp = function(x, y) {
                var c = Number(getDate(x['Peak time'])) - Number(getDate(y['Peak time']));
                return c;
            }
            req.sort(cmp);
            data = [];
            // var ns = []
            // var xs = []
            // var ys = []
            for (var v in req) {
                data.push(
                    [
                        time_revise(req[v]["Peak time"]),
                        req[v]['Peak value'],
                        req[v]["Country"]
                    ]
                );
                // ns.push(req[v]["Country"])
                // xs.push(req[v]["Peak time"])
                // ys.push(req[v]['Peak value'])
            }

            // console.log(ys);

            title_text = 'Estimated Peak Value and Peak Time of Confirmed Cases'
            nname = 'Country'
            yname = 'Peak value';
            xname = 'Time';

            var barcharts = echarts.init(document.getElementById("barChart-show"));
            var option = {
                title: {
                    show: true,
                    text: title_text,
                    x: 'left',
                    y: 'top',

                    // subtext: 'Data Source: data from WHO and JHU',
                    textStyle: {
                        color: '#BBBBC0',
                        fontFamily: "gothic",
                        fontSize: 14,
                    },
                    subtextStyle: {
                        color: '#000',
                        fontFamily: "gothic",
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    },
                    // formatter: function(obj) {
                    //     var time = obj[0];
                    //     var value = obj[1];
                    //     var country = obj[2];
                    //     // return time[time.length - 1]+' '+obj.name + '：' + value[2];
                    //     return country + '\nPeak time: ' + time + '\n' + 'Peak value: ' + value;
                    // }
                },
                toolbox: { //可视化的工具箱
                    show: true,
                    feature: {
                        // dataView: { //数据视图
                        // },
                        restore: { //重置
                            show: true
                        },
                        dataZoom: { //数据缩放视图
                            show: false,
                        },
                        saveAsImage: { //保存图片
                            show: false,
                        },
                        magicType: { //动态类型切换
                            type: ['bar', 'scatter', 'line']
                        }
                    }
                },
                // legend: {
                //     x: "right",
                //     y: "bottom",
                //     show: true,
                //     type: "plain",
                //     data: leg,
                //     orient: 'vertical',
                //     top: 20,
                //     textStyle: {
                //         color: '#663333',
                //         fontSize: 12
                //     }      
                // },
                dataZoom: [{
                        show: true,
                    },
                    {
                        type: 'inside',
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    name: xname,
                    axisLabel: {
                        rotate: 0,
                        show: true,
                        // interval: 7,
                        textStyle: {
                            color: '#000',
                        }
                    },
                    type: 'time',
                    // data: xs
                }],
                yAxis: [{
                    name: yname,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    type: 'value',
                    // data: ys,
                    // min: 0,
                }],
                series: [{
                    name: yname,
                    type: 'scatter',
                    data: data
                }],
                // barWidth: 5,
                // barMaxWidth: 9,
                // barMinWidth: 3,
                // barGap: "80%",

            };
            barcharts.setOption(option);

        }
    });
}



function display_time() {
    var response;
    $.ajax({
        url: compute_block_in,
        dataType: "json",
        async: true,
        data: {
            "id": "zz",
            "skk": 0.6,
            "kkk": 0.1,
            "sigma": 1,
            "m": 1,
            'peak': 2,
        },
        type: "GET",
        success: function(req) {
            var cmp = function(x, y) {
                var c = Number(getDate(x['Peak time'])) - Number(getDate(y['Peak time']));
                return c;
            }
            req.sort(cmp);
            var source = "";
            var xs = []
            var ys = []
            for (var v in req) {
                var v2 = Number(v) + 1;
                source = source + "<tr><th scope='row' style='text-align:right;'>" + v2 + "</th><td>" + req[v]["Country"] + "</td><td>" + time_revise2(req[v]["Peak time"]) + "</td></tr>";
                xs.push(req[v]["Country"])
                ys.push(req[v]["Peak time"])
            }
            $("#tableHead").html("<tr><th scope='col'>Rank</th><th scope='col'>Country</th><th scope='col'>Time</th></tr>")
            $("#tableBody").html(source);
            // display_barChart(xs, ys, 'Peak Value Time Estimate of Confirmed Cases', "Country", "Peak Time")

            document.getElementById('word-list-title').innerHTML = "Estimated Peak Time";

            scatter_show();
            display_peak_and_time();

            // title_text = 'Estimated Peak Value Time of Confirmed Cases'
            // yname = 'Country';
            // xname = 'time';

            // var barcharts = echarts.init(document.getElementById("barChart-show"));
            // var option = {
            //     title: {
            //         show: true,
            //         text: title_text,
            //         x: 'left',
            //         y: 'top',

            //         // subtext: 'Data Source: data from WHO and JHU',
            //         textStyle: {
            //             color: '#BBBBC0',
            //             fontFamily: "gothic",
            //             fontSize: 14,
            //         },
            //         subtextStyle: {
            //             color: '#000',
            //             fontFamily: "gothic",
            //         }
            //     },
            //     tooltip: {
            //         trigger: 'axis',
            //         axisPointer: {
            //             type: 'cross'
            //         },
            //         formatter: function(obj) {
            //             var value = obj.value;
            //             // return time[time.length - 1]+' '+obj.name + '：' + value[2];
            //             return 'Peak time: ' + value.slice(0, );
            //         }
            //     },
            //     toolbox: { //可视化的工具箱
            //         show: true,
            //         feature: {
            //             // dataView: { //数据视图
            //             // },
            //             restore: { //重置
            //                 show: true
            //             },
            //             dataZoom: { //数据缩放视图
            //                 show: false,
            //             },
            //             saveAsImage: { //保存图片
            //                 show: false,
            //             },
            //             magicType: { //动态类型切换
            //                 type: ['bar', 'line']
            //             }
            //         }
            //     },
            //     // legend: {
            //     //     x: "right",
            //     //     y: "bottom",
            //     //     show: true,
            //     //     type: "plain",
            //     //     data: leg,
            //     //     orient: 'vertical',
            //     //     top: 20,
            //     //     textStyle: {
            //     //         color: '#663333',
            //     //         fontSize: 12
            //     //     }      
            //     // },
            //     dataZoom: [{
            //             show: true,
            //         },
            //         {
            //             type: 'inside',
            //         },
            //         {
            //             show: true,
            //             yAxisIndex: 0,
            //             filterMode: 'empty',
            //             showDataShadow: false,
            //             left: '93%'
            //         }
            //     ],
            //     grid: {
            //         left: '3%',
            //         right: '4%',
            //         bottom: '3%',
            //         containLabel: true
            //     },
            //     xAxis: [{
            //         axisLabel: {
            //             rotate: 0,
            //             show: true,
            //             // interval: 7,
            //             textStyle: {
            //                 color: '#000',
            //             }
            //         },
            //         type: 'time',
            //         // data: ys
            //     }],
            //     yAxis: [{
            //         name: yname,
            //         axisLabel: {
            //             show: true,
            //             textStyle: {
            //                 color: '#000'
            //             }
            //         },
            //         type: 'category',
            //         data: xs,
            //         // min: 0,
            //     }],
            //     series: [{
            //         name: xname,
            //         type: 'scatter',
            //         data: ys
            //     }],
            //     // barWidth: 5,
            //     // barMaxWidth: 9,
            //     // barMinWidth: 3,
            //     // barGap: "80%",

            // };
            // barcharts.setOption(option);

        }
    });
}

function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
        function(a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    // newdate = jutils.formatDate(new Date(date), "YYYY-MM-DD")
    return date;
}


function display_barChart(xs, ys, title_text, xname, yname) {
    var barcharts = echarts.init(document.getElementById("barChart-show"));
    var option = {
        title: {
            show: true,
            text: title_text,
            x: 'left',
            y: 'top',

            // subtext: 'Data Source: data from WHO and JHU',
            textStyle: {
                color: '#BBBBC0',
                fontFamily: "gothic",
                fontSize: 14,
            },
            subtextStyle: {
                color: '#000',
                fontFamily: "gothic",
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: { //可视化的工具箱
            show: true,
            feature: {
                // dataView: { //数据视图
                // },
                restore: { //重置
                    show: false
                },
                dataZoom: { //数据缩放视图
                    show: false,
                },
                saveAsImage: { //保存图片
                    show: false,
                },
                // magicType: { //动态类型切换
                //     type: ['bar', 'line']
                // }
            }
        },
        // legend: {
        //     x: "right",
        //     y: "bottom",
        //     show: true,
        //     type: "plain",
        //     data: leg,
        //     orient: 'vertical',
        //     top: 20,
        //     textStyle: {
        //         color: '#663333',
        //         fontSize: 12
        //     }      
        // },
        dataZoom: [{
            // startValue: s1,
            // endValue: '2020-05-10'
        }, {
            type: 'inside'
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            axisLabel: {
                rotate: 5,
                show: true,
                // interval: 7,
                textStyle: {
                    color: '#000',
                }
            },
            type: 'category',
            data: xs
        }],
        yAxis: [{
            name: yname,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000'
                }
            },
            type: 'value',
            // min: 0,
        }],
        series: [{
            name: yname,
            type: 'bar',
            data: ys
        }],
        barWidth: 5,
        barMaxWidth: 9,
        barMinWidth: 3,
        barGap: "80%",
    };
    barcharts.setOption(option);
}

function display_current() {
    current_scatter_show();
    addGeoMap();
}

function addGeoMap() {
    axios.get(latest_date)
        .then(function(latestDate) {
            // handle success
            // console.log(latestDate.data.date);
            axios.get(global_cum_all, {
                    params: {
                        "date": latestDate.data['date'],
                        "querydays": 61
                    }
                })
                .then(function(world_data) {
                    var patient = world_data.data;
                    var time = date_name_1(patient);
                    var patient_nums = patient_num_1(patient);
                    data_date = "Data as of " + time[time.length - 1]
                        // document.getElementById("data_date").innerHTML = data_date
                        // document.getElementById('world_now').innerHTML = patient_nums[patient_nums.length - 1]
                    time_barchart_1(time, patient_nums);
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {
                    // always executed
                });
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

function Add_current_Table() {

}