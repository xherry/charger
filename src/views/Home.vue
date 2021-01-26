<template>
  <div class="parent bgs">
    <!-- ./assets/index/bg01.png -->
    <img class="childAll ps" :src="bg01" v-if="!showLoading" alt="" />
    <header-top></header-top>
    <div class="topBg">
      <img class="childAll" :src="bg02" alt="" />
    </div>
    <div class="parentBottoms">
      <router-view />
    </div>
    <div
      v-if="$store.state.IsShowBottom && $store.state.isBack == 0"
      @click="$router.replace('/index')"
      class="ol-item2 flex flex-Updown-between ol-bottom"
    >
      <span>Back to Main</span>
      <img class="mr27" src="../assets/index/overview/05.png" alt="" />
    </div>
    <div
      v-if="$store.state.IsShowBottom && $store.state.isBack != 0"
      @click="goback"
      class="ol-item2 flex flex-center back ol-bottom"
    >
      <span>Back</span>
      <!-- <img class="mr27" src="../assets/index/overview/05.png" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: "",
      bg01: require("../assets/index/bg01.png"),
      bg02: require("../assets/index/bg02.png"),
      showLoading: true, // 显示loading
    };
  },
  mounted() {
    let bgImg = new Image();
    bgImg.src = this.bg01; // 获取背景图片的url
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
    goback() {
      this.$store.commit("isBacked", 0);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.ps {
  position: absolute;
  z-index: 0;
  background: #09264d;
}
.parentBottoms {
  height: 962px;
  border-top: 0.5px solid transparent;
}
.parent {
  position: relative;
  overflow-y: auto;
}
.ol-bottom {
  position: absolute;
  bottom: 22px;
  left: 0;
  z-index: 99;
  cursor: pointer;
}
.ol-item2 {
  width: 331px;
  height: 80px;
  background: url("../assets/index/overview/09.png") no-repeat;
  background-size: 100% 100%;
  color: #59baf2;
  font-size: 24px;
  padding: 0 26px 0 42px;
  box-sizing: border-box;
}
.ol-item2 > img {
  width: 34px;
  height: 34px;
  margin-left: 14px;
}
.ol-bottom > img {
  width: 27px;
  height: 31px;
  margin-left: 21px;
}
.back>span{
  font-size: 28px;
}
</style>
