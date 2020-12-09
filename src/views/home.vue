<template>
    <div class="wrap">
        <top v-bind:active="active"></top>
        <div class="main">
            <div class="wrap_con">
                <!-- 通知栏 -->
                <div class="mess_box">
                    <div>
                        <img src="../assets/images/message.png" alt />
                    </div>
                    <div class="messList" id="scroll">
                        <ul class="con1" ref="con1" :class="{ anim: animate == true }" @mouseenter="mEnter" @mouseleave="mLeave">
                            <li style="cursor:pointer" v-for="item in marqueeList" :key="item.id" @click="goPage(item.id)">
                                {{ item.content }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="today_box">
                    <div class="today_title">今日新增</div>
                    <div class="today_num">
                        <!-- <div class="marr">
                            <img src="../assets/images/icon_power.png" alt />
                            <div class="numTj">
                                <div class="numstyle">{{ cSum }}</div>
                                <div>充电</div>
                            </div>
                        </div> -->
                        <div class="marr">
                            <img src="../assets/images/icon_yj_total.png" alt />
                            <div class="numTj">
                                <div class="numstyle">{{ gSum }}</div>
                                <div class="msT">故障</div>
                            </div>
                        </div>
                        <div class="marr">
                            <img src="../assets/images/icon_call.png" alt />
                            <div class="numTj">
                                <div class="numstyle">{{ ySum }}</div>
                                <div class="msT">预警</div>
                            </div>
                        </div>
                        <div class="marr">
                            <img src="../assets/images/icon_yj.png" alt />
                            <div class="numTj">
                                <div class="numstyle">{{ dSum }}</div>
                                <div class="msT">待审核预警信息</div>
                            </div>
                        </div>
                        <div>
                            <img src="../assets/images/icon_weixiu.png" alt />
                            <div class="numTj">
                                <div class="numstyle">{{ wSum }}</div>
                                <div class="msT">维修</div>
                            </div>
                        </div>
                        <!-- <div>
              <img src="../assets/images/icon_daohang.png" alt />
              <div class="numTj">
                <div class="numstyle">54</div>
                <div>行程</div>
              </div>
            </div>-->
                    </div>
                </div>
            </div>
            <div class="wrap_con2" style="display:flex">
                <div class="leftB" style="flex:1">
                    <div class="fxdjBox">
                        <div class="title">故障统计</div>
                        <div id="fxdjTable"></div>
                        <span class="">{{chex}}</span>
                        <span class="">{{city}}</span>
                        <span class="">{{riqi}}</span>
                    </div>
                    <div class="fxdjBox" style="margin-top:8px;position: relative;">
                        <div class="title">电池包异常识别</div>
                        <div id="dcbycTable"></div>
                        <div class="boxtip">
                            <span> <img src="../assets/images/icon_jia.png" alt /> </span>离群车辆
                        </div>
                    </div>
                </div>
                <div class="middleB" style="flex:1">
                    <div class="title">车辆管理</div>
                    <div id="myChartmain" class="bg"></div>
                </div>
                <div class="leftB" style="flex:1">
                    <div class="fxdjBox">
                        <div class="title">预警类型统计</div>
                        <div id="yjTable" @click="yjTableChange"></div>
                    </div>
                    <div class="fxdjBox" style="margin-top:8px;">
                        <div class="title">风险等级</div>
                        <div id="ljTable"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="警报" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
            <div style="width:100%; display:flex;justify-items: center;justify-content: center;">
                <img src="../assets/images/hg.png" alt />
                <span style="margin-top:4px;">1G1BL52P7TR115521 车高风险！</span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import top from "@/components/header";
import echarts from "echarts";
import china from "echarts/map/json/china.json";
import { findByNewestOne, } from "@/api/login"
export default {
    components: {
        top
    },
    data() {
        return {
            pingData: [],
            //故障统计
            chex: "",
            city: "",
            riqi: "",
            //今日新增部分
            cSum: "-",
            gSum: "-",
            ySum: "-",
            dSum: "-",
            wSum: "-",
            animate: false, //通知栏
            active: 1,
            FormVisibledel: true,
            marqueeList: [
                { name: 0, content: "通知：高风险 1G1BL52P7TR115521于07:06:12发生预警，请及时处理" },
                { name: 0, content: "通知：高风险 2G1BL52P7TR115522于08:02:06发生预警，请及时处理" },
                { name: 0, content: "通知：高风险 3G1BL52P7TR115523于09:22:46发生预警，请及时处理" },
                { name: 0, content: "通知：高风险 4G1BL52P7TR115524于10:02:06发生预警，请及时处理" },
                { name: 1, content: "通知：低风险 5G1BL52P7TR115525于11:02:36发生预警，请及时处理" },
                { name: 1, content: "通知：低风险 6G1BL52P7TR115526于12:12:56发生预警，请及时处理" },
                { name: 2, content: "通知：中风险 7G1BL52P7TR115527于13:02:06发生预警，请及时处理" },
                { name: 2, content: "通知：中风险 8G1BL52P7TR115528于14:02:06发生预警，请及时处理" },
                { name: 2, content: "通知：中风险 9G1BL52P7TR115529于15:02:06发生预警，请及时处理" }
            ]
        };
    },
    created() {
        // 通知动画
        this.timer1 = setInterval(this.scroll, 1000);
    },
    methods: {
        covertType(type) {
            if (type === "lowrisk_num") {
                return "低风险";
            } else if (type === "medrisk_num") {
                return "中风险";
            } else if (type === "highrisk_num") {
                return "高风险";
            }
        },
        //风险等级
        getFindByNewestOne() {
            findByNewestOne().then((res) => {
                const arr = res.data.data;
                arr.forEach(item => {
                    this.pingData.push({
                        name: this.covertType(item.name),
                        value: item.value
                    })
                })
                console.log('this.pingData1111', this.pingData);
                this.drawPie()
            })
        },
        //点击预警统计图内任意位置,跳转到预警统计模块
        yjTableChange() {
            this.$router.push({ name: 'early' })
        },
        //通知栏跳转至风险电池管理页面
        goPage() {
            this.$router.push({ name: 'battery' })
        },
        scroll() {
            let con1 = this.$refs.con1;
            // con1.style.marginTop = '-30px';
            this.animate = !this.animate;
            var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
            setTimeout(function () {
                that.marqueeList.push(that.marqueeList[0]);
                that.marqueeList.shift();
                // con1.style.marginTop = '0px';
                that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            }, 1000);
        },
        //鼠标悬停暂停滚动
        mEnter() {
            clearInterval(this.timer1);
        },
        // 鼠标离开继续滚动
        mLeave() {
            this.timer1 = setInterval(this.scroll, 1000);
        },
        //点击关闭dialog
        handleClose(done) {
            this.FormVisibledel = false;
        },
        // 故障统计
        drawBar() {
            let myChart = this.$echarts.init(document.getElementById("fxdjTable"));
            myChart.setOption({
                title: { text: "" }, //主标题文本。
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: {
                    y: 25,
                    left: "20%",
                    top: "-10%",
                    bottom: "40%"
                },
                yAxis: {
                    name: "(辆)",
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 12,
                        // padding: [25, 0, 0, 0]
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                            type: "dashed"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    }
                },
                xAxis: {
                    axisLine: {  //坐标轴轴线相关设置
                        // show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                        }
                    },
                    axisLabel: {   //坐标轴刻度标签的相关设置
                        interval: 0,
                        rotate: 30,
                        // formatter: function (val) {  //文字纵向展示
                        //     return val.split("").join("\n");
                        // },
                        color: "#fff",
                        textStyle: {
                            fontSize: 10      //更改坐标轴文字大小
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    // data: ["1", "2", "3", "4", "5", "6"]
                    data: [
                        "电池高温报警",
                        '车载储能装置类型过压报警',
                        "单体电池过压报警",
                        "车载储能装置类型过充",
                        "车载储能装置类型欠压报警",
                        "单体电池欠压报警",
                        "SOC过高报警",
                        "SOC过低报警",
                        "温度差异报警",
                        "电池单体一致性差报警",
                        "SOC跳变报警",
                        "可充电储能系统不匹配报警",
                        "绝缘报警",
                    ]
                },
                series: [
                    {
                        name: "故障统计",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: "skyblue"
                                    },
                                    {
                                        offset: 1,
                                        color: "#fff"
                                    }
                                ], false),
                                barBorderRadius: 0,
                                borderWidth: 0.5,
                                borderColor: "rgba(0,0,0,1)",
                                label: {
                                    show: false,
                                    position: "top"
                                    // formatter: function(p) {
                                    //   return p.value > 0 ? p.value : "";
                                    // }
                                }
                            }
                        },
                        emphass: {
                            itemStyle: {
                                color: '#333fff'
                            }
                        },
                        type: "bar",
                        barGap: 8,
                        barWidth: 13,
                        data: [45, 20, 36, 10, 30, 50, 25, 46, 48, 79, 36, 45, 100]
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 预警类型统计
        drawBar2() {
            let myChart = this.$echarts.init(document.getElementById("yjTable"));
            myChart.setOption({
                title: { text: "" },
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: {
                    y: 25,
                    left: "25%",
                    right: "19%",
                    bottom: "20%"
                },
                xAxis: {
                    name: "(辆)",
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 14,
                        padding: [25, 0, 0, 0]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                            type: "dashed"
                        }
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    // data: ["1", "2", "3", "4", "5", "6"]
                    data: ["温度异常", "车辆离群", "电压异常", "单体一致性差", "绝缘异常"]
                },
                series: [
                    {
                        name: "预警统计数量",
                        itemStyle: {
                            normal: {
                                color: "rgba(248,209,93,1)",
                                barBorderRadius: 0,
                                borderWidth: 0.5,
                                borderColor: "rgba(0,0,0,1)",
                                label: {
                                    show: false,
                                    position: "top"
                                    // formatter: function(p) {
                                    //   return p.value > 0 ? p.value : "";
                                    // }
                                }
                            }
                        },
                        type: "bar",
                        barGap: 8,
                        barWidth: 13,
                        data: [5, 20, 10, 40, 70]
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 风险等级
        drawPie() {
            let that = this
            let myChart = this.$echarts.init(document.getElementById("ljTable"));
            // var data=[
            //       { value: 35, name: '高风险' },
            //       { value: 45, name: '中风险' },
            //       { value: 55, name: '低风险' },
            //   ];
            myChart.setOption({
                color: ["#FE8FA3", "#F7F536", "#2BE3F5"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                grid: {
                    y: 25,
                    left: "8%",
                    right: "28%"
                },
                legend: {
                    orient: "vertical",
                    left: "60%",
                    top: "center",
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    },
                    icon: "circle",
                    data: ["高风险", "中风险", "低风险"]
                    // formatter:  function(name){
                    //     var total = 0;
                    //     var target;
                    //     for (var i = 0, l = data.length; i < l; i++) {
                    //     total += data[i].value;
                    //     if (data[i].name == name) {
                    //         target = data[i].value;
                    //         }
                    //     }
                    //     return name + ' ' + ((target/total)*100).toFixed(2) + '%';
                    // }
                },
                series: [
                    {
                        name: "风险等级",
                        type: "pie",
                        radius: ["30%", "60%"],
                        center: ["35%", "45%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        // data: that.pingData
                        data: JSON.parse(JSON.stringify(that.pingData))
                        //  [
                        //     { value: 35, name: "高风险" },
                        //     { value: 45, name: "中风险" },
                        //     { value: 55, name: "低风险" }
                        // ]
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 电池包异常识别
        drawBoxplot() {
            let myChart = this.$echarts.init(document.getElementById("dcbycTable"));
            myChart.setOption({
                title: {
                    show: false,
                    text: "离群车辆",
                    x: "center",
                    bottom: 10,
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                legend: {
                    show: false,
                    bottom: "5%",
                    data: [
                        {
                            name: "离群车辆",
                            icon: "circle"
                        }
                    ],
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip: {
                    trigger: "item",
                    axisPointer: {
                        type: "shadow"
                    },
                    confine: true,

                },
                grid: {
                    y: 25,
                    left: "8%",
                    right: "10%"
                },
                xAxis: {
                    type: "category",
                    data: ["1", "2", "3", "4", "5", "6", "7", "8"],
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    splitLine: {
                        show: false
                    }
                },

                yAxis: {
                    type: "value",
                    nameTextStyle: {
                        color: "#3259B8",
                        fontSize: 14
                    },
                    axisLabel: {
                        show: false,
                        color: "#fff"
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    }
                },
                series: [
                    {
                        name: "离群车辆",
                        type: "boxplot",
                        boxWidth: 15,
                        // data: [
                        //     [30645,
                        // 53490,
                        // 66640.5,
                        // 89123,
                        // 159949,],
                        //     [19464,
                        // 46454,
                        // 59139,
                        // 83479,
                        // 179440,],
                        // [16704,
                        // 46041,
                        // 60155,
                        // 86818,
                        // 159980,],
                        // [21543,
                        // 41619.75,
                        // 58819.5,
                        // 87540,
                        // 159978,],
                        // [15202,
                        // 35757,
                        // 44721,
                        // 59916.5,
                        // 159825,],
                        // [22158,
                        // 34754.5,
                        // 49718,
                        // 71637,
                        // 139972,],
                        // [22158,
                        // 34754.5,
                        // 49718,
                        // 71637,
                        // 139972,],
                        // [22158,
                        // 34754.5,
                        // 49718,
                        // 71637,
                        // 139972,],
                        // ],
                        data: [
                            [
                                11.1707317073171,
                                10.8275862068965,
                                10.8275862068965,
                                9.65573770491812,
                                10.53125,
                                15,
                                8.87878787878784,
                                15.5833333333333,
                                9.65573770491812
                            ],
                            [
                                9.37931034482747,
                                9.37931034482747,
                                33.5000000000001,
                                9.01234567901226,
                                9.76923076923074,
                                8.06249999999997,
                                8,
                                8.4146341463415
                            ],
                            [
                                14.8000000000001,
                                9.92592592592583,
                                10.0896860986547,
                                14,
                                11.8571428571428,
                                15.142857142857,
                                11.4,
                                19.4528301886793
                            ],
                            [
                                12.3373493975904,
                                18.269230769231,
                                17.7157894736844,
                                9.49999999999999,
                                12.3571428571428,
                                10.41,
                                15.0000000000002,
                                9.59999999999992
                            ],
                            [
                                18.4320987654321,
                                23.5833333333334,
                                23.010101010101,
                                19.5469915464943,
                                16.4528301886792,
                                11.1052631578948,
                                13.8148148148149,
                                12.761904761905
                            ],
                            [
                                10.0123456790123,
                                9.13513513513501,
                                10,
                                8.80769230769178,
                                17.3329248366013,
                                8.82352941176479,
                                17.3329248366013,
                                10.1190476190477
                            ],
                            [
                                9.27000000000006,
                                8.91525423728826,
                                17,
                                8.87931034482771,
                                25.4272151898734,
                                25.4272151898734,
                                21.992700729927,
                                8.96153846153851
                            ],
                            [
                                9.33333333333328,
                                8.84782608695645,
                                11.3706293706293,
                                19.5833333333334,
                                21.992700729927,
                                25.4272151898734,
                                13.8571428571429,
                                13.7999999999999
                            ]
                        ],
                        itemStyle: {
                            normal: {
                                borderColor: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#2BE3F5" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#2BE3F5" // 100% 处的颜色
                                        }
                                    ],
                                    globalCoord: false // 缺省为 false
                                },
                                borderWidth: 2,
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "rgba(43, 227, 245, 0.7)" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(43, 227, 245, 0.7)" // 100% 处的颜色
                                        }
                                    ],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        tooltip: {
                            show: false
                        }
                    },
                    {
                        name: "离群车辆",
                        type: "scatter",
                        symbol:
                            "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAK0lEQVQYlWP8kFrLgAT+Q9mMMDEmZFlsgKACFiRjsVlFnAlwB9HAkQwMDABhFAXlxanpQwAAAABJRU5ErkJggg==",
                        data: [
                            "",
                            "",
                            "",
                            "23.5000000000001",
                            "33.5000000000001",
                            "",
                            "",
                            ""
                        ],
                        tooltip: {
                            formatter: function (param) {
                                return [
                                    "车辆VIN: " + "1G1BL52P7TR11552" + param.data.substr(0, 1),
                                    "实际特征名称: " + param.data,
                                    "离群频次: " + param.data
                                    // 'Q3: ' + param.data[4],
                                    // 'Median: ' + param.data[3],
                                    // 'Q1: ' + param.data[2],
                                    // 'Lower: ' + param.data[1]
                                ].join("<br/>");
                            }
                        }
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 车辆管理
        chainMap: function () {
            /* eslint-disable */
            let myChart = this.$echarts.init(document.getElementById("myChartmain"));
            this.$echarts.registerMap("china", china);
            var mapName = "china";
            // var data = [
            //   { name: "北京", value: 199 },
            //   { name: "天津", value: 420 },
            //   { name: "河北", value: 1020 },
            //   { name: "山西", value: 810 },
            //   { name: "内蒙古", value: 470 },
            //   { name: "辽宁", value: 670 },
            //   { name: "吉林", value: 820 },
            //   { name: "黑龙江", value: 500 },
            //   { name: "上海", value: 240 },
            //   { name: "江苏", value: 920 },
            //   { name: "浙江", value: 1140 },
            //   { name: "安徽", value: 1090 },
            //   { name: "福建", value: 1160 },
            //   { name: "江西", value: 910 },
            //   { name: "山东", value: 1190 },
            //   { name: "河南", value: 1370 },
            //   { name: "湖北", value: 1160 },
            //   { name: "湖南", value: 1140 },
            //   { name: "重庆", value: 910 },
            //   { name: "四川", value: 1250 },
            //   { name: "贵州", value: 620 },
            //   { name: "云南", value: 830 },
            //   { name: "西藏", value: 1000 },
            //   { name: "陕西", value: 8000 },
            //   { name: "甘肃", value: 5600},
            //   { name: "青海", value: 10000 },
            //   { name: "宁夏", value: 18000 },
            //   { name: "新疆", value: 1800 },
            //   { name: "广东", value: 12300 },
            //   { name: "广西", value: 5900 },
            //   { name: "海南", value: 14 }
            // ];
            // function mapTooltipClick(name) {
            //     alert(name)
            // };
            var geoCoordMap = {};
            var toolTipData = [
                {
                    name: "北京",
                    value: [
                        { name: "高风险预警", value: 35 },
                        { name: "中风险预警", value: 42 },
                        { name: "低风险预警", value: 62 },
                        { name: "安全", value: 72 }
                    ]
                },
                {
                    name: "天津",
                    value: [
                        { name: "高风险预警", value: 45 },
                        { name: "中风险预警", value: 52 },
                        { name: "低风险预警", value: 72 },
                        { name: "安全", value: 82 }
                    ]
                },
                {
                    name: "河北",
                    value: [
                        { name: "高风险预警", value: 65 },
                        { name: "中风险预警", value: 62 },
                        { name: "低风险预警", value: 82 },
                        { name: "安全", value: 92 }
                    ]
                },
                {
                    name: "山西",
                    value: [
                        { name: "高风险预警", value: 105 },
                        { name: "中风险预警", value: 102 },
                        { name: "低风险预警", value: 112 },
                        { name: "安全", value: 112 }
                    ]
                },
                {
                    name: "内蒙古",
                    value: [
                        { name: "高风险预警", value: 25 },
                        { name: "中风险预警", value: 86 },
                        { name: "低风险预警", value: 76 },
                        { name: "安全", value: 88 }
                    ]
                },
                {
                    name: "辽宁",
                    value: [
                        { name: "高风险预警", value: 35 },
                        { name: "中风险预警", value: 83 },
                        { name: "低风险预警", value: 66 },
                        { name: "安全", value: 90 }
                    ]
                },
                {
                    name: "吉林",
                    value: [
                        { name: "高风险预警", value: 95 },
                        { name: "中风险预警", value: 22 },
                        { name: "低风险预警", value: 52 },
                        { name: "安全", value: 202 }
                    ]
                },
                {
                    name: "黑龙江",
                    value: [
                        { name: "高风险预警", value: 25 },
                        { name: "中风险预警", value: 55 },
                        { name: "低风险预警", value: 89 },
                        { name: "安全", value: 95 }
                    ]
                },
                {
                    name: "上海",
                    value: [
                        { name: "高风险预警", value: 60 },
                        { name: "中风险预警", value: 80 },
                        { name: "低风险预警", value: 42 },
                        { name: "安全", value: 62 }
                    ]
                },
                {
                    name: "江苏",
                    value: [
                        { name: "高风险预警", value: 34 },
                        { name: "中风险预警", value: 58 },
                        { name: "低风险预警", value: 102 },
                        { name: "安全", value: 92 }
                    ]
                },
                {
                    name: "浙江",
                    value: [
                        { name: "高风险预警", value: 75 },
                        { name: "中风险预警", value: 52 },
                        { name: "低风险预警", value: 28 },
                        { name: "安全", value: 22 }
                    ]
                },
                {
                    name: "安徽",
                    value: [
                        { name: "高风险预警", value: 100 },
                        { name: "中风险预警", value: 70 },
                        { name: "低风险预警", value: 38 },
                        { name: "安全", value: 62 }
                    ]
                },
                {
                    name: "福建",
                    value: [
                        { name: "高风险预警", value: 60 },
                        { name: "中风险预警", value: 55 },
                        { name: "低风险预警", value: 38 },
                        { name: "安全", value: 100 }
                    ]
                },
                {
                    name: "江西",
                    value: [
                        { name: "高风险预警", value: 75 },
                        { name: "中风险预警", value: 65 },
                        { name: "低风险预警", value: 77 },
                        { name: "安全", value: 52 }
                    ]
                },
                {
                    name: "山东",
                    value: [
                        { name: "高风险预警", value: 115 },
                        { name: "中风险预警", value: 112 },
                        { name: "低风险预警", value: 28 },
                        { name: "安全", value: 182 }
                    ]
                },
                {
                    name: "河南",
                    value: [
                        { name: "高风险预警", value: 35 },
                        { name: "中风险预警", value: 92 },
                        { name: "低风险预警", value: 58 },
                        { name: "安全", value: 122 }
                    ]
                },
                {
                    name: "湖北",
                    value: [
                        { name: "高风险预警", value: 125 },
                        { name: "中风险预警", value: 122 },
                        { name: "低风险预警", value: 28 },
                        { name: "安全", value: 132 }
                    ]
                },
                {
                    name: "湖南",
                    value: [
                        { name: "高风险预警", value: 195 },
                        { name: "中风险预警", value: 282 },
                        { name: "低风险预警", value: 128 },
                        { name: "安全", value: 282 }
                    ]
                },
                {
                    name: "重庆",
                    value: [
                        { name: "高风险预警", value: 30 },
                        { name: "中风险预警", value: 80 },
                        { name: "低风险预警", value: 85 },
                        { name: "安全", value: 125 }
                    ]
                },
                {
                    name: "四川",
                    value: [
                        { name: "高风险预警", value: 95 },
                        { name: "中风险预警", value: 32 },
                        { name: "低风险预警", value: 80 },
                        { name: "安全", value: 92 }
                    ]
                },
                {
                    name: "贵州",
                    value: [
                        { name: "高风险预警", value: 125 },
                        { name: "中风险预警", value: 182 },
                        { name: "低风险预警", value: 18 },
                        { name: "安全", value: 86 }
                    ]
                },
                {
                    name: "云南",
                    value: [
                        { name: "高风险预警", value: 115 },
                        { name: "中风险预警", value: 32 },
                        { name: "低风险预警", value: 68 },
                        { name: "安全", value: 92 }
                    ]
                },
                {
                    name: "西藏",
                    value: [
                        { name: "高风险预警", value: 135 },
                        { name: "中风险预警", value: 142 },
                        { name: "低风险预警", value: 88 },
                        { name: "安全", value: 166 }
                    ]
                },
                {
                    name: "陕西",
                    value: [
                        { name: "高风险预警", value: 105 },
                        { name: "中风险预警", value: 102 },
                        { name: "低风险预警", value: 58 },
                        { name: "安全", value: 62 }
                    ]
                },
                {
                    name: "甘肃",
                    value: [
                        { name: "高风险预警", value: 145 },
                        { name: "中风险预警", value: 132 },
                        { name: "低风险预警", value: 58 },
                        { name: "安全", value: 42 }
                    ]
                },
                {
                    name: "青海",
                    value: [
                        { name: "高风险预警", value: 25 },
                        { name: "中风险预警", value: 42 },
                        { name: "低风险预警", value: 38 },
                        { name: "安全", value: 62 }
                    ]
                },
                {
                    name: "宁夏",
                    value: [
                        { name: "高风险预警", value: 75 },
                        { name: "中风险预警", value: 92 },
                        { name: "低风险预警", value: 68 },
                        { name: "安全", value: 102 }
                    ]
                },
                {
                    name: "新疆",
                    value: [
                        { name: "高风险预警", value: 55 },
                        { name: "中风险预警", value: 66 },
                        { name: "低风险预警", value: 38 },
                        { name: "安全", value: 92 }
                    ]
                },
                {
                    name: "广东",
                    value: [
                        { name: "高风险预警", value: 100 },
                        { name: "中风险预警", value: 86 },
                        { name: "低风险预警", value: 58 },
                        { name: "安全", value: 95 }
                    ]
                },
                {
                    name: "广西",
                    value: [
                        { name: "高风险预警", value: 125 },
                        { name: "中风险预警", value: 52 },
                        { name: "低风险预警", value: 99 },
                        { name: "安全", value: 105 }
                    ]
                },
                {
                    name: "海南",
                    value: [
                        { name: "高风险预警", value: 95 },
                        { name: "中风险预警", value: 82 },
                        { name: "低风险预警", value: 18 },
                        { name: "安全", value: 86 }
                    ]
                }
            ];

            /*获取地图数据*/
            myChart.showLoading();
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            myChart.hideLoading();
            mapFeatures.forEach(function (v) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });

            //   console.log(data);
            //   console.log(toolTipData);

            //var max = 480;
            //var min = 9; // todo
            // var maxSize4Pin = 100,
            //   minSize4Pin = 20;

            // var convertData = function(data) {
            //   var res = [];
            //   for (var i = 0; i < data.length; i++) {
            //     var geoCoord = geoCoordMap[data[i].name];
            //     if (geoCoord) {
            //       res.push({
            //         name: data[i].name,
            //         value: geoCoord.concat(data[i].value)
            //       });
            //     }
            //   }
            //   return res;
            // };
            let option = {
                title: {
                    top: "6%",
                    //text: '车辆总数：123辆，实时在线：34辆',
                    text: "车辆总数：" + "12300" + "辆，实时在线：" + "3400" + "辆",
                    left: "center",
                    textStyle: {
                        fontSize: "13",
                        fontWeight: "400",
                        color: "rgba(103,225,255,1)"
                    }
                },
                tooltip: {
                    padding: 0,
                    enterable: true,
                    transitionDuration: 1,
                    formatter: function (params) {
                        // console.log(params.dataIndex);
                        var tipHtml = "";
                        tipHtml =
                            '<div style="width:200px;height:200px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,0,0,0.3);border-radius:6px;">' +
                            '<div style="width:180px;height:40px;line-height:40px;border-bottom:1px solid rgba(255,255,255,0.2);padding:0 10px">' +
                            '<i style="display:inline-block;width:8px;height:8px;border-radius:40px;">' +
                            "</i>" +
                            '<span style="color:#fff;font-size:16px;">' +
                            params.name +
                            "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            "预警数量统计" +
                            "</span>" +
                            "</div>" +
                            '<div style="padding:5px 20px">' +
                            '<p style="color:#fff;font-size:12px;">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#d93824;margin:0 8px;background: rgba(0,0,0,0.2);border-radius: 50%;border: 2px solid #d93824;">' +
                            "</i>" +
                            "高风险预警" +
                            '<span style="color:#11ee7d;margin:0 6px;">' +
                            toolTipData[params.dataIndex].value[0].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#F8D15D;margin:0 8px;background: rgba(0,0,0,0.2);border-radius: 50%;border: 2px solid #F8D15D;">' +
                            "</i>" +
                            "中风险预警" +
                            '<span style="color:#f48225;margin:0 6px;">' +
                            toolTipData[params.dataIndex].value[1].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#F7F536;margin:0 8px;background: rgba(0,0,0,0.2);border-radius: 50%;border: 2px solid #F7F536;">' +
                            "</i>" +
                            "低风险预警" +
                            '<span style="color:#f4e925;margin:0 6px;">' +
                            toolTipData[params.dataIndex].value[2].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#2BE3F5;margin:0 8px;background: rgba(0,0,0,0.2);border-radius: 50%;border: 2px solid #2BE3F5;">' +
                            "</i>" +
                            "安全" +
                            '<span style="color:#f4e925;margin:0 6px;">' +
                            toolTipData[params.dataIndex].value[3].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            "</div>" +
                            "</div>";
                        // setTimeout(function() {
                        //   tooltipCharts(params.name);
                        // }, 10);
                        return tipHtml;
                    } //数据格式化
                },
                visualMap: {
                    align: "left",
                    show: true,
                    orient: "horizontal", //'vertical'  horizontal
                    left: "center", //center
                    bottom: "20",
                    itemWidth: 6, //图形的宽度，即长条的宽度。
                    itemHeight: 6, //图形的高度，即长条的高度。
                    textStyle: {
                        color: "#A7A7A7"
                    },
                    type: "piecewise", //分段型。
                    splitNumber: 5,
                    //inverse: true,
                    pieces: [
                        {
                            value: 0,
                            label: "0",
                            color: "#ffffff"
                        },
                        {
                            gt: 1,
                            lt: 9,
                            label: "1-9",
                            color: "#B3DFE7"
                        },
                        {
                            gte: 10,
                            lt: 99,
                            label: "10-99",
                            color: "#92C3E1"
                        },
                        {
                            gte: 100,
                            lte: 499,
                            label: "100-499",
                            color: "#5095D6"
                        },
                        {
                            gt: 500,
                            lte: 999,
                            label: "500-999",
                            color: "#3986D5"
                        },
                        {
                            gt: 1000,
                            lte: 10000,
                            label: "1000-10000",
                            color: "#0058C9"
                        },
                        {
                            gt: 10000,
                            label: ">10000",
                            color: "#004CAD"
                        }
                    ]
                },
                series: [
                    {
                        name: "车辆数",
                        type: "map",
                        mapType: "china",
                        roam: false,
                        //aspectScale: 1, //长宽比
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true,
                                color: "#000E15",
                                areaColor: "#FFFFFF" //鼠标选择区域颜色
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: "#0058C9",
                                borderColor: "rgba(0,0,0,0.2)"
                            },
                            emphasis: {
                                areaColor: "#20F5ED"
                            }
                        },
                        data: [
                            { name: "上海", value: 102.76 },
                            { name: "甘肃", value: 14.29 },
                            { name: "贵州", value: 362 },
                            { name: "海南", value: 3.4 },
                            { name: "安徽", value: 92.96 },
                            { name: "江苏", value: 239.27 },
                            { name: "浙江", value: 214.79 },
                            { name: "新疆", value: 678 },
                            { name: "青海", value: 431 },
                            { name: "西藏", value: 2270 },
                            { name: "宁夏", value: 4.88 },
                            { name: "内蒙古", value: 438 },
                            { name: "广东", value: 264 },
                            { name: "福建", value: 62.54 },
                            { name: "广西", value: 236 },
                            { name: "河南", value: 202.06 },
                            { name: "湖北", value: 10 },
                            { name: "湖南", value: 11.19 },
                            { name: "江西", value: 37.55 },
                            { name: "北京", value: 57.34 },
                            { name: "吉林", value: 989 },
                            { name: "辽宁", value: 642 },
                            { name: "黑龙江", value: 201 },
                            { name: "天津", value: 48.61 },
                            { name: "山东", value: 326.43 },
                            { name: "山西", value: 47.75 },
                            { name: "河北", value: 114.15 },
                            { name: "陕西", value: 55.26 },
                            { name: "四川", value: 4 },
                            { name: "重庆", value: 16.1 },
                            { name: "云南", value: 2164 }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
            // var count = 0;
            //   var timeTicket = null;
            //   var dataLength = option.series[0].data.length;
            //   timeTicket && clearInterval(timeTicket);
            //   timeTicket = setInterval(function() {
            //       myChart.dispatchAction({
            //           type: 'downplay',
            //           seriesIndex: 0,
            //       });
            //       myChart.dispatchAction({
            //           type: 'highlight',
            //           seriesIndex: 0,
            //           dataIndex: (count) % dataLength
            //       });
            //       myChart.dispatchAction({
            //           type: 'showTip',
            //           seriesIndex: 0,
            //           dataIndex: (count) % dataLength
            //       });
            //       count++;
            //   }, 1000);
            //   myChart.on('mouseover', function(params) {
            //       console.log(params)
            //       clearInterval(timeTicket);
            //       myChart.dispatchAction({
            //           type: 'downplay',
            //           seriesIndex: 0
            //       });
            //       myChart.dispatchAction({
            //           type: 'highlight',
            //           seriesIndex: 0,
            //           dataIndex: params.dataIndex
            //       });
            //       myChart.dispatchAction({
            //           type: 'showTip',
            //           seriesIndex: 0,
            //           dataIndex: params.dataIndex,
            //       });
            //   });
            //   myChart.on('mouseout', function(params) {
            //       timeTicket && clearInterval(timeTicket);
            //       timeTicket = setInterval(function() {
            //           myChart.dispatchAction({
            //               type: 'downplay',
            //               seriesIndex: 0,
            //           });
            //           myChart.dispatchAction({
            //               type: 'highlight',
            //               seriesIndex: 0,
            //               dataIndex: (count) % dataLength
            //           });
            //           myChart.dispatchAction({
            //               type: 'showTip',
            //               seriesIndex: 0,
            //               dataIndex: (count) % dataLength
            //           });
            //           count++;
            //       }, 1000);
            //   });
            // var index = 0; //播放所在下标
            // var showTip = setInterval(function() {
            //   myChart.dispatchAction({
            //     type: "showTip",
            //     seriesIndex: 0,
            //     dataIndex: index
            //   });
            //   index++;
            //   if (index >= option.series[0].data.length) {
            //     index = 0;
            //   }
            // }, 2000);
            // myChart.on("mouseover", function(params) {
            //   clearInterval(showTip);
            //   myChart.dispatchAction({
            //     type: "showTip",
            //     seriesIndex: 0,
            //     dataIndex: params.dataIndex
            //   });
            // });
            // myChart.on("mouseout", function(params) {
            //   showTip && clearInterval(showTip);
            //   showTip = setInterval(function() {
            //     myChart.dispatchAction({
            //       type: "showTip",
            //       seriesIndex: 0,
            //       dataIndex: index
            //     });
            //     index++;
            //     if (index >= option.series[0].data.length) {
            //       index = 0;
            //     }
            //   }, 2000);
            // });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    },
    mounted() {
        this.drawBar();
        this.drawBar2();
        // this.drawPie();
        this.drawBoxplot();
        this.chainMap();
        this.getFindByNewestOne();
        // window.addEventListener("resize", function() {
        //  myChart.resize();
        // });
    }
};
</script>

<style lang="less" scoped>
@import '../assets/fonts/fonts.css';
* {
    margin: 0;
    padding: 0;
}
.anim {
    transition: all 0.5s;
}
#con1 li {
    list-style: none;
    line-height: 30px;
    height: 30px;
}
//通知动画 /*文字无缝滚动*/
// .anim {
//   position: relative;
//   animation: myMove 8s linear infinite;
//   animation-fill-mode: forwards;
// }
// .anim:hover {
//   animation-play-state: paused; //鼠标悬停暂停动画
// }
// @keyframes myMove {
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(-200px);
//   }
// }
html {
    margin: 0;
    padding: 0;
    overflow: -moz-hidden-unscrollable;
    height: 100%;
}

body::-webkit-scrollbar {
    display: none;
}
body {
    margin: 0;
    padding: 0;
    -ms-overflow-style: none;
    height: 100%;
    overflow: auto;
}
.wrap {
    box-sizing: border-box;
    min-width: 100%;
    min-height: 100%;
    background: url(../assets/images/bg.png) no-repeat;
    background-size: 100% 100%;
}
.main {
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
}
.wrap_con {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-items: center;
    overflow: hidden;
}
.mess_box {
    width: 37%;
    background-image: url(../assets/images/jx_bg.png);
    background-size: 100% 100%;
    height: 97px;
    display: flex;
    justify-content: flex-start;
    justify-items: center;
    img {
        display: block;
        margin-top: 30px;
        margin-left: 20px;
    }
    .messList {
        height: 85%;
        width: 80%;
        margin-right: 3%;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        transition: all ease 0.5s;
    }
    .messList ul {
        margin: 0;
        padding: 0;
    }
    .messList ul li {
        list-style: none;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        p {
            margin: 1px auto;
        }
    }
    .messList ul li a {
        color: rgba(255, 255, 255, 1);
    }
    .messList ul li:hover {
        color: #fea958;
    }
}
.today_box {
    width: 63%;
    background-image: url(../assets/images/today_bg.png);
    background-size: 100% 100%;
    height: 57px;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .today_title {
        margin: 0 auto;
        // margin-top: 12px;
        margin-left: 34px;
        width: 144px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background-image: url(../assets/images/t_bg1.png);
        background-size: 100% 100%;
    }
    .today_num {
        margin: 0 auto;
        margin-left: 54px;
        width: 80%;
        margin-right: 34px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(113, 183, 238, 0.7);
        .marr {
            margin-right: 57px;
            // margin-right: 20px;
            overflow: hidden;
        }
        img {
            display: block;
            float: left;
            margin: 15px 0;
            margin-right: 12px;
        }
        .numTj {
            float: left;
            display: block;
            height: 62px;
            .numstyle {
                height: 38px;
                line-height: 38px;
                font-size: 30px;
                font-family: Digiface;
                font-weight: 400;
                color: rgba(217, 255, 255, 1);
            }
            .msT {
                height: 20px;
                line-height: 20px;
            }
        }
    }
}
.wrap_con2 {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    overflow: hidden;
}
.leftB {
    width: 80%;
    .fxdjBox {
        width: 100%;
        background-image: url(../assets/images/table_bg.png);
        background-size: 100% 100%;
        // background-repeat: no-repeat;
        // display: flex;
        // justify-items: center;
        // justify-content: center;
        overflow: hidden;
        .title {
            margin: 0 auto;
            margin-top: 14px;
            width: 241px;
            background-image: url(../assets/images/t_bg2.png);
            background-size: 100% 100%;
            height: 33px;
            line-height: 33px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        .boxtip {
            position: absolute;
            margin-top: -30px;
            left: 50%;
            margin-left: -30px;
            text-align: center;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            span {
                margin-right: 5px;
            }
        }
        #fxdjTable {
            width: 100%;
            height: 300px;
        }
        #dcbycTable {
            width: 100%;
            height: 300px;
        }
        #yjTable {
            width: 100%;
            height: 300px;
        }
        #ljTable {
            width: 100%;
            height: 300px;
        }
    }
}
.middleB {
    width: 140%;
    .title {
        margin: 20px auto;
        width: 302px;
        background-image: url(../assets/images/title_bg.png);
        background-size: 100% 100%;
        height: 51px;
        line-height: 33px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
    }
    #myChartmain {
        margin-top: -60px;
        width: 100%;
        height: 100%;
    }
}
@media screen and (max-width: 1920px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 300px;
            }
            #dcbycTable {
                width: 100%;
                height: 300px;
            }
            #yjTable {
                width: 100%;
                height: 300px;
            }
            #ljTable {
                width: 100%;
                height: 300px;
            }
        }
    }
}

@media screen and (max-width: 1680px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 220px;
            }
            #dcbycTable {
                width: 100%;
                height: 220px;
            }
            #yjTable {
                width: 100%;
                height: 220px;
            }
            #ljTable {
                width: 100%;
                height: 220px;
            }
        }
    }
}

@media screen and (max-width: 1680px) and (max-height: 1024px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 220px;
            }
            #dcbycTable {
                width: 100%;
                height: 220px;
            }
            #yjTable {
                width: 100%;
                height: 220px;
            }
            #ljTable {
                width: 100%;
                height: 220px;
            }
        }
    }
    .middleB {
        width: 140%;
        .title {
            margin: 20px auto;
            width: 302px;
            background-image: url(../assets/images/title_bg.png);
            background-size: 100% 100%;
            height: 51px;
            line-height: 33px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        #myChartmain {
            margin-top: -50px;
            width: 100%;
            height: 100%;
        }
    }
}

