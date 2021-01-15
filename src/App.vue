<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("userId")) {
      this.$store.commit("setUserInfo");
    }
  },
};
</script>

<style>
@import "./common/comm.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  color: #ffffff;
}

.bgs {
  /* background: url("./assets/index/bg01.png") no-repeat;
  background-size: 100% 100%; */
  /* border-top: 0.5px solid transparent; */
}
.topBg {
  width: 100%;
  height: 593px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  /* background: url("./assets/index/bg02.png") no-repeat;
  background-size: 100% 100%; */
}
.seleteDate input {
  cursor: pointer !important;
}
.ortoptit {
  width: 640px;
  height: 42.7px;
  text-align: center;
  margin-left: 448px;
  font-size: 24px;
  line-height: 42.7px;
}
.overRight {
  width: 1506px;
  height: 892px;
  background: url("./assets/index/overview/06.png") no-repeat;
  background-size: 100% 100%;
  padding-left: 61px;
  box-sizing: border-box;
}

.ol-item2 {
  width: 331px;
  height: 80px;
  background: url("./assets/index/overview/09.png") no-repeat;
  background-size: 100% 100%;
  color: #59baf2;
  font-size: 22px;
  padding: 0 26px 0 42px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.ol-item2 > img {
  width: 34px;
  height: 34px;
  margin-left: 14px;
}

.mt50 {
  margin-top: 50px;
}

.overLeft {
  width: 382px;
  margin-right: 10px;
}

.overLeft > p {
  text-align: center;
  color: #59baf2;
  font-size: 30px;
  margin-bottom: 30px;
}

.ol-item1 {
  background: url("./assets/index/overview/08.png") no-repeat;
  width: 331px;
  height: 80px;
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 22px;
  padding: 0 26px 0 42px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.ol-item1 > img {
  width: 34px;
  height: 34px;
}

.ml27 {
  margin-left: 27px;
}
ul {
  display: flex;
  align-items: center;
}
ul li {
  list-style: none;
}
.uldatas > li {
  color: #63d1ff;
}
.uldatas > li input {
  width: 100%;
  background: transparent;
  outline: 0;
  text-align: center;
  border: 0;
  color: #63d1ff;
}
ul {
  height: 57px;
}
ul:nth-child(2n) {
  background: #143c7c;
}
ul > li {
  flex: 1;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  position: relative;
  text-align: center;
}
.ultit {
  width: 100%;
  margin-top: 23px;
}
.ultit > li {
  color: #fff;
}
.tables {
  width: 1394px;
  height: 677px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 25px;
  /*  padding: 0 49px 0 29px; */
  box-sizing: border-box;
  /* overflow-x: hidden;
  overflow-y: auto; */
}
.seleters {
  width: 18px;
  height: 10px;
  margin-left: 43px;
  transition: all 0.2s linear;
}
.sleterMain {
  width: 100%;
  position: absolute;
  right: 0;
  top: 100%;
  background: #255197;
  z-index: 66;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s linear;
  box-shadow: 0 0 3px #fff;
}
.operation {
  width: 297px;
  height: 50px;
  background: #33a0fe;
  border-radius: 4px;
  color: #fff;
  font-size: 24px;
  line-height: 50px;
  margin-top: 17px;
  margin-left: 101px;
}

.blueInput {
  width: 365px;
  height: 46px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 20px 0 36px;
  box-sizing: border-box;
  color: #fff;
  font-size: 18px;
  outline: 0;
}
.overRights {
  width: 1508px;
  height: 744px;
  background: url("./assets/index/useraccount/bg03.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.UpdateCancel {
  line-height: 38px;
}
li img{
  position: absolute;
  right: 10px;
  /* top: 50%;
  transform: translateY(-50%); */
}
.UpdateCancels,
.UpdateCancel {
  width: 236px;
  height: 38px;
  background: linear-gradient(0deg, #2d74ac, #1f4fbd);
  border-radius: 8px;
  font-size: 20px;
  margin-top: 33px;
}
.seleterBody {
  width: 224px;
  position: absolute;
  right: 0;
  top: 100%;
  background: #255197;
  z-index: 66;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s linear;
  box-shadow: 0 0 3px #fff;
}
input::-webkit-input-placeholder {
  color: #ffffff90;
}
.seleterBody .seleter_item,
.sleterMain .seleter_item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #ffffff80;
  border-radius: 0px !important;
  cursor: pointer;
}
input::-ms-input-placeholder {
  color: #666;
}
li .imgSelete {
  position: absolute;
  right: 0;
  /* top: 50%; */
  /* transform: translateY(-50%); */
  margin-left: 0;
}
.el-pager {
  background: transparent !important;
}
.pagination {
  width: 100%;
  position: absolute;
  bottom: 0px;
  text-align: right;
  padding-right: 35px;
  box-sizing: border-box;
  z-index: 33;
}
.el-pagination__jump,
.el-pagination__total {
  color: #fff !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #143c7c !important;
}
.bshow {
  box-shadow: inset 0 0 10px 0 #ffffff;
}
</style>
