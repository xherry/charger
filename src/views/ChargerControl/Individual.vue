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
            v-for="(item, index) in centerType"
            :key="index"
            @click="seleteCenter(item)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div
        class="ct-item flex flex-Updown-between"
        v-for="(item, index) in navList"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <div class="seleter flex flex-Updown-between">
          <input type="text" placeholder="namename" v-model="item.value" />
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
          <p class="diaName">Mileage after Charge</p>
          <p class="diaValue">
            {{ chargerInfo.mileagetravelled | valNO }}
            {{ chargerInfo.mileagetravelled ? "km" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog02">
        <div class="cartword">
          <p class="diaName">Charging Time</p>
          <p class="diaValue">
            {{ chargerInfo.chargingtime | valNO }}
            {{ chargerInfo.chargingtime ? "min" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog03">
        <div class="cartword">
          <p class="diaName">Charging Energy</p>
          <p class="diaValue">
            {{ chargerInfo.chargingenergy | valNO }}
            {{ chargerInfo.chargingenergy ? "kwh" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog04">
        <div class="cartword">
          <p class="diaName">Charging Voltage</p>
          <p class="diaValue">
            {{ chargerInfo.batterycapacity | valNO }}
            {{ chargerInfo.batterycapacity ? "V" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog05">
        <div class="cartword">
          <p class="diaName">Battery Capacity</p>
          <p class="diaValue">
            {{ chargerInfo.vehicleno | valNO }} {{ chargerInfo.vehicleno ? "%" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog06">
        <div class="cartword">
          <p class="diaName">Charging Current</p>
          <p class="diaValue">
            {{ chargerInfo.chargingcurrent | valNO }}
            {{ chargerInfo.chargingcurrent ? "A" : "" }}
          </p>
        </div>
      </div>
      <div class="buttons7 flex flex-Updown-between">
        <div class="flex flex-Updown" v-show="roleKey.controlOtherChargers == 1">
          <div class="blues button" @click="ControlEquipment(1)">Enable</div>
          <div class="greens button" @click="ControlEquipment(0)">Disable</div>
        </div>
        <div></div>
        <div class="flex flex-Updown" v-show="roleKey.controlOwnCharger == 1">
          <div class="blues button" @click="ControlEquipment(3)">Start</div>
          <div class="greens button" @click="ControlEquipment(2)">Stop</div>
        </div>
        <div></div>
        <div class="flex flex-Updown" v-show="roleKey.controlOtherChargers == 1">
          <div class="blues button" @click="ControlEquipment(4)">LMS</div>
          <div class="greens button" @click="ControlEquipment(5)">Full</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBIC, controlCharger } from "../../common/api";
export default {
  name: "Individual",
  data() {
    return {
      isShowSlete: false,
      ctypes: {
        centreId: "0",
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
      navList: [
        {
          name: "Location",
          value: "111",
        },
        {
          name: "Charger NO.",
          value: "222",
        },
        {
          name: "Vehicle No.",
          value: "333",
        },
      ],
      chargerInfo: {},
      roleKey: {},
    };
  },
  created() {
    this.roleKey = JSON.parse(localStorage.getItem("roleKey"));
  },
  mounted() {
    this.getIndividualCharger();
  },
  methods: {
    //根据条件查询充电状态
    getIndividualCharger() {
      let data = {
        userId: localStorage.getItem("userId"),
        centre: this.ctypes.centreId,
        location: this.navList[0].value,
        chargerNo: this.navList[1].value,
        vehicleNo: this.navList[2].value,
      };
      findBIC(data).then((res) => {
        console.log("根据条件查询充电状态", res);
        if (res.code == 100) {
          this.chargerInfo = res.extend.chargerInfo || {};
        }
      });
    },
    seleteCenter(prop) {
      this.ctypes.centreId = prop.centreId;
      this.ctypes.value = prop.value;
      this.isShowSlete2 = false;
      this.getIndividualCharger();
    },
    // 控制设备
    ControlEquipment(type) {
      if (this.chargerInfo.status == Disconnected || this.chargerInfo.status == OffLine) {
        this.$message.warning("设备离线");
        return;
      }
      if (type == 1) {
        if (this.chargerInfo.status != "Disable") {
          this.$message.warning("无法启用！");
          return;
        }
      }
      if (type == 3) {
        if (
          this.chargerInfo.status != "InUse" ||
          this.chargerInfo.status != "WaitCharging"
        ) {
          this.$message.warning("无法启用！");
          return;
        }
      }
      if (type == 2) {
        if (this.chargerInfo.status != "Charging") {
          this.$message.warning("无法启用！");
          return;
        }
      }
      if (type == 4 || type == 5) {
        if (this.chargerInfo.status != "Disabled") {
          this.$message.warning("无法启用！");
          return;
        }
      }
      let data = {
        userIds: localStorage.getItem("userId"),
        type: type, //0，Disable；1，Enable；2，Stop；3，Start；4，LMS；5、Full
        centre: this.chargerInfo.centre,
        chargerNo: this.chargerInfo.chargerNo,
      };
      controlCharger(data).then((res) => {
        console.log(res, "控制设备");
        if (res.code == 100) {
          this.$message.success("启用成功！");
          this.getIndividualCharger();
        }
      });
    },
  },
};
</script>

<style scoped>
.ortoptit {
  margin-top: 5px;
}
.p15 {
  padding: 0 15px 0 15px;
}
.blues,
.greens {
  width: 160px;
  height: 44px;
  color: #ffffff;
  font-size: 16px;
  line-height: 44px;
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
  font-size: 14px;
  color: #edf5ff;
}
.diaValue {
  font-size: 20px;
  margin-top: 28px;
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
