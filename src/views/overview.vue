<template>
  <div class="overview flex rz mt50">
    <div class="overLeft">
      <p>Overview</p>
      <div class="ol-item1 flex flex-Updown-between">
        <span>Charger Network</span>
        <img class="ml27" src="../assets/index/says/01.png" alt="" />
      </div>
    </div>
    <!-- <div v-if="navSeleted == 1">
      <div class="overRight">
        <p class="ortoptit">Charger Network</p>
        <div class="flex">
          <div>
            <p class="tits">No. of charger available :</p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/04.png" alt="" />
              <span>more than 5</span>
            </p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/03.png" alt="" />
              <span>more than 5</span>
            </p>
            <p class="flex flex-Updown icons">
              <img src="../assets/index/overview/01.png" alt="" />
              <span>more than 5</span>
            </p>
          </div>
          <div id="main" class="world"></div>
        </div>
      </div>
    </div> -->
    <div>
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
      navSeleted: 2,
      navs: [
        // {
        //   name: "Charger Network",
        //   seletImg: require("../assets/index/overview/07.png"),
        //   img: require("../assets/index/says/08.png"),
        //   id: 1,
        // },
        {
          name: "Charger Network",
          img: require("../assets/index/overview/02.png"),
          seletImg: require("../assets/index/says/01.png"),
          id: 2,
        },
      ],
    };
  },
  mounted() {
    // this.intWord();
    this.getSixData();
  },
  methods: {
    // 查询六个地区下充电桩等信息
    getSixData() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      findBYN(data).then((res) => {
        // console.log("查询六个地区下充电桩等信息", res);
      });
    },
  },
};
</script>

<style scoped>
.world {
  height: 700px;
  width: 1128px;
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
