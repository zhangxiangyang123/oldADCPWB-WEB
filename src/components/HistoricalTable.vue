<template>
    <div>
        <table :class="['table', tableData.type == 0 && 'table1']" cellspacing=0>
            <thead>
                <tr>
                    <th v-for="th in tableData.thead" :key="th">{{ th }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, trIdx) in tableData.tbody" :key="trIdx">
                    <td v-if="trIdx == 0" :rowspan="tableData.tbody.length" style="border: 1px solid #F1F6F9; border-top: none;">
                        <div>
                            <p v-for="(text, pIdx) in tableData.firstTdData" :key="pIdx">{{ text }}</p>
                        </div>
                    </td>
                    <td v-for="(td, tdIdx) in tr" :key="tdIdx">
                        <img src="../assets/images/battery/oneFx.png" alt="" v-if="(tableData.type == 2) && (tdIdx == 0) && td == 1">
                        <img src="../assets/images/battery/twoFx.png" alt=""  v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 2">
                        <img src="../assets/images/battery/threeFx.png" alt=""  v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 3">
                        <img src="../assets/images/battery/fourFx.png" alt=""  v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 4">
                        <!-- <span v-if="(tableData.type == 2) && (tdIdx == 0) && td == 1" style="color: #D9001B">{{ td }}</span>
                        <span v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 2" style="color: #F59A23">{{ td }}</span>
                        <span v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 3" style="color: #FFFF00">{{ td }}</span>
                        <span v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 4" style="color: #95F204">{{ td }}</span>
                        <span v-else> {{ td }}</span> -->
                        <span v-else> {{ td }}</span>
                    </td>
                    <td v-if="tableData.type != 3">
                        <el-button type="text" @click="handleDetails(tableData.type, trIdx, tr[0],$event)">查看详情</el-button>
                    </td>
                </tr>
                <tr v-if="tableData.tbody.length == 0">
                    <td :colspan="tableData.thead.length" style="border: none;">
                        <p style="text-align: center;">数据为空</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            title="查看"
            :visible.sync="dialogVisible0"
            width="706px"
            :before-close="handleClose(0)"
            class="dialog-box">
            <div class="dialog-content">
                <div class="top-box">
                    <el-row>
                        <el-col :span="14">
                            <b>电池所在设备</b>
                            <span>北汽新能源EX360 车牌号京A88888</span>
                        </el-col>
                        <el-col :span="10">
                            <b>VIN</b>
                            <span>WBAZV4109BL817920</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电开始时间</b>
                            <span>{{this.dialog.TiemStart}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电开始SOC</b>
                            <span>{{this.dialog.start}}%</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电结束时间</b>
                            <span>{{this.dialog.TiemEnd}}%</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电结束SOC</b>
                            <span>{{this.dialog.end}}%</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电电量　　</b>
                            <span>{{this.dialog.AH}}Ah</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>充电方式　　</b>
                            <span>快充</span>
                        </el-col>
                    </el-row>
                </div>
                <p style="color: #3E526F;">数据最后更新时间：2019/07/11 04:00:00</p>
                <!-- <p style="color: #3E526F; font-weight: bold; margin-bottom: 0;">最高电压/最低电压（V）</p> -->
                <div style="height: 200px; padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #E5EEF5;" ref="chart1"></div>
                <div style="display: flex; justify-content: space-between;">
                    <div style="height: 200px; width: 48%;" ref="chart2"></div>
                    <div style="height: 200px; width: 48%;" ref="chart3"></div>
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
        <el-dialog
            title="查看"
            :visible.sync="dialogVisible1"
            width="706px"
            :before-close="handleClose(1)"
            class="dialog-box">
            <div class="dialog-content">
                <div class="top-box">
                    <el-row>
                        <el-col :span="14">
                            <b>电池所在设备</b>
                            <span>北汽新能源EX360 车牌号京A88888</span>
                        </el-col>
                        <el-col :span="10">
                            <b>VIN</b>
                            <span>WBAZV4109BL817920</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>报警类型　　</b>
                            <span>{{this.dialog.TiemStart}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>报警时间　　</b>
                            <span>{{this.dialog.start}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>持续时长　　</b>
                            <span>{{this.dialog.TiemEnd}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div style="height: 200px;" ref="chart4"></div>
                <p style="border-bottom: 1px solid #E5EEF5; padding: 0 8px 15px 0; font-size: 12px; color: #3E526F; text-align: right;">2019年</p>
                <div style="display: flex; justify-content: space-between;">
                    <div style="height: 200px; width: 48%;" ref="chart5"></div>
                    <div style="height: 200px; width: 48%;" ref="chart6"></div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="查看"
            :visible.sync="dialogVisible2"
            width="80%"
            :before-close="handleClose(2)"
            class="dialog-box">
            <div class="dialog-content">
                <div class="top-box" style="margin-bottom: 0;border-bottom: 0;">
                    <el-row>
                        <el-col :span="8">
                            <b>电池所在设备</b>
                            <span>北汽新能源EX360 车牌号京A88888</span>
                        </el-col>
                        <el-col :span="16">
                            <b>VIN</b>
                            <span>WBAZV4109BL817920</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>预警风险等级</b>
                            <span>{{ RiskLevel }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>预警名称　　</b>
                            <span>{{this.dialog.start}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>预警状态　　</b>
                            <span>{{this.dialog.TiemEnd}}</span>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col :span="15">
                        <div style="height: 180px;" ref="chart7"></div>
                        <p style="margin: 0; text-align: right; font-size: 12px; color: #3E526F;padding-right: 26px;">2018年8月28日</p>
                        <div style="height: 180px;" ref="chart8"></div>
                        <p style="margin: 0; text-align: right; font-size: 12px; color: #3E526F;padding-right: 26px;">2018年8月28日</p>
                        <p style="margin: 0; text-align: right; font-size: 14px; color: #3F536E; margin-top: 15px; padding-right: 26px;">单体电压离散异常</p>
                    </el-col>
                    <el-col :span="9">
                        <div style="height: 360px;" ref="chart9"></div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <el-dialog
            title="查看"
            :visible.sync="dialogVisible4"
            width="706px"
            :before-close="handleClose(3)"
            class="dialog-box">
            <div class="dialog-content">
                <div class="top-box">
                    <el-row>
                        <el-col :span="14">
                            <b>电池所在设备</b>
                            <span>北汽新能源EX360 车牌号京A88888</span>
                        </el-col>
                        <el-col :span="10">
                            <b>VIN</b>
                            <span>WBAZV4109BL817920</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>里程　　　　</b>
                            <span>{{this.dialog.TiemStart}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>时间　　　　</b>
                            <span>{{this.dialog.start}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>时长　　　　</b>
                            <span>{{this.dialog.TiemEnd}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <b>次数　　　　</b>
                            <span>{{this.dialog.end}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div style="display: flex;">
                    <div style="margin-right: 15px; display: flex; align-items: center;">
                        <b style="font-size: 14px; color: #3F536E; margin-right: 5px;">数据类型1</b>
                        <el-select v-model="selectValue1" placeholder="请选择" size="small">
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <b style="font-size: 14px; color: #3F536E; margin-right:5px;">数据类型2</b>
                        <el-select v-model="selectValue2" placeholder="请选择" size="small">
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="height: 200px;" ref="chart10"></div>
                <p style="margin: 0; text-align: right; font-size: 12px; color: #3E526F; padding: 0px 22px 15px 0; border-bottom: 1px solid #E5EEF5; margin-bottom: 15px;">2018年8月28日</p>
                <div style="display: flex; justify-content: space-between;">
                    <div style="height: 200px; width: 48%;" ref="chart11"></div>
                    <div style="height: 200px; width: 48%;" ref="chart12"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible0: false,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible4: false,
            RiskLevel: 1,
            options1: [
                {
                    value: '1',
                    label: '总电压'
                },
                {
                    value: '2',
                    label: '总电流'
                },
                {
                    value: '3',
                    label: 'SOC'
                },
                {
                    value: '4',
                    label: '绝缘电阻'
                },
                {
                    value: '5',
                    label: '车速'
                },
                {
                    value: '6',
                    label: '行驶里程'
                },
                {
                    value: '7',
                    label: '充电状态'
                },
                {
                    value: '8',
                    label: '行驶状态'
                },
                {
                    value: '9',
                    label: '最高单体电压'
                },
                {
                    value: '10',
                    label: '最低单体电压'
                },
                {
                    value: '11',
                    label: '最高电压单体编号'
                },
                {
                    value: '12',
                    label: '最低电压单体编号'
                },
                {
                    value: '13',
                    label: '最高探针温度'
                },
                {
                    value: '14',
                    label: '最低探针温度'
                },
                {
                    value: '15',
                    label: '最高温度探针编号'
                },
                {
                    value: '16',
                    label: '最低温度探针编号'
                },
                {
                    value: '17',
                    label: '电芯电压'
                },
                {
                    value: '18',
                    label: '探针温度'
                },
            ],
            selectValue1: '',
            selectValue2: '',
            dialog:{
                TiemStart:"",
                start:"",
                TiemEnd:"",
                end:"",
                AH:""
            } 
        }
    },
    methods: {
        handleDetails (type, id, RiskLevel,e) {
            this['dialogVisible' + type] = true
            this.RiskLevel = RiskLevel
            setTimeout(() => {
                this.draw(type)
            }, 200)
           
            if(type==0){
                var num =id+1
                var el =document.querySelector("table tbody tr:nth-child("+num+")");
                if(id==0){
                    this.dialog.TiemStart=el.querySelector("td:nth-child(2)").textContent;
                    this.dialog.start=el.querySelector("td:nth-child(3)").textContent;
                    this.dialog.TiemEnd=el.querySelector("td:nth-child(4)").textContent;
                    this.dialog.end=el.querySelector("td:nth-child(5)").textContent;
                    this.dialog.AH=el.querySelector("td:nth-child(6)").textContent;
                }else{
                    this.dialog.TiemStart=el.querySelector("td:nth-child(1)").textContent;
                    this.dialog.start=el.querySelector("td:nth-child(2)").textContent;
                    this.dialog.TiemEnd=el.querySelector("td:nth-child(3)").textContent;
                    this.dialog.end=el.querySelector("td:nth-child(4)").textContent;
                    this.dialog.AH=el.querySelector("td:nth-child(5)").textContent;
                }
            }
                if(type==1 || type==2){
                var num1 =id+1
                var el1 =document.querySelector("table tbody tr:nth-child("+num1+")");
                if(id==0){
                    this.dialog.TiemStart=el1.querySelector("td:nth-child(2)").textContent;
                    this.dialog.start=el1.querySelector("td:nth-child(3)").textContent;
                    this.dialog.TiemEnd=el1.querySelector("td:nth-child(4)").textContent;
                    
                }else{
                    this.dialog.TiemStart=el1.querySelector("td:nth-child(1)").textContent;
                    this.dialog.start=el1.querySelector("td:nth-child(2)").textContent;
                    this.dialog.TiemEnd=el1.querySelector("td:nth-child(3)").textContent;

                }
             }
            if(type==4){
                var num2 =id+1
                var el2 =document.querySelector("table tbody tr:nth-child("+num2+")");
                if(id==0){
                    this.dialog.TiemStart=el2.querySelector("td:nth-child(2)").textContent;
                    this.dialog.start=el2.querySelector("td:nth-child(3)").textContent;
                    this.dialog.TiemEnd=el2.querySelector("td:nth-child(4)").textContent;
                    this.dialog.end=el2.querySelector("td:nth-child(5)").textContent;
                    
                }else{
                    this.dialog.TiemStart=el2.querySelector("td:nth-child(1)").textContent;
                    this.dialog.start=el2.querySelector("td:nth-child(2)").textContent;
                    this.dialog.TiemEnd=el2.querySelector("td:nth-child(3)").textContent;
                    this.dialog.end=el2.querySelector("td:nth-child(4)").textContent;
                    this.dialog.AH=el2.querySelector("td:nth-child(5)").textContent;
                }
            }
            console.log(this.dialog)
        },
        handleClose (type) {
            
        },
        draw (type) {
            if (type == 0) {
                let chart1 = this.$echarts.init(this.$refs.chart1);
                let option1 = {
                    tooltip: {
                        trigger: 'axis',
                        confine:true
                    },
                    title: {
                        show: true,
                        text: '最高电压/最低电压（V）',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                     legend: [
                         {
                            icon : '',
                            textStyle : {
                                fontSize: '12',
                                color : "#3E526F",
                                // lineHeight:15
                                padding: [2, 0, 0, 0]
                            },
                            data : [ '最高电压','最低电压'],
                            x : 'left',
                            itemWidth: 16,  
                            itemHeight: 10,
                            orient: 'horizontal',
                            itemGap: 10,
                            top: 25 
                        }
                    ],
                    grid: {
                        top: 65,
                        left: '3%',
                        right: '6%',
                        bottom: '25',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick:{
                            show:false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                         splitLine: {
                            show:true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        }
                    },
                    yAxis: [{
                            type: 'value',
                            // name: '最高电压/最低电压（V）',
                            // nameTextStyle: {
                            //     fontSize: '14',
                            //     color: '#3E526F',
                            //     fontWeight: '600',
                            //     padding: [0, 0, 0, 30]
                            // },
                            // splitNumber: 2,
                            axisTick:{
                                show:false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show:true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            min: 3.2
                        }
                    ],
                    dataZoom: [{
                        show: true,
                        height: 4,
                        xAxisIndex: [0],
                        bottom: '6',
                        start: 20,
                        end: 80,
                        handleSize: 20,
                        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
                        //handleSize: '110%',
                        handleStyle: {
                            color: "transparent",
                        },
                        textStyle: {
                            color: "transparent"
                        },
                        borderColor: 'transparent',
                        backgroundColor: '#EEEFF3',
                        dataBackground: {
                            lineStyle: {
                                width: 0
                            },
                            areaStyle: {
                                color: 'transparent'
                            }
                        },
                        fillerColor: '#C3C6D1',
                    }, {
                        type: "inside",
                        show: true,
                    }],
                    series: [
                        {
                            name: '最高电压',
                            type: 'line',
                            data: [
                                ['2019/7/11  1:14:00', 3.38],
                                ['2019/7/11  1:16:00', 3.41],
                                ['2019/7/11  1:18:00', 3.4],
                                ['2019/7/11  6:33:59', 3.39],
                                ['2019/7/11  6:35:00', 3.41],
                                ['2019/7/11  6:36:00', 3.78],
                                ['2019/7/11  6:38:00', 3.41],
                                ['2019/7/11  6:40:00', 3.4],
                                ['2019/7/11  6:42:00', 3.44],
                                ['2019/7/11  6:44:00', 3.38],
                                ['2019/7/11  6:45:00', 3.41],
                                 ['2019/7/11  6:47:00', 3.42],
                                ['2019/7/11  6:49:00', 3.35],
                                ['2019/7/11  6:51:00', 3.38],
                                ['2019/7/11  6:53:59', 3.37],
                                ['2019/7/11  6:54:00', 3.36],
                                ['2019/7/11  6:56:00', 3.38],
                                ['2019/7/11  6:58:00', 3.38],
                                ['2019/7/11  7:00:00', 3.37],
                                ['2019/7/11  7:02:00', 3.39],
                                ['2019/7/11  7:03:00', 3.38],
                                 ['2019/7/11  7:05:00', 3.38],
                                ['2019/7/11  7:07:00', 3.38],
                                ['2019/7/11  7:09:00', 3.38],
                                ['2019/7/11  7:11:59', 3.38],
                                ['2019/7/11  7:12:00', 3.38],
                                ['2019/7/11  7:14:00', 3.38],
                                ['2019/7/11  7:16:00', 3.37],
                                ['2019/7/11  7:18:00', 3.4],
                                ['2019/7/11  7:20:00', 3.36],
                                ['2019/7/11  7:21:00', 3.41],
                                ['2019/7/11  7:23:00', 3.42],
                                ['2019/7/11  7:25:00', 3.43],
                                ['2019/7/11  7:27:00', 3.38],
                                ['2019/7/11  7:29:00', 3.37],
                                ['2019/7/11  7:30:00', 3.4],
                                ['2019/7/11  7:32:00', 3.39],
                                ['2019/7/11  7:34:00', 3.39],
                                ['2019/7/11  7:36:00', 3.39],
                                ['2019/7/11  7:38:00', 3.38],
                                ['2019/7/11  7:39:00', 3.36],
                            ],
                            color: '#2763B7',
                        },
                        {
                            name: '最低电压',
                            type: 'line',
                           data: [
                                
                                 ['2019/7/11  1:14:00', 3.32],
                                ['2019/7/11  1:16:00', 3.31],
                                ['2019/7/11  1:18:00', 3.3],
                                ['2019/7/11  6:33:59', 3.31],
                                ['2019/7/11  6:35:00', 3.32],
                                ['2019/7/11  6:36:00', 3.31],
                                ['2019/7/11  6:38:00', 3.29],
                                ['2019/7/11  6:40:00', 3.3],
                                ['2019/7/11  6:42:00', 3.28],
                                ['2019/7/11  6:44:00', 3.32],
                                ['2019/7/11  6:45:00', 3.31],
                                 ['2019/7/11  6:47:00', 3.3],
                                ['2019/7/11  6:49:00', 3.35],
                                ['2019/7/11  6:51:00', 3.32],
                                ['2019/7/11  6:53:59', 3.33],
                                ['2019/7/11  6:54:00', 3.31],
                                ['2019/7/11  6:56:00', 3.34],
                                ['2019/7/11  6:58:00', 3.32],
                                ['2019/7/11  7:00:00', 3.31],
                                ['2019/7/11  7:02:00', 3.31],
                                ['2019/7/11  7:03:00', 3.32],
                                 ['2019/7/11  7:05:00', 3.32],
                                ['2019/7/11  7:07:00', 3.32],
                                ['2019/7/11  7:09:00', 3.32],
                                ['2019/7/11  7:11:59', 3.31],
                                ['2019/7/11  7:12:00', 3.32],
                                ['2019/7/11  7:14:00', 3.32],
                                ['2019/7/11  7:16:00', 3.3],
                                ['2019/7/11  7:18:00', 3.32],
                                ['2019/7/11  7:20:00', 3.34],
                                ['2019/7/11  7:21:00', 3.28],
                                ['2019/7/11  7:23:00', 3.29],
                                ['2019/7/11  7:25:00', 3.29],
                                ['2019/7/11  7:27:00', 3.32],
                                ['2019/7/11  7:29:00', 3.31],
                                ['2019/7/11  7:30:00', 3.3],
                                ['2019/7/11  7:32:00', 3.31],
                                ['2019/7/11  7:34:00', 3.32],
                                ['2019/7/11  7:36:00', 3.31],
                                ['2019/7/11  7:38:00', 3.32],
                                ['2019/7/11  7:39:00', 3.31],
                            ],
                            color: '#1890FF',
                           
                        }
                    ]
                }
                chart1.setOption(option1);
                window.addEventListener("resize", function () {
                    chart1.resize();
                });

                let chart2 = this.$echarts.init(this.$refs.chart2)
                let option2 = {
                    title: {
                        text: '最高电压单体号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#326FF8'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisTick: {
                                show:false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show:false,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁴',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisTick:{
                                show:false
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show:true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [1.8, 1.6, 8.3, 8, 1.0, 0.2, 2.2, 4.0, 4.5, 2.0]
                        }
                    ]
                }
                chart2.setOption(option2)

                let chart3 = this.$echarts.init(this.$refs.chart3)
                let option3 = {
                    title: {
                        text: '最高温度探针号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#FC6579'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁵',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisTick:{
                                show:false
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show:true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [0.8, 0.5, 2.7, 2.5, 0.5, 0.1, 1.1, 1.5, 1.7, 1.0]
                        }
                    ]
                }
                chart3.setOption(option3)
            } else if (type == 1) {
                let chart4 = this.$echarts.init(this.$refs.chart4)
                let option4 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        show: false,
                        text: '绝缘电阻/kΩ',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    legend: {
                        show: false,
                        data: [],
                        left: 0,
                        top: 30
                    },
                    grid: {
                        top: 20,
                        left: '30',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '绝缘电阻/kΩ',
                        nameLocation:'center',
                        nameGap: 40,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'line',
                            symbol: 'none',
                            data: [
                                ['2019-09-08 07:20:25', 500],
                                ['2019-09-08 07:25:25', 500],
                                ['2019-09-08 07:30:40', 500],
                                ['2019-09-08 07:35:22', null],
                                ['2019-09-08 07:40:30', null],
                                ['2019-09-08 07:45:25', null],
                                ['2019-09-08 07:50:45', 500],
                                ['2019-09-08 07:55:21', 500],
                                ['2019-09-08 08:00:25', 500],
                                ['2019-09-08 08:05:25', null],
                                ['2019-09-08 08:10:25', null],
                                ['2019-09-08 08:15:25', 550],
                                ['2019-09-08 08:20:25', 550],
                                ['2019-09-08 09:25:25', 550]
                            ],
                            color: '#1890FF'
                        }
                    ],
                    connectNulls: true
                };
                chart4.setOption(option4)

                let chart5 = this.$echarts.init(this.$refs.chart5)
                let option5 = {
                    title: {
                        text: '最高电压单体号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#326FF8'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁴',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [1.8, 1.6, 8.3, 8, 1.0, 0.2, 2.2, 4.0, 4.5, 2.0]
                        }
                    ]
                }
                chart5.setOption(option5)

                let chart6 = this.$echarts.init(this.$refs.chart6)
                let option6 = {
                    title: {
                        text: '最高温度探针号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#FC6579'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisTick: {
                                shuow: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁵',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [0.8, 0.5, 2.7, 2.5, 0.5, 0.1, 1.1, 1.5, 1.7, 1.0]
                        }
                    ]
                }
                chart6.setOption(option6)
            } else if (type == 2) {
                let chart7 = this.$echarts.init(this.$refs.chart7)
                let option7 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        show: false,
                        text: '',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    legend: {
                        show: false,
                        data: [],
                        left: 0,
                        top: 30
                    },
                    grid: {
                        top: 20,
                        left: '30',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        // boundaryGap: false,
                        name: '',
                        axisLabel: {
                            show: true,
                            interval:0,
                            color: '#3E526F',
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#A7C6E0"
                            }
                        },
                        data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00']
                    },
                    yAxis: {
                        type: 'value',
                        name: '电池包单体电压N',
                        nameLocation:'center',
                        nameGap: 40,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F'
                        },
                        min: 3.6,
                        max: 4.2,
                        interval: 0.2,
                        axisLabel: {
                            color: '#3E526F'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        }
                    },
                    dataZoom: [{
                        show: true,
                        height: 4,
                        xAxisIndex: [0],
                        bottom: '5%',
                        start: 20,
                        end: 80,
                        handleSize: 20,
                        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
                        //handleSize: '110%',
                        handleStyle: {
                            color: "transparent",
                        },
                        textStyle: {
                            color: "transparent"
                        },
                        borderColor: 'transparent',
                        backgroundColor: '#EEEFF3',
                        dataBackground: {
                            lineStyle: {
                                width: 0
                            },
                            areaStyle: {
                                color: 'transparent'
                            }
                        },
                        fillerColor: '#C3C6D1',
                    }, {
                        type: "inside",
                        show: true,
                        // start: 1,
                        // end: 35,
                        // zoomOnMouseWheel: false,
                        // moveOnMouseWheel: true,
                        // moveOnMouseMove: true,
                        // preventDefaultMouseMove: true
                    }],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            data: [3.64, 3.67, 3.69, 3.75, 3.80, 3.9, 4.0],
                            color: '#5CD9A7'
                        },
                        {
                            name: '',
                            type: 'line',
                            data: [3.65, 3.68, 3.70, 3.79, 3.80, 3.82, 3.9],
                            color: '#F9D05A'
                        }
                    ]
                };
                chart7.setOption(option7)

                let chart8 = this.$echarts.init(this.$refs.chart8)
                let option8 = {
                    xAxis: {
                        type: 'time',
                        // boundaryGap: false,
                        axisTick:{
                                show:false,
                            },
                        axisLine: {
                            lineStyle: {
                            color: "#A7C6E0"
                            }
                        },
                        axisLabel : {
                            formatter : function(value,index){
                                var date = new Date(value)
                                var h = date.getHours()
                                var m = date.getMinutes() + 1
                                return String(h).padStart(2, 0) + ":" + String(m).padStart(2, 0)
                            },
                            show: true,
                            interval:0,
                            color: '#3E526F',
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00']
                    },
                    yAxis: [{
                        type: 'value',
                        name: '压差/mV',
                        nameLocation:'center',
                        min: 40,
                        max: 90,
                        interval: 10,
                        nameGap: 30,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F'
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        }
                    },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }],
                    grid: {
                        top: 20,
                        left: '30',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    dataZoom: [{
                        show: true,
                        height: 4,
                        xAxisIndex: [0],
                        bottom: '5%',
                        start: 20,
                        end: 80,
                        handleSize: 20,
                        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
                        //handleSize: '110%',
                        handleStyle: {
                            color: "transparent",
                        },
                        textStyle: {
                            color: "transparent"
                        },
                        borderColor: 'transparent',
                        backgroundColor: '#EEEFF3',
                        dataBackground: {
                            lineStyle: {
                                width: 0
                            },
                            areaStyle: {
                                color: 'transparent'
                            }
                        },
                        fillerColor: '#C3C6D1',
                    }, {
                        type: "inside",
                        show: true,
                        // start: 1,
                        // end: 35,
                        // zoomOnMouseWheel: false,
                        // moveOnMouseWheel: true,
                        // moveOnMouseMove: true,
                        // preventDefaultMouseMove: true
                    }],
                    series: [{
                        symbolSize: 8,
                        data: [
                            ['2019-09-08 11:00:00', 42.04],
                            ['2019-09-08 11:01:25', 46.95],
                            ['2019-09-08 11:02:40', 48.81],
                            ['2019-09-08 11:03:22', 52.33],
                            ['2019-09-08 11:05:30', 58.96],
                            ['2019-09-08 11:09:00', 47.24],
                            ['2019-09-08 11:11:25', 64.26],
                            ['2019-09-08 11:13:40', 70.84],
                            ['2019-09-08 11:15:22', 84.82],
                            ['2019-09-08 11:18:30', 65.68]
                        ],
                        type: 'scatter',
                        color: '#1890FF'
                    }]
                };
                chart8.setOption(option8)

                let chart9 = this.$echarts.init(this.$refs.chart9)
                let option9 = {
                    xAxis: {
                        type: '',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        splitLine: {
                            lineStyle: {
                            color: '#A7C6E0',
                            },
                        },
                    },
                    yAxis: {
                        
                        type: 'value',
                        name: '',
                        nameLocation:'center',
                        nameGap: 30,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        splitLine: {
                            lineStyle: {
                            color: '#A7C6E0',
                            },
                        },
                    },
                    grid: {
                        top: 20,
                        left: '20',
                        right: '7%',
                        bottom: '0',
                        containLabel: true
                    },
                    visualMap: {   
                        min: 0,
                        max: 180,
                        color: ['#FCDE66','#1890FF'],
                        top: 'center',
                        itemWidth:8, 
                        itemHeight: 300,
                        align: 'right',
                        text: [180, 0],
                        right:'0',
                        textStyle: {
                            fontSize:10,
                            color: '#3E526F'
                        },
                    },
                    series: [
                        {
                            symbolSize: 8,
                            data: [
                                [20.0, 28.04],
                                [38.0, 16.95],
                                [143.0, 157.58],
                                [90.0, 48.81],
                                [110.0, 68.33],
                                [104.0, 89.96],
                                [68.0, 27.24],
                                [49.0, 34.26],
                                [120.0, 10.84],
                                [78.0, 64.82],
                                [55.0, 45.68]
                            ],
                            type: 'scatter'
                            // color: '#1890FF'
                        },
                        {
                            symbolSize: 8,
                            data: [
                               [65.0, 38.04],
                                [49.0, 56.25],
                                [18.0, 177.58],
                                [110.0, 98.41],
                                [95.0, 68.63],
                                [21.0, 109.96],
                                [59.0, 78.24],
                                [72.0, 64.26],
                                [115.0, 110.84],
                                [88.0, 64.82],
                                [94.0, 85.68]
                            ],
                            type: 'scatter'
                            // color: '#FACC14'
                        }
                    ]
                };
                chart9.setOption(option9)
            } else if (type == 4) {
                let chart10 = this.$echarts.init(this.$refs.chart10)
                let option10 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    title: {
                        show: false,
                        text: '车速（km/h）',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    legend: {
                        show: false,
                        data: [],
                        left: 0,
                        top: 30
                    },
                    grid: {
                        top: 20,
                        left: '20',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        axisLabel : {
                            formatter : function(value,index){
                                var date = new Date(value)
                                var h = date.getHours()
                                var m = date.getMinutes() + 1
                                return String(h).padStart(2, 0) + ":" + String(m).padStart(2, 0)
                            },
                            color: '#3E526F'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        },
                    },
                    yAxis: {
                        type: 'value',
                        name: '车速（km/h）',
                        nameLocation:'center',
                        nameGap: 30,
                        nameTextStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '400'
                        },
                        axisLabel: {
                            color: '#3E526F'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#DDECFA',
                            width: 1
                            },
                        },
                        axisTick:{
                            show:false,
                            alignWithLabel: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#A7C6E0',
                            }
                        }
                    },
                    dataZoom: [{
                        show: true,
                        height: 4,
                        xAxisIndex: [0],
                        bottom: '5%',
                        start: 20,
                        end: 80,
                        handleSize: 20,
                        handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
                        //handleSize: '110%',
                        handleStyle: {
                            color: "transparent",
                        },
                        textStyle: {
                            color: "transparent"
                        },
                        borderColor: 'transparent',
                        backgroundColor: '#EEEFF3',
                        dataBackground: {
                            lineStyle: {
                                width: 0
                            },
                            areaStyle: {
                                color: 'transparent'
                            }
                        },
                        fillerColor: '#C3C6D1',
                    }, {
                        type: "inside",
                        show: true,
                        // start: 1,
                        // end: 35,
                        // zoomOnMouseWheel: false,
                        // moveOnMouseWheel: true,
                        // moveOnMouseMove: true,
                        // preventDefaultMouseMove: true
                    }],
                    series: [
                        {
                            name: '',
                            type: 'line',
                            data: [
                                ['2019-09-08 07:19:25', 0],
                                ['2019-09-08 07:26:25', 25],
                                ['2019-09-08 07:30:40', 3],
                                ['2019-09-08 07:32:22', 43],
                                ['2019-09-08 07:35:30', 12],
                                ['2019-09-08 07:38:25', 52],
                                ['2019-09-08 07:55:45', 36],
                                ['2019-09-08 07:58:21', 50],
                                ['2019-09-08 08:01:25', 75],
                                ['2019-09-08 08:08:25', 60],
                                ['2019-09-08 08:15:25', 89],
                                ['2019-09-08 08:19:25', 0],
                                ['2019-09-08 08:26:25', 25],
                                ['2019-09-08 08:30:40', 3],
                                ['2019-09-08 08:32:22', 43],
                                ['2019-09-08 08:35:30', 12],
                                ['2019-09-08 08:38:25', 52],
                                ['2019-09-08 08:55:45', 36],
                                ['2019-09-08 08:58:21', 50],
                                ['2019-09-08 09:01:25', 75],
                                ['2019-09-08 09:08:25', 60],
                                ['2019-09-08 09:15:25', 89],
                                ['2019-09-08 09:19:25', 0],
                                ['2019-09-08 09:26:25', 25],
                                ['2019-09-08 09:30:40', 3],
                                ['2019-09-08 09:32:22', 43],
                                ['2019-09-08 09:35:30', 12],
                                ['2019-09-08 09:38:25', 52],
                                ['2019-09-08 09:55:45', 36],
                                ['2019-09-08 09:58:21', 50]
                            ],
                            color: '#1890FF'
                        }
                    ]
                };
                chart10.setOption(option10)

                let chart11 = this.$echarts.init(this.$refs.chart11)
                let option11 = {
                    title: {
                        text: '最高电压单体号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#326FF8'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁴',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [1.8, 1.6, 8.3, 8, 1.0, 0.2, 2.2, 4.0, 4.5, 2.0]
                        }
                    ]
                }
                chart11.setOption(option11)

                let chart12 = this.$echarts.init(this.$refs.chart12)
                let option12 = {
                    title: {
                        text: '最高温度探针号',
                        textStyle: {
                            fontSize: '14',
                            color: '#3E526F',
                            fontWeight: '600'
                        }
                    },
                    color: ['#FC6579'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '0',
                        right: '4%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [0, 20, 40, 60, 80, 100],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'x10⁵',
                            type: 'value',
                            nameTextStyle: {
                                padding: [0, 0, 0, 20],
                                color: '#3E526F'
                            },
                            axisLabel: {
                                color: '#3E526F'
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color: '#DDECFA',
                                width: 1
                                },
                            },
                            axisTick:{
                                show:false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            }
                        },
                        {
                            name: '',
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                lineStyle: {
                                    color: '#A7C6E0',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: '60%',
                            data: [0.8, 0.5, 2.7, 2.5, 0.5, 0.1, 1.1, 1.5, 1.7, 1.0]
                        }
                    ]
                }
                chart12.setOption(option12)
            }
        }
    },
    mounted () {
        //  let chart1 = this.$refs.chart1;
        // chart1.style.width = window.outerWidth/2-65 + 'px';
        // chart1.style.height = window.outerHeight/2+60 + 'px';
        // echarts.init(chart1);
    },
    props: ['tableData']
}
</script>

