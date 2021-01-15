<template>
  <div class="createuser">
    <div class="overRights">
      <p class="ortoptit"></p>
      <div class="flex ctops flex-Updown-between">
        <div class="citem">New User</div>
        <div class="citem">Creator</div>
      </div>
      <div class="create flex">
        <div class="createleft">
          <p class="leftTit">User information↓</p>
          <div class="cdltopitem flex flex-Updown-between">
            <span>User Type</span>
            <p class="flex flex-Updown-between" @click="isShowSlete1 = !isShowSlete1">
              <span>{{ utypes.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete1 ? '150px' : '0px' }">
              <div
                class="button seleter_item"
                v-for="(item, index) in userTypes"
                :key="index"
                @click="
                  (utypes.userType = item.userType),
                    (utypes.value = item.value),
                    (isShowSlete1 = false)
                "
              >
                {{ item.value }}
              </div>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>User ID</span>
            <input type="text" v-model="addUsers.userId" placeholder="User  ID" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Password (Random)</span>
            <input type="password" v-model="addUsers.password" placeholder="password" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Centre (Optional)</span>
            <p class="flex flex-Updown-between" @click="isShowSlete2 = !isShowSlete2">
              <span>{{ ctypes.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete2 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete2 ? '150px' : '0px' }">
              <div
                class="button seleter_item"
                v-for="(item, index) in centerType"
                :key="index"
                @click="
                  (ctypes.centreId = item.centreId),
                    (ctypes.value = item.value),
                    (isShowSlete2 = false)
                "
              >
                {{ item.value }}
              </div>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Department (Optional)</span>
            <input type="text" v-model="addUsers.department" placeholder="howhow" />
          </div>
          <p class="leftTit">Contact information↓</p>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Name</span>
            <input type="text" v-model="addUsers.name" placeholder="what  why" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>E-mail</span>
            <input type="text" v-model="addUsers.email" placeholder="this  is ID" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Staff ID (Optional)</span>
            <input type="text" v-model="addUsers.staffId" placeholder="whatwhat" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Mobile Phone No.</span>
            <input type="text" v-model="addUsers.phone" placeholder="Phone " />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Verification code</span>
            <div class="getcode">
              <input type="text" v-model="addUsers.code" placeholder="code" />
            </div>
          </div>
        </div>
        <div class="createright">
          <p class="js">
            Creator cannot create a new user with access rights higher than his own level
          </p>
          <div class="cdltopitem cdltopitem2 mr40 flex flex-Updown-between">
            <span>User Type</span>
            <!--  @click="isShowSlete3 = !isShowSlete3" -->
            <p class="flex flex-Updown-between">
              <span>{{ roleKey.userType | utype }}</span>
              <!-- <img
                :style="{ transform: `rotate(${isShowSlete3 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              /> -->
            </p>
            <!-- <div class="seleterBody" :style="{ height: isShowSlete3 ? '200px' : '0px' }">
              <div
                class="button seleter_item"
                v-for="(item, index) in userTypes"
                :key="index"
                @click="
                  (utypes1.userType = item.userType),
                    (utypes1.value = item.value),
                    (isShowSlete3 = false)
                "
              >
                {{ item.value }}
              </div>
            </div> -->
          </div>
          <p class="createrightbottom">Access Rights:</p>
          <div></div>
          <div class="cdltopitem2 ctb mr40 flex flex-Updown-between">
            <span></span>
            <p class="mr56">Yes</p>
            <p class="mr86">No</p>
          </div>
          <div
            class="cdltopitem2 ctb mr40 flex flex-Updown-between"
            v-for="(item, index) in prmselete"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <!--  @click="item.value = item.value == 0 ? 1 : 0" -->
            <div class="mr56">
              <img
                v-if="item.value == 0"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <!-- @click="item.value = item.value == 0 ? 1 : 0" -->
            <div class="mr86">
              <img
                v-if="item.value == 0"
                src="../../assets/index/useraccount/03.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/04.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" style="margin-right: 144px" @click="createUser">
        Creat new user
      </div>
      <div
        class="button UpdateCancels flex flex-center"
        style="margin-right: 144px; font-size: 14px"
      >
        <div @click="sendCode">
          <div>Send confirmation</div>
          <div>SMS to notice user</div>
        </div>
      </div>
      <div class="button UpdateCancel" @click="cleaUser">Clear</div>
    </div>
  </div>
</template>

<script>
import { addOrUpdEntity, sendSms, roleKeySOE } from "../../common/api";
export default {
  name: "Createuser",
  data() {
    return {
      isShowSlete1: false,
      isShowSlete2: false,
      isShowSlete3: false,
      prmselete: [],
      utypes1: {
        userType: "",
        value: "",
      },
      utypes: {
        userType: "",
        value: "",
      },
      userTypes: [
        { userType: 0, value: "Guest", level: 6 },
        { userType: 1, value: "GeneralUser", level: 5 },
        { userType: 2, value: "Operator", level: 4 },
        { userType: 3, value: "SuperUser", level: 3 },
        { userType: 4, value: "Adminstrator", level: 2 },
        { userType: 5, value: "SystemManager", level: 1 },
      ],
      ctypes: {
        centreId: "",
        value: "",
      },
      centerType: [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung HoM HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
      ],
      addUsers: {
        userId: "",
        password: "",
        department: "",
        name: "",
        staffId: "",
        email: "",
        phone: "",
        code: "",
      },
      roleKey: {},
    };
  },
  created() {
    this.roleKey = JSON.parse(localStorage.getItem("roleKey"));
    let userType = this.roleKey.userType;
    let level = this.userTypes.filter((item) => item.userType == userType)[0].level;
    this.userTypes = this.userTypes.filter(
      (item) => level <= item.level && item.level !== 6
    );
    this.prmselete = [
      { name: "Check  Status", value: this.roleKey.checkStatus },
      { name: "Control  Own  Charger", value: this.roleKey.controlOwnCharger },
      { name: "Control Other Chargers", value: this.roleKey.controlOtherChargers },
      { name: "View Data", value: this.roleKey.viewGeneralData },
      { name: "Create User", value: this.roleKey.createAccount },
      { name: "Configure System", value: this.roleKey.configureSystem },
    ];
  },
  methods: {
    cleaUser() {
      for (let key in this.addUsers) {
        this.addUsers[key] = "";
      }
      this.utypes.userType = "";
      this.utypes.value = "";
      this.ctypes.centreId = "";
      this.ctypes.value = "";
    },
    //
    createUser() {
      let data = {
        ...this.addUsers,
        userType: this.utypes.userType,
        centreId: this.ctypes.centreId,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      addOrUpdEntity(data)
        .then((res) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          // console.log(res);
          if (res.code == 100) {
            this.$message.success("Creating a successful");
            for (let key in this.addUsers) {
              this.addUsers[key] = "";
            }
            this.utypes.userType = "";
            this.utypes.value = "";
            this.ctypes.centreId = "";
            this.ctypes.value = "";
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
    sendCode() {
      sendSms({
        account: this.addUsers.phone,
      }).then((res) => {
        if (res.code == 100) {
          this.$message.success("Captcha code has been sent");
          // this.addUsers.code = res.extend.code;
        }
        // console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.getcode input {
  padding-right: 80px !important;
}
.getcode div {
  width: 60px;
  height: 100%;
  position: absolute;
  right: 10px;
  top: 0;
  color: rgb(96, 168, 235);
  font-size: 14px;
  cursor: pointer;
}
.getcode div span {
  width: 1px;
  height: 20px;
  background-color: #ffffff;
  margin-right: 5px;
}
.getcode {
  position: relative;
  width: 224px;
  height: 38px;
}
.overRights {
  height: 794px;
}
.createright .ctb {
  margin-top: 20px;
}
.ctb p {
  width: 25px;
  height: 25px;
  text-align: center;
}
.ctb img {
  width: 25px;
  height: 25px;
}
.ctb > span {
  text-align: right;
  color: #63d1ff;
  font-size: 16px;
}
.mr56 {
  margin-left: 56px;
}
.mr86 {
  margin-left: 86px;
}
.createrightbottom {
  width: 400px;
  text-align: right;
  color: #63d1ff;
  font-size: 24px;
  margin-top: 80px;
  margin-bottom: 42px;
}
.createright .cdltopitem2 > span {
  width: 400px;
}
.js {
  color: #ffffff;
  font-size: 16px;
  margin-top: 19px;
  margin-left: 405px;
  width: 236px;
  line-height: 17px;
}

.leftTit {
  color: #63d1ff;
  font-size: 24px;
  display: inline-block;
  width: 452px;
  text-align: right;
  margin-top: 25px;
}
.cdltopitem img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.cdltopitem input,
.cdltopitem p {
  width: 224px;
  height: 38px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 17px 0 23px;
  box-sizing: border-box;
  color: #63d1ff;
  font-size: 17px;
  cursor: pointer;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 18px;
  display: inline-block;
  width: 452px;
  text-align: right;
  margin-right: 16px;
}
.cdltopitem {
  margin-top: 16px;
  position: relative;
}
.citem {
  width: 191px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color: #0a3161;
  background: #63d1ff;
}
.ctops {
  width: 100%;
  padding: 0 219px;
  box-sizing: border-box;
}
</style>
