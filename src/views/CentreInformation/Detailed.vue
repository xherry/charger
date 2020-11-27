<template>
  <div class="Detailed">
    <div class="chargerTop flex flex-center">
      <div class="ct-item flex flex-Updown-between" @click="isShowSlete = !isShowSlete">
        <span>Centre</span>
        <div class="seleter flex flex-Updown-between">
          <p>namename</p>
          <img :style="{ transform: `rotate(${isShowSlete ? '-180' : '0'}deg)` }" src="../../assets/index/says/02.png" alt="" />
        </div>
        <div class="seleterBody" :style="{ height: isShowSlete ? '200px' : '0px' }"></div>
      </div>
      <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" value="wherehere " />
      </div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Charge No.</p></li>
          <li><p>Status</p></li>
          <li><p>EV Type</p></li>
          <li><p>Vehicle No</p></li>
          <li>
            <div>
              <p>Charging Time</p>
              <p>(HOUR)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Energy</p>
              <p>(kw/h)</p>
            </div>
          </li>
          <li><p>Charging Voltage</p></li>
          <li>
            <div>
              <p>Charging Current</p>
              <p>(A)</p>
            </div>
          </li>
        </ul>
        <ul class="uldatas w100">
          <li><p>SSPO-001</p></li>
          <li>
            <p>Charging</p>
          </li>
          <li>
            <p>ASD</p>
          </li>
          <li>
            <p>ASD1256</p>
          </li>
          <li>
            <p>2:16</p>
          </li>
          <li>
            <p>26</p>
          </li>
          <li>
            <p>26P</p>
          </li>
          <li>
            <p>53</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detailed",
  data() {
    return {
      isShowSlete: false,
    };
  },
};
</script>

<style scoped>
.uldatas img {
  width: 25px;
  height: 25px;
}
.urtable {
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.urtable > ul {
  box-sizing: border-box;
}
.overRights {
  height: 714px;
  margin-top: 32px;
}
.chargerTop {
  width: 100%;
}
.seleter,
.ct-item input {
  width: 224px;
  height: 38px;
  padding: 0 24px 0 15px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
}
.ct-item input {
  background: transparent;
  outline: none;
}
.seleter > img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}

.ct-item {
  margin-right: 60px;
  position: relative;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
</style>
