<template>
  <div class="dateStatus">
    <div class="overRights">
      <p class="ortoptit">Search Conditions</p>
      <div class="dsmain dsmleftitem">
        <div class="dsmleftitem cdltopitem flex flex-Updown-between" @click="isShowSlete = !isShowSlete">
          <span>Centre (optional)</span>
          <p class="flex flex-Updown-between">
            <span>LEAF</span>
            <img :style="{ transform: `rotate(${isShowSlete ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
          </p>
          <div class="seleterBody" :style="{ height: isShowSlete ? '200px' : '0px' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dateStatus",
  data() {
    return {
      isShowSlete: false,
    };
  },
};
</script>

<style scoped>
.dsmleftitem{
  width: 360px;
}
.cdltopitem img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.cdltopitem input,
.cdltopitem p {
  width: 160px;
  height: 31px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 17px 0 23px;
  box-sizing: border-box;
  color: #63d1ff;
  font-size: 18px;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 18px;
  display: inline-block;
  margin-right: 16px;
}
.cdltopitem {
  margin-top: 22px;
  position: relative;
}
.dsmain {
  width: 1406px;
  height: 705px;
  border: 2px solid #205cbf;
  margin-top: 27px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  padding: 0 30px;
  box-sizing: border-box;
}
.overRights {
  margin-top: 53px;
  height: 810px;
}
.ortoptit {
  line-height: 55px;
}
</style>
