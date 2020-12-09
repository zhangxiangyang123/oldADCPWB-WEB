<template>
  <div class>
    <div>
      <div class="m_con">
        <div class="box">
          <div class="handle-box">
            <div class="sxBox"
                 style="margin-top:36px;"
                 ref="c">
              <el-col class="toolbar"
                      style="padding-bottom: 0px;">
                <el-form :inline="true"
                         :model="filters"
                         ref="filters">
                  <el-form-item ref="f1">
                    <span>车型</span>
                    <el-select v-model="data.model"
                               placeholder="请选择"
                               clearable
                               size="mini"
                               style="width:70%; height:30px;">
                      <el-option v-for="item in filters.carOptions"
                                 :key="item"
                                 :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 省份多选下拉框框 -->
                  <el-form-item ref="f5">
                    <span> &nbsp; 省 &nbsp; 份 &nbsp;</span>
                    <el-select v-model="data.province"
                               multiple
                               placeholder="请选择"
                               size="mini"
                               style="width:70%; height:42px;text-overflow:ellipsis;">
                      <el-option v-for="item in province"
                                 :key="item"
                                 :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 车辆VIN -->
                  <el-form-item ref="f3">
                    <span>车辆VIN</span>
                    <el-select v-model="data.vin"
                               placeholder="请选择"
                               clearable
                               size="mini"
                               style="width:70%; height:42px;">
                      <el-option v-for="item in filters.carList"
                                 :key="item"
                                 :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>

                  <!-- <el-form-item ref="f2">
                    <span>车辆VIN</span>
                    <el-input v-model="data.carN"
                              placeholder="车辆VIN"
                              style="width:70%; height:30px;"
                              size="mini"></el-input>
                  </el-form-item> -->

                  <!-- 横轴下拉框 -->
                  <el-form-item ref="f3">
                    <span>横轴</span>
                    <el-select v-model="data.xAxis"
                               placeholder="请选择"
                               clearable
                               size="mini"
                               style="width:70%; height:42px;">
                      <el-option v-for="item in filters.TransverseAxis"
                                 :key="item"
                                 :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- 预警类型下拉框 -->
                  <el-form-item ref="f4">
                    <span>预警类型</span>
                    <el-select v-model="data.warningType"
                               placeholder="请选择"
                               multiple
                               size="mini"
                               style="width:70%; height:42px;">
                      <el-option v-for="item in filters.warning_ype"
                                 :key="item"
                                 :label="item"
                                 :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <div>
                    <el-form-item style="margin-right:-17px;"
                                  class="timeBox">
                      <span>时间</span>
                      <el-date-picker v-model="data.startDateStr"
                                      type="date"
                                      :picker-options="pickerBeginDateBefore"
                                      format="yyyy-MM-dd"
                                      placeholder
                                      size="mini"
                                      style="width:70%; height:30px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="—"
                                  label-width="25px"
                                  class="timeBox">
                      <el-date-picker v-model="data.endDateStr"
                                      type="date"
                                      size="mini"
                                      format="yyyy-MM-dd"
                                      :picker-options="pickerBeginDateAfter"
                                      placeholder
                                      style="width:183.5px; height:30px;"></el-date-picker>
                    </el-form-item>
                    <span style="float: right;margin: 4px 118px;">
                      <el-button type="primary"
                                 style="height: 32px;line-height: 0;"
                                 @click="reset">重置</el-button>
                      <el-button style="height: 32px;line-height: 0;"
                                 @click="search()">搜索</el-button>
                    </span>
                  </div>
                  <!-- ========================================== -->
                </el-form>
              </el-col>

              <div style="clear:both;"></div>
              <!-- ==================== -->
              <img v-show="isDisplay"
                   src="../assets/images/noDataGraph.png"
                   width="897px"
                   height="661px"
                   style="
                   margin-top: 100px;
    margin-bottom: 36px;
    border-radius: 4px;
    border: 1px solid #d9dee9;" />
              <el-tabs v-show="!isDisplay"
                       v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="柱状图"
                             name="first">
                  <div class="boxLine">
                    <div class="titbg">故障统计</div>
                    <div style="width:100%; height:100%;">
                      <div id="chart1"
                           ref="chart1"
                           style="width:100%; height:100%;"></div>
                    </div>
                    <div class="fTips">
                      <div class="showQp"
                           @click="changeStatusqp"
                           style="margin-top:20px;">
                        <img src="../assets/images/icon_qp.png"
                             alt />
                        <span>全屏展示</span>
                      </div>
                      <div class="gzTip">故障类型</div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="饼状图"
                             name="second">
                  <div class="boxLine">
                    <div class="titbg">故障统计</div>
                    <div style="width:100%; height:100%;">
                      <div id="chart2"
                           ref="chart2"
                           style="width:100%; height:100%;"></div>
                    </div>
                    <div class="fTips">
                      <div class="showQp"
                           @click="changeStatusqps"
                           style="margin-top:20px;">
                        <img src="../assets/images/icon_qp.png"
                             alt />
                        <span>全屏展示</span>
                      </div>
                      <div class="gzTip">故障类型</div>
                    </div>
                  </div>
                </el-tab-pane>

              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="qpBox" v-show="showRentPrise">
        <div class="bcon">
            <div class="echarts">
                <div id="chart3" ref="chart3" style="width:100%; height:460px;"></div>
            </div>
        </div>
        <div class="showQp2" @click="changeStatustqp">
                <span>单击或ESC退出全屏模式</span>
        </div>
    </div>-->
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
import { EventBus } from "@/api/bus.js";
export default {
  components: {
    toph,
  },
  data () {
    return {
      data: {
        endDateStr: '',
        model: '',
        province: [],
        startDateStr: '',
        vin: '',
        warningType: [],
        xAxis: ''
      },
      isDisplay: false,
      searchCriteria: [],
      searchAxis: [],
      activeName: 'first',
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.data.endDate;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        },
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.data.startDate;
          if (beginDateVal) {
            return time.getTime() - 592131231 < beginDateVal;
          }
        },
      },
      province: [],
      createStartDate: "",
      value: '',
      warningTypeName: [],
      active: 4,
      filters: {
        TransverseAxis: ['预警', '时间', '省份'],
        carOptions: [],
        barWidth: this.barWidth,
        carList: []
      },
    };
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.$http.get('/api/Warning/WarningInfo/getWarningInforInit')
        .then(response => (
          this.province = response.data.data[0],
          this.filters.warning_ype = response.data.data[1],
          this.filters.carOptions = response.data.data[2],
          this.filters.carList = response.data.data[3]
        ))
        .catch(function(error) { // 请求失败处理
          console.log('===', error);
        });
    },
    message (mag) {
      this.$alert(mag + '不能为空', {
        confirmButtonText: '确定',
      });

    },
    // 测试用
    search (data) {
      let xAxi = ''
      if (this.data.xAxis == "预警") {
        xAxi = 1
      } else if (this.xAxis == "时间") {
        xAxi = 2
      } else {
        xAxi = 3
      }
      this.$http.get('/api/Warning/WarningInfo/getWarningInforStatistics', {
        params: {
          endDateStr: this.data.endDateStr,
          model: this.data.model,
          province: this.data.province,
          startDateStr: this.data.startDateStr,
          vin: this.data.vin,
          warningType: this.data.warningType,
          xAxis: xAxi
        },
        // paramsSerializer: params => {
        //   return this.$qs.stringify(params)
        // }
      })
        .then(response => (
          this.isDisplay = false,
          this.fordata(response.data.data)
        ))
        .catch(function(error) { // 请求失败处理
          console.log('===', error);
        });

    },
    fordata (dasta) {
      let $this = this
      let data = [{ 310: 'SOCdsd过高报警' }, { 110: 'SOC23过高报警' }, { 210: 'SO12C过高报警' }, { 340: 'SOC过3高报警' }]
      data.map(function(value, index) {
        for (let key in value) {
          $this.searchCriteria.push({ value: key, name: value[key] })
          $this.searchAxis.push(value[key])
        }
      });
      this.pieChart();
      this.drawGz();
    },

    // 搜索
    searchs (data) {
      // let data = {
      //   model: this.filters.name,
      //   vin: this.filters.carN,
      //   filtersTransverseAxisName: this.filters.TransverseAxisName,
      //   province: this.value1,
      //   warningType: this.filters.warningTypeName,
      //   startDateStr: this.startDate,
      //   endDateStr: this.endDate,
      // }
      if (this.data.xAxis == "预警") {
        this.data.xAxis = 1
      } else if (this.xAxis == "时间") {
        this.data.xAxis = 2
      } else {
        this.data.xAxis = 3
      }
      if (this.data.name == '') {
        this.message('车型')
      } else if (this.data.carN == '') {
        this.message('VIN')
      } else if (this.data.TransverseAxisName == '') {
        this.message('横轴')
      } else if (this.data.xAxis == '') {
        this.message('横轴')
      } else if (this.data.warningTypeName == '') {
        this.message('警报类型')
      } else if (this.data.startDate == '') {
        this.message('开始')
      } else if (this.data.endDate == '') {
        this.message('结束')
      } else {
        // this.drawGz()getWarningInforStatistics
        this.$http.get('/api/Warning/WarningInfo/getWarningInforStatistics', {
          params: {

          },
        })
          .then(response => (this.info = response,
            this.isDisplay = false
          ))
          .catch(function(error) { // 请求失败处理
            console.log('===', error);
          });
      }
    },
    // 重置
    reset () {
      this.data.name = ""
      this.data.carN = ""
      this.data.TransverseAxisName = ""
      this.data.warningTypeName = ""
      this.data.value1 = ""
      this.data.startDate = ""
      this.data.endDate = ""
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    changeStatusqps () {
      this.$parent.changeStatusqps(this.searchCriteria, this.searchAxis);
    },
    changeStatusqp () {
      this.$parent.changeStatusqp(this.searchCriteria, this.searchAxis);
    },
    test (chartArr) {
      let chart1 = this.$refs.chart1;
      let chart2 = this.$refs.chart2;
      var pix = window.outerWidth / chartArr.length;
      chart1.style.width = window.outerWidth / chartArr.length - 65 + "px";
      chart2.style.width = window.outerWidth / chartArr.length - 65 + "px";
      // chart1.resize();
      setTimeout(() => {
        this.drawGz();
      }, 1000);
    },
    // 饼状图
    pieChart () {
      let chart1 = this.$echarts.init(this.$refs.chart2);
      let option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.searchCriteria
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.searchCriteria
          }
        ]
      };
      chart1.setOption(option1);
    },
    // 柱状图
    drawGz () {
      let chart1 = this.$echarts.init(this.$refs.chart1);
      let option1 = {
        title: {
          show: false,
          text: "",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
        },
        color: ["#326FF8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "8%",
          right: "4%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.searchAxis,
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
              rotate: 30,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#DDECFA",
                width: 1,
              },
            },
          },
        ],
        yAxis: [
          {
            name: "故障次数（次）",
            type: "value",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 6,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#C4D9E9",
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
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: this.barWidth,
            data: this.searchCriteria,
          },
        ],
      };
      chart1.setOption(option1);
      // debugger;
      // this.$refs.sxBox.addEventListener("resize", function() {
      //    // debugger;
      //     chart1.resize();
      // });
    },
  },
  mounted () {
    //this.$refs.chart1.clientHeight
    EventBus.$on("tabIndex", (val) => {
      // _this.handleTabChange(val);
      this.test(val);
    });
    let chart1 = this.$refs.chart1;
    let chart2 = this.$refs.chart2;

    chart1.style.width =
      window.outerWidth / this.$parent.chartArr.length - 65 + "px";
    chart1.style.height = window.outerHeight / 2 + 30 + "px";
    echarts.init(chart1);

    chart2.style.width =
      window.outerWidth / this.$parent.chartArr.length - 65 + "px";
    chart2.style.height = window.outerHeight / 2 + 30 + "px";
    echarts.init(chart2);





    window.onresize = () => {
      // 基于准备好的dom，初始化echarts实例
      //   let myChart = this.$echarts.init(document.getElementById('myChart'));
      //   myChart.resize();
    };
    // this.$refs.f1.$el.style.display = 'block';
    // this.$refs.f2.$el.style.display = 'block';
  },
};
</script>
<style lang="less" scoped>
/deep/.el-select__tags {
  flex-wrap: inherit;
  overflow: hidden;
}
.wrap {
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
  background: rgba(244, 247, 252, 1);
}
.main {
  width: 99%;
  margin: 0 auto;
  overflow: hidden;
}
.m_con {
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
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  justify-items: center;
  span {
    display: inline-block;
    // float: left;
    margin-right: 8px;
    text-align: right;
    color: #3e526f;
  }
  .handle-box {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    // height: 860px;
    /deep/ .el-input--mini .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .sxBox {
      // margin: 15px auto;
      // width: 96%;
      margin: 10px;
    }
    .lBox {
      margin: 0 auto;
      display: block;
      width: 1px;
      border-right: 1px solid rgba(231, 239, 245, 1);
      margin: 0 2%;
    }
  }
  // @media screen and (max-width : 1366px) {
  //     .handle-box{
  //         width: 100%;
  //         background:rgba(255,255,255,1);
  //         border-radius:4px;
  //         height: 660px;
  //         }
  // }
}
.boxLine {
  margin-top: 43px;
  margin-bottom: 36px;
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
.fTips {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}
.showQp {
  float: left;
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
.gzTip {
  float: right;
  line-height: 65px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(63, 83, 110, 1);
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
  margin: 10px auto;
  width: 99.5%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
  overflow: hidden;
  .bcon {
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
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
  margin: 0 auto;
  width: 60%;
  height: 460px;
}
/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

// /deep/.el-form--inline .el-form-item {
//      display: block;
//     margin-right: 10px;
//     // vertical-align: top;
// }
/deep/.el-form-item {
  margin-bottom: 0;
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
_:-ms-lang(x),
/deep/.el-form--inline .el-form-item {
  display: block;
}
</style>
