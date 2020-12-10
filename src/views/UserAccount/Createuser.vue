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
            <span>User type</span>
            <p class="flex flex-Updown-between" @click="isShowSlete1 = !isShowSlete1">
              <span>{{ utypes.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete1 ? '200px' : '0px' }">
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
            <span>Password</span>
            <input type="password" v-model="addUsers.password" placeholder="password" />
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Centre (optional)</span>
            <p class="flex flex-Updown-between" @click="isShowSlete2 = !isShowSlete2">
              <span>{{ ctypes.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete2 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete2 ? '200px' : '0px' }">
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
            <span>Department (optional)</span>
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
            <span>Staff (optional)</span>
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
              <div class="flex flex-center" @click="sendCode"><span></span> send</div>
            </div>
          </div>
        </div>
        <div class="createright">
          <p class="js">Creator cannot create a new user with accessrights higher than</p>
          <div class="cdltopitem cdltopitem2 mr40 flex flex-Updown-between">
            <span>User type</span>
            <p class="flex flex-Updown-between" @click="isShowSlete3 = !isShowSlete3">
              <span>{{ utypes1.value }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete3 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete3 ? '200px' : '0px' }">
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
            </div>
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
            <div class="mr56" @click="item.isChoose = !item.isChoose">
              <img
                v-if="item.isChoose"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="mr86" @click="item.isChoose = !item.isChoose">
              <img
                v-if="item.isChoose"
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
        <div>
          <div>Send confirmation</div>
          <div>SMS to notice user</div>
        </div>
      </div>
      <div class="button UpdateCancel">Clear</div>
    </div>
  </div>
</template>

<script>
import { addOrUpdEntity, sendSms } from "../../common/api";
export default {
  name: "Createuser",
  data() {
    return {
      isShowSlete1: false,
      isShowSlete2: false,
      isShowSlete3: false,
      prmselete: [
        { name: "Check  Status", isChoose: false },
        { name: "Control  Own  Charger", isChoose: false },
        { name: "Control Other Chargers", isChoose: false },
        { name: "View Data", isChoose: false },
        { name: "Create User", isChoose: false },
        { name: "Configure System", isChoose: false },
      ],
      utypes: {
        userType: "",
        value: "",
      },
      utypes1: {
        userType: "",
        value: "",
      },
      userTypes: [
        { userType: 0, value: "guest" },
        { userType: 1, value: "generalUser" },
        { userType: 2, value: "operator" },
        { userType: 3, value: "superUser" },
        { userType: 4, value: "adminstrator" },
        { userType: 5, value: "systemManager" },
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
    };
  },
  methods: {
    createUser() {
      let data = {
        ...this.addUsers,
        userType: this.utypes.userType,
        centreId: this.ctypes.centreId,
      };
      addOrUpdEntity(data).then((res) => {
        console.log(res);
      });
      
    },
    sendCode(){
      sendSms({
        account:this.addUsers.phone
      }).then(res=>{
        console.log(res)
      })
    },
  },
};
</script>

<style scoped>
.getcode input{
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
.getcode div span{
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
