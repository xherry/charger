<template>
  <div class="overview flex rz mt50">
    <div class="overLeft">
      <p>Overview</p>
      <div
        :class="[
          navSeleted == item.id ? 'ol-item1' : 'ol-item2',
          'flex',
          'flex-Updown-between',
        ]"
        @click="navSeleted = item.id"
        v-for="item in navs"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
        <img
          class="ml27"
          :src="navSeleted == item.id ? item.seletImg : item.img"
          alt=""
        />
      </div>
    </div>
    <!-- <div v-if="navSeleted == 1">
      <div class="overRight">
        <p class="ortoptit">Charger Network</p>
        <div class="flex">
          <div>
            <p class="tits">No. of charger available :</p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/04.png" alt="" />
              <span>more than 5</span>
            </p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/03.png" alt="" />
              <span>more than 5</span>
            </p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/01.png" alt="" />
              <span>more than 5</span>
            </p>
          </div>
          <div id="main" class="world"></div>
        </div>
      </div>
    </div> -->
    <div >
      <own-charg></own-charg>
    </div>
  </div>
</template>

<script>
import { findBYN } from "../common/api";
import echarts from "echarts";
import "../common/world";
import ownCharg from "./overview/ownCharg";
export default {
  name: "overview",
  components: {
    ownCharg,
  },
  data() {
    return {
      navSeleted: 2,
      navs: [
        // {
        //   name: "Charger Network",
        //   seletImg: require("../assets/index/overview/07.png"),
        //   img: require("../assets/index/says/08.png"),
        //   id: 1,
        // },
        {
          name: "Charger Network",
          img: require("../assets/index/overview/02.png"),
          seletImg: require("../assets/index/says/01.png"),
          id: 2,
        },
      ],
    };
  },
  mounted() {
    // this.intWord();
    this.getSixData();
  },
  methods: {
    // 查询六个地区下充电桩等信息
    getSixData() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      findBYN(data).then((res) => {
        console.log("查询六个地区下充电桩等信息", res);
      });
    },
    //
    // intWord() {
    //   var myChart = echarts.init(document.getElementById("main"));
    //   // 假数据 模拟数据
    //   var geoCoordMap = {
    //     北京: [116.404184, 39.914578],
    //     香港邦泰: [114.195466, 22.282751],
    //     fads: [110.2, 32.5],
    //   };
    //   var BJData = [
    //     [
    //       {
    //         name: "北京",
    //         value: 2,
    //       },
    //     ],
    //     [
    //       {
    //         name: "香港邦泰",
    //         value: 5,
    //       },
    //     ],
    //     [
    //       {
    //         name: "fads",
    //         value: 4,
    //       },
    //     ],
    //   ];
    //   var series = [];
    //   [["北京", BJData]].forEach(function (item, i) {
    //     series.push({
    //       type: "effectScatter",
    //       coordinateSystem: "geo",
    //       zlevel: 2,
    //       rippleEffect: {
    //         //涟漪特效
    //         period: 4, //动画时间，值越小速度越快
    //         brushType: "stroke", //波纹绘制方式 stroke, fill
    //         scale: 2, //波纹圆环最大限制，值越大波纹越大
    //       },
    //       symbol: "circle",
    //       symbolSize: function (val) {
    //         return 10; //圆环大小
    //       },
    //       itemStyle: {
    //         normal: {
    //           show: false,
    //           color: "yellow",
    //         },
    //       },
    //       data: item[1].map(function (dataItem) {
    //         return {
    //           name: dataItem[0].name,
    //           value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
    //         };
    //       }),
    //     });
    //   });

    //   myChart.setOption({
    //     backgroundColor: "transparent",
    //     visualMap: {
    //       //图例值控制
    //       min: 0,
    //       max: 5,
    //       calculable: false,
    //       show: false,
    //       color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
    //       textStyle: {
    //         color: "#fff",
    //       },
    //     },
    //     geo: {
    //       map: "world",
    //       label: {
    //         emphasis: {
    //           show: false,
    //         },
    //       },
    //       roam: true, //是否允许缩放
    //       layoutCenter: ["50%", "50%"], //地图位置
    //       layoutSize: "130%",
    //       itemStyle: {
    //         normal: {
    //           color: "#2f5fe9", //地图背景色
    //           borderColor: "rgba(0, 0, 0, 0)", //省市边界线
    //         },
    //         emphasis: {
    //           color: "#2f5fe9", //悬浮背景
    //         },
    //       },
    //     },
    //     series: series,
    //   });
    // },
  },
};
</script>

<style scoped>
.world {
  height: 700px;
  width: 1128px;
  margin-top: 70px;
}
.tits {
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 37px;
}
.icons {
  font-size: 20px;
  margin-bottom: 25px;
}
.icons > img {
  width: 24px;
  height: 24px;
  margin-right: 24px;
}
</style>
