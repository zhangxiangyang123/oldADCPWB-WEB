
<template>
  <div class="header">
    <div class="content">
      <div class="logo">
        动力电池安全预警平台
      </div>
      <ul>
        <li style="width:80px; border-left: none;" :class="{active:active == 1}">
          <router-link :to="{path: '/home'}">首页</router-link>
          <hr>
        </li>
        <li :class="{active:active == 2}">
          <router-link :to="{path: '/battery'}">电池预警</router-link>
          <hr>
        </li>
        <li :class="{active:active == 3}">
          <router-link :to="{path: '/portrait'}">电池画像</router-link>
          <hr>
        </li>
        <li :class="{active:active == 4}">
          <router-link :to="{path: '/failure'}">故障统计</router-link>
          <hr>
        </li>
        <li :class="{active:active == 5}">
          <router-link :to="{path: '/historical'}">历史溯源</router-link>
          <hr>
        </li>
        <li :class="{active:active == 6}">
          <router-link :to="{path: '/system'}">系统管理</router-link>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
  
  },
}
</script>

<style lang='less' scoped>
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
.header {
  width: 100%;
  height: 57px;
  background-image: url(../assets/images/header.png);
  background-size: 100% 100%;
  background-position: top center;
  font-family: SourceHanSansCN,微软雅黑;
  font-weight: 400;
  color: rgba(51,51,51,1);
  .content {
    width: 100%;
    // min-width: 1200px;
    height: 57px;
    margin: 0 auto;
     position: relative;
    .logo {
      float: left;
      margin-left: 28px;
      width: 22%;
      height: 57px;
       line-height: 35px;
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
    ul {
     margin: 0 auto;
      // float: left;
      position: absolute;
      left: 50%;
      margin-left: -334px;
      width: 668px;
      height: 57px;
      display: block;
      li {
        float: left;
        list-style: none;
        width: 100px;
        margin-top: 10px;
        text-align: center;
        // border-left: 1px solid rgba(148,216,237,1);
        background: url(../assets/images/icon_fig.png) no-repeat right center;
        a {
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(173,225,249,0.6) !important;
          text-decoration: none;
           display: block;
        }
        
        hr {
          width: 44px;
          height: 4px;
          border: none;
          background:rgba(207,247,253,1);
          position: relative;
          top: 12px;
          margin: 0 auto;
          visibility: hidden;
        }
      }
       li:last-child{
          background: none;
       }
      .active {
         background: transparent;
        a{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(207,247,253,1)!important;
        }
        hr {
          visibility: visible !important;
        }
      }
    }
  }
}
</style>