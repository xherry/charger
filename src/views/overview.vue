<template>
  <div class="overview flex rz mt50">
    <div class="overLeft">
      <p>Overview</p>
      <div :class="[navSeleted == item.id ? 'ol-item1' : 'ol-item2', 'flex', 'flex-Updown-between']" @click="navSeleted = item.id" v-for="item in navs" :key="item.id">
        <span>{{ item.name }}</span>
        <img class="ml27" :src="navSeleted == item.id?item.seletImg:item.img" alt="" />
      </div>
    </div>
    <div v-if="navSeleted == 1">
      <div class="overRight">
        <p class="ortoptit">Charger Network</p>
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
    </div>
    <div v-else>
      <own-charg></own-charg>
    </div>
  </div>
</template>

<script>
import ownCharg from './overview/ownCharg';
export default {
  name: "overview",
  components:{
    ownCharg
  },
  data() {
    return {
      navSeleted: 2,
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
    };
  },
};
</script>

<style scoped>
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
