<template>
  <div class v-if="appear" style="margin-left: 10px;">
    <div>
      <div class="m_con">
        <div class="delgroup" @click="del">
          <img src="../assets/images/close.png" width="15" height="15" />
        </div>
        <div class="box">
          <div class="handle-box">
            <div class="sxBox">
              <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                  <el-form-item>
                    <span style="margin-left:14px;">车型</span>
                    <el-select
                      v-model="filters.name"
                      placeholder="请选择"
                      clearable
                      size="mini"
                      style="width:193px; height:30px;"
                    >
                      <el-option
                        v-for="item in filters.carOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <span style="margin-left:14px;">地域</span>
                    <el-select
                      v-model="filters.region"
                      placeholder="请选择"
                      clearable
                      size="mini"
                      style="width:193px; height:30px;"
                    >
                      <el-option
                        v-for="item in filters.regionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <span style="margin-left:14px;">是否营运车</span>
                    <el-select
                      v-model="filters.operate"
                      placeholder="请选择"
                      clearable
                      size="mini"
                      style="width:193px; height:30px;"
                    >
                      <el-option
                        v-for="item in filters.operateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <span>车辆VIN</span>
                    <el-input
                      v-model="filters.carN"
                      placeholder="车辆VIN"
                      style="width:200px; height:30px;"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                  <br />
                  <el-form-item style="margin-right:10px;" class="timeBox">
                    <span>时间段</span>
                    <el-date-picker
                      v-model="filters.column.create_start_date"
                      type="date"
                      :picker-options="pickerBeginDateBefore"
                      format="yyyy-MM-dd"
                      placeholder
                      style="width:193px;"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="—" label-width="25px" class="timeBox">
                    <el-date-picker
                      v-model="filters.column.create_end_date"
                      type="date"
                      format="yyyy-MM-dd"
                      :picker-options="pickerBeginDateAfter"
                      placeholder
                      style="width:193px;"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
              <div style="clear:both;"></div>
              <div class="boxLine" style="margin-top:10px;">
                <div class="titbg">温度电流分布情况（10^3个）</div>
                <div id="dlBoxP" ref="dlBoxP" style="width:100%; height:100%;"></div>
              </div>
              <div class="boxLine" style="margin-top:10px;">
                <div class="titbg">充电方式</div>
                <div id="cdBoxP" ref="cdBoxP" style="width:100%; height:100%;"></div>
                <!-- 饼图 -->
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <div class="showQp" @click="changeStatusqp">
                        <img src="../assets/images/icon_qp.png" alt />
                        <span>全屏展示</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      <div>
                        <el-button class="tabTu" size="small" @click="drawPie()">饼图</el-button>
                        <el-button class="tabTu" size="small" @click="drawBar()">柱状图</el-button>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                  </el-col>
                </el-row>
                <!-- <div class="showQp" @click="changeStatusqp">
                  <img src="../assets/images/icon_qp.png" alt="" />
                  <span>全屏展示</span>
                </div>-->
                <!-- <div class="btns">
                  <el-button class="tabTu" size="small" @click="drawPie()">饼图</el-button>
                  <el-button class="tabTu" size="small" @click="drawBar()">柱状图</el-button>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="qpBox" v-show="showRentPrise">
                    <div class="bcon">
                        <div style="width:65%;">
                         <div id="qpDlChart" ref="qpDlChart" style="width:100%;height:460px;"></div>
                        </div>
                        <div style="width:35%;">
                         <div id="qpcdChart" ref="qpcdChart" style="width:100%;height:420px;"></div>
                        </div>
                    </div>
                    <div class="showQp2" @click="changeStatustqp">
                            <span>单击或ESC退出全屏模式</span>
                    </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
import { EventBus } from "@/api/bus.js";

