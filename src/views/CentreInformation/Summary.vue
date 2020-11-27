<template>
  <div class="Summary">
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <div class="flex SummaryTable Yauto">
        <div class="SummaryTable-left">
          <div class="firstitem"></div>
          <p class="slItem" v-for="(item, index) in leftTable1" :key="index">{{ item }}</p>
          <div style="height: 10px"></div>
          <p class="slItem" v-for="(item, index) in leftTable2" :key="index">{{ item }}</p>
          <div style="height: 10px"></div>
          <p class="slItem" v-for="(item, index) in leftTable3" :key="index">{{ item }}</p>
        </div>
        <div class="SummaryTable-right">
          <p class="srtit">centre</p>
          <ul class="srul-top srul">
            <li><p>Hung Hom</p></li>
            <li><p>Satin</p></li>
            <li>
              <p>Sham</p>
              <p>Shui Po</p>
            </li>
            <li>
              <p>Shek</p>
              <p>Wu Hui</p>
            </li>
            <li>
              <p>Tsing Yi</p>
            </li>
            <li>
              <p>Yuen</p>
              <p>Long</p>
            </li>
          </ul>
          <ul class="srul-main srul" v-for="item in 4" :key="item">
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
          </ul>
          <div style="height: 10px"></div>
          <ul class="srul-main srul" v-for="item in 4" :key="item">
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
          </ul>
          <div style="height: 10px"></div>
          <ul class="srul-main srul" v-for="item in 2" :key="item">
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
            <li><p></p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summary",
  data() {
    return {
      leftTable1: ["Available", "In Use", "Out of Service", "Total"],
      leftTable2: ["Total No. of Charging", "Total Charging Time", "Total Charging Energy", "Estimated Carbon Sav ing"],
      leftTable3: ["Average Charging Time", "Average Charging Energy"],
    };
  },
};
</script>

<style scoped>
.srul-main {
  background: transparent;
  border-top: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
  height: 54px;
}
.srul-main:first-of-type{
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
  width: 1145px;
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
}
.SummaryTable-left .div {
  width: 100%;
}
.SummaryTable-left {
  width: 261px;
}
.slItem:first-of-type{
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
