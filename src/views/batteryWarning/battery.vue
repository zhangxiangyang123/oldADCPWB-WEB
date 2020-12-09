<template>
  <div class="wrap">
    <toph v-bind:active="active"></toph>
    <div class="main">
      <el-breadcrumb separator="/" style="margin-top:12px; margin-left:15px;">
        <el-breadcrumb-item :to="{ path: '/batteryWarning/battery' }">电池预警</el-breadcrumb-item>
        <el-breadcrumb-item><a>风险电池管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="handle-box">
        <!-- 搜索区begin -->
        <div class="box">
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" ref="filters">
              <el-form-item prop="name" style="margin-bottom:8px;">
                <span>车型</span>
                <el-select v-model="filters.name" placeholder="请选择" clearable size="mini" style="width:220px;" @change="change($event)">
                  <el-option v-for="item in filters.carOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="carN" style="margin-bottom:8px;">
                <span>车辆VIN</span>
                <el-input v-model="filters.carN" placeholder="车辆VIN" style="width:220px;" size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="carnumber" style="margin-bottom:8px;">
                <span>车牌号</span>
                <el-input v-model="filters.carnumber" placeholder="车牌号" style="width:220px; " size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="fxDj" style="margin-bottom:8px;">
                <span style="width:90px;">预警风险等级</span>
                <el-select v-model="filters.fxDj" placeholder="请选择" clearable size="mini" style="width:202px;" @change="change($event)">
                  <el-option v-for="item in filters.fengxianOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item prop="yjState" style="margin-bottom:8px;">
                <span>预警状态</span>
                <el-select v-model="filters.yjState" placeholder="请选择" clearable size="mini" style="width:220px; " @change="change($event)">
                  <el-option v-for="item in filters.yjztOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="yjtype" style="margin-bottom:8px; margin-right:8px;">
                <span>预警类型</span>
                <el-select v-model="filters.yjtype" placeholder="请选择" clearable size="mini" style="width:220px; " @change="change($event)">
                  <el-option v-for="item in filters.yjlxOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right:4px;">
                <el-button type="primary" @click="searchS(filters)" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item>
               <el-form-item >
                <el-button type="info" size="mini" @click="resetForm()" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
              </el-form-item>
              
              <!-- <el-form-item style="float:right;">
                <el-button type="info" size="mini" @click="resetForm()" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
              </el-form-item>
              <el-form-item style="float:right;margin-right:8px;">
                <el-button type="primary" @click="searchS(filters)" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item> -->

            </el-form>
          </el-col>
        </div>
      </div> <!-- 搜索区end -->
      <div class="listCon">
        <!--按钮-->
        <div class="btns">
          <div class="shBtn" @click="shenheAll()"><img src="../../assets/images/battery/icon_shenh.png" alt="" />一键审核</div>
          <div class="delBtn" @click="delAll()"><img src="../../assets/images/battery/icon_del.png" alt="" />一键删除</div>
          <div class="dcBtn" @click="handleEditC()"><img src="../../assets/images/battery/exict.png" alt="" />导出</div>
          <div class="drBtn" @click="handleEditR()" style="text-align: center;">上传附件</div>
          <div class="drBtn" @click="compare()" style="text-align: center;">对比</div>
        </div>
        <!--表格数据及操作-->
        <el-table :data="users" style="width: 100%;" height="250" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60">
          </el-table-column>
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="车型" width="160">
          </el-table-column>
          <el-table-column prop="carN" label="车辆VIN" width="170">
          </el-table-column>
          <el-table-column prop="carnumber" label="车牌号" min-width="110">
          </el-table-column>
          <el-table-column prop="types" label="电池类型" min-width="100">
          </el-table-column>
          <el-table-column prop="fxDj" label="预警风险等级" min-width="110">
            <template slot-scope="scope">
              <img src="../../assets/images/battery/oneFx.png" alt="" v-if="scope.row.fxDj==1">
              <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="scope.row.fxDj==2">
              <img src="../../assets/images/battery/threeFx.png" alt="" v-else-if="scope.row.fxDj==3">
              <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="scope.row.fxDj==4">
            </template>
          </el-table-column>
          <el-table-column prop="yjtype" label="预警类型" min-width="110">
          </el-table-column>
          <el-table-column prop="sxms" label="失效模式" min-width="100">
          </el-table-column>
          <el-table-column prop="yjState" label="预警状态" min-width="80">
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <a @click="handleDec(scope.$index, scope.row)" class="ckbtn">查看</a>
              <span class="hrl">|</span>
              <a @click="handleEdit(scope.$index, scope.row)" class="ckbtn">编辑</a>
              <span class="hrl">|</span>
              <a @click="handleShenhe(scope.$index, scope.row)" class="ckbtn">审核</a>
              <span class="hrl">|</span>
              <a class="delbtn" @click="del(scope.$index, scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagingtion-box" style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
          <el-pagination style="margin-top: 20px;  display: flex; justify-content: flex-end;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1, 2,5, 10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button size="small" type="primary" style="margin-left: 20px; margin-top: 20px;">确定</el-button>
        </div>
      </div>
      <!-- 查看 -->
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="FormVisibleck" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @open="open()">
        <el-form :model="Form" label-width="120px" ref="Form">
          <div class="tcCon">
            <div style="width:45%;">
              <el-form-item label="车型" prop="name">
                <el-input v-model="Form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="车辆VIN">
                <el-input v-model="Form.carN"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池健康指数">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警状态">
                <el-input v-model="Form.yjState"></el-input>
              </el-form-item>
              <el-form-item label="预警风险等级">
                <el-input v-model="Form.fxDj" style="width:105px;"></el-input>
              </el-form-item>
            </div>
            <div style="width:45%;">
              <el-form-item label="车牌号">
                <el-input v-model="Form.carnumber"></el-input>
              </el-form-item>
              <el-form-item label="电池类型">
                <el-input v-model="Form.types"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池SOH">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警类型">
                <el-input v-model="Form.yjtype"></el-input>
              </el-form-item>
              <el-form-item label="失效模式">
                <el-input type="text" v-model="Form.sxms"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line"></div>
          <div class="tcCon" style="justify-content: flex-start;">
            <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold;">预警描述</div>
            <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
              该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警
            </div>

          </div>
          <div style="margin-left:30px;">
            <!-- <div class="lendTip">
                <div class="lvsy"><i class="lv"></i><span>最高电压</span></div>
                <div class="lgy"><i class="lan"></i><span>最低电压</span></div>
            </div> -->
            <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
            <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
          </div>
          <div class="line"></div>
          <div class="zhenduan" style="justify-content: flex-start;">
            <el-form-item label="诊断结果">
              <el-input type="text" readonly="readonly" value="分析电池包监控数据，与预警描述一致" style="width:85%; border-radius:4px;"></el-input>
            </el-form-item>
          </div>
          <div class="tcCon" style="justify-content: flex-start; margin-top:10px;">
            <el-form-item label="审核人">
              <el-input type="text" value="张三管理员"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="editBtnshow" type="primary" @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <!-- <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')">确定</el-button> -->

        </div>
      </el-dialog>
      <!-- 编辑 -->
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="FormVisible" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @open="open()">
        <el-form :model="Form" label-width="120px" ref="Form">
          <div class="tcCon">
            <div style="width:45%;">
              <el-form-item label="车型" prop="name">
                <el-input v-model="Form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="车辆VIN">
                <el-input v-model="Form.carN"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池健康指数">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警状态">
                <el-input v-model="Form.yjState"></el-input>
              </el-form-item>
              <el-form-item label="预警风险等级">
                <!-- <el-input v-model="Form.fxDj"></el-input> -->
                <el-select v-model="Form.fxDj" placeholder="请选择" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px; width:105px;">
                  <el-option v-for="item in filters.fengxianOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="width:45%;">
              <el-form-item label="车牌号">
                <el-input v-model="Form.carnumber"></el-input>
              </el-form-item>
              <el-form-item label="电池类型">
                <el-input v-model="Form.types"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池SOH">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警类型">
                <el-input v-model="Form.yjtype"></el-input>
              </el-form-item>
              <el-form-item label="失效模式">
                <el-input type="text" v-model="Form.sxms"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line"></div>
          <div class="tcCon" style="justify-content: flex-start;">
            <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold;margin-right:12px;">预警描述</div>
            <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
              该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警
            </div>
          </div>
          <div style="margin-left:30px;">
            <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
            <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
          </div>
          <div class="line"></div>
          <div class="zhenduan" style="justify-content: flex-start;">
            <el-form-item label="诊断结果">
              <el-input type="text" readonly="readonly" value="分析电池包监控数据，与预警描述一致" style="width:85%; border-radius:4px;border:0px solid #A8C6DF;"></el-input>
            </el-form-item>
          </div>
          <div class="tcCon" style="justify-content: flex-start; margin-top:10px;">
            <el-form-item label="审核人">
              <el-select v-model="Form.shpeople" placeholder="请选择" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px; width:105px;">
                <el-option v-for="item in filters.shenheOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="editBtnshow" type="primary" @click.native="confirmEdit('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
          <!-- <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')">确定</el-button> -->

        </div>
      </el-dialog>
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="FormVisible2" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @open="open()">
        <el-form :model="Form" label-width="120px" ref="Form">
          <div class="tcCon">
            <div style="width:45%;">
              <el-form-item label="车型" prop="name">
                <el-input v-model="Form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="车辆VIN">
                <el-input v-model="Form.carN"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池健康指数">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警状态">
                <el-input v-model="Form.yjState"></el-input>
              </el-form-item>
              <el-form-item label="预警风险等级">
                <el-input v-model="Form.fxDj" style="width:105px;"></el-input>
                <!-- <el-select v-model="Form.fxDj" placeholder="" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px;">
                <el-option  v-for="item in filters.fengxianOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
            </el-select> -->
              </el-form-item>
            </div>
            <div style="width:45%;">
              <el-form-item label="车牌号">
                <el-input v-model="Form.carnumber"></el-input>
              </el-form-item>
              <el-form-item label="电池类型">
                <el-input v-model="Form.types"></el-input>
              </el-form-item>
              <!-- <el-form-item label="电池SOH">
                <el-input value="99%"></el-input>
              </el-form-item> -->
              <el-form-item label="预警类型">
                <el-input v-model="Form.yjtype"></el-input>
              </el-form-item>
              <el-form-item label="失效模式">
                <el-input type="text" v-model="Form.sxms"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="line"></div>
          <div class="tcCon" style="justify-content: flex-start;">
            <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold; margin-right:12px;">预警描述</div>
            <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
              该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警

            </div>

          </div>
          <div style="margin-left:30px;">
            <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
            <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
          </div>
          <div class="line"></div>
          <div class="" style="justify-content: flex-start;">
            <el-form-item label="诊断结果描述">
              <div style="color:#3E526F; margin-left:8px;">分析电池包监控数据，与预警描述一致</div>
              <!-- <el-input type="textarea" v-model="Form.sxms" style="width:100%; border-radius:4px;border:1px solid rgba(168,198,223,1);"></el-input> -->
            </el-form-item>
          </div>
          <div class="tcCon" style="justify-content: flex-start;">
            <el-form-item label="审核人">
              <div style="color:#3E526F; margin-left:8px;">张三管理员</div>
              <!-- <el-select v-model="Form.shpeople" placeholder="张三管理员" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px;">
                <el-option  v-for="item in filters.shenheOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
            </el-select> -->
            </el-form-item>
          </div>
          <el-form-item label="审核结果">
            <el-radio v-model="radio" label="1" style="margin-left:8px;">通过</el-radio>
            <el-radio v-model="radio" label="2">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审核描述" class="shmiaoshu">
            <el-input type="textarea" v-model="Form.shms" style="width:85%; border-radius:4px;"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="1" v-model="checked" style="margin-left:8px;"><span style="font-size:14px;color:#3E526F;font-family:PingFangSC-Regular,PingFang SC;">推送消息 给</span> <span style="font-family:PingFangSC-Regular,PingFang SC;color:#239FFF;font-size:14px;" @click="allPeople()">所有人</span></el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="confirmShenhe('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
          <!-- <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')">确定</el-button> -->

        </div>
      </el-dialog>
      <!-- daochu -->
      <el-dialog customClass="customWidth2" :title="titleMap[dialogStatus]" :visible.sync="FormVisibledc" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
        <el-form :model="Form" label-width="120px" ref="Form">
          <!-- <el-form-item label="保存路径">
             <div style="width:50%; float:left; margin-right:40px;"><input type="text" id="textfield" class="filIn" style="width:100%;"/></div>
            <a class="choseBtn">
                选择<input type="file" name="file" id="fileField" class="choseBtnold" onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
            </a>
          </el-form-item> -->
          <el-form-item label="保存类型">
            <el-radio v-model="radio" label="1">WORD文件</el-radio><br />
            <el-radio v-model="radio" label="2">PDF文件</el-radio>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="DcBtnshow" type="primary" @click.native="confirmDc('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog customClass="customWidth2" title="上传附件" :visible.sync="FormVisibledr" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
        <el-form :model="Form" label-width="120px" ref="Form">
          <el-form-item label="保存路径">
             <div style="width:50%; float:left; margin-right:40px;"><input type="text" id="textfield" class="filIn" style="width:100%;"/></div>
            <a class="choseBtn">
                选择<input type="file" name="file" id="fileField" class="choseBtnold" onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
            </a>
          </el-form-item>
          <!-- <el-form-item label="保存类型">
            <el-radio v-model="radio" label="1">WORD文件</el-radio><br />
            <el-radio v-model="radio" label="2">PDF文件</el-radio>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="DcBtnshow" type="primary" @click.native="confirmDr('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 对比 -->
      <el-dialog title="对比" customClass="customWidth" :visible.sync="FormVisibleCompare" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose" style="margin-top:10%;">
        <div v-if="multipleSelection.length==0">请选择要对比的项</div>
        <div v-else>确定对比选中的选项</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCompare('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 删除 -->
      <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose" style="margin-top:10%;">
        <div>确定删除选中的选项</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleDelete('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 批量删除 -->
      <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibleAlldel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" style="margin-top:10%;">
         <div v-if="multipleSelection.length==0">请选择要删除的项</div>
         <div v-else>确定删除选中的选项</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteFileOrDirectory('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
       <!-- 一键审核 -->
      <el-dialog title="审核" customClass="customWidth" :visible.sync="FormVisibleAllSh" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
        <div v-if="multipleSelection.length==0">请选择要审核的项</div>
         <div v-else>确定审核选中的选项</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleShenhe2('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 推送所有人 -->
      <el-dialog title="推送" customClass="customWidth" :visible.sync="FormVisibleTS" :close-on-click-modal="false" class="edit-form" :before-close="handleCloseTs">
       <el-form :model="Form" ref="Form">
        <el-form-item label="人员列表" label-width="80px">
          <el-checkbox-group v-model="roleCheckList.content1">
            <el-checkbox label="刘敏"></el-checkbox>
            <el-checkbox label="王毅"></el-checkbox>
            <el-checkbox label="张建斌"></el-checkbox>
            <el-checkbox label="夏丽丽"></el-checkbox>
          </el-checkbox-group>
          </el-form-item>
       </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleTs('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
          <el-button @click.native="handleCancelTs('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
// import "echarts";
import _url from "@/api/arrayRemove";
var _index;
export default {
  components: {
    toph
  },
  data() {
    return {
      titleMap: {
        editEquipment: "编辑",
        shenheEquipment: "审核",
        daochuEquipment: "导出",
        ckEquipment: "详情"
      },
      dialogStatus: "",
      checked: true,
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
      radio: '1',
      shpeople: '张三管理员',
      users: [
        { id: 1, name: '北汽新能源EX360', carN: '1G1BL52P7TR115521', carnumber: '京A88881', types: '三元电池', fxDj: '1', yjtype: '电压异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 2, name: '北汽新能源EU5', carN: '1G1BL52P7TR115520', carnumber: '京A88882', types: '三元电池', fxDj: '2', yjtype: '温度异常', sxms: '电芯自放电', yjState: '已处理' },
        { id: 3, name: '北汽新能源EX5', carN: '1G1BL52P7TR115520', carnumber: '京A88883', types: '三元电池', fxDj: '2', yjtype: '绝缘异常', sxms: '电芯自放电', yjState: '正在处理' },
        { id: 4, name: '北汽新能源EC3', carN: '1G1BL52P7TR115520', carnumber: '京A88884', types: '三元电池', fxDj: '3', yjtype: '电压异常', sxms: '电芯自放电', yjState: '已审核' },
        { id: 5, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88885', types: '三元电池', fxDj: '4', yjtype: '绝缘异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 6, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88881', types: '三元电池', fxDj: '1', yjtype: '温度异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 7, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88882', types: '三元电池', fxDj: '2', yjtype: '车辆离群', sxms: '电芯自放电', yjState: '已推送' },
        { id: 8, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88883', types: '三元电池', fxDj: '2', yjtype: '电压异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 9, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88884', types: '三元电池', fxDj: '3', yjtype: '绝缘异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 10, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88884', types: '三元电池', fxDj: '3', yjtype: '电压异常', sxms: '电芯自放电', yjState: '已审核' },
        { id: 11, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88885', types: '三元电池', fxDj: '4', yjtype: '绝缘异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 12, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88881', types: '三元电池', fxDj: '1', yjtype: '温度异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 13, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88882', types: '三元电池', fxDj: '2', yjtype: '车辆离群', sxms: '电芯自放电', yjState: '已推送' },
        { id: 14, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88883', types: '三元电池', fxDj: '2', yjtype: '电压异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 15, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88884', types: '三元电池', fxDj: '3', yjtype: '绝缘异常', sxms: '电芯自放电', yjState: '已推送' },
        { id: 16, name: '北汽新能源EX360', carN: '1G1BL52P7TR115520', carnumber: '京A88885', types: '三元电池', fxDj: '4', yjtype: '温度异常', sxms: '电芯自放电', yjState: '已推送' }
      ],
      editFormRules: {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        reserve: [
          { required: true, message: '', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '', trigger: 'blur' }
        ],
      },
      FormVisible: false,
      FormVisible2: false,
      FormVisibledc: false,
      FormVisibledr: false,
      FormVisibleck: false,
      FormVisibledel: false,
      FormVisibleAlldel: false,
      FormVisibleAllSh: false,
      FormVisibleTS: false,
      currentRow: [],
      addBtnshow: false,
      editBtnshow: false,
      DcBtnshow: false,
      FormVisibleCompare: false,
      multipleSelection: [],
      editid: '',
      active: 2,
      roleCheckList: {
        content1: [],
      },
      filters: {
        //车型下拉框
        carOptions: [
          {
            value: "北汽新能源EX360",
            label: "北汽新能源EX360"
          }, 
          {
            value: "北汽新能源EU5",
            label: "北汽新能源EU5"
          }, 
          {
            value: "北汽新能源EX5",
            label: "北汽新能源EX5"
          }, 
          {
            value: "北汽新能源EC3",
            label: "北汽新能源EC3"
          }
        ],
        shenheOptions: [
          {
            value: "0",
            label: "审核人1"
          },
          {
            value: "1",
            label: "审核人2"
          }
        ],
        fengxianOptions: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          },
          {
            value: "4",
            label: "4"
          }
        ],
        yjztOptions: [
          {
            value: "已推送",
            label: "已推送"
          },
          {
            value: "正在处理",
            label: "正在处理"
          },
          {
            value: "已审核",
            label: "已审核"
          },
          {
            value: "已处理",
            label: "已处理"
          }
        ],
        yjlxOptions: [
            {
                value: "温度异常",
                label: "温度异常"
            },
            {
                value: "车辆离群",
                label: "车辆离群"
            },
            {
                value: "电压异常",
                label: "电压异常"
            },
            {
                value: "绝缘异常",
                label: "绝缘异常"
            },
            {
                value: "SOC异常",
                label: "SOC异常"
            }
         ],
        //列表搜索参数
        carN: "",
        carnumber: "",
      },
      //批量选中data
      selectList: [],
      //分页
      limit: 10,
      total: null,
      page: 1,
    }
  },
  created() {
    this.pageList()
  },
  methods: {
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.users
      this.getList()
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data;
      this.users = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = list.length
    },
    // 当每页数量改变
    handleSizeChange(val) {
      this.limit = val
      this.getList()
    },
     change(value) {
       this.$forceUpdate()
     },
    // 当当前页改变
    handleCurrentChange(val) {
      this.page = val
      this.getList()
      this.$refs.filters.resetFields()
    },
    // 搜索过滤数据

    searchS({ name, carN, carnumber, fxDj, yjState, yjtype }) {
      this.page = 1
      let lists = this.data.filter(item => {
        let matchName = true; // 车型 筛选
        let matchCarn = true; // 车辆VIN 筛选
        let matchNumber = true; // 车牌号 筛选
        let matchFxdj = true; // 风险等级 筛选
        let matchStates = true; // 预警状态 筛选
        let matchType = true; // 预警类型 筛选

        if (fxDj) {
          matchFxdj = item.fxDj == fxDj;
        }
        if (yjState) {
          matchStates = item.yjState == yjState;
        }
        if (yjtype) {
          matchType = item.yjtype == yjtype;
        }
        if (name) {
          matchName = item.name == name;
        }
        if (carN) {
          // 模糊搜索;
          matchCarn = item.carN == carN;
        }
        if (carnumber) {
          // 模糊搜索;
          let keys = carnumber
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字
          matchNumber = keys.every(key => item.carnumber.toUpperCase().includes(key));
        }
        return matchName && matchCarn && matchNumber && matchFxdj && matchStates && matchType;
      });
      this.list = lists.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.users = this.list
      this.total = lists.length
    },
    resetForm() {
      this.$refs.filters.resetFields()
      this.getList()
    },
    //点击查看
    handleDec: function (index, row) {
      this.FormVisibleck = true;
      this.Form = Object.assign({}, row);
      _index = index;
      this.dialogStatus = "ckEquipment"
      this.addBtnshow = false
      this.editBtnshow = true
    },
    //点击编辑
    handleEdit: function (index, row) {
      this.FormVisible = true;
      this.Form = Object.assign({}, row);
      _index = index;
      this.dialogStatus = "editEquipment"
      this.addBtnshow = false
      this.editBtnshow = true
    },
    // 点击确定（编辑）  
    confirmEdit() {
      var editdata = _index;
      this.users[editdata].name = this.Form.name;
      this.users[editdata].carN = this.Form.carN;
      this.users[editdata].carnumber = this.Form.carnumber;
      this.users[editdata].types = this.Form.types;
      this.users[editdata].fxDj = this.Form.fxDj;
      this.users[editdata].sxms = this.Form.sxms;
      this.FormVisible = false;
    },
    //点击审核
    handleShenhe: function (index, row) {
      this.FormVisible2 = true;
      this.Form = Object.assign({}, row);
      _index = index;
      this.dialogStatus = "shenheEquipment"
      this.addBtnshow = false
      this.editBtnshow = true
    },
    // 点击确定（审核）  
    confirmShenhe() {
      var shenhedata = _index;
      //console.log(shenhedata);
      this.users[shenhedata].name = this.Form.name;
      this.users[shenhedata].carN = this.Form.carN;
      this.users[shenhedata].carnumber = this.Form.carnumber;
      this.users[shenhedata].types = this.Form.types;
      this.users[shenhedata].fxDj = this.Form.fxDj;
      this.users[shenhedata].sxms = this.Form.sxms;
      this.FormVisible2 = false;
    },
    //推送给所有人
    allPeople(){
      this.FormVisibleTS = true;
    },
    handleTs(){
      this.FormVisibleTS = false;
    },
     handleCancelTs(formName) {
      this.FormVisibleTS = false;
    },
    handleCloseTs(done) {
      this.FormVisibleTS = false;
    },
    //导出确定
    confirmDc() {
      this.FormVisibledc = false;
      window.open(_url);
      //window.open("../dongli/static/battery.doc");
     // window.open("../static/battery.doc");
    },
    confirmDr() {
      this.FormVisibledr = false;
    },

    //点击关闭dialog
    handleClose(done) {
      this.FormVisible = false;
      this.FormVisible2 = false;
      this.FormVisibledc = false;
      this.FormVisibledr = false;
      this.FormVisibleck = false;
      this.FormVisibledel = false;
      this.FormVisibleAlldel = false;
      this.FormVisibleTS = false;
      this.FormVisibleAllSh = false;
      this.FormVisibleCompare = false;
      
    },
    //点击取消
    handleCancel(formName) {
      this.FormVisible = false;
      this.FormVisible2 = false;
      this.FormVisibledc = false;
      this.FormVisibledr = false;
      this.FormVisibleck = false;
      this.FormVisibledel = false;
      this.FormVisibleAlldel = false;
      this.FormVisibleTS = false;
      this.FormVisibleAllSh = false;
      this.FormVisibleCompare = false;
    },
    //一键审核  
     //批量删除
    shenheAll: function () {
      this.FormVisibleAllSh = true;
      
    },
    handleShenhe2() {
      this.FormVisibleAllSh = false;
      if(this.multipleSelection.length == 0) {
        return false;
      }
      this.multipleSelection.forEach((item) => {
        this.users.remove(item);
      });
      
    },
    //对比
    compare(){
      this.FormVisibleCompare = true;
    },
    handleCompare(){
      this.FormVisibleCompare = false;
    },
    // handleShenhe2(index, row) {
    //   console.log(index, row);
    //   this.$confirm('确定一键审核选中的选项？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       // delete:row.splice(index, 1),
    //       type: 'success',
    //       message: '审核成功!',
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消审核'
    //     });
    //   });
    // },

    //导出
    handleEditC: function (index, row) {
      this.FormVisibledc = true;
      this.Form = Object.assign({}, row);
      _index = index;
      console.log(index);
      console.log(_index);

      this.dialogStatus = "daochuEquipment"
      this.DcBtnshow = true
    },
    handleEditR: function (index, row) {
      this.FormVisibledr = true;
      this.Form = Object.assign({}, row);
      _index = index;
      console.log(index);
      console.log(_index);

      this.dialogStatus = "daochuEquipment"
      this.DcBtnshow = true
    },
    //批量删除
    delAll: function () {
      this.FormVisibleAlldel = true;
      
    },
    //选中多选框实现自动加入待删除行对象的数组
    handleSelectionChange(val) {
      //下面这个表示选择的多选框都会被加到存放待删除行的行对象！
      this.multipleSelection = val;
      //当用户只要选择了任意个多选框，删除选中和取消选中按钮就会出现
      if (this.multipleSelection.length === 0) {
        //如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false;
      }
    },
    //切换选中状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    deleteFileOrDirectory() {
      this.FormVisibleAlldel = false;
      if(this.multipleSelection.length == 0) {
        return false;
      }
      this.multipleSelection.forEach((item) => {
        this.users.remove(item);
      });
      
    },
    // 删除  
    del: function (index, row) {
      this.FormVisibledel = true;
      this.Form = Object.assign({}, row);
      _index = index;
      
    },
    handleDelete: function (index) {
      this.FormVisibledel = false;
      
      this.users.splice(_index, 1);
      // this.Form = Object.assign({}, row);
      // _index = index;
      //this.users.splice(index, 1);
    },

    // handleDelete(index, row) {
    //   console.log(index, row);

    //   this.$confirm('是否继续?', {
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!',
    //       delete: row.splice(index, 1) 
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    drawLine1() {
      let myChart = this.$echarts.init(this.$refs.dyBox1);
      myChart.setOption({
        color: ['#2763B7', '#50BBFF'],
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          itemWidth: 24,
          itemHeight: 10,
          right: "3%",
          data: ['最高电压', '最低电压']
        },
        grid: {
          top: '23%',
          left: '9%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisLabel: {
            show: true,
            interval: 0,
            color: '#3E526F',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0"
            }
          },
         data:['1:14:00','1:16:00','1:18:00','6:33:59','6:35:00','6:36:00','6:38:00','6:40:00','6:42:00','6:44:00'],
        },
        yAxis: {
          type: 'value',
          min:3.2,
          name: '电压（N）',
          nameLocation: 'center',
          nameGap: 50,
          nameTextStyle: {
            fontSize: '14',
            color: '#3E526F',
            fontWeight: '400'
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A7C6E0",
              //type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0"
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: '#3E526F',
          },
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
            name: '最高电压',
            type: 'line',
            // symbol: 'none',          
             data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
          },
          {
            name: '最低电压',
            type: 'line',
            //symbol: 'none',           
            //data:[3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1,3.2, 3.1,3.8, 3.6]
            data: [3.32, 3.34, 3.33, 3.3, 3.31, 3.28, 3.29, 3.31, 3.3, 3.36]
          }
        ]
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    drawLine2() {
      let myChart = this.$echarts.init(this.$refs.dyBox2);
      myChart.setOption({
        color: ['#5255CF', '#D696FF'],
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          itemWidth: 24,
          itemHeight: 10,
          right: "3%",
          data: ['最高单压变化率', '最低单压变化率']
        },
        grid: {
          top: '23%',
          left: '9%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0,
            color: '#3E526F',
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0"
            }
          },
          axisTick: {
            show: false,
          },
           data:['1:14:00','1:16:00','1:18:00','6:33:59','6:35:00','6:36:00','6:38:00','6:40:00','6:42:00','6:44:00'],
        },
        yAxis: {
          type: 'value',
          min:3.2,
          name: '单压变化率（V/s）',
          nameLocation: 'center',
          nameGap: 50,
          nameTextStyle: {
            fontSize: '14',
            color: '#3E526F',
            fontWeight: '400'
          },
          axisLabel: {
            show: true,
            interval: 0,
            color: '#3E526F',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A7C6E0",
              //type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0"
            }
          },
          axisTick: {
            show: false,
          },
        },
        dataZoom: [{
          show: true,
          height: 4,
          xAxisIndex: [0],
          bottom: '5%',
          start: 10,
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
            name: '最高单压变化率',
            type: 'line',
            //symbol: 'none',          
            // data: [3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1, 3.2, 3.1, 3.8, 3.6]
            data: [3.38, 3.36, 3.35, 3.34, 3.39, 3.42, 3.41, 3.39, 3.38, 3.41]
          },
          {
            name: '最低单压变化率',
            type: 'line',
            // symbol: 'none',          
            //data:[3.2, 3.1, 3.3, 3.6, 4.1, 3.5, 3.3, 3.1,3.2, 3.1,3.8, 3.6]
            // data: [3.1, 3.2, 3.1, 3.2, 3.8, 3.0, 3.9, 3.8, 3.6, 3.7, 3.2, 3.1]
            data: [3.32, 3.34, 3.33, 3.3, 3.31, 3.28, 3.29, 3.31, 3.3, 3.36]
          }
        ]
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    open() {
      this.$nextTick(() => {
        //  执行echarts方法
        this.drawLine1();
        this.drawLine2();
      })
    }

  },
  mounted() {

  }
}
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
  width: 98%;
  margin: 0 auto;
  overflow: hidden;
}
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
.handle-box {
  margin: 10px auto;
  width: 100%;
  height: 76px;
  padding: 15px 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
   /deep/ .el-input--mini .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
  .box {
    width: 100%;
    margin: 0 auto;
    // margin-top: 10px;
    // padding-top: 10px;
    overflow: hidden;
    span {
       display: inline-block;
            // float: left;
      width: 70px;
      text-align: right;
      margin-right: 8px;
      color: #3f536e;
    }
  }
}
.el-form-item {
  margin-bottom: 0px;
}
/deep/.el-form-item__content {
  line-height: 32px;
  position: relative;
  font-size: 14px;
}
/deep/.el-form-item__label {
  text-align: left;
  vertical-align: bottom;
  float: left;
  font-size: 14px;
  color: #606266;
  height: 30px;
  line-height: 30px !important;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
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
.filIn {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  outline: 0;
  padding: 0 15px;
  width: 85%;
}
.listCon {
  margin: 10px auto;
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
  .shBtn {
    width: 104px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(35, 159, 255, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
  }
  .delBtn {
    margin-left: 8px;
    width: 104px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
  }
  .dcBtn {
    margin-left: 8px;
    width: 86px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
  }
   .drBtn {
    margin-left: 8px;
    width: 86px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    cursor: pointer;
  }
}
.ckbtn {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 147, 238, 1);
  cursor: pointer;
}
.delbtn {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #f56c6c;
  cursor: pointer;
}
.hrl {
  margin: 0 10px;
  width: 1px;
  height: 14px;
  color: rgba(233, 233, 233, 1);
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
.tcCon {
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  /deep/.el-input__inner {
    border: 1px solid transparent !important;
    font-size: 14px;
    color: rgba(62, 82, 111, 1);
    font-weight: 400;
  }
}
/deep/.el-form-item__label {
  text-align: left;
  font-size: 14px;
  color: rgba(62, 82, 111, 1);
  font-weight: bold;
}
.line {
  margin: 20px auto;
  border-bottom: 1px solid rgba(229, 238, 245, 1);
}
/deep/.el-textarea__inner {
  font-size: 14px;
  color: rgba(62, 82, 111, 1);
  font-weight: 400;
  padding: 5px 15px 5px 10px;
}
/deep/.el-radio {
  color: rgba(62, 82, 111, 1);
}
/deep/.el-dialog__title {
  line-height: 24px;
  font-size: 16px;
  color: rgba(62, 82, 111, 1);
  font-weight: bold;
}
.choseBtnold {
  position: absolute;
  z-index: 10;
  opacity: 0;
  right: 0;
  width: 65px;
}
.choseBtn {
  float: left;
  width: 65px;
  height: 30px;
  line-height: 30px;
  border-radius: 6px;
  text-align: center;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  cursor: pointer;
  position: relative;
}
/deep/.el-table {
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: #3f536e;
}
/deep/.el-table__header{
  width: 100% !important;
}
/deep/.el-table__body{
  width: 100% !important;
}
/deep/.el-table thead {
  // width: 100% !important;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #7791a7;
  font-weight: 500;
}
/deep/.el-table th {
  background-color: rgba(250, 250, 250, 1) !important;
}
/deep/.el-table td,
.el-table th {
  // padding: 12px 0;
  padding: 9px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}
/deep/.el-table__body tr > td:first-child {
  border-left: 2px solid transparent;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
  border-left: 2px solid #0093ee;
}
/deep/.el-table th > .cell {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  text-align: center;
  width: 100%;
}
.pagingtion-box {
  position: relative;
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
/deep/.header.nav .content .el-menu--horizontal > .el-menu-item.is-active {
  color: #fff !important;
}
/deep/.el-message-box__header {
  position: relative;
  padding: 15px 15px 10px;
  height: 29px;
  background: rgba(250, 251, 252, 1);
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
}
/deep/.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 28px;
  vertical-align: top;
}
/deep/.el-form--inline .el-form-item:nth-child(4) {
  display: inline-block;
  margin-right: 0;
  vertical-align: top;
}
/deep/.el-dialog__footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 10px 20px 10px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-checkbox__input {
  cursor: pointer;
  outline: 0;
  line-height: 0;
  vertical-align: middle;
}
// /deep/.el-dialog {
//   display: flex;
//   flex-direction: column;
//   margin: 0 !important;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /*height:600px;*/
//   max-height: calc(100% - 200px);
//   max-width: calc(100% - 30px);
// }
/deep/.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
/deep/.customWidth {
  width: 20% !important;
}
/deep/.customWidth2 {
  // width: 30% !important;
   width:480px;
}
/deep/.el-table .cell {
  img {
    margin-top: 2px;
  }
}
/deep/.el-form-item::after, .el-form-item::before{
  display: inline !important;
} 



/deep/.el-form-item::after, .el-form-item::before{
  display: inline !important;
} 
        /deep/.el-form-item__content::after, .el-form-item__content::before{
 display: inline !important;
} 
/deep/.el-form-item__content::after, .el-form-item__content::before{
 display: inline !important;
} 
/deep/.el-form-item__content::after, .el-form-item__content::before{
  display: inline !important;
}
.el-table__header{
  width: 100% !important;
}
.el-table__body{
  width: 100% !important;
}
/deep/.el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 20px;
    vertical-align: top;
}
.zhenduan{
  /deep/.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #A8C6DF;
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
}
.shmiaoshu{
  /deep/.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #A8C6DF;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
}
// .lend{
//   position: relative;
//   width: 100%;
//   .lendTip{
//         position:absolute;
//         right: 13.5%;
//         top: 20px;
//         display: flex;
//         justify-content: flex-end;
//         .lvsy{
//             width: 100%;
//            display: flex;
//            justify-content: center;
//            align-items: center;
//            font-size:14px;
//             font-family:Microsoft YaHei;
//             font-weight:400;
//            color: #3E526F;
//            .lv{
//                margin-right: 10px;
//               width: 24px;
//                height: 10px;
//                background-image: url(../assets/images/zuigao.png);
//            }  
//         }
//         .lgy{
//             margin-left: 20px;
//             width: 100%;
//            display: flex;
//            justify-content: center;
//            align-items: center; 
//            font-size:14px;
//             font-family:Microsoft YaHei;
//             font-weight:400;
//            color: #3E526F; 
//            .lan{
//                margin-right: 10px;
//                width: 24px;
//                height: 10px;
//                background-image: url(../assets/images/zuidi.png);
//            } 
//         }
//   }
// }
</style>