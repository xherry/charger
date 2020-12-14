<template>
  <div class="">
    <div class="overRights">
      <p class="ortoptit">User Records</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>User Id</p></li>
          <li><p>Staf Id</p></li>
          <li><p>Name</p></li>
          <li><p>User Type</p></li>
          <li><p>Centre</p></li>
          <li><p>Department</p></li>
          <li><p>E-mail</p></li>
          <li><p>Mobile No.</p></li>
        </ul>
        <ul class="uldatas w100" v-for="(item, index) in pcUserList" :key="index">
          <li class="flex flex-Updown ssss">
            <div
              class="seletes"
              @click="
                (uinfo = uid === item.id ? {} : item),
                  (uid = uid === item.id ? '' : item.id)
              "
            >
              <img
                v-if="uid != item.id"
                class="childAll"
                src="../../assets/index/useraccount/03.png"
                alt=""
              />
              <img
                v-else
                class="childAll"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
            </div>
            <p><input type="text" v-model="item.userId" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.staffId" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.name" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.users" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.centrs" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.department" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.email" /></p>
          </li>
          <li>
            <p><input type="text" v-model="item.phone" /></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" style="margin-right: 144px" @click="editUser">
        Edit
      </div>
      <div class="button UpdateCancel" @click="deleUser">Delete</div>
    </div>
  </div>
</template>

<script>
import { pcUserFindByAll, delEntity, CDSaveOrUpdEntity } from "../../common/api";
import { utype, ctype } from "../../common/common";
export default {
  name: "UserRecords",
  data() {
    return {
      isseleted: false,
      page: 1,
      pcUserList: [],
      count: 0,
      uid: "",
      uinfo: {},
    };
  },
  created() {
    this.getUserList();
  },
  filters: {},
  methods: {
    // 修改用户
    editUser() {
      if (!this.uid) return this.$message.warning("请选择用户");
      let uinfo = this.uinfo;
      delete uinfo["choose"];
      delete uinfo["users"];
      delete uinfo["centrs"];
      console.log(uinfo);
      let uinfos = { userIds: localStorage.getItem("userId"), ...uinfo };
      CDSaveOrUpdEntity(uinfos).then((res) => {
        console.log(res);
      });
    },
    // 删除用户
    deleUser() {
      if (!this.uid) return this.$message.warning("请选择用户");
      delEntity({
        userIds: localStorage.getItem("userId"),
        userId: this.uid,
      }).then((res) => {
        console.log("删除用户", res);
        if (res.code == 100) {
          this.getUserList();
          this.$message.success("删除成功");
        }
      });
    },
    //
    getUserList() {
      let data = {
        userIds: 2, //this.$store.state.userId,
        page: this.page,
        limit: 10,
      };
      pcUserFindByAll(data).then((res) => {
        console.log("获取用户列表", res);
        if (res.code == 100) {
          res.extend.pcUserList.forEach((item) => {
            item.centrs = ctype(item.centreId);
            item.users = utype(item.userType);
            item.choose = false;
          });
          this.pcUserList = JSON.parse(JSON.stringify(res.extend.pcUserList));
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.urtable {
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.userselete {
  width: 100%;
}
.seletes {
  width: 25px;
  height: 25px;
}
.overRights {
  height: 747px;
}
.ssss p {
  width: 80% !important;
}
.ssss p input {
  padding-right: 20px;
}
</style>
