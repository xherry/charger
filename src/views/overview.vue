<template>
  <div class="overview flex rz mt50">
    <div class="overLeft">
      <p>Overview</p>
      <div
        :class="[
          navSeleted == item.id ? 'ol-item1' : 'ol-item2',
          'flex',
          'flex-Updown-between',
        ]"
        v-for="item in navs"
        :key="item.id"
        @click="navSeleted = item.id"
      >
        <span>{{ item.name }}</span>
        <img
          class="ml27"
          :src="navSeleted === item.id ? item.seletImg : item.img"
          alt=""
        />
      </div>
    </div>
    <div v-if="navSeleted == 1">
      <div>
        <div class="overRight">
          <p class="ortoptit">
            {{ navSeleted == 1 ? "Charger Network" : "Individual Charger" }}
          </p>
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
                @click="tologin(5)"
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
                @click="tologin(4)"
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
                @click="tologin(3)"
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
                @click="tologin(2)"
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
                @click="tologin(1)"
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
              <div style="background: #f00"></div>
              <span>All in use</span>
            </div>
            <div class="flex sixItem flex-Updown">
              <div style="background: #fff"></div>
              <span>Off-line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <own-charg></own-charg>
    </div>
  </div>
</template>

<script>
import { findBYN } from "../common/api";
import ownCharg from "./overview/ownCharg";
export default {
  name: "overview",
  components: {
    ownCharg,
  },
  data() {
    return {
      navSeleted: 1,
      isShowSixItems: false,
      navs: [
        {
          name: "Charger Network",
          seletImg: require("../assets/index/overview/07.png"),
          img: require("../assets/index/says/08.png"),
          id: 1,
        },
        {
          name: "Individual Charger",
          img: require("../assets/index/overview/02.png"),
          seletImg: require("../assets/index/says/01.png"),
          id: 2,
        },
      ],
      sixDatas: {},
    };
  },
  mounted() {
    // this.intWord();
    // this.getSixData();
  },
  async created() {
    let loginType = localStorage.getItem("loginType");
    if (loginType == "1") {
      this.navSeleted = 2;
      this.navs = [
        {
          name: "Individual Charger",
          img: require("../assets/index/overview/02.png"),
          seletImg: require("../assets/index/says/01.png"),
          id: 2,
        },
      ];
    }
    // 查询六个地区下充电桩等信息
    this.sixDatas = (await findBYN({ userId: 1 })).extend;
    // console.log(this.sixDatas);
  },
  methods: {
    tologin(value) {
      // this.$router.push("login");
      let roleKey = JSON.parse(localStorage.getItem("roleKey"));
      if (roleKey.controlOtherChargers == 1 && roleKey.controlOwnCharger == 1) {
        this.$message.warning("暂无权限！");
        this.$store.commit("changeShowBottom", false);
        return;
      }
      this.$router.push("CentreInformation/Detailed");
    },
    showEwm(value) {
      // if (value === 1) {
      //   this.isShowSixItems = true;
      // } else {
      //   this.isShowSixItems = false;
      // }
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
  /* width: 380px; */
  background: rgba(33, 69, 177, 0.2);
  /* height: 220px; */
  border-radius: 10px;
  transition: all 0.2s linear;
  padding: 15px 30px;
}
.sixItem {
  /* width: 308px; */
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
  letter-spacing: 2px;
}
.sixItem span {
  color: #fff;
  font-size: 22px;
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
.redd {
  background: #f00 !important;
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
.tits {
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 37px;
}
.icons {
  font-size: 20px;
  margin-bottom: 25px;
}
.icons > img {
  width: 24px;
  height: 24px;
  margin-right: 24px;
}
</style>