@media screen and (max-width: 1680px) and (max-height: 800px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 220px;
            }
            #dcbycTable {
                width: 100%;
                height: 220px;
            }
            #yjTable {
                width: 100%;
                height: 220px;
            }
            #ljTable {
                width: 100%;
                height: 220px;
            }
        }
    }
    .middleB {
        width: 140%;
        .title {
            margin: 20px auto;
            width: 302px;
            background-image: url(../assets/images/title_bg.png);
            background-size: 100% 100%;
            height: 51px;
            line-height: 33px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        #myChartmain {
            margin-top: -50px;
            width: 100%;
            height: 100%;
        }
    }
}

@media screen and (max-width: 1366px) and (max-height: 1024px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 200px;
            }
            #dcbycTable {
                width: 100%;
                height: 200px;
            }
            #yjTable {
                width: 100%;
                height: 220px;
            }
            #ljTable {
                width: 100%;
                height: 200px;
            }
        }
    }
    .middleB {
        width: 140%;
        .title {
            margin: 20px auto;
            width: 302px;
            background-image: url(../assets/images/title_bg.png);
            background-size: 100% 100%;
            height: 51px;
            line-height: 33px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        #myChartmain {
            margin-top: -60px;
            width: 100%;
            height: 96%;
        }
    }
}

