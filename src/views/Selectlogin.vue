<template>
  <div>
    <div class="overview flex rz mt50" style="width: 100%">
      <div class="overLeft">
        <p>Overview</p>
        <div class="ol-item1 flex flex-Updown-between">
          <span>Charger Network</span>
          <img class="ml27" src="../assets/index/says/01.png" alt="" />
        </div>
      </div>
      <div class="overRight">
        <p class="toAdmin button" @click="toAdmin">Admin Login</p>
        <!-- <p class="ortoptit">Charger Network</p> -->
        <div class="sixLogin">
          <img src="../assets/index/0004.png" class="childAll" alt="" />
          <div class="childAll stronghold">
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh1',
                'strong',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.total == 0 ||
                    sixDatas.swh.total == sixDatas.swh.outofservice
                    ? ''
                    : sixDatas.swh.available >= 3 && sixDatas.swh.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.total == 0 ||
                    sixDatas.swh.total == sixDatas.swh.outofservice
                    ? ''
                    : sixDatas.swh.available >= 1 && sixDatas.swh.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.total == 0 ||
                    sixDatas.swh.total == sixDatas.swh.outofservice
                    ? ''
                    : sixDatas.swh.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.total == 0 ||
                    sixDatas.swh.total == sixDatas.swh.outofservice
                    ? ''
                    : sixDatas.swh.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP3101', sixDatas.swh)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh2',
                'strong',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.total == 0 ||
                    sixDatas.yl.total == sixDatas.yl.outofservice
                    ? ''
                    : sixDatas.yl.available >= 3 && sixDatas.yl.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.total == 0 ||
                    sixDatas.yl.total == sixDatas.yl.outofservice
                    ? ''
                    : sixDatas.yl.available >= 1 && sixDatas.yl.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.total == 0 ||
                    sixDatas.yl.total == sixDatas.yl.outofservice
                    ? ''
                    : sixDatas.yl.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.total == 0 ||
                    sixDatas.yl.total == sixDatas.yl.outofservice
                    ? ''
                    : sixDatas.yl.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP3701', sixDatas.yl)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh3',
                'strong',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.total == 0 ||
                    sixDatas.ty.total == sixDatas.ty.outofservice
                    ? ''
                    : sixDatas.ty.available >= 3 && sixDatas.ty.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.total == 0 ||
                    sixDatas.ty.total == sixDatas.ty.outofservice
                    ? ''
                    : sixDatas.ty.available >= 1 && sixDatas.ty.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.total == 0 ||
                    sixDatas.ty.total == sixDatas.ty.outofservice
                    ? ''
                    : sixDatas.ty.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.total == 0 ||
                    sixDatas.ty.total == sixDatas.ty.outofservice
                    ? ''
                    : sixDatas.ty.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP3801', sixDatas.ty)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh4',
                'strong',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.total == 0 ||
                    sixDatas.ssp.total == sixDatas.ssp.outofservice
                    ? ''
                    : sixDatas.ssp.available >= 3 && sixDatas.ssp.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.total == 0 ||
                    sixDatas.ssp.total == sixDatas.ssp.outofservice
                    ? ''
                    : sixDatas.ssp.available >= 1 && sixDatas.ssp.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.total == 0 ||
                    sixDatas.ssp.total == sixDatas.ssp.outofservice
                    ? ''
                    : sixDatas.ssp.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.total == 0 ||
                    sixDatas.ssp.total == sixDatas.ssp.outofservice
                    ? ''
                    : sixDatas.ssp.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP2201', sixDatas.ssp)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh5',
                'strong',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.total == 0 ||
                    sixDatas.hh.total == sixDatas.hh.outofservice
                    ? ''
                    : sixDatas.hh.available >= 3 && sixDatas.hh.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.total == 0 ||
                    sixDatas.hh.total == sixDatas.hh.outofservice
                    ? ''
                    : sixDatas.hh.available >= 1 && sixDatas.hh.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.total == 0 ||
                    sixDatas.hh.total == sixDatas.hh.outofservice
                    ? ''
                    : sixDatas.hh.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.total == 0 ||
                    sixDatas.hh.total == sixDatas.hh.outofservice
                    ? ''
                    : sixDatas.hh.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP2101', sixDatas.hh)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh6',
                'strong',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.total == 0 || sixDatas.s.total == sixDatas.s.outofservice
                    ? ''
                    : sixDatas.s.available >= 3 && sixDatas.s.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.total == 0 || sixDatas.s.total == sixDatas.s.outofservice
                    ? ''
                    : sixDatas.s.available >= 1 && sixDatas.s.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.total == 0 || sixDatas.s.total == sixDatas.s.outofservice
                    ? ''
                    : sixDatas.s.available > 5
                    ? 'greens'
                    : ''
                  : '',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.total == 0 || sixDatas.s.total == sixDatas.s.outofservice
                    ? ''
                    : sixDatas.s.available == 0
                    ? 'redd'
                    : ''
                  : '',
              ]"
              @click="tologin('CLP3301', sixDatas.s)"
            ></div>
          </div>
        </div>
        <div class="sixItemBottom">
          <div class="sixItem flex flex-Updown">
            <div style="opacity: 0"></div>
            <span>No.of charger available</span>
          </div>
          <div class="sixItem flex flex-Updown">
            <div style="background: rgb(0, 175, 80)"></div>
            <span>more than 5</span>
          </div>
          <div class="flex sixItem flex-Updown">
            <div style="background: rgb(254, 217, 102)"></div>
            <span>3 to 5</span>
          </div>
          <div class="flex sixItem flex-Updown">
            <div style="background: rgb(244, 122, 47)"></div>
            <span>1 to 2</span>
          </div>
          <div class="flex sixItem flex-Updown">
            <div style="background: #f00"></div>
            <span>All in use</span>
          </div>
          <div class="flex sixItem flex-Updown">
            <div style="background: #fff"></div>
            <span>Off-line</span>
          </div>
        </div>
        <div class="annotation">
          <span>Tips: Click the center</span>
          <div></div>
          <span>to login and view more details</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBYN } from "../common/api";
