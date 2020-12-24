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
          <img src="../assets/index/0004.png" class="childAll" alt="" />
          <div class="childAll stronghold">
            <div
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
      sixDatas: {},
    };
  },
  async created() {
    this.sixDatas = (await findBYN({ userId: 1 })).extend;
    // console.log(this.sixDatas);
  },
  methods: {
    tologin(value) {
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
.ortoptit {
  margin-top: 5px;
}
.sh6 {
  top: 110px;
  left: 769px;
}
.sh5 {
  top: 435px;
  left: 639px;
}
.sh4 {
  top: 310px;
  left: 537px;
}
.sh3 {
  top: 313px;
  left: 322px;
}
.sh2 {
  top: 143px;
  left: 103px;
}
.sh1 {
  top: 65px;
  left: 414px;
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
  width: 80%;
  height: 700px;
  margin-left: 10%;
  margin-top: 70px;
}
</style>
