<template>
  <div class="ChargerControl flex rz mt50">
    <div class="overLeft">
      <p>Charger Control</p>
      <div
        :class="[
          seletNavIndex == item.id ? 'ol-item1' : 'ol-item2',
          'flex',
          'flex-Updown-between',
        ]"
        @click="$router.push(item.RouterPush), (seletNavIndex = item.id)"
        v-for="item in leftNavs"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
        <img
          class="ml27"
          :src="seletNavIndex == item.id ? item.seletImg : item.img"
          alt=""
        />
      </div>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChargerControl",
  data() {
    return {
      seletNavIndex: 1,
      leftNavs: [
        {
          name: "Individual",
          id: 1,
          RouterPush: "Individual",
          img: require("../assets/index/setting/01.png"),
          seletImg: require("../assets/index/setting/07.png"),
        },
        {
          name: "Centre",
          id: 2,
          RouterPush: "Centre",
          img: require("../assets/index/setting/01.png"),
          seletImg: require("../assets/index/setting/07.png"),
        },
      ],
    };
  },
  created() {
    this.leftNavs.forEach((item) => {
      if (item.RouterPush === window.location.href.split("#")[1].split("/")[2]) {
        this.seletNavIndex = item.id;
      }
    });
  },
};
</script>

<style scoped></style>