export default {
  name: "seleteLogin",
  data() {
    // let datas = (await findBYN({ userId: 1 })).extend;
    return {
      isShowSixItems: false,
      sixDatas: {},
    };
  },
  async created() {
    this.sixDatas = (await findBYN({ userId: 1 })).extend;
    // console.log(this.sixDatas);
  },
  methods: {
    toAdmin() {
      window.location.href = "https://www.clplms.com/pc";
    },
    showEwm(value) {
      // if (value === 1) {
      //   this.isShowSixItems = true;
      // } else {
      //   this.isShowSixItems = false;
      // }
    },
    tologin(value, data) {
      if (!data) {
        this.$message.warning("Temporarily no data！");
        return;
      }
      let obj = {
        cid: value,
        location: "",
        cno: "",
      };
      this.$store.commit("setLoginInfos", obj);
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
.overLeft {
  opacity: 0;
}
.overview {
  /* justify-content: center; */
}
.toAdmin {
  padding: 10px 20px;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  right: 60px;
  top: 50px;
  background: rgba(33, 69, 177, 0.7);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 1px 1px 2px #ffffff60;
}
.overRight {
  position: relative;
  background: url("../assets/index/login/07.png") no-repeat;
  background-size: 100% 100%;
}
.sixItemBottom {
  position: absolute;
  top: 65%;
  left: -300px;
  /* width: 380px; */
  background: rgba(33, 69, 177, 0.2);
  /* height: 220px; */
  border-radius: 10px;
  transition: all 0.2s linear;
  padding: 10px 20px 20px;
}
.sixItem {
  /* width: 308px; */
  margin: 10px auto 0;
  /* margin: 0 auto; */
  /* margin-bottom: 10px; */
}
.sixItem div {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 15px;
}
.sixItem:first-child span {
  text-decoration: underline;
}
.sixItem span {
  color: #fff;
  font-size: 20px;
  /* letter-spacing: 2px; */
}
.ortoptit {
  margin-top: 5px;
}
.sh6 {
  top: 60px;
  left: 774px;
}
.sh5 {
  top: 305px;
  left: 583px;
}
.sh4 {
  top: 200px;
  left: 495px;
}
.sh3 {
  top: 200px;
  left: 295px;
}
.sh2 {
  top: 120px;
  left: 90px;
}
.sh1 {
  top: 50px;
  left: 375px;
}
.greens {
  background: rgb(0, 175, 80) !important;
  animation: bb 1s linear infinite;
}
.oranges {
  background: rgb(254, 217, 102) !important;
  animation: bb 1s linear infinite;
}
.yellowd {
  background: rgb(244, 122, 47) !important;
  animation: bb 1s linear infinite;
}
.redd {
  background: #f00 !important;
  animation: bb 1s linear infinite;
}
.strong {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 #fff;
  background: #fff;
  position: absolute;
  z-index: 99;
}
@keyframes bb {
  0% {
    box-shadow: 0 0 5px 0 #fff;
  }
  20% {
    box-shadow: 0 0 6px 0 #fff;
  }
  40% {
    box-shadow: 0 0 7px 0 #fff;
  }
  60% {
    box-shadow: 0 0 8px 0 #fff;
  }
  80% {
    box-shadow: 0 0 9px 0 #fff;
  }
  100% {
    box-shadow: 0 0 10px 0 #fff;
  }
}
.stronghold {
  position: absolute;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.5); */
}
.sixLogin {
  position: relative;
  z-index: 9999;
  width: 73%;
  height: 600px;
  margin-left: 12.5%;
  margin-top: 120px;
}
.annotation {
  /* text-align: center; */
  margin-top: 100px;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.annotation > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 #fff;
  background: #fff;
  margin: 0 5px;
}
</style>
