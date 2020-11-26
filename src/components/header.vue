<template>
  <div>
    <div class="flex flex-between tops" v-for="(p, i) in num" :key="i" :class="i == 0 ? 'pf' : ''">
      <div class="top1"></div>
      <div class="top2">Intelligent EV Charging System</div>
      <div class="top3">2020-11-19 15:36</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headeTop",
  data() {
    return {
      num: 2,
    };
  },
};
</script>

<style scoped>
.pf {
  top: 0;
  left: 0;
  z-index: 99;
  position: absolute;
}
.tops {
  margin-top: 38px;
  align-items: flex-start;
  width: 100%;
}
.top1,
.top2,
.top3 {
  text-align: center;
}
.top1,
.top3 {
  width: 566px;
  height: 58px;
  line-height: 73px;
  font-size: 20px;
}
.top1 {
  background: url("../assets/index/left.png");
  background-size: 100% 100%;
}
.top2 {
  width: 681px;
  height: 80px;
  background: url("../assets/index/middle.png");
  background-size: 100% 100%;
  line-height: 80px;
  font-size: 35px;
}
.top3 {
  background: url("../assets/index/right.png");
  background-size: 100% 100%;
}
</style>
