<template>
  <div class="parent bgs">
    <header-top></header-top>
    <div class="topBg"></div>
    <div class="parentBottoms">
      <router-view />
    </div>
     <div v-if="$store.state.IsShowBottom"  @click="$router.push('/index')" class="ol-item2 flex flex-Updown-between ol-bottom">
      <span>Back to Main</span>
      <img class="mr27" src="../assets/index/overview/05.png" alt="" />
    </div> 
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path:''
    };
  },
  
};
</script>

<style scoped>
.parentBottoms{
  height: 962px;
  border-top: 0.5px solid transparent;
}
.parent{
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
</style>
