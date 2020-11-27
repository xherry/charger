<template>
  <div class="indexMain flex">
    <div class="indexLeft"  @click="$router.push('UserInformation')">
      <div class="userName">
        <p>Welcome</p>
        <p>Mr Y P Chu</p>
      </div>
      <div class="lines"></div>
      <div class="userItem" v-for="(item, index) in userInfo" :key="index">
        <p class="flex valueKey flex-Updown">
          <span></span>
          <span>{{ item.key }}</span>
        </p>
        <p class="flex valueKey flex-Updown">
          <span></span>
          <span>{{ item.name }}</span>
        </p>
      </div>
    </div>
    <div class="indexRight">
      <div class="flex flex-center nav1 w100 navItems">
        <div class="navs-item" @click="$router.push('overview')">
          <img class="navsimg" src="../assets/index/01.png" alt="" />
          <p>Overview</p>
        </div>
        <div class="navs-item" @click="$router.push('CentreInformation')">
          <img class="navsimg" src="../assets/index/03.png" alt="" />
          <p>Centre Information</p>
        </div>
      </div>
      <div class="flex flex-center nav2 w100 navItems" >
        <div class="navs-item" @click="$router.push('ChargerControl')">
          <img class="navsimg" src="../assets/index/02.png" alt="" />
          <p>Charger Control</p>
        </div>
        <div class="navs-item" @click="$router.push('UserAccount')">
          <img class="navsimg" src="../assets/index/04.png" alt="" />
          <p>User Account</p>
        </div>
      </div>
      <div class="flex flex-center nav3 w100 navItems">
        <div class="navs-item" @click="$router.push('DataReport')">
          <img class="navsimg" src="../assets/index/05.png" alt="" />
          <p>Data Report</p>
        </div>
        <div class="navs-item" @click="$router.push('setting')">
          <img class="navsimg" src="../assets/index/06.png" alt="" />
          <p>System Settings</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userInfo: [
        { key: "User Type：", name: "Administrator" },
        { key: "User ID：", name: "1234" },
        { key: "Staff ID：", name: "1234" },
        { key: "Centre：", name: "Tsing Yi" },
        { key: "Department： ", name: "XXX" },
        { key: "Email：", name: "XXX" },
        { key: "Mobile：", name: "9123654798" },
      ],
    };
  },
};
</script>

<style scoped>
.indexLeft{
  position: relative;
  z-index: 99999;
}
.nav3 .navs-item:nth-child(2) {
  margin-left: 266px;
}
.nav2 {
  margin-top: 20px;
}
.nav2 .navs-item:nth-child(2) {
  margin-left: 750px;
}
.navItems {
  color: #28f7ff;
  font-size: 24px;
  padding: 0 269px 0 480px;
  box-sizing: border-box;
}
.nav1 {
  margin-top: 100px;
}
.nav1 .navs-item:nth-child(2) {
  margin-left: 550px;
}
.navs-item {
  text-align: center;
}
.navs-item .navsimg {
  width: 92px;
  height: 92px;
}
.indexRight {
  width: 1849px;
  height: 878px;
  background: url("../assets/index/middlebg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 202px;
  left: 32px;
  z-index: 10;
}
.userItem .valueKey:nth-child(2) > span:first-child {
  opacity: 0;
}
.userItem .valueKey:nth-child(2) > span:last-child {
  color: #fff;
  font-size: 16px;
}
.userItem > p {
  margin-bottom: 12px;
}
.userItem {
  color: #ffffff;
  font-size: 20px;
  margin-left: 15px;
}
.valueKey {
  color: #28f7ff;
}
.valueKey > span:first-child {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #28f7ff;
  margin-right: 13px;
}
.lines {
  width: 100%;
  height: 1px;
  background: #28f7ff70;
  margin-bottom: 24px;
}
.indexMain {
  margin-top: 64px;
  padding: 0 33px 0 36px;
  box-sizing: border-box;
}
.indexLeft {
  background: url("../assets/index/rightbg.png");
  background-size: 100% 100%;
  width: 360px;
  height: 722px;
  padding: 0 55px;
  box-sizing: border-box;
  border-top: 0.5px solid transparent;
}
.userName {
  font-size: 32px;
  color: #28f7ff;
  margin-bottom: 24px;
  text-align: center;
  margin-top: 70px;
}
</style>
