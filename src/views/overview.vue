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
      navs: [
        {
          name: "Charger Network",
          seletImg: require("../assets/index/overview/07.png"),
          img: require("../assets/index/says/08.png"),
          id: 1,
        },
        {
          name: "Charger Network",
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
          name: "Charger Network",
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
    },
  },
};
</script>

<style scoped>
.sixItemBottom {
  margin-top: 50px;
  /* width: 100%; */
  /* display: inline-block; */
}
.sixItem {
  width: 308px;
  margin: 0 auto;
  /* margin: 0 auto; */
  margin-bottom: 10px;
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
  font-size: 26px;
}
.ortoptit {
  margin-top: 5px;
}
.sh6 {
  top: 100px;
  left: 634px;
}
.sh5 {
  top: 315px;
  left: 479px;
}
.sh4 {
  top: 223px;
  left: 397px;
}
.sh3 {
  top: 223px;
  left: 235px;
}
.sh2 {
  top: 153px;
  left: 70px;
}
.sh1 {
  top: 40px;
  left: 305px;
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
  width: 60%;
  height: 500px;
  margin-left: 20%;
  margin-top: 70px;
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
