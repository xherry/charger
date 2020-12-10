<template>
  <div class="">
    <div class="overRights">
      <p class="ortoptit">Create User Access Rights</p>
      <div class="access">
        <div class="flex userTable">
          <ul class="userTable-left">
            <li>Access Right level</li>
            <li>User Type</li>
          </ul>
          <div class="userTableMiddle">
            <p>Access Right</p>
            <ul>
              <li>Check Status</li>
              <li>Control Own Charger</li>
              <li>Control Other Charger</li>
              <li>View Gereral Data</li>
              <li>Data Report</li>
              <li>Create Account</li>
              <li>Configure System</li>
            </ul>
          </div>
          <div class="userTableRight">
            <p>Webpage Login Control</p>
            <ul>
              <li>User id Password</li>
              <li>SMS Password</li>
            </ul>
          </div>
        </div>
        <div
          class="flex userTable bp"
          v-for="(item, index) in roleKeyList"
          :key="'r' + index"
        >
          <ul class="userTable-left bp">
            <li><span>1</span></li>
            <li><span>Name</span></li>
          </ul>
          <div class="userTableMiddle bp">
            <ul class="userUl">
              <li>
                <img class="dui" src="../../assets/index/useraccount/01.png" alt="" />
              </li>
              <li>
                <img class="cuo" src="../../assets/index/useraccount/02.png" alt="" />
              </li>
              <li>
                <img class="dui" src="../../assets/index/useraccount/01.png" alt="" />
              </li>
              <li>
                <img class="dui" src="../../assets/index/useraccount/01.png" alt="" />
              </li>
              <li>
                <img class="dui" src="../../assets/index/useraccount/01.png" alt="" />
              </li>
              <li>
                <img class="cuo" src="../../assets/index/useraccount/02.png" alt="" />
              </li>
              <li>
                <img class="cuo" src="../../assets/index/useraccount/02.png" alt="" />
              </li>
            </ul>
          </div>
          <div class="userTableRight bp">
            <ul>
              <li><span>No</span></li>
              <li><span>Yes</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" style="margin-right: 144px">Update</div>
      <div class="button UpdateCancel">Cancel</div>
    </div>
  </div>
</template>

<script>
import { roleKeyFindAll,roleKeySOE } from "../../common/api";
export default {
  name: "Creatusertype",
  data() {
    return {
      roleKeyList: [],
      page: 1,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      let data = {
        userId: 1,
        page: this.page,
        limit: 10,
      };
      roleKeyFindAll(data).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.roleKeyList = res.extend.roleKeyList;
        }
      });
    },
  },
};
</script>

<style scoped>
.overRights {
  height: 792px;
}
.bp {
  background: transparent !important;
  height: 68px !important;
}
.bp ul {
  height: 68px !important;
}

.bp li {
  height: 68px !important;
  border-right: 1px solid #205cbf;
  text-align: center;
}
.userUl .dui {
  width: 27px;
  height: 27px;
}
.userUl .cuo {
  width: 31px;
  height: 31px;
}
.bp li:last-of-type {
  border-right: none;
}
.userTableMiddle p,
.userTableRight p {
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #205cbf;
}
.userTableMiddle ul,
.userTableRight ul {
  height: 94px;
}
.userTableMiddle li,
.userTableRight li {
  font-size: 16px;
  text-align: center;
}

.userTableMiddle,
.userTableRight {
  height: 131px;
}
.userTableMiddle {
  width: 873px;
}
.userTableRight {
  width: 262px;
}
.userTableMiddle {
  border: 1px solid #205cbf;
  border-top: none;
  border-bottom: none;
}

.userTable li {
  border-right: 1px solid #205cbf;
}
.userTable li:last-of-type {
  border-right: none;
}
.userTable-left {
  width: 271px;
  height: 131px;
}
.userTable ul {
  background: transparent;
}

.userTable {
  width: 100%;
  border-bottom: 1px solid #205cbf;
}

.borderline {
  border: 1px solid #205cbf;
}
.userTable-left > li {
  text-align: center;
  font-size: 18px;
  height: 131px;
}
.userTable {
  background: #0d264e;
}
.access {
  width: 1406px;
  height: 677px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 25px;
  overflow-x: hidden;
  overflow-y: auto;
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
