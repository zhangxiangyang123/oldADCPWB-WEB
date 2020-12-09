<template>
  <div class="news">
    <toph v-bind:active="active" class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/" style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>消息推送</a></el-breadcrumb-item>
      </el-breadcrumb>
        <div class="search-box">
          <el-form :inline="true" :model="formData" class="form-box">
            <el-form-item label="姓名">
              <el-input v-model="formData.carVIN" placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch" size="small">搜索</el-button>
              <el-button @click="handleReset" size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      <div class="listCon">

        <div class="tabs">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>预警风险等级</th>
                <th>姓名</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, trIdx) in tableData.tbody" :key="trIdx" ref="mytr">

                <td v-if="tr !=undefined"> {{trIdx+1}} </td>
                <td v-if="tr !=undefined" ref="risk" :id="tableData.fxdj[trIdx]">
                  <img src="../../assets/images/battery/oneFx.png" alt="" v-if="tableData.fxdj[trIdx]==1">
                  <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="tableData.fxdj[trIdx]==2">
                  <img src="../../assets/images/battery/threeFx.png" alt="" v-else-if="tableData.fxdj[trIdx]==3">
                  <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="tableData.fxdj[trIdx]==4">
                </td>
                <td v-for="(td, tdIdx) in tr" :key="tdIdx"  ref="name">{{td}}</td>
                <td class="operate" v-if="tr !=undefined">
                  <div class="cell">
                    <a @click="handleDec($event,trIdx)" class="ckbtn">查看</a>
                    <span class="hrl">|</span>
                    <a @click="handleEdit(tableData.fxdj[trIdx])" class="ckbtn">编辑</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagingtion-box" style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <el-button size="small" type="primary" style="margin-left: 20px;" @click="handleCurrentChange1">确定</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="编辑" :visible.sync="FormVisibledc" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
      <el-form :model="Form" label-width="120px" ref="Form">
        <!-- <el-form-item label="保存路径"> -->
        <!-- <div style="width:50%; float:left; margin-right:10px;">
            <el-input type="text" v-model="Form.filename"></el-input>
          </div>
          <div class="choseBtn">选择<el-input type="file" class="choseBtnold"></el-input>
          </div> -->
        <!-- </el-form-item> -->
        <div class="edit">
          <div class="title">
            <span>预警风险等级：</span>
            <img src="../../assets/images/battery/oneFx.png" alt="" v-if="edit==1">
            <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="edit==2">
            <img src="../../assets/images/battery/threeFx.png" alt="" v-else-if="edit==3">
            <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="edit==4">
          </div>
          <div class="edit_cont">
            <ul>
              <li>
                <el-form-item label="姓名">
                  <el-input v-model="editData.name" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="editData.phone" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <div class="add">
                  <span><img @click="cut(0)" src="../../assets/images/cut.png" alt=""></span>
                  <span><img @click="add(1)" src="../../assets/images/add.png" alt=""></span>
                </div>
              </li>
              <li>
                <el-form-item label="微信">
                  <el-input v-model="editData.vx" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item label="备注" class="beizhu">
                  <el-input v-model="editData.beizhu" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <div class="add">

                </div>
              </li>

            </ul>
            <ul v-if="state==1">
              <li>
                <el-form-item label="姓名">
                  <el-input v-model="editData1.name" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="editData1.phone" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <div class="add">
                  <span><img @click="cut(0)" src="../../assets/images/cut.png" alt=""></span>
                  <!-- <span><img src="../../assets/images/add.png" alt=""></span> -->
                </div>
              </li>
              <li>
                <el-form-item label="微信">
                  <el-input v-model="editData1.vx" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <el-form-item label="备注" class="beizhu">
                  <el-input v-model="editData1.beizhu" placeholder="请输入" size="small"></el-input>
                </el-form-item>
                <div>

                </div>
              </li>

            </ul>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit('Form')">确定</el-button>
        <!-- v-if="DcBtnshow" -->
        <el-button @click.native="handleCancel('Form')">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="addVisible" :close-on-click-modal="false" class="edit-form">
        <el-form :model="formData" label-width="120px" ref="formData">
        <div class="tcCon">
            <ul>
            <li><span>姓名</span><span>{{formData.name}}</span></li>
            <li>
                <span>预警风险等级</span>
                <span style="padding-top: 3px;">
                 <img src="../../assets/images/battery/oneFx.png" alt="" v-if="formData.value==1">
                    <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="formData.value==2">
                    <img src="../../assets/images/battery/threeFx.png" alt="" v-else-if="formData.value==3">
                    <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="formData.value==4">
                </span></li>
            </ul>
        </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisible=false">确定</el-button>
        <!-- <el-button @click="addVisible=false">取消</el-button> -->
        </div>
    </el-dialog>
  </div>
