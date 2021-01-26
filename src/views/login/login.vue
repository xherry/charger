<template>
  <div class="loginBox">
    <p class="toAdmin button" @click="toAdmin">Admin Login</p>
    <div class="login-img">
      <img class="childAll" :src="loginImg" v-if="!showLoading" alt="" />
      <img src="../../assets/icon.png" class="plogo" alt="" />
    </div>
    <div class="login-input-box">
      <div id="inputValue" v-if="!iscode">
        <div>
          <p class="wtl">Welcome to login</p>
          <div class="login-input userID">
            <img src="../../assets/index/login/04.png" alt="" />
            <input
              type="text"
              v-model="userInfo.userId"
              placeholder="User ID ( if any )"
            />
          </div>
          <div class="login-input Password">
            <img src="../../assets/index/login/03.png" alt="" />
            <input
              type="password"
              v-model="userInfo.password"
              placeholder="Password ( if any )"
            />
          </div>
          <div class="login-input Charger" style="margin-bottom: 0px">
            <img src="../../assets/index/login/05.png" alt="" />
            <input
              type="text"
              v-model="userInfo.chargerNumber"
              placeholder="Charger Number ( eg: SSP-068 )"
            />
          </div>
          <div class="elseor">
            <p>or</p>
          </div>
          <div class="login-input Vehicle">
            <img src="../../assets/index/login/02.png" alt="" />
            <input
              type="text"
              v-model="userInfo.vehicleNumber"
              placeholder="Vehicle Number"
            />
          </div>
          <div class="button loginButton" @click="toLogin">login</div>
          <!-- <p class="clgs vtl" @click="isVisitors = true">Visitors to login</p> -->
        </div>
        <!-- <div class="visitors" v-else>
          <img src="../../assets/icon.png" alt="" />
          <div class="button loginButton" @click="visitorLogin">Visitors to login</div>
          <div class="button loginButton clg" @click="isVisitors = false">
            Account password login
          </div>
        </div> -->
      </div>
      <div id="inputCode" v-else>
        <!-- <div class="codeValue" style="margin-bottom: 0">
          <input
            type="text"
            class="childAll"
            v-model="phone"
            placeholder="Mobile Phone"
          />
          <p class="button" @click="sendCode">send</p>
        </div> -->
        <div class="codeValue">
          <input
            type="text"
            class="childAll"
            v-model="phoneCode"
            placeholder="Security Code"
          />
        </div>
        <p class="explaincode">
          Please enter the security code , which has been sent to your mobile phone
        </p>
        <div class="button loginButton enter" @click="toIndex">Enter</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, loginTwo, sendSms } from "../../common/api";
