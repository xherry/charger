<template>
  <div class="indexMain flex">
    <div class="logout" @click="logout">Log Out</div>
    <div class="indexLeft" @click="$router.push('UserInformation')">
      <div class="userName">
        <p>Welcome</p>
        <p>{{ $store.state.userInfo.name ? $store.state.userInfo.name : "" }}</p>
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
      <img class="childAll pa" :src="middleBg" v-show="!showLoading" alt="" />
      <img src="../assets/icon.png" class="plogo" alt="" />
      <div class="childAll allNavs">
        <div class="flex nav1 w100 navItems flex-Updown-between">
          <div :class="['navs-item']" @click="routerPush('overview')">
            <img :class="['navsimg', 'bs']" src="../assets/index/01.png" alt="" />
            <p>Overview</p>
          </div>
          <div class="navs-item" v-if="roleKey.viewGeneralData == 1"></div>
          <div v-else class="navs-item" @click="routerPush('CentreInformation')">
            <img
              :class="['navsimg', loginType == 1 ? '' : 'bs']"
              src="../assets/index/03.png"
              alt=""
            />
            <p>Centre Information</p>
          </div>
        </div>

        <div class="flex flex-Updown-between nav2 w100 navItems">
          <div
            class="navs-item"
            v-if="roleKey.controlOtherChargers == 1 && roleKey.controlOwnCharger == 1"
          ></div>
          <div v-else class="navs-item" @click="routerPush('ChargerControl')">
            <img
              :class="['navsimg', loginType != '1' ? 'bs' : '']"
              src="../assets/index/02.png"
              alt=""
            />
            <p>Charger Control</p>
          </div>
          <div class="navs-item" v-if="roleKey.createAccount == 1"></div>
          <div v-else class="navs-item" @click="routerPush('UserAccount')">
            <img
              :class="['navsimg', loginType != '1' ? 'bs' : '']"
              src="../assets/index/04.png"
              alt=""
            />
            <p>User Account</p>
          </div>
        </div>
        <div class="flex flex-center nav3 w100 navItems">
          <div class="navs-item" v-if="roleKey.dataReport == 1"></div>
          <div v-else class="navs-item" @click="routerPush('DataReport')">
            <img
              :class="['navsimg', loginType != '1' ? 'bs' : '']"
              src="../assets/index/05.png"
              alt=""
            />
            <p>Data Report</p>
          </div>
          <!-- <div class="navs-item"  @click="routerPush('setting')">
            <img
              :class="['navsimg', loginType != '1' ? 'bs' : '']"
              src="../assets/index/06.png"
              alt=""
            />
            <p>System Settings</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utype, ctype } from "../common/common";
export default {
  name: "Home",
  data() {
    return {
      userInfo: [
        { key: "User Type：", name: "" },
        { key: "User ID：", name: "" },
        { key: "Staff ID：", name: "" },
        { key: "Centre：", name: "" },
        { key: "Department： ", name: "" },
        { key: "Email：", name: "" },
        { key: "Mobile：", name: "" },
      ],
      loginType: "",
      middleBg: require("../assets/index/middlebg.png"),
      showLoading: true,
      roleKey: {
        checkStatus: 1,
        configureSystem: 1,
        controlOtherChargers: 1,
        controlOwnCharger: 1,
        createAccount: 1,
        dataReport: 1,
        smsPasscode: 1,
        userIdPassword: 1,
        viewGeneralData: 1,
      },
    };
  },
  created() {
    this.roleKey = JSON.parse(localStorage.getItem("roleKey"));
    console.log(this.roleKey);
    this.loginType = localStorage.getItem("loginType");
    this.getUserInfo();
  },
  mounted() {
    let bgImg = new Image();
    bgImg.src = this.middleBg; // 获取背景图片的url
    let loadingInstance = this.$loading({
      text: "Loading...",
      background: "rgba(0,0,0,.5)",
    });
    bgImg.onerror = () => {
      console.log("img onerror");
    };
    bgImg.onload = () => {
      // 等背景图片加载成功后 去除loading
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
      this.showLoading = false;
    };
  },
  methods: {
    logout() {
      this.$confirm("Are you sure to log out?", "Prompt", {
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          this.$message.success("Log out successfully");
          this.$router.replace("Selectlogin");
        })
        .catch(() => {
          this.$message("Has been cancelled");
        });
    },
    // 路由跳转
    routerPush(routerName) {
      let loginType = this.loginType;
      if (loginType == "1" && routerName == "overview") {
        return this.$router.push("overview");
      } else if (loginType !== "1") {
        this.$router.push(routerName);
      }
    },
    //
    getUserInfo() {
      let userInfo = this.$store.state.userInfo;
      if (Object.keys(userInfo).length != 0) {
        this.userInfo = [
          { key: "User Type：", name: utype(userInfo.userType) },
          { key: "User ID：", name: userInfo.userId },
          { key: "Staff ID：", name: userInfo.staffId },
          { key: "Centre：", name: ctype(userInfo.centreId) },
          { key: "Department： ", name: userInfo.department },
          { key: "Email：", name: userInfo.email },
          { key: "Mobile：", name: userInfo.phone },
        ];
      }
    },
  },
};
</script>

<style scoped>
.logout {
  background: #0b2f5e;
  font-size: 18px;
  padding: 8px 15px;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 0px #236cca;
  position: absolute;
  z-index: 999999999;
  right: 80px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 120px;
}
.logout:active {
  background: #09203f;
}
.plogo {
  width: 280px;
  height: 65px;
  position: absolute;
  top: 120px;
  left: 886px;
}
.indexLeft {
  position: relative;
  z-index: 99999;
}
/* .nav3{
  padding: 0 ;
} */
/* .nav3 .navs-item:nth-child(2) {
  margin-left: 266px;
} */
.nav2 {
  margin-top: 20px;
  /* padding: 0  */
}
/* .nav2 .navs-item:nth-child(2) {
  margin-left: 750px;
} */
.allNavs {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.navItems {
  color: #28f7ff;
  font-size: 24px;
  padding: 0 269px 0 480px;
  box-sizing: border-box;
}
.nav1 {
  margin-top: 100px;
  padding: 0 380px 0 600px !important;
}
/* .nav1 .navs-item:nth-child(2) {
  margin-left: 550px;
} */
.navs-item {
  text-align: center;
}
.navs-item:hover {
  opacity: 0.7;
}
.navs-item:active {
  opacity: 0.7;
}
.navs-item .navsimg {
  width: 92px;
  height: 92px;
  border-radius: 50%;
}
.bs {
  box-shadow: 0 0 10px 0 #fff;
}
.indexRight {
  width: 1849px;
  height: 878px;
  /* background: url("../assets/index/middlebg.png") no-repeat;
  background-size: 100% 100%; */
  position: absolute;
  top: 202px;
  left: 32px;
  z-index: 10;
}
.pa {
  position: absolute;
  z-index: 0;
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
