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
            <p
              class="flex flex-Updown-between"
              :class="[isEmpty && utypes.value === '' ? 'borderRed' : '']"
              @click="isShowSlete1 = !isShowSlete1"
            >
              <span>{{ utypes.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div :class="['warningItem', isEmpty && utypes.value === '' ? '' : 'op0']">
              <img src="../../assets/index/warning.png" alt="" />
              <span>Please select a userType</span>
            </div>
            <!-- :style="{ height: isShowSlete1 ? '100%' : '0px' }" -->
            <div class="seleterBody" :class="[isShowSlete1 ? 'mh100' : 'h0']">
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
            <input
              type="text"
              :foucs="isEmpty && addUsers.userId === ''"
              :class="[isEmpty && addUsers.userId === '' ? 'borderRed' : '']"
              @input="queryUserId"
              v-model="addUsers.userId"
              placeholder="User  ID"
            />
            <div
              :class="[
                'warningItem',
                (addUsers.userId !== '' && isID) || (isEmpty && addUsers.userId === '')
                  ? ''
                  : 'op0',
              ]"
            >
              <img src="../../assets/index/warning.png" alt="" />
              <span v-if="addUsers.userId !== ''"
                >This ID already Existed，Please re-enter</span
              >
              <span v-if="isEmpty && addUsers.userId === ''">UserID is empty</span>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Password (Random)</span>
            <input
              type="password"
              :class="[isEmpty && addUsers.password === '' ? 'borderRed' : '']"
              v-model="addUsers.password"
              placeholder="password"
            />
            <div
              :class="['warningItem', isEmpty && addUsers.password === '' ? '' : 'op0']"
            >
              <img src="../../assets/index/warning.png" alt="" />
              <span>Password is empty</span>
            </div>
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
            <!--  :style="{ height: isShowSlete2 ? '100%' : '0px' }" -->
            <div class="seleterBody" :class="[isShowSlete2 ? 'mh100' : 'h0']">
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
            <input type="text" v-model="addUsers.department" placeholder="" />
          </div>
          <p class="leftTit">Contact information↓</p>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Name</span>
            <input
              type="text"
              :class="[isEmpty && addUsers.name === '' ? 'borderRed' : '']"
              v-model="addUsers.name"
              placeholder=""
            />
            <div :class="['warningItem', isEmpty && addUsers.name === '' ? '' : 'op0']">
              <img src="../../assets/index/warning.png" alt="" />
              <span>Name is empty</span>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>E-mail</span>
            <input
              type="text"
              :class="[
                isEmpty &&
                addUsers.email === '' &&
                !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
                  addUsers.email
                )
                  ? 'borderRed'
                  : '',
              ]"
              v-model="addUsers.email"
              placeholder=""
            />
            <div
              :class="[
                'warningItem',
                (isEmpty && addUsers.email === '') ||
                (addUsers.email !== '' &&
                  !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
                    addUsers.email
                  ))
                  ? ''
                  : 'op0',
              ]"
            >
              <img src="../../assets/index/warning.png" alt="" />
              <span>email format is wrong</span>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Staff ID (Optional)</span>
            <input type="text" v-model="addUsers.staffId" placeholder="" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Mobile Phone No.</span>
            <input
              type="text"
              :class="[isEmpty && addUsers.phone === '' ? 'borderRed' : '']"
              v-model="addUsers.phone"
              placeholder=""
            />
            <div :class="['warningItem', isEmpty && addUsers.phone === '' ? '' : 'op0']">
              <img src="../../assets/index/warning.png" alt="" />
              <span>Mobile Phone No. format is wrong</span>
            </div>
          </div>
          <!-- <div class="cdltopitem flex flex-Updown-between">
            <span>Verification code</span>
            <div class="getcode">
              <input type="text" v-model="addUsers.code" placeholder="code" />
            </div>
          </div> -->
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
            </p>
          </div>
          <div class="cdltopitem cdltopitem2 mr40 flex flex-Updown-between">
            <span>Name</span>
            <!--  @click="isShowSlete3 = !isShowSlete3" -->
            <p class="flex flex-Updown-between">
              <span>{{ $store.state.userInfo.name }}</span>
            </p>
          </div>
          <p class="createrightbottom">Access Rights:</p>
          <div class="pl50">
            <div></div>
            <div class="cdltopitem2 ctb mt0 mr40 flex flex-Updown-between">
              <span></span>
              <p class="mr56 op0">Yes</p>
              <!-- <p class="mr86 op0">No</p> -->
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
              <!-- <div class="mr86 op0">
                <img
                  v-if="item.value == 0"
                  src="../../assets/index/useraccount/03.png"
                  alt=""
                />
                <img v-else src="../../assets/index/useraccount/04.png" alt="" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" @click="cleaUser">Clear</div>
      <div
        class="UpdateCancels flex flex-center op0"
        style="margin-right: 144px; font-size: 14px"
      >
        <!-- <div @click="sendCode">
          <div>Send confirmation</div>
          <div>SMS to notice user</div>
        </div> -->
      </div>
      <div class="thebb" style="margin-right: 144px">
        <div class="button UpdateCancel" @click="createUser">Confirm</div>
        <p>Created and send the SMS to notice the new user</p>
      </div>
    </div>
  </div>
