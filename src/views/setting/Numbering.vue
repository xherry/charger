<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables">
        <ul class="ultit">
          <li><p>Centre</p></li>
          <li><p>Location (Carpark / Floor|）</p></li>
          <li><p>Charger Tvpe</p></li>
          <li><p>Prefix</p></li>
          <li><p>Number Starting</p></li>
          <li><p>Preview</p></li>
        </ul>
        <ul class="uldatas w100">
          <li @click="isShowSlete1 = !isShowSlete1">
            <p>hung Hom</p>
            <img class="seleters" :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
            <div class="sleterMain" :style="{ height: isShowSlete1 ? '200px' : '0px' }"></div>
          </li>
          <li><p>G/F</p></li>
          <li @click="isShowSlete2 = !isShowSlete2">
            <p>Polyu AC Medium Charger</p>
            <img class="seleters" :style="{ transform: `rotate(${isShowSlete2 ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
            <div class="sleterMain" :style="{ height: isShowSlete2 ? '200px' : '0px' }"></div>
          </li>
          <li><p>HH</p></li>
          <li><p>001</p></li>
          <li><p>HH-001</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Numbering",
  data() {
    return {
      isShowSlete1: false,
      isShowSlete2: false,
    };
  },
};
</script>

<style scoped></style>
