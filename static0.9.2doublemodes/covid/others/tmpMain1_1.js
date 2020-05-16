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
    map.on("mouseout", function() {
        map.setFilter("state-fills-hover", ["==", "name", ""]);
        $('#showContent').html('The global epidemic' + 'None');
    });
    map.on('click', function(e) { //鼠标点击事件
        var features = map.queryRenderedFeatures(e.point);
        if (features.length) {
            //mode = od_flag_to_char(OD_flag);
            block_Id = 'b' + features[0].properties.districtID;
            // var cityName = features[0].properties.name;
            var cityName = features[0].properties.name_en;


            console.log(cityName)

            // if (cityName) {
            //     document.getElementById("country-list").style.display = "none";

            // } else {
            //     document.getElementById("country-list").style.display = 'block';
            // }
            // console.log(block_Id);
            // time_barchart(cityName);
            document.getElementById("barChart").style.display = "block"; //1
            // document.getElementById('btn_time').style.display = "block";
            // document.getElementById('time').style.display = "block";
            clear_layer();
            drawLine(block_Id);
            time_barchart(cityName); //1
            // time_barchart(block_Id);


        }

    });


});

/*--------------------------------菊花图绘制------------------------*/
function clear_layer() { //清除
    echartslayer.chart.setOption({}, 1);
}


