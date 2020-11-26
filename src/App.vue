<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import "./common/common.css";
@import "./common/comm.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 1080px;
  color: #ffffff;
}
.bgs {
  background: url("./assets/index/bg01.png") no-repeat;
  background-size: 100% 100%;
  border-top: 0.5px solid transparent;
}
.topBg {
  width: 100%;
  height: 593px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: url("./assets/index/bg02.png") no-repeat;
  background-size: 100% 100%;
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
}
</style>
