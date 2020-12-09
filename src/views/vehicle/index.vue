<template>
  <div>
    <Top :active="2" />
    <div class="container">
      <Search :treeData="treeData" @on-search="onSearch" @on-tree-node-click="handleClick" />
      <AMap
        :marker="marker"
        :zoom="zoom"
        :type="type"
        @on-marker-click="onMarkerClick"
        @on-marker-mouseover="onMarkerMouseover"
        @on-marker-mouseout="onMarkerMouseout"
      />
      <MiniMap :show="showMiniMap" @on-close="onClose" />
      <Dashboard :fixed="true" />
      <Dashboard :move="true" :x="x" :y="y" :show="show" />
    </div>
  </div>
</template>

<script>
import Top from "@/components/top";
import Search from "./components/Search";
import AMap from "./components/AMap";
import MiniMap from "./components/MiniMap";
import Dashboard from "./components/Dashboard";

import markers from "./mock/marker";
import CarMarkers from "./mock/car";
import { treeData } from "./mock/index.js";
export default {
  components: {
    Top,
    Search,
    AMap,
    MiniMap,
    Dashboard,
  },
  data() {
    return {
      marker: [],
      zoom: 5,
      type: 1,
      showMiniMap: false,
      treeData,
      x: 0,
      y: 0,
      show: true,
    };
  },
  created() {
    this.handleExpand();
  },
  methods: {
    onSearch(value) {
      this.treeData = treeData.filter((item) =>
        value ? item.label.includes(value) : true
      );
    },
    handleClick(data, node) {
      if (data.type === 1) {
        this.handleExpand();
        return;
      }
      this.zoom = 16;
      this.marker = CarMarkers;
      this.type = 2;
    },
    handleExpand() {
      this.zoom = 5;
      this.marker = markers;
      this.type = 1;
    },
    onMarkerClick(e) {
      if (this.type === 2) {
        this.showMiniMap = true;
      }
    },
    onMarkerMouseover(e) {
      if (this.type === 1) {
        const { x, y } = e.pixel;
        this.x = x;
        this.y = y;
        this.show = true;
      }
    },
    onMarkerMouseout() {
      this.show = false;
    },
    onClose() {
      this.showMiniMap = false;
    },
  },
};
</script>