function drawLine(block_Id) {
    // clear_layer();
    // console.log(block_Id)
    var line_data = [];
    var point_data = [];
    tmpID = parseInt(block_Id.substring(1, block_Id.length));
    // console.log(tmpID);
    // console.log(transRisk[tmpID]);
    for (var i = 0; i < globalData.features.length; i++) {

        if (transRisk[i][tmpID] > 0.01) {
            // console.log(i);
            line_data.push({
                fromName: block_Id,
                toName: 'b' + i,
                coords: [geoCoordMap[block_Id], geoCoordMap['b' + i]]
            });
            point_data.push({
                //name: blocksData.features[0][block_Id.substring(1,block_Id.length)].properties.XZQMC,
                name: 'b' + i,
                value: geoCoordMap['b' + i].concat(transRisk[i][tmpID] / 100)
            })
        }
        // console.log(line_data);
        // console.log(point_data);


    }


    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    series.push({
        name: 'lines', //不用管
        coordinateSystem: 'GLMap',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            scaleSize: 1,
            period: 30,
            color: '#a81212',
            shadowBlur: 10
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: line_data
    }, {

        coordinateSystem: 'GLMap',
        type: 'lines',
        symbol: ['none', 'arrow'], //箭头
        symbolSize: 10,
        zlevel: 2,
        effect: {
            show: true,
            scaleSize: 1,
            period: 30,
            color: '#a81212',
            shadowBlur: 10
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 1, //线的宽度
                opacity: 0.4,
                curveness: 0.2
            }
        },
        data: line_data
    }, {
        //不用管
        type: 'effectScatter',
        coordinateSystem: 'GLMap',
        effectType: 'ripple',
        zlevel: 2,
        rippleEffect: {
            scale: 4,
            brushType: 'stroke',
            period: '2'
        },
        label: {
            normal: {
                show: false,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbol: 'circle',
        symbolSize: function(val) {
            return 5 + Math.log10(val[2]) / 5;
            // return 5+val[2]/0.1;
        },
        itemStyle: {
            normal: {

                label: { show: false }
            }
        },
        data: point_data

    });

    var option = {
        GLMap: {
            roam: true
        },
        coordinateSystem: 'GLMap',

        tooltip: {
            trigger: 'item'
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
        dataRange: {
            min: 0,
            max: 100,
            y: '60%',
            calculable: true,
            color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua']
        },
        series: series

    };

    echartslayer.chart.setOption(option);



};

// 添加数据时间 
axios.get(latest_date)
    .then(function(response) {
        // handle success
        console.log(response.data.date);
        document.getElementById('table_time').innerHTML = "Results based on data by " + response.data.date;
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
// 累计病例柱状图
function time_barchart(cityName) {
    // var barcharts = echarts.init(document.getElementById("barChart"));
    axios.get(latest_date)
        .then(function(response) {
            var latest_date = response.data;
            // console.log(latest_date);
            // 调用ajax将数据库的内容导入
            var xmlhttp;

            function loadXMLDoc(url, cfunc) {
                if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else { // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = cfunc;
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }

            function myFunction(cityname) {
                loadXMLDoc(String(global_cum_confirmed_head) + cityname + "&endDate=" + latest_date['date'] + global_cum_confirmed_tail, function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var patient = JSON.parse(xmlhttp.responseText);

                        var barcharts = echarts.init(document.getElementById("barChart"));

                        var data_bar = patient_num(patient);

                        // console.log(patient)
                        // var increase_bar = 
                        var time = date_name(patient);
                        var option = {
                            title: {
                                show: true,
                                text: "The cumulative confirmed cases in " + String(cityName),
                                subtext: 'Data Source: WHO and JHU by ' + time[time.length - 1],
                                textStyle: {
                                    color: '#000',
                                },
                                subtextStyle: {
                                    color: '#000',
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
                                    rotate: 40,
                                    show: true,
                                    interval: 0,
                                    ratate: -30,
                                    textStyle: {
                                        color: '#000',

                                    }
                                },

                                type: 'category',
                                data: time
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
                                    data: increse_nums(data_bar)
                                },
                                //加折线图
                                {
                                    name: 'Cumulative data',
                                    type: 'line',
                                    data: data_bar,
                                    itemStyle: {
                                        normal: { lineStyle: { type: 'solid', color: '#a81212' } },
                                    },
                                },

                            ]
                        };
                        barcharts.setOption(option);

                        // return date_name(patient), patient_num(patient);
                    }
                });
            }

            myFunction(cityName);
        })
        .catch(function(error) {
            console.log(error);
        });


    // var data_bar = patient[String(cityName)];
    // console.log(patient_g[String(cityName)])
    // var option = {
    //     title: {
    //         show:true,
    //         text: String(cityName)+"The cumulative confirmed cases",
    //         subtext: 'Data Source: WHO',
    //         textStyle:{
    //             color:'#DC143C',
    //         }
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //         }
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //     },
    //     xAxis: [
    //         {
    //             axisLabel: {
    //                 rotate: 40,
    //                 show: true,
    //                 interval:0,
    //                 ratate:-30,
    //                 textStyle: {
    //                     color: '#fff',

    //                 }
    //             },

    //             type: 'category',
    //             data: time
    //         }
    //     ],
    //     yAxis: [
    //         {
    //             axisLabel: {
    //                 show: true,
    //                 textStyle: {
    //                     color: '#fff'
    //                 }
    //             },
    //             type: 'value',
    //             min: 0,
    //         }
    //     ],
    //     series: [
    //         {
    //             name:'人次',
    //             type:'bar',
    //             backgroundColor:"#343332",
    //             barGap:'10%',
    //             barWidth:'8px',
    //             data:data_bar
    //         },
    //         //加折线图
    //         {
    //             name:'number',
    //             type:'line',
    //             data:data_bar,
    //             itemStyle: {
    //                 normal: { lineStyle: { type: 'solid', color: '#fff' } },
    //             },
    //         }
    //     ]
    // };
    // barcharts.setOption(option);
    // barcharts.on('click',function(params){
    //     document.getElementById('time').innerHTML =params.name +"-"+(parseInt(params.name)+1)+":00时";
    //     clear_layer();
    //     cur_hour='H' + params.dataIndex;
    //     console.log(cur_hour)
    //     drawLine(block_Id);
    // barcharts.dispatchAction({
    //  type: 'dataZoom',
    //  startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    //  endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    // })

    // });
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

// var xmlhttp;
// function loadXMLDoc(url,cfunc)
// {
// if (window.XMLHttpRequest)
// {// code for IE7+, Firefox, Chrome, Opera, Safari
// xmlhttp=new XMLHttpRequest();
// }
// else
// {// code for IE6, IE5
// xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
// }
// xmlhttp.onreadystatechange=cfunc;
// xmlhttp.open("GET",url,true);
// xmlhttp.send();
// }
// // ajax将最近的每个国家的数据调出来
// function myFunction1()
// {
// loadXMLDoc(scatter_global,function()
//   {
//   if (xmlhttp.readyState==4 && xmlhttp.status==200)
//     {
//     var patient = JSON.parse(xmlhttp.responseText);
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

axios.all([getlatestDate(), getScatternums()])
    .then(axios.spread(function(acct, perms) {
        // 两个请求现在都执行完成
        // var latestDate = JSON.stringify(acct.data);
        var latestDate = acct.data;
        var patient = perms.data;
        // console.log(latestDate);
        // console.log(nums);
        var cases_data = data_form_change(country_name(patient), patient_nums(patient))
            // console.log(cases_data);

        // 显示表格上的时间
        // document.getElementById('Date').innerHTML = "COVID-19 global situation by " + latestDate.date;
        // 此处开始是表格部分

        // Create items array
        var items = Object.keys(patient).map(function(key) {
            return [key, patient[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        // 读取文件 patient 和 cityName
        document.getElementById("tabletoplist").setAttribute("class", "table table-striped")
        for (var i = 0; i < items.length; i++)
        // addLi("toplist", items.keys[i], items[items.keys[i]][items[items.keys[i].length - 1]])
            addtr("toplist", i + 1, items[i][0], items[i][1])

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
                    return String(latestDate.date).slice(5, ) + '  ' + obj.name + '：' + value[2];
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
                        if (data[2] > 60000) { return Math.sqrt(data[2]) / 3 } else if (data[2] > 10000) { return Math.sqrt(data[2]) / 2.5 } else if (data[2] > 1000) { return Math.sqrt(data[2]) / 2 } else if (data[2] < 100) { return Math.sqrt(data[2]) } else if (data[2] < 10) { return data[2] / 0.3 } else { return Math.sqrt(data[2]) / 1.1 }
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

    axios.get('http://10.129.2.158:8080/api/v1/query/country/confirmedCases/all', {
        params: {
    }
    })
    .then(function (response) {
        console.log(response.data);
        // Create items array
        var patient = response.data.confirmedData;
        var items = Object.keys(patient).map(function(key) {
            return [key, patient[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        // 读取文件 patient 和 cityName
        document.getElementById("increased_toplist").setAttribute("class", "table table-striped")
        for (var i = 0; i < items.length; i++)
        // addLi("toplist", items.keys[i], items[items.keys[i]][items[items.keys[i].length - 1]])
            addtr("increased_toplist", i + 1, items[i][0], items[i][1])
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    }); 
// }
// myFunction1();