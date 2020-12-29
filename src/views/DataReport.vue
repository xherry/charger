<template>
  <div class="DataReport flex rz mt50">
    <div class="overLeft">
      <p>Data & Report</p>
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
      </div>
    </div>
    <div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataReport",
  data() {
    return {
      seletNavIndex: 1,
      leftNavs: [
        {
          name: "Data Record",
          id: 1,
          RouterPush: "UptodateStatus",
        },
        {
          name: "Data Serach",
          id: 2,
          RouterPush: "dateStatus",
        },
        {
          name: "Data Serach（Report）",
          id: 3,
          RouterPush: "dSReport",
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
