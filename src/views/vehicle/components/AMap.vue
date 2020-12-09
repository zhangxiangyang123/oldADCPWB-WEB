<template>
  <div class="container"></div>
</template>

<script>
import AMap from "AMap";
const TYPE = {
  1: require("../image/m_1.png"),
  2: require("../image/m_2.png"),
  3: require("../image/m_3.png"),
  4: require("../image/m_4.png"),
  5: require("../image/m_5.png"),
};

export default {
  props: {
    zoom: {
      type: Number,
      default: 5,
    },
    marker: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      this.map = new AMap.Map(this.$el, {
        resizeEnable: true,
        zoom: this.zoom,
        center: [108, 34],
      });
      this.map.setZoomAndCenter(this.zoom, this.marker[0].position);
      this.type === 1 ? this.addMapMarker() : this.addMapCarMarker();
    },
    // 全国车型标记
    addMapMarker() {
      this.map.clearMap();
      this.marker.forEach(({ position, city }) => {
        let marker = new AMap.Marker({
          position: position,
          content: "<div class='IMarker'></div>",
        });
        marker.setLabel({
          offset: new AMap.Pixel(10, 10), //设置文本标注偏移量
          content: `<div class='IMarker-label'><span class='city'>${city}</span><span>290辆</span></div>`, //设置文本标注内容
          direction: "right", //设置文本标注方位
        });
        marker.on("click", this.bindClick);
        marker.on("mouseover", this.bindMouseover);
        marker.on("mouseout", this.bindMouseout);
        //let _this =this;
        this.map.add(marker);
      });
    },
    // 省份车辆海量点标记
    addMapCarMarker() {
      this.map.clearMap();
      this.marker.forEach(({ position, icon }) => {
        let marker = new AMap.Marker({
          icon: TYPE[icon],
          position: position,
        });
        marker.on("click", this.bindClick);
        this.map.add(marker);
      });
    },
    bindClick(...args) {
      this.$emit("on-marker-click", ...args);
    },
    bindMouseover(...args) {
      this.$emit("on-marker-mouseover", ...args);
    },
    bindMouseout(...args) {
      this.$emit("on-marker-mouseout", ...args);
    },
    /**
     * inglat []
     */
    lnglat2pixel(value) {
      if (!lnglat.length) return;
      let zoom = this.map.getZoom();
      let lnglat = new AMap.LngLat(value[0], value[1]);
      let pixel = this.map.lngLatToPixel(lnglat, zoom);
      pixel.x = parseInt(pixel.x);
      pixel.y = parseInt(pixel.y);
      return pixel;
    },
  },
  watch: {
    type() {
      if (!this.map) return;
      this.map.setZoomAndCenter(this.zoom, this.marker[0].position);
      this.type === 1 ? this.addMapMarker() : this.addMapCarMarker();
    },
  },
  beforeDestroy() {
    this.map.destroy();
  },
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: calc(100vh - 54px);
  .amap-marker-label {
    border: none;
    background: transparent;
    padding: 0px;
  }
}

.IMarker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 4px solid #fff;
  background-color: #0068fe;
  box-shadow: 0 0 20px rgba(0, 104, 254, 1);
  &-label {
    padding: 0 10px;
    font-size: 12px;
    font-weight: 500;
    height: 28px;
    background: rgba(66, 66, 66, 0.8);
    border-radius: 6px;
    line-height: 28px;
    color: #ffffff;
    .city {
      margin-right: 6px;
    }
  }
}
</style>
