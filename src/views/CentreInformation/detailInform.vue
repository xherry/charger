<template>
  <div class="">
    <div class="chargerTop flex flex-Updown">
      <div class="ct-item flex flex-Updown-between" @click="isShowSlete = !isShowSlete">
        <span>Centre</span>
        <div class="seleter flex flex-Updown-between p15">
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
            v-for="(item, index) in $store.state.centerType"
            :key="index"
            @click="seleteCenter(item, 1)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="ct-item flex flex-Updown-between" @click="seleteCharger">
        <span>Charger NO.</span>
        <div class="seleter flex flex-Updown-between p15">
          <p>{{ chargers.value }}</p>
          <img
            :style="{ transform: `rotate(${isShowSlete1 ? '-180' : '0'}deg)` }"
            src="../../assets/index/says/02.png"
            alt=""
          />
        </div>
        <div
          class="seleterBody"
          :class="[isShowSlete1 ? 'h200' : 'h0', 'box']"
          v-infinite-scroll="loadMore"
          infinite-scroll-immediate="false"
        >
          <div
            class="button seleter_item"
            v-for="(item, index) in chargers.list"
            :key="index"
            @click="seleteCenter(item, 2)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="or ct-item flex flex-Updown-between"><span>or</span></div>
      <div class="ct-item flex flex-Updown-between">
        <span>Vehicle No.</span>
        <div class="seleter flex flex-Updown-between">
          <input
            type="text"
            @blur="getValue"
            placeholder="Vehicle No."
            v-model="Vehicle"
          />
        </div>
      </div>
    </div>
    <div class="chargerBottom overRights">
      <p class="ortoptit">Control Individual EV Charger</p>
      <div class="cartsCenter">
        <img class="childAll" src="../../assets/index/says/07.png" alt="" />
      </div>
      <div class="dialog01">
        <div class="cartword">
          <p class="diaName">Mileage after Charge（km）</p>
          <p class="diaValue">
            {{ chargerInfo.mileagetravelled | value2 }}
            {{ chargerInfo.mileagetravelled ? "km" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog02">
        <div class="cartword">
          <p class="diaName">Charging Time</p>
          <p class="diaValue">
            {{chargerInfo.chargingtime | ctVal }}
            <!-- {{ chargerInfo.chargingtime | value2 }}
            {{ chargerInfo.chargingtime ? "min" : "" }} -->
          </p>
        </div>
      </div>
      <div class="dialog03">
        <div class="cartword">
          <p class="diaName">Charging Energy（kWh）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingenergy | value2 }}
            {{ chargerInfo.chargingenergy ? "kwh" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog04">
        <div class="cartword">
          <p class="diaName">Charging Voltage（V）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingvoltage }}
            {{ chargerInfo.chargingvoltage ? "V" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog05">
        <div class="cartword">
          <p class="diaName">Battery Capacity（%）</p>
          <p class="diaValue">
            {{ chargerInfo.batterycapacity | value2 }}
            {{ chargerInfo.batterycapacity ? "%" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog06">
        <div class="cartword">
          <p class="diaName">Charging Current（A）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingcurrent | value2 }}
            {{ chargerInfo.chargingcurrent ? "A" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog07">
        <img src="../../assets/index/says/09.png" alt="" />
        <div class="cartword">
          <p class="diaName">Status</p>
          <p class="diaValue">
            {{ chargerInfo.status ? chargerInfo.status : "StandBy" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBIC, controlCharger, findByDetails, findByChargers } from "../../common/api";
export default {
  name: "detailInform",
  data() {
    return {
      isShowSlete: false,
      ctypes: {
        centreId: "",
        value: "",
      },
      centerType: [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung Hom HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
      ],
      navList: [
        // { name: "Location", value: "" },
        { name: "Charger NO.", value: "" },
        { name: "Vehicle No.", value: "" },
      ],
      chargerInfo: {},
      roleKey: {},
      centers: [],
      chargers: {
        list: [],
        value: "",
      },
      isShowSlete1: false,
      Vehicle: "",
      page: 1,
      count: 0,
      loadingInstance: null,
    };
  },
  async created() {
    // this.centers = await this.$store.dispatch("getCenters");
    this.roleKey = JSON.parse(localStorage.getItem("roleKey"));
  },
  beforeDestroy() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
  filters: {},
  mounted() {
    if (this.$route.query.cid && this.$route.query.chargerno) {
      this.ctypes.value = this.$store.state.centerType.filter(
        (item) => item.cid == this.$route.query.cid
      )[0].value;
      this.getNowData(this.$route.query.cid);
      this.ctypes.centreId = this.$route.query.cid;
      this.chargers.value = this.$route.query.chargerno;
      this.getIndividualCharger();
    } else {
      this.loginInfos = JSON.parse(localStorage.getItem("chargerInfo")) || {};
      if (Object.keys(loginInfos).length != 0) {
        this.ctypes.centreId = loginInfos.centre;
        this.ctypes.value = this.$store.state.centerType.filter(
          (item) => item.cid == loginInfos.centre
        )[0].value;
        this.getNowData(loginInfos.centre);
        this.chargers.value = loginInfos.chargerno;
        this.Vehicle = localStorage.getItem("vno") || "";
        this.getIndividualCharger();
      }
    }
  },

  methods: {
    loadMore() {
      if (this.page >= Math.ceil(this.count / 10))
        return this.$message.warning("No more data!");
      this.page += 1;
      // this.getNowData();
      this.getNowData(this.ctypes.centreId);
    },
    //
    getValue() {
      this.getIndividualCharger();
    },
    seleteCharger() {
      this.isShowSlete1 = !this.isShowSlete1;
      if (this.isShowSlete1) {
        if (this.ctypes.centreId === "") {
          return this.$message.warning("Please select the center first");
        }
        if (this.chargers.list == 0) {
          return this.$message.warning("No data!");
        }
      }
    },
    //根据条件查询充电状态
    getIndividualCharger() {
      this.loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      let data;
      if (this.Vehicle === "") {
        data = {
          centre: this.ctypes.centreId,
          chargerNo: this.chargers.value,
        };
      } else {
        data = {
          vehicleNo: this.Vehicle,
        };
      }
      findByChargers(data)
        .then((res) => {
          this.$nextTick(() => {
            if (this.loadingInstance != null) {
              // 以服务的方式调用的 Loading 需要异步关闭
              this.loadingInstance.close();
            }
          });
          console.log("根据条件查询充电状态", res);
          if (res.code == 100) {
            this.chargerInfo = res.extend.chargerInfo || {};
            if (!res.extend.chargerInfo) {
              this.$message.warning("No data for the time being!");
            }
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            if (this.loadingInstance != null) {
              // 以服务的方式调用的 Loading 需要异步关闭
              this.loadingInstance.close();
            }
          });
        });
    },
    seleteCenter(prop, type) {
      if (type == 1) {
        this.ctypes.centreId = prop.cid;
        this.ctypes.value = prop.value;
        this.page = 0;
        this.chargers.list = [];
        this.getNowData(prop.cid);
      }
      if (type == 2) {
        this.chargers.value = prop;
        this.getIndividualCharger();
      }
    },
    // 查询充电桩的实时数据
    getNowData(centreId) {
      let data = {
        page: this.page,
        limit: 10,
        userId: localStorage.getItem("userId"),
        status: 6,
        centre: centreId,
      };
      findByDetails(data).then((res) => {
        // console.log(res, "查询充电桩的实时数据");
        if (res.code == 100) {
          if (res.extend.chargerInfoList.length != 0) {
            let arrs = res.extend.chargerInfoList.map((item) => item.chargerno);
            this.chargers.list = [...this.chargers.list, ...arrs];
          }
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.or > span {
  color: #fff;
  font-size: 20px !important;
  /* margin-right: 10px; */
}
.ortoptit {
  margin-top: 5px;
}
.p15 {
  padding: 0 15px 0 15px;
}
.garys,
.blues,
.greens {
  width: 160px;
  height: 44px;
  color: #ffffff;
  font-size: 16px;
  line-height: 44px;
  margin-left: 10px;
}
.garys {
  background: url("../../assets/index/says/006.png") no-repeat;
  background-size: 100% 100%;
}
.blues {
  background: url("../../assets/index/says/04.png") no-repeat;
  background-size: 100% 100%;
}
.greens {
  background: url("../../assets/index/says/05.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 40px;
}
.buttons7 {
  width: 100%;
  bottom: 30px;
  position: absolute;
  padding: 0 90px;
  box-sizing: border-box;
  z-index: 99999999999999;
}
.dialog06 {
  width: 342px;
  height: 233px;
  position: absolute;
  bottom: 90px;
  right: 250px;
  background: url("../../assets/index/says/03.png") no-repeat;
  background-size: 100% 100%;
}
.dialog06 .cartword {
  margin-top: 150px;
  margin-left: 60px;
}
.dialog05 {
  width: 280px;
  height: 270px;
  position: absolute;
  bottom: 100px;
  left: 462px;
  background: url("../../assets/index/says/11.png") no-repeat;
  background-size: 100% 100%;
}
.dialog05 .cartword {
  width: 235px;
}
.dialog04 {
  width: 337px;
  height: 277px;
  position: absolute;
  bottom: 120px;
  left: 97px;
  background: url("../../assets/index/says/11.png") no-repeat;
  background-size: 100% 100%;
}
.dialog04 .cartword,
.dialog05 .cartword {
  margin-top: 190px;
}

.dialog03,
.dialog02 {
  width: 335px;
  height: 143px;
  position: absolute;
  top: 115px;
  right: 185px;
  background: url("../../assets/index/says/09.png") no-repeat;
  background-size: 100% 100%;
}
.dialog07 {
  width: 335px;
  height: 143px;
  position: absolute;
  left: 50px;
  top: 200px;
}
.dialog07 > img {
  width: 100%;
  height: 100%;
  transform: rotateZ(180deg) rotateX(180deg);
}
.dialog07 .cartword {
  position: absolute;
  left: 0;
  top: 0;
}
.dialog07 .cartword .diaValue {
  margin-top: 15px;
}
.dialog03 {
  top: 333px;
  right: 170px;
}

.dialog02 .cartword,
.dialog03 .cartword {
  margin-left: 55px;
}
.dialog01 {
  width: 359px;
  height: 275px;
  position: absolute;
  top: 70px;
  left: 323px;
  background: url("../../assets/index/says/13.png") no-repeat;
  background-size: 100% 100%;
}
.cartword {
  text-align: center;
  width: 280px;
  height: 100px;
  margin-top: 24px;
}
.diaName {
  font-size: 18px;
  color: #edf5ff;
}
.diaValue {
  font-size: 20px;
  margin-top: 15px;
}
.cartsCenter {
  position: absolute;
  width: 688px;
  height: 330px;
  top: 200px;
  left: 360px;
}

.chargerBottom {
  width: 1483px;
  height: 831px;
  border-top: 1px solid transparent;
  margin-top: 20px;
  position: relative;
}

.seleter {
  width: 230px;
  height: 38px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
}
.seleterBody {
  width: 230px;
}
.seleter > img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.ct-item {
  margin-right: 40px;
  position: relative;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
.ct-item input {
  width: 100%;
  height: 100%;
  background: transparent;
  outline: 0;
  border: 0;
  padding: 0 24px 0 15px;
  color: #fff;
}
</style>