export default {
  name: "login",
  data() {
    return {
      isVisitors: true,
      iscode: false,
      userInfo: {
        userId: "", //liaojingxing
        password: "", //123456
        chargerNumber: "",
        vehicleNumber: "",
      },
      phoneCode: "",
      phone: "",
      loginImg: require("../../assets/index/login/06.png"),
      showLoading: true,
    };
  },
  mounted() {
    let bgImg = new Image();
    bgImg.src = this.loginImg; // 获取背景图片的url
    let loadingInstance = this.$loading({
      text: "Loading...",
      background: "rgba(0,0,0,.5)",
    });
    bgImg.onerror = () => {
      console.log("img onerror");
    };
    bgImg.onload = () => {
      // 等背景图片加载成功后 去除loading
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
      this.showLoading = false;
    };
  },
  methods: {
    toAdmin() {
      window.location.href = "https://www.clplms.com/pc";
    },
    // 游客登录
    visitorLogin() {
      localStorage.clear();
      localStorage.setItem("loginType", "1");
      this.$store.commit("getUserInfo", { pcUser: {} });
      let loginInfos = this.$store.state.loginInfos;
      loginInfos.cno = this.userInfo.chargerNumber;
      loginInfos.location = "G";
      loginInfos.vno = this.userInfo.vehicleNumber;
      this.$store.commit("setLoginInfos", loginInfos);
      this.$router.push("overview");
    },
    sendCode() {
      sendSms({
        account: this.phone,
      }).then((res) => {
        // console.log(res, "发送验证码");
        if (res.code == 100) {
          // this.phoneCode = res.extend.code;
          this.$message.success("Captcha code has been sent");
        }
      });
    },
    toLogin() {
      if (this.userInfo.userId === "" && this.userInfo.password === "") {
        if (this.userInfo.chargerNumber !== "" || this.userInfo.vehicleNumber !== "") {
          this.visitorLogin();
          return;
        }
        if (this.userInfo.chargerNumber === "" && this.userInfo.vehicleNumber === "") {
          return this.$message.warning("Please enter login information");
        }
      }
      Login(this.userInfo).then((res) => {
        // console.log(res);
        if (res.code == 100) {
          if (res.extend.smsCode) {
            this.phone = res.extend.phone;
            this.sendCode();
            this.iscode = true;
          } else {
            localStorage.setItem("userId", res.extend.pcUser.id);
            localStorage.setItem("roleKey", JSON.stringify(res.extend.roleKey));
            this.$store.commit("getUserInfo", res.extend);
            let loadingInstance = this.$loading({
              text: "Loading...",
              background: "rgba(0,0,0,.5)",
            });
            if (this.userInfo.chargerNumber !== ""||this.userInfo.vehicleNumber !== "") {
              let loginInfos = this.$store.state.loginInfos;
              loginInfos.cno = this.userInfo.chargerNumber;
              loginInfos.location = "G";
              loginInfos.vno = this.userInfo.vehicleNumber;
              this.$store.commit("setLoginInfos", loginInfos);
              setTimeout(() => {
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
                this.$router.replace({
                  name: "overview",
                  query: { navSeleted: 2, loginInfos },
                });
              }, 1000);
            } else {
              setTimeout(() => {
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
                this.$router.replace("index");
              }, 1000);
            }
            this.$message.success("Log in successfully！");
          }
        }
      });
    },
    //
    toIndex() {
      if (!this.phoneCode) {
        this.$message.warning("Please enter the security code");
        return;
      }
      loginTwo({ ...this.userInfo, code: this.phoneCode }).then((res) => {
        // console.log(res);
        if (res.code == 100) {
          localStorage.setItem("userId", res.extend.pcUser.id);
          localStorage.setItem("roleKey", JSON.stringify(res.extend.roleKey));
          this.$store.commit("getUserInfo", res.extend);
          let loadingInstance = this.$loading({
            text: "Loading...",
            background: "rgba(0,0,0,.5)",
          });
          if (this.userInfo.chargerNumber !== ""||this.userInfo.vehicleNumber !== "") {
            let loginInfos = this.$store.state.loginInfos;
            loginInfos.cno = this.userInfo.chargerNumber;
            loginInfos.location = "G";
            loginInfos.vno = this.userInfo.vehicleNumber;
            this.$store.commit("setLoginInfos", loginInfos);
            setTimeout(() => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              this.$router.replace({
                name: "overview",
                query: { navSeleted: 2, loginInfos },
              });
            }, 1000);
          } else {
            setTimeout(() => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              this.$router.replace("index");
            }, 600);
          }
          this.$message.success("Log in successfully！");
        } else {
          this.iscode = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.toAdmin {
  padding: 10px 20px;
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  right: 60px;
  top: 20px;
  background: rgba(33, 69, 177, 0.7);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 1px 1px 2px #ffffff60;
}
.clg {
  /* width: 100%;
  text-align: right;
  font-size: 18px; */
  color: #fff;
  margin-top: 20px !important;
}
.vtl {
  text-align: right;
  width: 418px;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 18px;
}
.visitors > img {
  width: 250px;
  height: 60px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.visitors {
  margin-top: 50%;
  display: inline-block;
  text-align: center;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}
.elseor {
  font-size: 20px;
  text-align: center;
  margin: 5px 0;
}
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
  position: relative;
  margin: 0 auto;
  margin-bottom: 30px;
  margin-top: 250px;
}
.codeValue input {
  padding: 0 40px;
  background: #1db9fd80;
  border: 1px solid #00ffff80;
  color: #fff;
  font-size: 20px;
  outline: 0;
  display: block;
}
.codeValue p {
  height: 100%;
  font-size: 22px;
  right: 0px;
  width: 80px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 0;
  cursor: pointer;
  /* color: ; */
  background: #00ffff50;
  border-radius: 0;
}
.codeValue input::placeholder {
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
  color: #ffffff !important;
  font-size: 20px;
  outline: 0;
}
.login-input > input::-webkit-input-placeholder {
  /* color: #ffffff; */
  font-size: 20px;
}
.wtl {
  font-size: 36px;
  text-align: center;
  margin-bottom: 28px;
  margin-top: 175px;
}

.login-img {
  width: 1150px;
  height: 651px;
  position: absolute;
  top: 198px;
  left: 101px;
  /* background: url("../../assets/index/login/06.png") no-repeat;
  background-size: 100% 100%; */
}
.plogo {
  width: 200px;
  height: 45px;
  position: absolute;
  top: 80px;
  left: 410px;
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
