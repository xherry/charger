<template>
  <div>
    <div class="chargerTop flex flex-Updown">
      <div class="ct-item flex flex-Updown-between" v-for="(item, index) in navList" :key="index">
        <span>{{ item.name }}</span>
        <div class="seleter flex flex-Updown-between">
          <p>{{ item.children[0].name }}</p>
          <img src="../../assets/index/says/02.png" alt="" />
        </div>
      </div>
    </div>
    <div class="chargerBottom">
      <div class="cartsCenter">
        <img class="childAll" src="../../assets/index/says/07.png" alt="" />
      </div>
      <div class="dialog01">
        <div class="cartword">
          <p class="diaName">Mileage after Charge</p>
          <p class="diaValue">150 km</p>
        </div>
      </div>
      <div class="dialog02">
        <div class="cartword">
          <p class="diaName">Charging Tinme</p>
          <p class="diaValue">30 min</p>
        </div>
      </div>
      <div class="dialog03">
        <div class="cartword">
          <p class="diaName">Charging Energy</p>
          <p class="diaValue">13 kwh</p>
        </div>
      </div>
      <div class="dialog04">
        <div class="cartword">
          <p class="diaName">Charging Voltage</p>
          <p class="diaValue">380 V</p>
        </div>
      </div>
      <div class="dialog05">
        <div class="cartword">
          <p class="diaName">Battery Capacity</p>
          <p class="diaValue">65 %</p>
        </div>
      </div>
      <div class="dialog06">
        <div class="cartword">
          <p class="diaName">Charging Current</p>
          <p class="diaValue">20 A</p>
        </div>
      </div>
      <div class="buttons7 flex flex-Updown-between">
        <div class="flex flex-Updown ">
          <div class="blues button">Enable</div>
          <div class="greens button">Disable</div>
        </div>
        <div class="flex flex-Updown">
          <div class="blues button">Start</div>
          <div class="greens button">Stop</div>
        </div>
        <div class="flex flex-Updown">
          <div class="blues button ">LMS</div>
          <div class="greens button">Full</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ownCharg",
  data() {
    return {
      navList: [
        {
          name: "Centre",
          children: [{ name: "namename" }],
        },
        {
          name: "Location",
          children: [{ name: "namename" }],
        },
        {
          name: "Charger NO.",
          children: [{ name: "namename" }],
        },
        {
          name: "Vehicle No.",
          children: [{ name: "namename" }],
        },
      ],
    };
  },
};
</script>

<style scoped>
.blues,.greens{
  width: 160px;
  height: 44px;
  color: #ffffff;
  font-size: 16px;
  line-height: 44px;
}
.blues{
  background: url('../../assets/index/says/04.png') no-repeat;
  background-size: 100% 100%;
}
.greens{
  background: url('../../assets/index/says/05.png') no-repeat;
  background-size: 100% 100%;
  margin-left: 40px;
}
.buttons7{
  width: 100%;
  bottom: 20px;
  position: absolute;
  padding: 0 90px;
  box-sizing: border-box;
}
.dialog06 {
  width: 342px;
  height: 233px;
  position: absolute;
  bottom: 80px;
  right: 250px;
  background: url("../../assets/index/says/03.png") no-repeat;
  background-size: 100% 100%;
}
.dialog06 .cartword{
  margin-top: 150px;
  margin-left: 60px;
}
.dialog05 {
  width: 280px;
  height: 270px;
  position: absolute;
  bottom: 100px;
  left: 462px;
  background: url("../../assets/index/says/11.png") no-repeat;
  background-size: 100% 100%;
}
.dialog05 .cartword {
  width: 235px;
}
.dialog04 {
  width: 337px;
  height: 277px;
  position: absolute;
  bottom: 110px;
  left: 97px;
  background: url("../../assets/index/says/11.png") no-repeat;
  background-size: 100% 100%;
}
.dialog04 .cartword,
.dialog05 .cartword {
  margin-top: 190px;
}
.dialog03,
.dialog02 {
  width: 335px;
  height: 143px;
  position: absolute;
  top: 105px;
  right: 185px;
  background: url("../../assets/index/says/09.png") no-repeat;
  background-size: 100% 100%;
}
.dialog03 {
  top: 323px;
  right: 170px;
}
.dialog02 .cartword,
.dialog03 .cartword {
  margin-left: 55px;
}
.dialog01 {
  width: 359px;
  height: 275px;
  position: absolute;
  top: 49px;
  left: 323px;
  background: url("../../assets/index/says/13.png") no-repeat;
  background-size: 100% 100%;
}
.cartword {
  text-align: center;
  width: 280px;
  height: 100px;
  margin-top: 24px;
}
.diaName {
  font-size: 14px;
  color: #edf5ff;
}
.diaValue {
  font-size: 20px;
  margin-top: 28px;
}
.cartsCenter {
  position: absolute;
  width: 688px;
  height: 330px;
  top: 180px;
  left: 360px;
}

.chargerBottom {
  width: 1483px;
  height: 801px;
  border: 2px solid #2d4288;
  margin-top: 50px;
  position: relative;
}

.seleter {
  width: 200px;
  height: 38px;
  padding: 0 24px 0 15px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
}
.seleter > img {
  width: 14px;
  height: 8px;
}
.ct-item {
  margin-right: 40px;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
</style>
