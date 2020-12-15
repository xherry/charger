<template>
  <div class="UptodateStatus">
    <button v-if="isToDetail" class="button goback" @click="isToDetail = false">返回</button>
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <!-- 数据 -->
      <template v-if="!isToDetail">
        <div class="ustable">
          <ul class="ustabletit">
            <li>
              <p>Centre</p>
            </li>
            <li>
              <p>Total Charging Time(h)</p>
            </li>
            <li>
              <p>Total Charging Time(ts)</p>
            </li>
            <li>
              <p>Total Charging Energy(kW/h)</p>
            </li>
            <li>
              <p>Detail</p>
            </li>
          </ul>
          <ul class="ustablemain" v-for="(item, index) in centerType" :key="index">
            <li>
              <p>{{ item.value }}</p>
            </li>
            <li>
              <p></p>
            </li>
            <li>
              <p></p>
            </li>
            <li>
              <p></p>
            </li>
            <li>
              <p><button class="button sees" @click="seeDetails(item)">查看</button></p>
            </li>
          </ul>
        </div>
      </template>
      <!-- 详情 -->
      <template v-else>
        <div class="ustable ">
          <ul class="ustabletit">
            <li>
              <p>Charger No.</p>
            </li>
            <li>
              <p>Total Charging Time(h)</p>
            </li>
            <li>
              <p>Total Charging Time(ts)</p>
            </li>
            <li>
              <p>Total Charging Energy(kW/h)</p>
            </li>
          </ul>
          <div class="udetails">
            <ul class="ustablemain" v-for="(item, index) in cdetails" :key="index + 'k'">
              <li>
                <p>{{ item.cno }}</p>
              </li>
              <li>
                <p>{{ item.h }}</p>
              </li>
              <li>
                <p>{{ item.ts }}</p>
              </li>
              <li>
                <p>{{ item.kwh }}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "UptodateStatus",
  data() {
    return {
      isToDetail: false,
      centerType: [
        { centreId: 0, value: "Hung Hom" },
        { centreId: 1, value: "Satin" },
        { centreId: 2, value: "Sham Shui Po" },
        { centreId: 3, value: "Tsing Yi" },
        { centreId: 4, value: "Yuen Long" },
      ],
      cdetails: [
        { h: "", ts: "", kwh: "", cno: "SSP001" },
        { h: "", ts: "", kwh: "", cno: "SSP002" },
        { h: "", ts: "", kwh: "", cno: "SSP003" },
        { h: "", ts: "", kwh: "", cno: "SSP004" },
        { h: "", ts: "", kwh: "", cno: "SSP005" },
        { h: "", ts: "", kwh: "", cno: "SSP006" },
        { h: "", ts: "", kwh: "", cno: "SSP007" },
        { h: "", ts: "", kwh: "", cno: "SSP008" },
        { h: "", ts: "", kwh: "", cno: "SSP009" },
        { h: "", ts: "", kwh: "", cno: "SSP010" },
        { h: "", ts: "", kwh: "", cno: "SSP011" },
        { h: "", ts: "", kwh: "", cno: "SSP012" },
      ],
    };
  },
  methods: {
    seeDetails(value) {
      console.log(value);
      this.isToDetail = true;
    },
  },
};
</script>

<style scoped>
.udetails{
  height: 620px;
  overflow-y: auto;
}
.goback {
  width: 80px;
  height: 30px;
  color: #ffffff;
  font-size: 16px;
  outline: 0;
  border: 0;
  background:  rgb(32 93 193);
  position: absolute;
  top: 40px;
  left: 55px;
  border-radius: 5px;
}
.UptodateStatus {
  position: relative;
}
.sees {
  width: 85px;
  height: 32px;
  /* line-height: 40px; */
  font-size: 16px;
  outline: 0;
  border: 0;
  background: rgb(32 93 193);
  color: #ffffff;
  border-radius: 5px;
}
.ortoptit {
  line-height: 55px;
}
.ustabletit {
  background: #0d264e;
}
.ustablemain {
  background: transparent;
}
.ustable ul {
  border-bottom: 2px solid #205cbf;
}
.ustable ul:last-child {
  border-bottom: none;
}
.ustable li {
  border-right: 2px solid #205cbf;
}
.ustable li:last-child {
  border-right: none;
}
.overRights {
  margin-top: 53px;
  height: 810px;
}
.ustable {
  width: 1406px;
  /* height: 677px; */
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
}
</style>
