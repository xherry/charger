<template>
  <div class="Detailed">
    <div class="chargerTop flex flex-center">
      <div class="ct-item flex flex-Updown-between" @click="isShowSlete = !isShowSlete">
        <span>Centre</span>
        <div class="seleter flex flex-Updown-between">
          <p>{{ ctypes.value }}</p>
          <img
            :style="{ transform: `rotate(${isShowSlete ? '-180' : '0'}deg)` }"
            src="../../assets/index/says/02.png"
            alt=""
          />
        </div>
        <div class="seleterBody" :style="{ height: isShowSlete ? '200px' : '0px' }">
          <div
            class="button seleter_item"
            v-for="(item, index) in centerType"
            :key="index"
            @click="seleteCenter(item)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" v-model="Location" placeholder="wherehere " />
      </div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Charge No.</p></li>
          <li><p>Status</p></li>
          <li><p>EV Type</p></li>
          <li><p>Vehicle No</p></li>
          <li>
            <div>
              <p>Charging Time</p>
              <p>(HOUR)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Energy</p>
              <p>(kw/h)</p>
            </div>
          </li>
          <li><p>Charging Voltage</p></li>
          <li>
            <div>
              <p>Charging Current</p>
              <p>(A)</p>
            </div>
          </li>
        </ul>
        <template v-if="chargerInfoList.length != 0">
          <ul
            class="uldatas w100"
            v-for="(item, index) in chargerInfoList"
            :key="index"
          >
            <li><p>SSPO-001</p></li>
            <li>
              <p>Charging</p>
            </li>
            <li>
              <p>ASD</p>
            </li>
            <li>
              <p>ASD1256</p>
            </li>
            <li>
              <p>2:16</p>
            </li>
            <li>
              <p>26</p>
            </li>
            <li>
              <p>26P</p>
            </li>
            <li>
              <p>53</p>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="uldatas w100">
            <li><p>暂无数据！</p></li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { findByDetails } from "../../common/api";
export default {
  name: "Detailed",
  data() {
    return {
      Location: "",
      isShowSlete: false,
      chargerInfoList: [],
      count: 0,
      ctypes: {
        centreId: "",
        value: "",
      },
      centerType: [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung HoM HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
      ],
    };
  },
  created() {},
  mounted() {
    this.getCCECDetail();
  },
  methods: {
    getCCECDetail() {
      let data = {
        userId: localStorage.getItem("userId"),
        centre: this.ctypes.centreId,
        location: this.Location,
      };
      findByDetails(data).then((res) => {
        console.log("查询充电桩的实时数据", res);
        if (res.code == 100) {
          this.chargerInfoList = res.extend.chargerInfoList;
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.uldatas img {
  width: 25px;
  height: 25px;
}
.urtable {
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.urtable > ul {
  box-sizing: border-box;
}
.overRights {
  height: 714px;
  margin-top: 32px;
}
.chargerTop {
  width: 100%;
}
.seleterBody {
  width: 250px;
}
.seleter,
.ct-item input {
  width: 250px;
  height: 38px;
  padding: 0 24px 0 15px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
}
.ct-item input {
  background: transparent;
  outline: none;
}
.seleter > img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}

.ct-item {
  margin-right: 60px;
  position: relative;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
</style>
