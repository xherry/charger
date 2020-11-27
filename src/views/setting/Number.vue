<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables">
        <ul class="ultit">
          <li><p>OBD No.</p></li>
          <li><p>Vehicle Identification No</p></li>
          <li><p>EV Model</p></li>
          <li><p>Vehicle No</p></li>
          <li><p>Number Starting</p></li>
          <li><p>Department</p></li>
        </ul>
        <ul class="uldatas w100">
          <li><p>001</p></li>
          <li><p>ADCBG13654</p></li>
          <li><p>LEAF</p></li>
          <li><p>XY123</p></li>
          <li @click="isShowSlete1 = !isShowSlete1">
            <p>001</p>
            <img class="seleters" :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
            <div class="sleterMain" :style="{ height: isShowSlete1 ? '200px' : '0px' }"></div>
          </li>
          <li @click="isShowSlete2 = !isShowSlete2">
            <p>Polyu AC Medium Charger</p>
            <img class="seleters" :style="{ transform: `rotate(${isShowSlete2 ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
            <div class="sleterMain" :style="{ height: isShowSlete2 ? '200px' : '0px' }"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Number",
  data() {
    return {
      isShowSlete1:false,
      isShowSlete2:false
    };
  },
};
</script>

<style scoped></style>