// import "echarts";
export default {
  components: {
    toph,
  },
  data() {
    return {
      echartsParam: "",
      // showRentPrise:false,
      // showRentPrise2: true,
      appear: true,
      showtit2: true,
      active: 3,
      filters: {
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
        ],
        //地域
        regionOptions: [
          {
            value: "1",
            label: "天津",
          },
          {
            value: "2",
            label: "北京",
          },
          {
            value: "3",
            label: "上海",
          },
        ],
        //是否运营车辆
        operateOptions: [
          {
            value: "1",
            label: "是",
          },
          {
            value: "2",
            label: "否",
          },
        ],
        name: "",
        carN: "",
        region: "",
        operate: "",
        column: {
          create_start_date: "",
          create_end_date: "",
        },
      },
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
    //柱状图
    drawBar() {
      this.echartsParam = "bar";
      this.$echarts.init(this.$refs.cdBoxP).dispose(); //echarts实例销毁
      let myChart = this.$echarts.init(this.$refs.cdBoxP);
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      });
    },
    //饼图
    drawPie() {
      this.echartsParam = "pie";
      this.$echarts.init(this.$refs.cdBoxP).dispose(); //echarts实例销毁
      // let myChart = this.$echarts.init(document.getElementById("cdBoxP"));
      let myChart = this.$echarts.init(this.$refs.cdBoxP);
      // var data=[
      //         { value: 40, name: '快充' },
      //         { value: 60, name: '慢充' },
      //     ];
      myChart.setOption({
        color: ["rgba(100, 210, 132, 1)", "rgba(24, 144, 255, 0.85)"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        grid: {
          y: 25,
          left: "8%",
          right: "28%",
        },
        legend: {
          orient: "vertical",
          right: "15%",
          top: "50%",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: "rgba(140,140,140,1)",
            fontSize: 14,
          },
          icon: "circle",
          data: ["快充", "慢充"],
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
            name: "充电方式",
            type: "pie",
            radius: ["45%", "80%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: "inner",
                // formatter: '{d}%',
                formatter: function (data) {
                  console.log(data);
                  return data.percent.toFixed(0) + "%";
                },

                textStyle: {
                  color: "#fff",
                  fontWeight: "400",
                  fontSize: 12,
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "400",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: parseInt(Math.random() * 100), name: "快充" },
              { value: parseInt(Math.random() * 100), name: "慢充" },
            ],
          },
        ],
      });
      // window.addEventListener("resize", function() {
      //     myChart.resize();
      // });
    },
    del() {
      this.appear = false;
      // debugger;
      // this.$emit('func','')
    },
    changeStatusqp() {
      this.$parent.changeStatusqp();
      this.$emit("getParam", this.echartsParam);
    },
    drawDl() {
      //let myChart = this.$echarts.init(document.getElementById("dlBoxP"));
      let myChart = this.$echarts.init(this.$refs.dlBoxP);
      var hours = [
        "（-∞,-10）",
        "（-10,0）",
        "（0,10）",
        "（10,20）",
        "（20,30）",
        "（30,40）",
        "（40,50）",
        "（50+）",
      ];
      var days = [
        "(-∞,-200)",
        "(-200，-150)",
        "(-150，-100)",
        "(-100，-50)",
        "(-50,-20)",
        "(-20,-10)",
        "(-10,0)",
        "0",
        "(0,10)",
        "(10,50)",
        "(50,100)",
        "(100,200)",
        "(200,300)",
        "(300,500)",
        "(500,+∞)",
      ];

      var data = [
        [0, 0, 8],
        [0, 1, 900],
        [0, 2, 2],
        [0, 3, 8],
        [0, 4, 900],
        [0, 5, 2],
        [0, 6, 8],
        [0, 7, 900],
        [1, 0, 8],
        [1, 1, 900],
        [1, 2, 2],
        [1, 3, 8],
        [1, 4, 900],
        [1, 5, 2],
        [1, 6, 8],
        [1, 7, 900],
        [2, 0, 6],
        [2, 1, 8],
        [2, 2, 8],
        [2, 3, 8],
        [2, 4, 8],
        [2, 5, 8],
        [2, 6, 8],
        [2, 7, 8],
        [3, 0, 8],
        [3, 1, 8],
        [3, 2, 8],
        [3, 3, 2000],
        [3, 4, 900],
        [3, 5, 900],
        [3, 6, 8],
        [3, 7, 8],
        [4, 0, 8],
        [4, 1, 8],
        [4, 2, 3000],
        [4, 3, 2000],
        [4, 4, 4000],
        [4, 5, 8],
        [4, 6, 8],
        [4, 7, 8],
        [5, 0, 8],
        [5, 1, 8],
        [5, 2, 2000],
        [5, 3, 2500],
        [5, 4, 5000],
        [5, 5, 2000],
        [5, 6, 8],
        [5, 7, 8],
        [6, 0, 8],
        [6, 1, 8],
        [6, 2, 2000],
        [6, 3, 2500],
        [6, 4, 5000],
        [6, 5, 2000],
        [6, 6, 8],
        [6, 7, 8],
        [7, 0, 8],
        [7, 1, 8],
        [7, 2, parseInt(Math.random() * 5000)],
        [7, 3, parseInt(Math.random() * 3000)],
        [7, 4, parseInt(Math.random() * 1000)],
        [7, 5, parseInt(Math.random() * 1000)],
        [7, 6, 8],
        [7, 7, 8],
        [8, 0, 8],
        [8, 1, 8],
        [8, 2, parseInt(Math.random() * 3000)],
        [8, 3, parseInt(Math.random() * 2000)],
        [8, 4, parseInt(Math.random() * 4000)],
        [8, 5, parseInt(Math.random() * 1000)],
        [8, 6, 8],
        [8, 7, 8],
        [9, 0, 8],
        [9, 1, 8],
        [9, 2, parseInt(Math.random() * 1000)],
        [9, 3, parseInt(Math.random() * 1000)],
        [9, 4, parseInt(Math.random() * 1000)],
        [9, 5, parseInt(Math.random() * 1000)],
        [9, 6, 8],
        [9, 7, 8],
        [10, 0, parseInt(Math.random() * 100)],
        [10, 1, 8],
        [10, 2, parseInt(Math.random() * 100)],
        [10, 3, parseInt(Math.random() * 1000)],
        [10, 4, parseInt(Math.random() * 300)],
        [10, 5, parseInt(Math.random() * 1000)],
        [10, 6, 8],
        [10, 7, 8],
        [11, 0, 8],
        [11, 1, 8],
        [11, 2, parseInt(Math.random() * 200)],
        [11, 3, 1000],
        [11, 4, parseInt(Math.random() * 1000)],
        [11, 5, parseInt(Math.random() * 1000)],
        [11, 6, 8],
        [11, 7, 8],
        [12, 0, parseInt(Math.random() * 100)],
        [12, 1, 8],
        [12, 2, 10],
        [12, 3, 10],
        [12, 4, 8],
        [12, 5, 8],
        [12, 6, 8],
        [12, 7, 8],
        [13, 0, 8],
        [13, 1, 8],
        [13, 2, 10],
        [13, 3, 10],
        [13, 4, parseInt(Math.random() * 100)],
        [13, 5, 8],
        [13, 6, 8],
        [13, 7, 8],
        [14, 0, 8],
        [14, 1, 8],
        [14, 2, 10],
        [14, 3, 10],
        [14, 4, parseInt(Math.random() * 100)],
        [14, 5, 8],
        [14, 6, 8],
        [14, 7, 8],
      ];

      data = data.map(function (item) {
        return [item[1], item[0], item[2] || "-"];
      });
      myChart.setOption({
        tooltip: {
          position: "top",
        },
        animation: false,
        grid: {
          y: "15%",
          left: "16%",
          right: "12%",
        },
        xAxis: {
          type: "category",
          name: "(温度/℃)",
          nameTextStyle: {
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: 12,
            padding: [-30, 0, 0, -30],
          },
          // boundaryGap : false,
          data: hours,
          position: "top",
          axisLabel: {
            show: true,
            interval: 0,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          name: "(电流/A)",
          nameTextStyle: {
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: 12,
            padding: [35, 55, 0, 0],
          },
          data: days,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          type: "piecewise",
          // splitNumber: 2,
          pieces: [
            {
              gt: 0,
              lte: 1000,
              color: "rgba(207, 237, 255, 1)",
            }, // 不指定 min，表示 min 为无限大（-Infinity）。
            {
              gt: 1000,
              lte: 2000,
              color: "rgba(116, 195, 255, 1)",
            },
            {
              gt: 2000,
              lte: 3000,
              color: "rgba(55, 157, 251, 1)",
            },
            {
              gt: 3000,
              lte: 4000,
              color: "rgba(12, 112, 217, 1)",
            },
            {
              gt: 4000,
              lte: 5000,
              color: "rgba(0, 80, 179, 1)",
            },
          ],

          dimension: 2,
          //min: 0,
          // max: 100,
          //itemWidth: '20',
          //itemHeight: '20',
          align: "left",
          show: true,
          //calculable: true,
          orient: "horizontal", //'vertical'  horizontal
          left: "center", //center
          bottom: "10",
        },
        series: [
          {
            name: "",
            type: "heatmap",
            data: data,
            label: {
              normal: {
                show: true,
                color: "#fff",
              },
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: "rgba(255,255,255,1)",
              emphasis: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    //     open(){
    //     this.$nextTick(() => {
    //     //  执行echarts方法
    //      this.drawDlqp();
    //      this.drawPiecd();
    //     })
    //   },
  },
  mounted() {
    EventBus.$on("tabIndex1", (val) => {
      // _this.handleTabChange(val);
      this.test(val);
    });
    let dlBoxP = this.$refs.dlBoxP;
    dlBoxP.style.width = window.outerWidth / 2 - 55 + "px";
    dlBoxP.style.height = window.outerHeight / 4 + 90 + "px";
    echarts.init(dlBoxP);
    let cdBoxP = this.$refs.cdBoxP;
    cdBoxP.style.width = window.outerWidth / 2 - 55 + "px";
    cdBoxP.style.height = window.outerHeight / 4 - 30 + "px";
    echarts.init(cdBoxP);
    this.drawDl();
    this.drawPie();
  },
};
</script>
<style lang="less" scoped>
// .boxLine {
//   text-align: center;
// }
// .btns {
//   width: 200px;
//   display: inline-block;
// }
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
.m_con {
  position: relative;
  width: 100%;
  // margin: 20px auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.box {
  width: 100%;
  margin: 0 auto;
  // margin-top: 20px;
  padding-top: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  justify-items: center;
  span {
    display: inline-block;
    // float: left;
    margin-right: 8px;
    text-align: left;
    color: #3e526f;
  }
  .handle-box {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;

    /deep/ .el-input--mini .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .sxBox {
      margin: 15px auto;
      width: 96%;
    }
    .lBox {
      margin: 0 auto;
      display: block;
      width: 1px;
      border-right: 1px solid rgba(231, 239, 245, 1);
      margin: 0 2%;
    }
  }
}
.boxLine {
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
}
.titbg {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: rgba(247, 247, 247, 1);
  box-shadow: 0px -1px 0px 0px rgba(222, 233, 240, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3f536e;
  text-align: center;
  border-radius: 4px 4px 0 0;
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
    color: #ffffff;
  }
}
.addDbBtn {
  width: 12px;
  height: 93px;
  padding: 20px 10px;
  background: rgba(24, 144, 255, 1);
  border-radius: 0 4px 4px 0;
  margin-top: 20%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.qpBox {
  // margin: 10px auto;
  // width: 99.5%;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
  overflow: hidden;
  .bcon {
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
.showQp2 {
  float: right;
  margin-right: 20px;
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
  margin-bottom: 10px;
  cursor: pointer;
}
.echarts {
  width: 100%;
  height: 460px;
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
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
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
/deep/.el-form-item {
  margin-bottom: 8px;
  margin-right: 20px;
}
.delgroup {
  position: absolute;
  top: 15px;
  right: 10px;
  font-size: 20px;
  color: rgba(24, 144, 255, 1);
  z-index: 10;
  cursor: pointer;
}
/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
</style>