<style scoped>
    .table {
        width: 100%;
        font-size: 14px;
    }
    .table thead tr {
        background: #FAFAFA;
        color: #7791A7;
        font-size: 14px;
        height: 50px;
    }
    .table thead tr th {
        font-weight: 600;
        border-bottom: 2px solid #E7EBF2;
        text-align: center;
    }
    .table thead tr th:first-child {
        width: 290px;
        /* text-align: left; */
        /* padding-left: 25px; */
    }
    .table tbody tr td {
        text-align: center;
        border-bottom: 1px solid #F1F6F9;
        height: 44px;
        color: #3F536E;
        /* padding-left: 25px; */
    }
    .table1 tbody tr td {
        /* text-align: left; */
    }
    .table1 thead tr th {
        /* text-align: left; */
        /* padding-left: 25px; */
    }
    .table1 thead tr th:nth-child(5) {
        /* text-align: right; */
        /* padding-right: 25px; */
    }
    .table1 thead tr th:nth-child(6) {
        /* text-align: center; */
    }
    .table1 thead tr th:nth-child(3) {
        /* text-align: center; */
    }
    .table1 tbody tr:first-child td:nth-child(5) {
        /* text-align: right;
        padding-right: 25px; */
    }
    .table1 tbody tr:not(:first-child) td:nth-child(4) {
        /* text-align: right;
        padding-right: 25px; */
    }
    .table1 tbody tr:first-child td:nth-child(6) {
        text-align: center;
    }
    .table1 tbody tr:not(:first-child) td:nth-child(5) {
        text-align: center;
    }
    .table1 tbody tr:first-child td:nth-child(3) {
        text-align: center;
    }
    .table1 tbody tr:not(:first-child) td:nth-child(2) {
        text-align: center;
    }
    /deep/.dialog-box .el-dialog__header {
        padding: 15px 20px;
        background-color: #FAFBFC;
        font-size: 16px;
        color: #2B405B;
        border-bottom: 1px solid #F1F2F2;
    }
    /deep/.dialog-box .el-dialog__body {
        padding: 15px 30px 30px;
    }
    /deep/.dialog-box .el-dialog {
        border-radius: 5px;
        overflow: hidden;
        margin: 30px 0!important;
        overflow-y: auto;
    }
    /deep/.dialog-box .el-dialog::-webkit-scrollbar {
        width: 0;
    }
    .dialog-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .top-box {
        border-bottom: 1px solid #E5EEF5;
        padding-bottom: 5px;
        margin-bottom: 15px;
    }
    /deep/.dialog-content .el-col b{
        color: #3E526F;
        margin-right: 20px;
    }
    /deep/.dialog-content .el-col span{
        color: #3E526F;
    }
    /deep/.dialog-content .el-row {
        margin-bottom: 10px;
    }
</style>