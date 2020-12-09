<template>
  <div class="wrap">
    <toph v-bind:active="active"></toph>
    <div class="main" v-show="showRentPrise">
      <el-breadcrumb separator="/" style="margin-left:12px;">
        <el-breadcrumb-item :to="{ path: '/portrait' }">电池画像</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>电芯数据可视化</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索工具栏 -->
      <div class="handle-box">
        <div class="box">
          <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters" ref="filters">
              <el-form-item prop="name">
                <span style="margin-left:15px;">车型</span>
                <el-select
                  v-model="filters.name"
                  placeholder="请选择"
                  clearable
                  size="mini"
                  style="width:168px; heght:30px;"
                  @change="change($event)"
                >
                  <el-option
                    v-for="item in filters.carOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="carN">
                <span style="width:70px;">车辆VIN</span>
                <el-input
                  v-model="filters.carN"
                  placeholder="车辆VIN"
                  style="width:180px; heght:30px;"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label style="margin-right:10px;" class="timeBox">
                <span>时间段</span>
                <el-date-picker
                  v-model="filters.column.create_start_date"
                  type="date"
                  :picker-options="pickerBeginDateBefore"
                  format="yyyy-MM-dd"
                  placeholder
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="—" label-width="25px" class="timeBox">
                <el-date-picker
                  v-model="filters.column.create_end_date"
                  type="date"
                  format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateAfter"
                  placeholder
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="speed" style="margin-right:8px;">
                <span>倍速</span>
                <el-select
                  v-model="filters.speed"
                  placeholder="请选择"
                  clearable
                  size="mini"
                  style="width:191px; heght:30px;"
                  @change="change($event)"
                >
                  <el-option
                    v-for="item in filters.dataTyOptions1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right:4px;" class="martr">
                <el-button type="primary" @click="handleSearch" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="info"
                  size="mini"
                  @click="resetForm"
                  style="height: 32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);"
                >重置</el-button>
              </el-form-item>

              <el-form-item prop="time1" style="margin-left:43.5%; margin-right:4px;">
                <el-button class="searBtnTime">最近12小时</el-button>
              </el-form-item>
              <el-form-item prop="time2" style="margin-right:4px;">
                <el-button class="searBtnTime">最近1天</el-button>
              </el-form-item>
              <el-form-item prop="time3" style="margin-right:4px;">
                <el-button class="searBtnTime">最近3天</el-button>
              </el-form-item>
              <el-form-item prop="time4">
                <el-button class="searBtnTime">最近7天</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </div>
      <!-- 搜索工具栏 -->
      <!-- 图表区域 -->
      <el-tabs class="tabs-box" v-model="activeName">
        <el-tab-pane label="电压">
          <!-- 按钮区域 -->
          <div class="btns">
            <div class="showQp" @click="changeStatusqp">
              <img src="../../assets/images/icon_qp.png" alt />
              <span>全屏展示</span>
            </div>
          </div>
          <!-- 按钮区域 -->
          <div class="eBoxs">
            <el-col :span="9">
              <div>
                <img v-for="(v, i) in img" :key="i" :src="v" v-show="i == n" />
              </div>
            </el-col>
            <el-col :span="15">
              <div style="height: 200px;" id="chart1" ref="chart1"></div>
              <div style="height: 200px;" id="chart2" ref="chart2"></div>
            </el-col>
          </div>
        </el-tab-pane>
        <el-tab-pane label="温度">
          <!-- 按钮区域 -->
          <div class="btns">
            <div class="showQp" @click="changeStatusqp2">
              <img src="../../assets/images/icon_qp.png" alt />
              <span>全屏展示</span>
            </div>
          </div>
          <!-- 按钮区域 -->
          <div class="eBoxs">
            <el-col :span="9">
              <div>
                <img v-for="(v, i) in imgwd" :key="i" :src="v" v-show="i == n" />
              </div>
            </el-col>
            <el-col :span="15">
              <div style="height: 200px;" id="chart3" ref="chart3"></div>
              <div style="height: 200px;" id="chart4" ref="chart4"></div>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 图表区域 -->
    </div>
    <!-- 电压全屏 -->
    <div class="main" v-show="showRentPrise2">
      <!-- 图表区域 -->
      <div class="echartsCon">
        <div class="eBoxs" style="margin-top:76px;">
          <el-col :span="9">
            <div>
              <img v-for="(v, i) in img" :key="i" :src="v" v-show="i == n" />
            </div>
          </el-col>
          <el-col :span="15">
            <div style="height: 220px;" id="chart5" ref="chart5"></div>
            <div style="height: 220px;" id="chart6" ref="chart6"></div>
          </el-col>
        </div>
        <div class="showQp2" @click="changeStatustqp">
          <span>单击或ESC退出全屏模式</span>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!-- 图表区域 -->
    </div>
    <!-- 温度全屏 -->
    <div class="main" v-show="showRentPrise3">
      <!-- 图表区域 -->
      <div class="echartsCon">
        <div class="eBoxs" style="margin-top:76px;">
          <el-col :span="9">
            <div>
              <img v-for="(v, i) in imgwd" :key="i" :src="v" v-show="i == n" />
            </div>
          </el-col>
          <el-col :span="15">
            <div style="height: 220px;" id="chart7" ref="chart7"></div>
            <div style="height: 220px;" id="chart8" ref="chart8"></div>
          </el-col>
        </div>
        <div class="showQp2" @click="changeStatustqp2">
          <span>单击或ESC退出全屏模式</span>
        </div>
        <div style="clear:both;"></div>
      </div>

      <!-- 图表区域 -->
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
export default {
  components: {
    toph,
  },
  data() {
    return {
      showRentPrise: true,
      showRentPrise2: false,
      showRentPrise3: false,
      active: 3,
      activeName: "0",
      img: [
        require("../../assets/images/dy1.png"),
        require("../../assets/images/dy2.png"),
        require("../../assets/images/dy3.png"),
      ],
      imgwd: [
        require("../../assets/images/wd1.png"),
        require("../../assets/images/wd2.png"),
        require("../../assets/images/wd3.png"),
      ],
      n: 1,
      filters: {
        //车型下拉框
        carOptions: [
          {
            value: "北汽新能源EX360",
            label: "北汽新能源EX360",
          },
          {
            value: "北汽新能源EU5",
            label: "北汽新能源EU5",
          },
          {
            value: "北汽新能源EX5",
            label: "北汽新能源EX5",
          },
          {
            value: "北汽新能源EC3",
            label: "北汽新能源EC3",
          },
          // {
          //     value: "北京现代",
          //     label: "北京现代"
          // },
          // {
          //     value: "上海汽车1",
          //     label: "上海汽车1"
          // },
          // {
          //     value: "北京汽车2",
          //     label: "北京汽车2"
          // },
          // {
          //     value: "上海汽车2",
          //     label: "上海汽车2"
          // }
        ],
        dataTyOptions1: [
          {
            value: "0.5X",
            label: "0.5X",
          },
          {
            value: "正常",
            label: "正常",
          },
          {
            value: "1.5X",
            label: "1.5X",
          },
          {
            value: "2.0X",
            label: "2.0X",
          },
        ],
        name: "",
        speed: "",
        carN: "",
        carnumber: "",
        column: {
          create_start_date: "",
          create_end_date: "",
          time1: "",
          time2: "",
          time3: "",
          time4: "",
        },
      },
      radio: "1",
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.filters.column.create_end_date;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        },
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.filters.column.create_start_date;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        },
      },
    };
  },
  methods: {
    fun: function () {
      setInterval(this.play, 2000);
    },
    play: function () {
      this.n++;
      if (this.n == this.img.length) {
        this.n = 0;
      }
    },
    change(value) {
      this.$forceUpdate();
    },
    handleSearch() {},
    resetForm() {
      this.$refs.filters.resetFields();
      this.filters.column.create_start_date = "";
      this.filters.column.create_end_date = "";
    },
    changeStatusqp() {
      this.showRentPrise = false;
      this.showRentPrise2 = true;
    },
    changeStatusqp2() {
      this.showRentPrise = false;
      this.showRentPrise3 = true;
    },
    changeStatustqp() {
      this.showRentPrise = true;
      this.showRentPrise2 = false;
    },
    changeStatustqp2() {
      this.showRentPrise = true;
      this.showRentPrise3 = false;
    },
    draw() {
      var data = [parseFloat(Math.random() * 2 + 15).toFixed(1)];
      var data1 = [parseFloat(Math.random() * 60).toFixed(0)];
      var data2 = [parseFloat(Math.random() * 1 + 1).toFixed(0)];
      var data3 = [parseFloat(Math.random() * 2 + 15).toFixed(0)];
      /*创建数组函数*/
      function addData(shift) {
        data.push(parseFloat(Math.random() * 2 + 15).toFixed(1));
        data1.push(parseFloat(Math.random() * 60).toFixed(0));
        data2.push(parseFloat(Math.random() * 1 + 1).toFixed(0));
        data3.push(parseFloat(Math.random() * 2 + 15).toFixed(0));
        if (shift) {
          data.shift();
          data1.shift();
          data2.shift();
          data3.shift();
        }
      }

      for (var i = 1; i < 11; i++) {
        addData();
      }
      let chart1 = this.$echarts.init(this.$refs.chart1);
      let option1 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          left: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "总电压/V",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          min: 15,
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            // data: [
            //      1.583,
            //     1.581,
            //     1.576,
            //     1.581,
            //      1.571,
            //      1.577,
            //      1.565,
            //     1.582,
            //     1.58,
            //      1.585,
            //     1.58,
            //      1.585,
            //     1.58
            // ],
            data: data,
            color: "#F2637B",
          },
        ],
      };
      chart1.setOption(option1);
      let chart2 = this.$echarts.init(this.$refs.chart2);
      let option2 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          x: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "压差/mv",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          // splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          // min: 1.56
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data1,
            color: "#326FF8",
          },
        ],
      };
      chart2.setOption(option2);
      //温度
      let chart3 = this.$echarts.init(this.$refs.chart3);
      let option3 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          left: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "平均温度/°C",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          min: 15,
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data3,
            color: "#F2637B",
          },
        ],
      };
      chart3.setOption(option3);
      let chart4 = this.$echarts.init(this.$refs.chart4);
      let option4 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          x: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "温度差/°C",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          // min: 1.56
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data2,
            color: "#326FF8",
          },
        ],
      };
      chart4.setOption(option4);
      setInterval(function () {
        addData(true);
        chart1.setOption(option1);
        chart2.setOption(option2);
        chart3.setOption(option3);
        chart4.setOption(option4);
        //console.log(data);
      }, 1 * 2000);
    },
    drawBig() {
      // var data = [parseFloat(Math.random() * 1.6 + 0.56).toFixed(2)];
      // var data2 = [parseFloat(Math.random() * 1.6 + 0.56).toFixed(2)];
      // /*创建数组函数*/
      // function addData(shift) {
      //     data.push(parseFloat(Math.random() * 1.6 + 0.56).toFixed(2));
      //     data2.push(parseFloat(Math.random() * 1.6 + 0.56).toFixed(2));
      //     if (shift) {
      //         data.shift();
      //         data2.shift();
      //     }

      // }
      var data = [parseFloat(Math.random() * 2 + 15).toFixed(1)];
      var data1 = [parseFloat(Math.random() * 60).toFixed(0)];
      var data2 = [parseFloat(Math.random() * 1 + 1).toFixed(0)];
      var data3 = [parseFloat(Math.random() * 2 + 15).toFixed(0)];
      /*创建数组函数*/
      function addData(shift) {
        data.push(parseFloat(Math.random() * 2 + 15).toFixed(1));
        data1.push(parseFloat(Math.random() * 60).toFixed(0));
        data2.push(parseFloat(Math.random() * 1 + 1).toFixed(0));
        data3.push(parseFloat(Math.random() * 2 + 15).toFixed(0));
        if (shift) {
          data.shift();
          data1.shift();
          data2.shift();
          data3.shift();
        }
      }

      for (var i = 1; i < 11; i++) {
        addData();
      }

      let chart5 = this.$echarts.init(this.$refs.chart5);
      let option5 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          left: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "总电压/v",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          // splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          min: 15,
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data,
            color: "#F2637B",
          },
        ],
      };
      chart5.setOption(option5);
      let chart6 = this.$echarts.init(this.$refs.chart6);
      let option6 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          x: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "压差/mv",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          // splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          // min: 1.56
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data1,
            color: "#326FF8",
          },
        ],
      };
      chart6.setOption(option6);
      //温度
      let chart7 = this.$echarts.init(this.$refs.chart7);
      let option7 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          left: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "平均温度/℃",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          min: 15,
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data3,
            color: "#F2637B",
          },
        ],
      };
      chart7.setOption(option7);
      let chart8 = this.$echarts.init(this.$refs.chart8);
      let option8 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: true,
          text: "模组号",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          x: "center",
          bottom: 0,
        },
        legend: {
          show: false,
          data: [],
          left: 0,
          top: 30,
        },
        grid: {
          top: 20,
          left: "50",
          right: "4%",
          bottom: "40",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          data: [
            "0",
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
          ],
        },
        yAxis: {
          type: "value",
          name: "温度差/℃",
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
          splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
          // min: 1.56
        },
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "28",
            start: 0,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: data2,
            color: "#326FF8",
          },
        ],
      };
      chart8.setOption(option8);
      setInterval(function () {
        addData(true);
        chart5.setOption(option5);
        chart6.setOption(option6);
        chart7.setOption(option7);
        chart8.setOption(option8);
        //console.log(data);
      }, 1 * 2000);
    },
  },
  mounted() {
    this.fun();
    let chart1 = document.getElementById("chart1");
    chart1.style.width = window.outerWidth / 2 - 20 + "px";
    chart1.style.height = window.outerHeight / 4 + 52 + "px";
    echarts.init(chart1);
    let chart2 = document.getElementById("chart2");
    chart2.style.width = window.outerWidth / 2 - 20 + "px";
    chart2.style.height = window.outerHeight / 4 + 52 + "px";
    echarts.init(chart2);
    let chart3 = document.getElementById("chart3");
    chart3.style.width = window.outerWidth / 2 - 20 + "px";
    chart3.style.height = window.outerHeight / 4 + 52 + "px";
    echarts.init(chart3);
    let chart4 = document.getElementById("chart4");
    chart4.style.width = window.outerWidth / 2 - 20 + "px";
    chart4.style.height = window.outerHeight / 4 + 52 + "px";
    echarts.init(chart4);
    let chart5 = document.getElementById("chart5");
    chart5.style.width = window.outerWidth / 2 - 20 + "px";
    chart5.style.height = window.outerHeight / 4 + 45 + "px";
    echarts.init(chart5);
    let chart6 = document.getElementById("chart6");
    chart6.style.width = window.outerWidth / 2 - 20 + "px";
    chart6.style.height = window.outerHeight / 4 + 45 + "px";
    echarts.init(chart6);
    let chart7 = document.getElementById("chart7");
    chart7.style.width = window.outerWidth / 2 - 20 + "px";
    chart7.style.height = window.outerHeight / 4 + 45 + "px";
    echarts.init(chart7);
    let chart8 = document.getElementById("chart8");
    chart8.style.width = window.outerWidth / 2 - 20 + "px";
    chart8.style.height = window.outerHeight / 4 + 45 + "px";
    echarts.init(chart8);
    this.draw();
    this.drawBig();
  },
};
</script>
<style lang="less" scoped>
/deep/.header {
  .content {
    .nav {
      > ul {
        .is-active {
          .el-submenu__title {
            color: #fff !important;
          }
        }
      }
    }
  }
}
.wrap {
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
  background: rgba(244, 247, 252, 1);
}
.main {
  margin: 10px;
  overflow: hidden;
}
.handle-box {
  margin-top: 10px;
  width: 100%;
  padding: 10px 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  .box {
    width: 100%;
    margin: 0 auto;
    // margin-top: 10px;
    padding-top: 5px;
    overflow: hidden;
    span {
      display: inline-block;
      // float: left;
      text-align: right;
      margin-right: 8px;
      color: #3e526f;
    }
  }
}
.echartsCon {
  margin: 0 auto;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.btns {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 12px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  .dcBtn {
    margin-left: 8px;
    width: 86px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
  }
  .showQp {
    margin-left: 8px;
    margin-bottom: 13px;
    width: 104px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    justify-items: center;
    cursor: pointer;
    img {
      margin-top: 8px;
      margin-left: 10px;
      width: 18px;
      height: 18px;
    }
    span {
      margin-right: 20px;
    }
  }
}
.eBoxs {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.editB {
  margin-top: 33px;
  height: 66px;
  padding: 17px;
  background: rgba(254, 254, 254, 1);
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  .tips {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(62, 82, 111, 1);
  }
  .inbox {
    float: left;
    margin-top: 10px;
    width: 78%;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px 0px 0px 4px;
    border: 1px solid rgba(215, 229, 239, 1);
    text-indent: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(141, 171, 196, 1);
  }
  .edBtn {
    float: left;
    margin-top: 10px;
    width: 15%;
    height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 4px 4px 0px;
    border: 1px solid rgba(220, 223, 230, 1);
    border-left: none;
    img {
      display: block;
      margin: 0 auto;
      margin-top: 8px;
      width: 18px;
      height: 18px;
    }
  }
}
.title {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(63, 83, 110, 1);
}
.showQp2 {
  float: right;
  // margin-right: 20px;
  width: 172px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  // margin-bottom: 10px;
  cursor: pointer;
}
/deep/.el-form-item {
  margin-bottom: 0px;
  margin-right: 20px;
}
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 32px !important;
  line-height: 32px !important;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.searBtnTime {
  padding: 0 4px !important;
  height: 25px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(62, 82, 111, 1);
}
.rselectDy,
.rselectWd {
  width: 300px;
  margin: 10px auto;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(62, 82, 111, 1);
}
.tabs-box {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  border-radius: 4px;
}
/deep/.tabs-box .el-tabs__nav-wrap::after {
  display: none;
}
/deep/.tabs-box .el-tabs__active-bar {
  display: none;
}
/deep/.tabs-box .el-tabs__item {
  color: #7791a7;
}
/deep/.tabs-box .is-active {
  background: #fff;
  color: #239fff;
}
/deep/.tabs-box .el-tabs__header {
  background: #f7f7f7;
  margin-bottom: 0;
}
/deep/.tabs-box .el-tabs__content {
  padding: 10px;
}
/deep/.tabs-box .el-tabs__item.is-top {
  width: 97px;
  text-align: center;
}
/deep/.tabs-box .el-tabs__item.is-top:last-child {
  padding-right: 20px;
}
/deep/.el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: rgba(141, 171, 196, 1) !important;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: rgba(43, 64, 91, 1);
  cursor: text;
}
.timeBox {
  /deep/.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px 0 28px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
@media screen and (max-width: 1366px) and (max-height: 768px) {
  .martr {
    margin-left: 20px;
  }
}
</style>
