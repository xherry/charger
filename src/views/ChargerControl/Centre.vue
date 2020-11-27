<template>
  <div class="">
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
      <div class="Confirm button">Confirm</div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Charge No.</p></li>
          <li><p>Enable</p></li>
          <li><p>Disable</p></li>
        </ul>
        <ul class="uldatas w100" >
          <li><p>SSPO-001</p></li>
          <li>
            <img v-if="''" src="../../assets/index/useraccount/04.png" alt="" />
            <img v-else src="../../assets/index/useraccount/03.png" alt="" />
          </li>
          <li>
            <img v-if="''" src="../../assets/index/useraccount/03.png" alt="" />
            <img v-else src="../../assets/index/useraccount/04.png" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Centre",
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
  padding: 0 380px;
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
  transition: all .2s linear;
}

.ct-item {
  margin-right: 60px;
  position: relative;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
.Confirm {
  width: 246px;
  height: 51px;
  line-height: 42px;
  background: url("../../assets/index/charger/01.png") no-repeat;
  background-size: 100% 100%;
  font-size: 20px;
}
</style>
