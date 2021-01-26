<template>
  <div class="">
    <div class="overRights">
      <p class="ortoptit">User Records</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>User ID</p></li>
          <li><p>Staff ID</p></li>
          <li><p>Name</p></li>
          <li><p>User Type</p></li>
          <li><p>Centre</p></li>
          <li><p>Department</p></li>
          <li><p>E-mail</p></li>
          <li><p>Mobile No.</p></li>
        </ul>
        <div
          class="loadMore box"
          v-infinite-scroll="loadMore"
          infinite-scroll-immediate="false"
          ref="loadMore"
        >
          <ul
            class="uldatas w100"
            :ref="'seleteMan' + index"
            v-for="(item, index) in pcUserList"
            :key="index"
          >
            <!-- <li><p>ssssss</p></li> -->
            <li class="flex flex-Updown ssss">
              <div class="seletes" @click="seleteUID(item)">
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
              <p>
                <input type="text" :disabled="true" v-model="item.userId" />
              </p>
            </li>
            <li>
              <p>
                <input type="text" :disabled="true" v-model="item.staffId" />
              </p>
            </li>
            <li>
              <p><input type="text" :disabled="true" v-model="item.name" /></p>
            </li>
            <li @click="setTypes(item.id, 1, index)">
              <p>{{ item.userType | utype }}</p>
              <!-- <img
                class="seleters imgSelete"
                :style="{
                  transform: `rotate(${isUserType === item.id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :ref="'usleterMain' + index"
                :id="'usleterMain' + index"
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
              </div> -->
            </li>
            <li @click="setTypes(item.id, 2)">
              <p v-if="item.centreId">{{ item.centreId | ctype }}</p>
              <!-- <img
                class="seleters imgSelete"
                :style="{
                  transform: `rotate(${isCenterType === item.id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :ref="'csleterMain' + index"
                :id="'csleterMain' + index"
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
              </div> -->
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="true"
                  v-model="item.department"
                />
              </p>
            </li>
            <li>
              <p>
                <input type="text" :disabled="true" v-model="item.email" />
              </p>
            </li>
            <li>
              <p>
                <input type="text" :disabled="true" v-model="item.phone" />
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="pagination">
        <el-pagination
          @current-change="sizeChange"
          background
          layout=" prev, pager, next, jumper, ->, total, slot"
          :total="count"
          hide-on-single-page
          :page-size="9"
        >
        </el-pagination>
      </div> -->
    </div>
    <div class="flex flex-center">
      <!-- <div class="button UpdateCancel" style="margin-right: 144px" @click="editUser">
        Edit
      </div> -->
      <div class="button UpdateCancel" @click="deleUser">Delete</div>
    </div>
  </div>
</template>

<script>
import {
  pcUserFindByAll,
  delEntity,
  CDSaveOrUpdEntity,
  addOrUpdEntity,
  sendSms,
} from "../../common/api";
// import { utype, ctype } from "../../common/common";
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
    setTypes(id, type, index) {
      if (type == 1) {
        this.isUserType = this.uid !== id ? "" : this.isUserType === id ? "" : id;
      }
      if (type == 2) {
        this.isCenterType = this.uid !== id ? "" : this.isCenterType === id ? "" : id;
      }
    },
    seleteUID(value) {
      this.uinfo = this.uid === value.id ? {} : value;
      this.uid = this.uid === value.id ? "" : value.id;
    },
    //
    loadMore() {
      if (this.page >= Math.ceil(this.count / 15)) return;
      this.page += 1;
      this.getUserList();
    },
    // 修改用户
    editUser() {
      if (!this.uid) return this.$message.warning("Please select user");
      let uinfo = this.uinfo;
      delete uinfo["choose"];
      delete uinfo["createTime"];
      let uinfos = { userIds: uinfo.id, ...uinfo };
      delete uinfos["id"];
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      addOrUpdEntity(uinfos)
        .then((res) => {
          // console.log(res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.$message.success("Modify the success！");
            this.uid = "";
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
    // 删除用户
    deleUser() {
      if (!this.uid) return this.$message.warning("Please select user");
      this.$confirm("Be sure to delete this user？", "Prompt", {
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        type: "warning",
      }).then(() => {
        delEntity({
          userIds: localStorage.getItem("userId"),
          userId: this.uid,
        })
          .then((res) => {
            // console.log("删除用户", res);

            if (res.code == 100) {
              this.getUserList();
              this.$message.success("Delete the success");
            }
          })
          .catch(() => {
            this.$message.warning("Has been cancelled");
          });
      });
    },
    //
    getUserList() {
      let data = {
        userIds: localStorage.getItem("userId"), //this.$store.state.userId,
        page: this.page,
        limit: 15,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      pcUserFindByAll(data)
        .then((res) => {
          console.log("获取用户列表", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            if (res.extend.pcUserList.length == 0) {
              return this.$message.warning("No more data!");
            }
            res.extend.pcUserList.forEach((item) => {
              item.choose = false;
            });
            this.pcUserList = [...this.pcUserList, ...res.extend.pcUserList];
            this.count = res.extend.count;
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
  },
};
</script>

<style scoped>
.urtable {
  overflow: hidden;
}
.loadMore {
  /* background: #ff000040; */
  height: 580px;
  overflow-y: scroll;
}
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
.seletes > img {
  position: static;
  width: 25px !important;
  height: 25px !important;
}
li P {
  font-size: 14px;
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
