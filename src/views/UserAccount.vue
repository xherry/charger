<template>
  <div class="UserAccount flex rz mt50">
    <div class="overLeft">
      <p>User Account</p>
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
  name: "UserAccount",
  data() {
    return {
      seletNavIndex: 1,
      leftNavs: [
        // {
        //   name: "Creat  User  Type",
        //   id: 1,
        //   RouterPush: "Creatusertype",
        // },
        {
          name: "Create  User",
          id: 1,
          RouterPush: "Createuser",
        },
        {
          name: "User  Records",
          id: 2,
          RouterPush: "UserRecords",
        },
      ],
    };
  },
   watch: {
    $route() {
      this.leftNavs.forEach((item) => {
        if (this.$route.name == item.RouterPush) {
          this.seletNavIndex = item.id;
        }
      });
    },
  },
  created() {
    this.leftNavs.forEach((item) => {
       if(window.location.href.includes(item.RouterPush)){
        this.seletNavIndex = item.id;
      }
    });
  },
};
</script>

<style scoped></style>