</template>
<script>
import toph from "@/components/top";
export default {
  data() {
    return {
      active: 5,
      activeName: "0",
      formData: {
        carType: "",
        carNumber: "",
        carVIN: "",
         name:"",
        value:"",
      },
      total: 6,
      currentPage1: 1,
      pageSize: 5,
      type: 0,
      tableData: {
        tbody: [
          ["刘敏,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["刘敏,张建斌,夏丽丽,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["张建斌,刘敏,王毅"],
        ],
        fxdj: [1, 2, 3, 4, 4],
        type: 0
      },
      FormVisibledc: false,
      Form: {
        id: 0,
        name: '',
        carN: '',
        carnumber: '',
        types: '',
        fxDj: '',
        yjtype: '',
        sxms: '',
        yjState: '',
      },
      edit: "",
      editData: {
        name: "",
        phone: "",
        vx: "",
        beizhu: ""
      },
      editData1: {
        name: "",
        phone: "",
        vx: "",
        beizhu: ""
      },
      state: 0,
      // formData:{
      //     name:"",
      //     value:"",
      // },
      addVisible:false
    };
  },
  components: {
    toph
  },
  methods: {
    handleSearch() {
             var search = this.formData.carVIN;
             let lists =null;
    let list =this.tableData.tbody;
         lists= list.filter(item =>{
               
                let matchName = true;
                 if (search) {
                    // 模糊搜索;
                    let keys = search
                        .toUpperCase()
                        .replace(" ", "")
                        .split("");
                    matchName = keys.every(key => item[0].toUpperCase().includes(key));
                }
             return matchName;
        })
    console.log(lists)
    this.tableData.tbody=lists
    this.total = lists.length
    },
    handleReset() {
      this.formData = {
        carType: "",
        carNumber: "",
        carVIN: ""
      };
      this.tableData.tbody = [
        ["刘敏,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["刘敏,张建斌,夏丽丽,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["张建斌,刘敏,王毅"],
           ["刘敏,张建斌,夏丽丽,王毅"],
      ]
    },
    handleSizeChange1(val) {
      if (val == 5) {
        this.tableData.tbody = [
          ["刘敏,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["刘敏,张建斌,夏丽丽,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["张建斌,刘敏,王毅"],
        ];
        this.tableData.fxdj = [1, 2, 3, 4, 4]
      } else {
        this.tableData.tbody = [
          ["刘敏,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["刘敏,张建斌,夏丽丽,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["张建斌,刘敏,王毅"],
           ["刘敏,张建斌,夏丽丽,王毅"],
        ];
        this.tableData.fxdj = [1, 2, 3, 4, 4, 2]
      }
    },
    handleCurrentChange1(val) {
      if (val == 1) {
        this.tableData.tbody = [
           ["刘敏,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["刘敏,张建斌,夏丽丽,王毅"],
          ["张建斌,夏丽丽,王毅"],
          ["张建斌,刘敏,王毅"],
        ];
        this.tableData.fxdj = [1, 2, 3, 4, 4]
      } else if (val == 2) {
        this.tableData.tbody = [
          ["刘敏,张建斌,夏丽丽,王毅"],

        ];
        this.tableData.fxdj = [2]
      }
    },
    //点击编辑
    handleEdit: function (index) {
      this.edit = index
      this.FormVisibledc = true;
      // this.Form = Object.assign({}, row); 
      // _index = index;
      // console.log(index);
      // console.log(_index);

      // this.dialogStatus = "editEquipment"
      // this.addBtnshow = false
      // this.editBtnshow = true
    },
    //点击关闭dialog
    handleClose(done) {
      this.FormVisibledc = false;
    },
    //点击取消
    handleCancel(formName) {
      this.FormVisibledc = false;
    },
    cut(idex) {
      this.state = 0;
    },
    add(idex) {
      this.state = 1;
    },
        // 查看
    handleDec(e,i) {
        // console.log(this.$refs.name[i].innerHTML, this.$refs.risk[i].id)
        // console.log(e.target)
        //   this.addVisible = true;
        //   this.formData = Object.assign({}, row);
        this.formData.name=this.$refs.name[i].innerHTML;
        this.formData.value=this.$refs.risk[i].id;
        this.addVisible=true;
        this.editData1 =  {
            name: "",
            phone: "",
            vx: "",
            beizhu: ""
        }
        this.editData =  {
            name: "",
            phone: "",
            vx: "",
            beizhu: ""
        }
    },
    confirmEdit() {
      var str = this.tableData.tbody[this.edit - 1].toString();
      var pu = str.concat("，" + this.editData.name, this.editData1.name)
      this.tableData.tbody[this.edit - 1].pop()
      this.tableData.tbody[this.edit - 1].push(pu)
      console.log(pu)
      // console.log(str.concat(this.editData.name, this.editData1.name))
      this.editData =  {
        name: "",
        phone: "",
        vx: "",
        beizhu: ""
      }
      this.editData1 =  {
        name: "",
        phone: "",
        vx: "",
        beizhu: ""
      }
      this.FormVisibledc = false;
    }
  }
};
</script>
<style lang="less" scoped>
.news {
  background: #f4f7fc;
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
  > .content {
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
    /deep/.el-breadcrumb__inner.is-link {
      font-weight: 700;
      text-decoration: none;
      -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: rgba(141, 171, 196, 1) !important;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      font-weight: 400;
      color: rgba(43, 64, 91, 1);
      cursor: text;
    }
    .search-box {
      padding: 10px;
      padding-left: 28px;
      background: #fff;
      border-radius: 4px;
      margin: 16px 0 10px 0;
      form {
        > div {
          margin: 0;
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
      }
    }
    .listCon {
      padding: 0 15px;
      background: rgba(255, 255, 255, 1);
      padding-bottom: 15px;
      margin-bottom: 10px;
      .tabs {
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          thead {
            tr {
              background: rgba(250, 250, 250, 1);
              th {
                box-sizing: border-box;
                font-size: 14px;
                padding: 14px;
                color: rgba(119, 145, 167, 1);
                border-bottom: 1px solid rgba(229, 238, 245, 1);
                > p:first-child {
                  margin-bottom: 0;
                }
                > p:nth-child(2) {
                  margin-top: 3px;
                }
              }
            }
          }
          tbody {
            tr {
              background-color: #fff;
              td {
                box-sizing: border-box;
                font-size: 14px;
                //font-family:PingFangSC-Medium,PingFang SC;
                font-weight: 500;
                color: rgba(119, 145, 167, 1);
                height: 44px;
                border-bottom: 1px solid rgba(229, 238, 245, 1);
                text-align: center;
                &:first-child {
                  width: 90px;
                  word-break: break-all;
                }
              }
              .operate {
                .ckbtn {
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(0, 147, 238, 1);
                  cursor: pointer;
                }
                .hrl {
                  margin: 0 10px;
                  width: 1px;
                  height: 14px;
                  color: rgba(233, 233, 233, 1);
                }
              }
            }
            tr:hover {
              background-color: #f5f7fa;
              > td {
                transition: background-color 0.25s ease;
                background-color: #f5f7fa;
              }
              > td:first-child {
                border-left: 2px solid transparent;
                //  border-left: 2px solid #0093EE !important;
              }
            }
          }
        }
      }
    }
  }

  .pagingtion-box {
    position: relative;
    background: #fff;
  }
  /deep/.pagingtion-box .el-pagination__total {
    position: absolute;
    left: 0;
  }
  /deep/.pagingtion-box .el-pagination__sizes {
    position: absolute;
    left: 67px;
  }
  /deep/.pagingtion-box .el-pagination__total {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-input__inner {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-pager .number {
    font-size: 14px;
    color: #303133;
  }
  /deep/.pagingtion-box .el-pager .active {
    color: #409eff;
  }

  //   编辑页面

  /deep/.el-dialog {
    width: 640px;
    /deep/.el-dialog__header {
      background: rgba(250, 251, 252, 1);
      box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
      > span {
        font-size: 16px;
        font-weight: 500;
        color: rgba(43, 64, 91, 1);
      }
    }
    .el-dialog__body {
      padding: 25px 12px 24px 14px;
      .edit {
        .title {
          font-size: 14px;
          color: rgba(62, 82, 111, 1);
          display: flex;
          align-items: center;
          padding-left: 14px;
          > img {
            width: 18px;
            height: 16px;
          }
        }
        .edit_cont {
          > ul {
            padding: 0;
            padding: 10px;
            background: rgba(250, 251, 252, 1);
            margin-top: 15px;
            > li {
              list-style: none;
              display: flex;
              align-items: center;
              font-size: 14px;
              color: rgba(141, 171, 196, 1);
              .el-form-item {
                width: 268px;
                display: flex;
                margin-bottom: 00px;
                label {
                  width: auto !important;
                }
                .el-form-item__content {
                  margin-left: 0px !important;
                  input {
                    width: 200px;
                    height: 32px;
                  }
                }
              }
              .add {
                cursor: pointer;
              }
              .beizhu {
                label {
                  width: 68px !important;
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
}
// 查看
  .tcCon {
    
    ul {
     
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        margin-bottom: 13px;
        > span:first-child {
            display: inline-block;
            min-width: 84px;
          margin-right: 30px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(62, 82, 111, 1);
        }
      }
    }
  }
  /deep/.el-dialog__footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 10px 20px 10px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