@media screen and (max-width: 1366px) and (max-height: 768px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 160px;
            }
            #dcbycTable {
                width: 100%;
                height: 180px;
            }
            #yjTable {
                width: 100%;
                height: 160px;
            }
            #ljTable {
                width: 100%;
                height: 180px;
            }
        }
    }
    .middleB {
        width: 140%;
        .title {
            margin: 20px auto;
            width: 302px;
            background-image: url(../assets/images/title_bg.png);
            background-size: 100% 100%;
            height: 51px;
            line-height: 33px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        #myChartmain {
            margin-top: -50px;
            width: 100%;
            height: 96%;
        }
    }
}

@media screen and (max-width: 1366px) and (max-height: 600px) {
    .leftB {
        width: 80%;
        .fxdjBox {
            width: 100%;
            background-image: url(../assets/images/table_bg.png);
            background-size: 100% 100%;
            // background-repeat: no-repeat;
            // display: flex;
            // justify-items: center;
            // justify-content: center;
            overflow: hidden;
            .title {
                margin: 0 auto;
                margin-top: 14px;
                width: 241px;
                background-image: url(../assets/images/t_bg2.png);
                background-size: 100% 100%;
                height: 33px;
                line-height: 33px;
                text-align: center;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .boxtip {
                position: absolute;
                margin-top: -30px;
                left: 50%;
                margin-left: -30px;
                text-align: center;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                span {
                    margin-right: 5px;
                }
            }
            #fxdjTable {
                width: 100%;
                height: 160px;
            }
            #dcbycTable {
                width: 100%;
                height: 180px;
            }
            #yjTable {
                width: 100%;
                height: 160px;
            }
            #ljTable {
                width: 100%;
                height: 180px;
            }
        }
    }
}
body::-webkit-scrollbar {
    display: none;
}
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(54, 82, 120, 0.6);
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgba(54, 82, 120, 0.6);
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(207, 247, 253, 0.6);
}
#scroll {
    scrollbar-arrow-color: rgba(54, 82, 120, 1); /**/ /*三角箭头的颜色*/
    scrollbar-face-color: rgba(54, 82, 120, 1); /**/ /*立体滚动条的颜色*/
    scrollbar-3dlight-color: rgba(54, 82, 120, 1); /**/ /*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: rgba(
        54,
        82,
        120,
        1
    ); /**/ /*滚动条空白部分的颜色*/
    scrollbar-shadow-color: rgba(54, 82, 120, 1); /**/ /*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: rgba(
        54,
        82,
        120,
        1
    ); /**/ /*立体滚动条强阴影的颜色*/
    scrollbar-track-color: rgba(54, 82, 120, 1); /**/ /*立体滚动条背景颜色*/
    scrollbar-base-color: rgba(54, 82, 120, 1); /**/ /*滚动条的基本颜色*/
    border-radius: 10px;
}
/deep/.el-dialog__wrapper {
    position: fixed;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
/deep/.el-dialog__header {
    padding: 10px 20px 10px;
    background: rgba(250, 251, 252, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    border-radius: 8px 8px 0px 0px;
}
/deep/.el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
}
/deep/.el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #fea958;
}
/deep/.customWidth {
    width: 300px !important;
}
</style>
