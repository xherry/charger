<template>
  <div class="Summary">
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <div class="flex SummaryTable Yauto">
        <div class="SummaryTable-left">
          <div class="firstitem"></div>
          <p class="slItem" v-for="(item, index) in leftTable1" :key="index + '1'">
            {{ item.name }}
          </p>
          <div style="height: 10px"></div>
          <p class="slItem" v-for="(item, index) in leftTable2" :key="index + '2'">
            {{ item.name }}
          </p>
          <div style="height: 10px"></div>
          <p class="slItem" v-for="(item, index) in leftTable3" :key="index + '3'">
            {{ item.name }}
          </p>
        </div>
        <div class="SummaryTable-right">
          <p class="srtit">Centre</p>
          <ul class="srul-top srul">
            <li
              v-for="item in utits"
              :class="[seleteUtits === item.value ? 'seleteUtits' : '']"
              :key="item.value"
              @dblclick="toDetails(item.cid)"
              @click="seleteCenters(item.value)"
            >
              <p>{{ item.value }}</p>
            </li>
          </ul>
          <ul
            class="srul-main srul"
            v-for="(item, index) in leftTable1"
            :key="index + '4s'"
          >
            <li v-for="(p, i) in item.value" :key="'pp' + i">
              <p>{{ p }}</p>
            </li>
          </ul>
          <div style="height: 10px"></div>
          <ul
            class="srul-main srul"
            v-for="(item, index) in leftTable2"
            :key="index + '5'"
          >
            <li v-for="(p, i) in item.value" :key="'pp' + i">
              <p>{{ p }}</p>
            </li>
          </ul>
          <div style="height: 10px"></div>
          <ul
            class="srul-main srul"
            v-for="(item, index) in leftTable3"
            :key="index + '6'"
          >
            <li v-for="(p, i) in item.value" :key="'pp' + i">
              <p>{{ p }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CDFindById, CDFindAll, findBYN } from "../../common/api";
export default {
  name: "Summary",
  data() {
    return {
      utits: [
        { centreId: 0, value: "Sha Tin", cid: "CLP3301" },
        { centreId: 1, value: "Hung Hom", cid: "CLP2101" },
        { centreId: 2, value: "Sham Shui Po", cid: "CLP2201" },
        { centreId: 3, value: "Tsing Yi", cid: "CLP3801" },
        { centreId: 4, value: "Yuen Long", cid: "CLP3701" },
        { centreId: 5, value: "Shek Wu Hui", cid: "CLP3101" },
      ],
      seleteUtits: "",
      leftTable1: [
        { name: "Available", value: [] },
        { name: "In Use", value: [] },
        { name: "Out of Service", value: [] },
        { name: "Total", value: [] },
      ],
      leftTable2: [
        { name: "Total No. of Charging", value: [] },
        { name: "Total Charging Time (Hour)", value: [] },
        { name: "Total Charging Energy (kWh)", value: [] },
        { name: "Estimated Carbon Saving", value: [] },
      ],
      leftTable3: [
        { name: "Average Charging Time", value: [] },
        { name: "Average Charging Energy (kWh)", value: [] },
      ],
      sixDatas: {},
    };
  },
  created() {
    this.getSixDatas();
  },
  methods: {
    toDetails(cid) {
      this.$router.push({ path: "Detailed", query: { cid: cid } });
    },
    seleteCenters(value) {
      this.seleteUtits = value;
    },
    getVal2(val) {
      if (val) {
        if (val == 0) {
          val = 0;
        } else {
          val = Number(val).toFixed(2);
        }
        return val;
      } else {
        return "";
      }
    },
    // 获取查询六个地区下充电桩等信息
    getSixDatas() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background: "rgba(0,0,0,.5)",
      });
      findBYN(data)
        .then((res) => {
          // console.log("获取查询六个地区下充电桩等信息", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            let sixDatas = res.extend;
            // this.sixDatas = res.extend;
            let objDatas = [
              sixDatas.hh || {},
              sixDatas.s || {},
              sixDatas.ssp || {},
              sixDatas.swh || {},
              sixDatas.ty || {},
              sixDatas.yl || {},
            ];
            // console.log(objDatas);
            this.leftTable1[0].value = objDatas.map((item) =>
              item.available ? item.available : " "
            );
            this.leftTable1[1].value = objDatas.map((item) =>
              item.inuse ? item.inuse : " "
            );
            this.leftTable1[2].value = objDatas.map((item) =>
              item.outofservice ? item.outofservice : " "
            );
            this.leftTable1[3].value = objDatas.map((item) =>
              item.total ? item.total : " "
            );
            this.leftTable2[0].value = objDatas.map((item) =>
              this.getVal2(item.totalofcharging)
            );
            this.leftTable2[1].value = objDatas.map((item) =>
              this.getVal2(item.totalchargingtime)
            );
            this.leftTable2[2].value = objDatas.map((item) =>
              this.getVal2(item.totalchargingenergy)
            );
            this.leftTable2[3].value = objDatas.map((item) =>
              this.getVal2(item.estimatedcarbonsaving)
            );
            this.leftTable3[0].value = objDatas.map((item) =>
              this.getVal2(item.averagechargingtime)
            );
            this.leftTable3[1].value = objDatas.map((item) =>
              this.getVal2(item.averagechargingenergy)
            );
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
  },
};
</script>

<style scoped>
.seleteUtits {
  box-shadow: inset 0 0 10px #ffffff;
}
.srul-main {
  background: transparent;
  border-top: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
  height: 54px;
}
.srul-main:first-of-type {
  border-top: none;
}
.srul-main:last-of-type {
  border-bottom: none;
}
.srul > li {
  border-right: 1px solid #205cbf;
}
.srul > li:last-child {
  border-right: none;
}
.SummaryTable-right {
  width: 1145px;
}
.srtit {
  font-size: 14px;
  width: 100%;
  text-align: center;
  border-left: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
  background: #0d264e;
  height: 26px;
  line-height: 26px;
}

.srul-top {
  border-left: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
  background: #0d264e;
  height: 52px;
  width: 100%;
}
.SummaryTable-left .div {
  width: 100%;
}
.SummaryTable-left {
  width: 23%;
}
.slItem:first-of-type {
  border-top: none;
}
.slItem {
  height: 54px;
  background: #0d264e;
  font-size: 18px;
  line-height: 54px;
  padding-left: 20px;
  box-sizing: border-box;
  border-top: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
  border-right: 1px solid #205cbf;
}
.slItem:last-of-type {
  border-bottom: none;
}
.firstitem {
  height: 78px;
  border-bottom: 1px solid #205cbf;
}
.SummaryTable {
  width: 1406px;
  border: 2px solid #205cbf;
  margin-top: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
}
.overRights {
  height: 800px;
  margin-top: 60px;
}
</style>
