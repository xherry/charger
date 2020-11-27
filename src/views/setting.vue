<template>
  <div class="setting flex rz mt50">
    <div class="overLeft">
      <p>System Settings</p>
      <div :class="[seletNavIndex == item.id ? 'ol-item1' : 'ol-item2', 'flex', 'flex-Updown-between']" @click="$router.push(item.RouterPush), (seletNavIndex = item.id)" v-for="item in leftNavs" :key="item.id">
        <span>{{ item.name }}</span>
        <img class="ml27" :src="seletNavIndex == item.id ? item.seletImg : item.img" alt="" />
      </div>
    </div>
    <div>
      <div class="overRight">
        <div>
          <router-view />
        </div>
      </div>
      <div class="flex flex-Updown">
        <div class="button operation">Update</div>
        <div class="button operation">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting",
  components: {},
  data() {
    return {
      seletNavIndex: 1,
      leftNavs: [
        {
          name: "Centre Department",
          img: require("../assets/index/setting/05.png"),
          seletImg: require("../assets/index/setting/015.png"),
          id: 1,
          RouterPush: "Department",
        },
        {
          name: "Electric Vehicle",
          img: require("../assets/index/setting/02.png"),
          seletImg: require("../assets/index/setting/016.png"),
          id: 2,
          RouterPush: "ElectricVehicle",
        },
        {
          name: "Charger",
          img: require("../assets/index/setting/12.png"),
          seletImg: require("../assets/index/setting/04.png"),
          id: 3,
          RouterPush: "Charger",
        },
        {
          name: "Charger Numbering",
          img: require("../assets/index/setting/01.png"),
          seletImg: require("../assets/index/setting/07.png"),
          id: 4,
          RouterPush: "Numbering",
        },
        {
          name: "Vehicle Numbere",
          img: require("../assets/index/setting/06.png"),
          seletImg: require("../assets/index/setting/014.png"),
          id: 5,
          RouterPush: "Number",
        },
      ],
    };
  },
  methods: {
    toCharger() {
      if (this.seletNavIndex == 2) {
        this.seletNavIndex = "charger";
        return;
      }
    },
  },
};
</script>

<style scoped>
.overRight {
  height: 773px;
}
</style>
