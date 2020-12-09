<template>
  <div class="search" :class="{open: show}">
    <div class="search-title">车辆查询</div>
    <div class="search-input">
      <el-input v-model="value" placeholder="请输入" @keydown.enter.native="e => handleChange(e)">
        <i slot="suffix" class="el-input__icon el-icon-search" />
      </el-input>
    </div>
    <div class="tree">
      <!-- @node-expand="handleNodeExpand" -->
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      />
    </div>
    <button @click="show = !show" class="search-fixed-button" />
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      value: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      show: true,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("on-search", e.target.value);
    },
    handleNodeClick(...args) {
      this.$emit("on-tree-node-click", ...args);
    },
    // handleNodeExpand(...args) {
    //   this.$emit("on-tree-node-expand", ...args)
    // },
    //          <i class="el-icon el-icon-folder-opened"></i>

    renderContent(h, { node, data, store }) {
      return (
        <span>
          <img src="./static/icon_file.png" />
          <span class="el-tree-node__label"> {node.label}</span>
        </span>
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 240px;
  background: rgba(254, 254, 254, 1);
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(217, 222, 233, 1);
  box-sizing: border-box;
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  z-index: 100;
  transform: translate(-100%);
  transition: 0.3s transform;
  &.open {
    transform: translateX(0);
  }
  &-title {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    background: rgba(247, 247, 247, 1);
    border-bottom: 1px solid rgba(228, 228, 228, 1);
    font-size: 14px;
    font-weight: bold;
    color: rgba(17, 15, 36, 1);
    line-height: 42px;
    padding-left: 10px;
  }
  &-input {
    background: rgba(250, 251, 252, 1);
    padding: 12px 10px;
    >>> {
      .el-input__inner,
      .el-input__icon {
        height: 35px;
        line-height: 35px;
        color: rgba(141, 171, 196, 1);
      }
      .el-input__inner {
        font-weight: 400;
        line-height: 24px;
        border: 1px solid rgba(197, 217, 232, 1);
        &::-webkit-input-placeholder {
          color: rgba(141, 171, 196, 1);
        }
      }
    }
  }
  &-fixed-button {
    width: 14px;
    height: 54px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.09);
    border-radius: 0px 5px 5px 0px;
    border: 1px solid rgba(217, 222, 233, 1);
    box-sizing: border-box;
    position: absolute;
    right: -14px;
    top: 310px;
    cursor: pointer;
    &::before {
      content: "";
      border: 4px solid transparent;
      border-left-color: #239fff;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(4px, -50%);
    }
  }
}
.tree {
  padding: 0 10px;
  overflow-y: auto;
  >>> {
    .el-tree-node__content {
      height: 44px;
      &:hover {
        background: rgba(236, 245, 253, 1);
      }
    }
    .el-icon {
      color: #0091f1;
      margin-right: 8px;
    }
    .el-tree-node__label {
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    // .el-tree-node:focus {
    //   .el-tree-node__content {
    //     background: rgba(236, 245, 253, 1);
    //   }
    // }
    // .el-tree--highlight-current
    //   .el-tree-node.is-current
    //   > .el-tree-node__content {
    //   background: rgba(236, 245, 253, 1);
    // }
  }
}
</style>
