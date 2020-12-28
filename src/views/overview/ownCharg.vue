<template>
  <div>
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
          <input
            type="text"
            @blur="getValue"
            :data-id="item.id"
            :placeholder="item.name"
            v-model="item.value"
          />
        </div>
      </div>
    </div>
    <div class="chargerBottom">
      <div class="cartsCenter">
        <img class="childAll" src="../../assets/index/says/07.png" alt="" />
      </div>
      <div class="dialog01">
        <div class="cartword">
          <p class="diaName">Mileage after Charge（km）</p>
          <p class="diaValue">
            {{ chargerInfo.mileagetravelled | valNO }}
            {{ chargerInfo.mileagetravelled ? "km" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog02">
        <div class="cartword">
          <p class="diaName">Charging Tinme（Hour）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingtime | valNO }}
            {{ chargerInfo.chargingtime ? "min" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog03">
        <div class="cartword">
          <p class="diaName">Charging Energy（kWh）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingenergy | valNO }}
            {{ chargerInfo.chargingenergy ? "kwh" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog04">
        <div class="cartword">
          <p class="diaName">Charging Voltage（V）</p>
          <p class="diaValue">
            {{ chargerInfo.batterycapacity | valNO }}
            {{ chargerInfo.batterycapacity ? "V" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog05">
        <div class="cartword">
          <p class="diaName">Battery Capacity（%）</p>
          <p class="diaValue">
            {{ chargerInfo.vehicleno | valNO }} {{ chargerInfo.vehicleno ? "%" : "" }}
          </p>
        </div>
      </div>
      <div class="dialog06">
        <div class="cartword">
          <p class="diaName">Charging Current（A）</p>
          <p class="diaValue">
            {{ chargerInfo.chargingcurrent | valNO }}
            {{ chargerInfo.chargingcurrent ? "A" : "" }}
          </p>
        </div>
      </div>
      <!-- <div class="buttons7 flex flex-Updown-between">
        <div class="flex flex-Updown">
          <div class="blues button">Enable</div>
          <div class="greens button">Disable</div>
        </div>
        <div class="flex flex-Updown">
          <div class="blues button">Start</div>
          <div class="greens button">Stop</div>
        </div>
        <div class="flex flex-Updown">
          <div class="blues button">LMS</div>
          <div class="greens button">Full</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { findBIC } from "../../common/api";
export default {
  name: "ownCharg",
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
          value: "",
          id: 1,
        },
        {
          name: "Charger NO.",
          value: "",
          id: 2,
        },
        {
          name: "Vehicle No.",
          value: "",
          id: 3,
        },
      ],
      chargerInfo: {},
    };
  },
  mounted() {
    // this.getIndividualCharger();
  },
  methods: {
    // getValue
    getValue() {
      // let navList = this.navList;
      try {
        if (this.navList[0].value === "") throw "地区不能为空";
        if (this.navList[1].value === "") throw "充电器编号不能为空";
        if (this.navList[2].value === "") throw "车牌号不能为空";
      } catch (err) {
        this.$message.warning(err);
        return;
      }
      this.getIndividualCharger();
    },
    //根据条件查询充电状态
    getIndividualCharger() {
      let data = {
        userId: localStorage.getItem("userId"),
        centre: this.ctypes.centreId,
        location: this.navList[0].value,
        chargerNo: this.navList[1].value,
        vehicleNo: this.navList[2].value,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      findBIC(data)
        .then((res) => {
          // console.log("根据条件查询充电状态", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.chargerInfo = res.extend.chargerInfo || {};
            if (!res.extend.chargerInfo) {
              this.$message.warning("暂无数据！");
            }
          }
        })
        .catch(() => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
    seleteCenter(prop) {
      this.ctypes.centreId = prop.centreId;
      this.ctypes.value = prop.value;
      this.isShowSlete2 = false;
      this.getIndividualCharger();
    },
  },
};
</script>

<style scoped>
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
  bottom: 20px;
  position: absolute;
  padding: 0 90px;
  box-sizing: border-box;
}
.dialog06 {
  width: 342px;
  height: 233px;
  position: absolute;
  bottom: 80px;
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
  bottom: 110px;
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
  top: 105px;
  right: 185px;
  background: url("../../assets/index/says/09.png") no-repeat;
  background-size: 100% 100%;
}
.dialog03 {
  top: 323px;
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
  top: 49px;
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
  top: 180px;
  left: 360px;
}

.chargerBottom {
  width: 1483px;
  height: 801px;
  border: 2px solid #2d4288;
  margin-top: 50px;
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
