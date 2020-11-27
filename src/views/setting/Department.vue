<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charging Centre and Department</p>
    <div class="flex flex-Updown departmentMiddle">
      <div class="dm-left">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Address</p></li>
          <li><p>Location ( Carpark / Floor )</p></li>
        </ul>
        <ul class="uldatas w100">
          <li><p>Hung Hom</p></li>
          <li><p>Laguna Verde</p></li>
          <li><p>Laguna verde B2</p></li>
        </ul>
        <ul class="uldatas w100">
          <li><p>Sham Shui Po</p></li>
          <li><p>Fuk Wah Street</p></li>
          <li><p>G/F</p></li>
        </ul>
      </div>
      <div class="dm-right">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Department</p></li>
        </ul>
        <ul class="uldatas w100 ">
          <li @click="isShowSlete=!isShowSlete">
            <p>Hung Hom</p>
            <img class="seleters" :style="{ transform: `rotate(${isShowSlete ? '180' : '0'}deg)` }" src="../../assets/index/setting/10.png" alt="" />
            <div class="sleterMain" :style="{ height: isShowSlete ? '200px' : '0px' }"></div>
          </li >
          <li><p>Assess Controol</p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Department",
  data() {
    return {
      isShowSlete:false
    };
  },
};
</script>

<style scoped>

.dm-left,
.dm-right {
  border: 2px solid #205cbf;
  border-radius: 20px;
}
.dm-left {
  width: 810px;
  height: 680px;
  margin-right: 68px;
}
.dm-right {
  width: 490px;
  height: 680px;
}
.departmentMiddle {
  box-sizing: border-box;
  width: 100%;
  margin-top: 21px;
}
</style>
