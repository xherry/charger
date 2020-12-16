<template>
  <div>
    <div class="overview flex rz mt50">
      <div class="overLeft">
        <p>Overview</p>
        <div class="ol-item1 flex flex-Updown-between">
          <span>Charger Network</span>
          <img class="ml27" src="../assets/index/says/01.png" alt="" />
        </div>
      </div>
      <div class="overRight">
        <p class="ortoptit">Charger Network</p>
        <div class="sixLogin">
          <img src="../assets/index/0003.png" class="childAll" alt="" />
          <div class="childAll stronghold">
            <div class="sh1 strong" @click="tologin(5)"></div>
            <div class="sh2 strong" @click="tologin(4)"></div>
            <div class="sh3 strong" @click="tologin(3)"></div>
            <div class="sh4 strong" @click="tologin(2)"></div>
            <div class="sh5 strong" @click="tologin(1)"></div>
            <div class="sh6 strong" @click="tologin(0)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "seleteLogin",
  data() {
    return {};
  },
  methods: {
    tologin(value){
      this.$router.push('login')
    }
  },
};
</script>

<style scoped>
.ortoptit {
  margin-top: 5px;
}
.sh6 {
  top: 98px;
  left: 755px;
}
.sh5 {
  top: 413px;
  left: 605px;
}
.sh4 {
  top: 293px;
  left: 500px;
}
.sh3 {
  top: 293px;
  left: 285px;
}
.sh2 {
  top: 128px;
  left: 68px;
}
.sh1 {
  top: 55px;
  left: 380px;
}
.strong {
  width: 100px;
  height: 50px;
  /* background: #ff000080; */
  position: absolute;
}
.stronghold {
  position: absolute;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.5); */
}
.sixLogin {
  position: relative;
  z-index: 9999;
  width: 80%;
  height: 700px;
  margin-left: 10%;
  margin-top: 70px;
}
</style>
