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
          <!-- <li><p>ssssss</p></li> -->
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
          <li @click="isUserType = isUserType === item.id ? '' : item.id">
            <p>{{ item.userType | utype }}</p>
            <img
              class="seleters imgSelete"
              :style="{
                transform: `rotate(${isUserType === item.id ? '180' : '0'}deg)`,
              }"
              src="../../assets/index/setting/10.png"
              alt=""
            />
            <div
              class="sleterMain"
              :style="{ height: isUserType === item.id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in $store.state.userTypes"
                :key="i"
                @click="item.userType = p.userType"
              >
                {{ p.value }}
              </div>
            </div>
          </li>
          <li @click="isCenterType = isCenterType === item.id ? '' : item.id">
            <p>{{ item.centreId | ctype }}</p>
            <img
              class="seleters imgSelete"
              :style="{
                transform: `rotate(${isCenterType === item.id ? '180' : '0'}deg)`,
              }"
              src="../../assets/index/setting/10.png"
              alt=""
            />
            <div
              class="sleterMain"
              :style="{ height: isCenterType === item.id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in $store.state.centerType"
                :key="i"
                @click="item.centreId = p.centreId"
              >
                {{ p.value }}
              </div>
            </div>
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
      <div class="pagination">
        <el-pagination
          @current-change="sizeChange"
          background
          layout=" prev, pager, next, jumper, ->, total, slot"
          :total="count"
          hide-on-single-page
        >
        </el-pagination>
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
      isCenterType: "",
      isUserType: "",
    };
  },
  created() {},
  mounted() {
    this.getUserList();
  },
  filters: {},
  methods: {
    sizeChange(value) {
      this.page = value;
      this.getUserList();
    },
    // 修改用户
    editUser() {
      if (!this.uid) return this.$message.warning("请选择用户");
      let uinfo = this.uinfo;
      delete uinfo["choose"];
      delete uinfo["users"];
      delete uinfo["centrs"];
      delete uinfo["createTime"];
      let uinfos = { userIds: uinfo.id, ...uinfo };
      delete uinfos["id"];
      console.log(uinfos);
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
        userIds: localStorage.getItem("userId"), //this.$store.state.userId,
        page: this.page,
        limit: 9,
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
li > p > input {
  color: #63d1ff;
}
.urtable {
  width: 1486px;
  margin-left: 10px;
  /* overflow-x: hidden; */
  /* overflow-y: auto; */
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
