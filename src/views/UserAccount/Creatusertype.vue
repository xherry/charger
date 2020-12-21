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
        <div v-for="(item, index) in roleKeyList" :key="'r' + index">
          <div
            :class="['flex', 'userTable', 'bp', roleKeyIndex === index ? 'bshow' : '']"
            v-if="item.userType != null"
            @click="seleteUl(index, item.id)"
          >
            <ul class="userTable-left bp">
              <li><span>1</span></li>
              <li>
                <span>{{ item.userType | utype }}</span>
              </li>
            </ul>
            <div class="userTableMiddle bp">
              <ul class="userUl">
                <li
                  @click="
                    item.checkStatus =
                      roleKeyIndex === index ? (item.checkStatus == 0 ? 1 : 0) : ''
                  "
                >
                  <img
                    v-if="item.checkStatus == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li @click="item.controlOwnCharger = item.controlOwnCharger == 0 ? 1 : 0">
                  <img
                    v-if="item.controlOwnCharger == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li
                  @click="
                    item.controlOtherChargers = item.controlOtherChargers == 0 ? 1 : 0
                  "
                >
                  <img
                    v-if="item.controlOtherChargers == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li @click="item.viewGeneralData = item.viewGeneralData == 0 ? 1 : 0">
                  <img
                    v-if="item.viewGeneralData == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li @click="item.dataReport = item.dataReport == 0 ? 1 : 0">
                  <img
                    v-if="item.dataReport == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li @click="item.createAccount = item.createAccount == 0 ? 1 : 0">
                  <img
                    v-if="item.createAccount == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
                <li @click="item.configureSystem = item.configureSystem == 0 ? 1 : 0">
                  <img
                    v-if="item.configureSystem == 0"
                    class="dui"
                    src="../../assets/index/useraccount/01.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="cuo"
                    src="../../assets/index/useraccount/02.png"
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div class="userTableRight bp">
              <ul>
                <li @click="item.userIdPassword = item.userIdPassword == 0 ? 1 : 0">
                  <span>{{ item.userIdPassword == 0 ? "Yes" : "No" }}</span>
                </li>
                <li @click="item.smsPasscode = item.smsPasscode == 0 ? 1 : 0">
                  <span>{{ item.smsPasscode == 0 ? "Yes" : "No" }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="sizeChange"
            background
            layout=" prev, pager, next, jumper, ->, total, slot"
            :total="count"
            hide-on-single-page
            :page-size='7'
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" style="margin-right: 144px" @click="updateRoleKey">
        Update
      </div>
      <div class="button UpdateCancel" @click="Cancel">Cancel</div>
    </div>
  </div>
</template>

<script>
import { roleKeyFindAll, roleKeySOE } from "../../common/api";
export default {
  name: "Creatusertype",
  data() {
    return {
      roleKeyList: [],
      oldRoleKeyList: [],
      page: 1,
      roleKeyId: "",
      roleKeyIndex: "",
      count: 0,
    };
  },
  created() {},
  mounted() {
    this.getRoleList();
  },
  methods: {
    // 页码切换
    sizeChange(value) {
      this.page = value;
      this.getRoleList();
    },
    // 取消修改
    Cancel() {
      this.roleKeyId = "";
      this.roleKeyIndex = "";
      this.getRoleList();
    },
    // 修改权限
    updateRoleKey() {
      let {
        checkStatus,
        configureSystem,
        controlOtherChargers,
        controlOwnCharger,
        createAccount,
        dataReport,
        id,
        smsPasscode,
        userIdPassword,
        viewGeneralData,
      } = this.roleKeyList[this.roleKeyIndex];
      let data = {
        userId: localStorage.getItem("userId"),
        roleKeyId: id,
        checkStatus,
        controlOwnCharger,
        controlOtherChargers,
        viewGeneralData,
        dataReport,
        createAccount,
        configureSystem,
        userIdPassword,
        smsPasscode,
      };
      let roleKey = JSON.parse(localStorage.getItem("roleKey"));
      console.log(roleKey);
      this.$msgbox({
        title: "提示",
        message: "确认修改权限？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            roleKeySOE(data).then((res) => {
              console.log(res, "修改权限");
              if (res.code == 100) {
                instance.confirmButtonLoading = false;
                done();
                this.$message.success("修改成功");
                if (roleKey.userType === this.roleKeyList[this.roleKeyIndex].userType) {
                  setTimeout(() => {
                    this.$confirm("当前账号权限已修改，是否重新登陆？", "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    })
                      .then(() => {
                        this.$router.replace("/login");
                      })
                      .catch(() => {
                        this.roleKeyId = "";
                        this.roleKeyIndex = "";
                      });
                  }, 800);
                } else {
                  this.roleKeyId = "";
                  this.roleKeyIndex = "";
                }
                this.getRoleList();
              }
            });
          } else {
            done();
          }
        },
      });
    },
    // 选择修改列
    seleteUl(roleKeyIndex, roleKeyId) {
      if (this.roleKeyIndex != roleKeyIndex) {
        this.roleKeyList = JSON.parse(JSON.stringify(this.oldRoleKeyList));
      }
      this.roleKeyId = roleKeyId;
      this.roleKeyIndex = roleKeyIndex;
    },
    //
    getRoleList() {
      let data = {
        userId: 1,
        page: this.page,
        limit: 7,
      };
      roleKeyFindAll(data).then((res) => {
        console.log(res);
        if (res.code == 100) {
          let dataList = res.extend.roleKeyList.reverse();
          this.oldRoleKeyList = dataList;
          console.log(this.oldRoleKeyList);
          this.roleKeyList = JSON.parse(JSON.stringify(dataList));
          this.count = res.extend.count;
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
  position: relative;
}
</style>