</template>

<script>
import { addOrUpdEntity, sendSms, roleKeySOE, findByAccount } from "../../common/api";
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
        // { userType: 4, value: "Adminstrator", level: 2 },
        // { userType: 5, value: "SystemManager", level: 1 },
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
      isEmpty: false,
      roleKey: {},
      isID: false,
      loadingInstance: null,
    };
  },
  created() {
    this.roleKey = JSON.parse(localStorage.getItem("roleKey"));
    let userType = this.roleKey.userType;
    // console.log(userType);
    let level = this.$store.state.userTypes.filter((item) => item.userType == userType)[0]
      .level;
    // console.log(level);
    this.userTypes = this.userTypes.filter((item) => level <= item.level && item.level!=6);
    this.prmselete = [
      { name: "Check  Status", value: this.roleKey.checkStatus },
      { name: "Control  Own  Charger", value: this.roleKey.controlOwnCharger },
      { name: "Control Other Chargers", value: this.roleKey.controlOtherChargers },
      { name: "View Data", value: this.roleKey.viewGeneralData },
      { name: "Create User", value: this.roleKey.createAccount },
      { name: "Configure System", value: this.roleKey.configureSystem },
    ];
  },
  beforeDestroy() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
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
      this.isEmpty = false;
    },
    //
    queryUserId() {
      findByAccount({ userId: this.addUsers.userId }).then((res) => {
        if (res.extend.pcUser) {
          this.isID = true;
        } else {
          this.isID = false;
        }
      });
    },
    createUser() {
      let addUsers = this.addUsers;
      // userId: "",
      // password: "",
      // name: "",
      // staffId: "",
      // email: "",
      // phone: "",
      // code: "",
      // userType: this.utypes.userType,
      // centreId: this.ctypes.centreId,
      if (
        this.utypes.userType === "" ||
        addUsers.userId === "" ||
        addUsers.password === "" ||
        addUsers.name === "" ||
        addUsers.email === "" ||
        addUsers.phone === ""
      ) {
        this.isEmpty = true;
        return this.$message.warning("Please fill in the required information!");
      }
      this.isEmpty = false;
      sendSms({
        account: this.addUsers.phone,
      }).then((res) => {
        if (res.code == 100) {
          this.$message.success("Captcha code has been sent");
          this.addUsers.code = res.extend.code;
          let data = {
            ...this.addUsers,
            userType: this.utypes.userType,
            centreId: this.ctypes.centreId,
          };
          this.loadingInstance = this.$loading({
            text: "Loading...",
            background: "rgba(0,0,0,.5)",
          });
          addOrUpdEntity(data)
            .then((res) => {
              this.$nextTick(() => {
                if (this.loadingInstance != null) {
                  this.loadingInstance.close();
                }
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
                if (this.loadingInstance != null) {
                  this.loadingInstance.close();
                }
              });
            });
        }
      });
    },
    sendCode() {},
  },
};
</script>

<style scoped>
.warningItem {
  position: absolute;
  height: 35px;
  padding: 0 20px;
  min-width: 150px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: #eee1d3;
  font-size: 16px;
  color: #ea9518;
  /* right: -365px; */
  left: 101%;
  transition: all 0.2s linear;
  opacity: 1;
  z-index: 999;
}
.warningItem img {
  width: 20px !important;
  height: 20px !important;
  margin-right: 10px;
}
.warningItem span {
  display: block;
  white-space: nowrap;
}
.op0 {
  opacity: 0 !important;
}
.thebb {
  position: relative;
}
.thebb > p {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 14px;
}
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
  margin-left: 120px;
  /* margin-bottom: 42px; */
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
  margin-top: 20px;
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
.borderRed {
  border: 1px solid red !important;
  /* color: #e4941ddc; */
}
</style>
