<template>
  <div class="loginBox">
    <div class="login-img"></div>
    <div class="login-input-box">
      <div id="inputValue" v-if="!iscode">
        <p class="wtl">Welcome to login</p>
        <div class="login-input userID">
          <img src="../../assets/index/login/04.png" alt="" />
          <input type="text" placeholder="User ID（if any）" />
        </div>
        <div class="login-input Password">
          <img src="../../assets/index/login/03.png" alt="" />
          <input type="password" placeholder="Password ( if any )）" />
        </div>
        <div class="login-input Charger">
          <img src="../../assets/index/login/05.png" alt="" />
          <input type="text" placeholder="Charger Number" />
        </div>
        <div class="login-input Vehicle">
          <img src="../../assets/index/login/02.png" alt="" />
          <input type="text" placeholder="Vehicle Number" />
        </div>
        <div class="button loginButton" @click="iscode = true">login</div>
      </div>
      <div id="inputCode" v-else>
        <input type="text" class="codeValue" placeholder="Security Code" />
        <p class="explaincode">Please enter the security code , which has been sent to your mobile phone</p>
        <div class="button loginButton enter" @click="iscode = true,$router.push('index')">Enter</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      iscode: false,
    };
  },
};
</script>

<style scoped>
.explaincode {
  font-size: 24px;
  line-height: 36px;
  width: 415px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 79px;
}
.codeValue {
  width: 418px;
  height: 50px;
  padding: 0 40px;
  background: #1db9fd80;
  border: 1px solid #00ffff80;
  color: #fff;
  font-size: 20px;
  margin: 0 auto;
  margin-bottom: 66px;
  margin-top: 220px;
  outline: 0;
  display: block;
}
.codeValue::placeholder {
  text-align: center;
}
.loginButton {
  width: 418px;
  margin: 0 auto;
  height: 50px;
  background: #33a0fe;
  border-radius: 4px;
  line-height: 50px;
  font-size: 24px;
}
.login-input > img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.Vehicle > img {
  width: 28px;
  height: 22px;
}
.Charger > img {
  width: 28px;
  height: 28px;
}
.Password > img {
  width: 22px;
  height: 28px;
}
.userID > img {
  width: 28px;
  height: 27px;
}
.login-input {
  width: 418px;
  height: 50px;
  margin-bottom: 23px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
}
.login-input > input {
  width: 100%;
  height: 100%;
  background: #1db9fd;
  border: 1px solid #00ffff;
  padding-left: 76px;
  box-sizing: border-box;
  color: #333;
  font-size: 20px;
  outline: 0;
}
.login-input > input::-webkit-input-placeholder {
  color: #ffffff;
  font-size: 20px;
}
.wtl {
  font-size: 36px;
  text-align: center;
  margin-bottom: 39px;
  margin-top: 195px;
}

.login-img {
  width: 1150px;
  height: 651px;
  position: absolute;
  top: 198px;
  left: 101px;
  background: url("../../assets/index/login/06.png") no-repeat;
  background-size: 100% 100%;
}
.login-input-box {
  position: absolute;
  right: 113px;
  top: 25px;
  width: 643px;
  height: 671px;
  background: url("../../assets/index/login/01.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginBox {
  width: 1776px;
  height: 839px;
  background: url("../../assets/index/login/07.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 41px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
  z-index: 9;
}
</style>
