<template>
  <div>
    <div class="overview flex rz mt50">
      <div class="overLeft">
        <p>Overview</p>
        <div class="ol-item1 flex flex-Updown-between">
          <span>Charger Network</span>
          <img class="ml27" src="../assets/index/says/01.png" alt="" />
        </div>
      </div>
      <div class="overRight">
        <p class="ortoptit">Charger Network</p>
        <div class="sixLogin">
          <img src="../assets/index/0005.png" class="childAll" alt="" />
          <div class="childAll stronghold">
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh1',
                'strong',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.available >= 3 && sixDatas.swh.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.available >= 1 && sixDatas.swh.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.swh && sixDatas.swh.available
                  ? sixDatas.swh.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(5)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh2',
                'strong',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.available >= 3 && sixDatas.yl.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.available >= 1 && sixDatas.yl.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.yl && sixDatas.yl.available
                  ? sixDatas.yl.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(4)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh3',
                'strong',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.available >= 3 && sixDatas.ty.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.available >= 1 && sixDatas.ty.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.ty && sixDatas.ty.available
                  ? sixDatas.ty.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(3)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh4',
                'strong',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.available >= 3 && sixDatas.ssp.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.available >= 1 && sixDatas.ssp.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.ssp && sixDatas.ssp.available
                  ? sixDatas.ssp.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(2)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh5',
                'strong',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.available >= 3 && sixDatas.hh.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.available >= 1 && sixDatas.hh.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.hh && sixDatas.hh.available
                  ? sixDatas.hh.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(1)"
            ></div>
            <div
              @mouseover="showEwm(1)"
              @mouseout="showEwm(0)"
              :class="[
                'sh6',
                'strong',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.available >= 3 && sixDatas.s.available <= 5
                    ? 'oranges'
                    : ''
                  : '',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.available >= 1 && sixDatas.s.available <= 2
                    ? 'yellowd'
                    : ''
                  : '',
                sixDatas.s && sixDatas.s.available
                  ? sixDatas.s.available > 5
                    ? 'greens'
                    : ''
                  : '',
              ]"
              @click="tologin(0)"
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
            <div style="background: #fff"></div>
            <span>Off-line</span>
          </div>
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
    showEwm(value) {
      // if (value === 1) {
      //   this.isShowSixItems = true;
      // } else {
      //   this.isShowSixItems = false;
      // }
    },
    tologin(value) {
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
.overRight {
  position: relative;
}
.sixItemBottom {
  position: absolute;
  top: 60%;
  left: 50px;
  width: 360px;
  background: rgba(33, 69, 177, 0.5);
  height: 220px;
  border-radius: 10px;
  transition: all 0.2s linear;
}
.sixItem {
  width: 308px;
  margin: 15px auto;
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
  font-size: 22px;
  letter-spacing: 1px;
}
.ortoptit {
  margin-top: 5px;
}
.sh6 {
  top: 65px;
  left: 774px;
}
.sh5 {
  top: 340px;
  left: 583px;
}
.sh4 {
  top: 225px;
  left: 495px;
}
.sh3 {
  top: 220px;
  left: 295px;
}
.sh2 {
  top: 130px;
  left: 90px;
}
.sh1 {
  top: 60px;
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
.strong {
  width: 25px;
  height: 25px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 5px 0 #fff;
  background: #fff;
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
  height: 480px;
  margin-left: 13.5%;
  margin-top: 100px;
}
</style>
