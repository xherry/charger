<template>
  <div class="Department">
    <p class="ortoptit">Electric Vehicle Charging Centre and Department</p>
    <div class="flex flex-Updown departmentMiddle">
      <div class="dm-left">
        <ul class="ultit">
          <li><p>Center</p></li>
          <!-- <li><p>Department</p></li> -->
          <li><p>Address</p></li>
          <li><p>Location ( Carpark / Floor )</p></li>
          <!-- <li></li> -->
        </ul>
        <template v-if="centreDepartmentList.length != 0">
          <ul
            id="uldatas"
            :class="['uldatas', 'w100', isUpdate1 === index ? 'bshow' : '']"
            v-for="(item, index) in centreDepartmentList"
            :key="'s' + index"
            @click="(isUpdate1 = index), (isUpdate2 = '')"
          >
            <!-- @click="isShowSlete = isShowSlete === 's' + index ? '' : 's' + index" -->
            <li>
              <p>
                <input
                  :disabled="isUpdate1 != index"
                  type="text"
                  v-model="item.centre"
                  v-if="item.centre != null"
                />
              </p>
              <!-- <img
                class="seleters imgSelete"
                :style="{
                  transform: `rotate(${isShowSlete === 's' + index ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete === 's' + index ? '200px' : '0px' }"
              >
                <div
                  class="button seleter_item"
                  v-for="(item, index) in centerType"
                  :key="index"
                >
                  {{ item.value }}
                </div>
              </div> -->
            </li>
            <!-- <li>
              <p>
                <input
                  :disabled="isUpdate1 != index"
                  type="text"
                  v-model="item.department"
                  v-if="item.department != null"
                />
              </p>
            </li> -->
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate1 != index"
                  v-model="item.address"
                  v-if="item.location != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate1 != index"
                  v-model="item.location"
                  v-if="item.location != null"
                />
              </p>
            </li>
            <!-- <li>
              <div>
                <p class="button toManage">Charge Manage</p>
                <p class="button toManage">EV Manage</p>
              </div>
            </li> -->
          </ul>
        </template>
        <template v-else>
          <ul>
            <li>
              <p>No Data！</p>
            </li>
          </ul>
        </template>
      </div>
      <div class="dm-right">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Department</p></li>
        </ul>
        <template v-if="centreDepartmentList.length != 0">
          <ul
            :class="['uldatas', 'w100', isUpdate2 === index ? 'bshow' : '']"
            v-for="(item, index) in centreDepartmentList"
            :key="item.id"
            @click="(isUpdate2 = index), (isUpdate1 = '')"
          >
            <li @click="isShowSlete = isShowSlete === index ? '' : index">
              <p v-if="item.centreId != null">{{ item.centreId | ctype }}</p>
              <img
                class="seleters imgSelete"
                :style="{
                  transform: `rotate(${isShowSlete === index ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete === index ? '200px' : '0px' }"
              >
                <div
                  class="button seleter_item"
                  v-for="(p, i) in centerType"
                  :key="i + 'p'"
                  @click="item.centreId = p.centreId"
                >
                  {{ p.value }}
                </div>
              </div>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate2 != index"
                  v-model="item.department"
                  v-if="item.department != null"
                />
              </p>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul>
            <li>
              <p>No Data！</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="sizeChange"
        background
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="count"
        hide-on-single-page
        :page-size="10"
      >
      </el-pagination>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation" @click="updateCenter">Update</div>
      <div class="button operation" @click="cancelUpdate">Cancel</div>
    </div>
  </div>
</template>

<script>
import { CDFindById, CDFindAll, CDSaveOrUpdEntity } from "../../common/api";
export default {
  name: "Department",
  data() {
    return {
      isUpdate1: "",
      isUpdate2: "",
      isShowSlete: "",
      centreDepartmentList: [],
      count: 0,
      ctypes: {
        centreId: "",
        value: "Shatin Centre",
      },
      utypes: {
        userType: "",
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
      centerTypes:[],
      page: 1,
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    // 修改
    updateCenter() {
      if (!this.isUpdate1 && !this.isUpdate2) {
        this.$message.warning("Please select the modification item");
        return;
      }
      this.$msgbox({
        title: "prompt",
        message: "Confirm the change？",
        showCancelButton: true,
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "waiting...";
            roleKeySOE(data).then((res) => {
              // console.log(res, "修改权限");
              if (res.code == 100) {
                let {
                  id,
                  centre,
                  address,
                  location,
                  centreId,
                  department,
                } = this.centreDepartmentList[this.isUpdate1 || this.isUpdate2];
                let data = {
                  userId: localStorage.getItem("userId"),
                  centreDepartmentId: id,
                  centre,
                  address,
                  location,
                  centreId,
                  department,
                };
                CDSaveOrUpdEntity(data).then((res) => {
                  // console.log(res);
                  if (res.code == 100) {
                    done();
                    instance.confirmButtonLoading = false;
                    this.isUpdate1 = "";
                    this.isUpdate2 = "";
                    this.getList();
                    this.$message.success("Modify the success");
                  }
                });
              } else {
                instance.confirmButtonLoading = false;
                done();
              }
            });
          } else {
            done();
          }
        },
      });
    },
    // 取消
    cancelUpdate() {
      this.isUpdate1 = "";
      this.isUpdate2 = "";
      this.getList();
    },
    //
    sizeChange(value) {
      this.page = value;
      this.getList();
    },
    // 选择
    seleteCenter(prop) {
      this.ctypes.centreId = prop.centreId;
      this.ctypes.value = prop.value;
      this.isShowSlete2 = false;
    },
    getList() {
      let data = {
        userId: 2,
        page: this.page,
        limit: 10,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      CDFindAll(data)
        .then((res) => {
          // console.log(res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.centreDepartmentList = res.extend.centreDepartmentList;
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
.toManage{
  /* background:  rgb(81, 136, 224); */
  /* width: 200px; */
  /* height: 30px; */
  /* text-align: center; */
  /* line-height: 30px; */
  /* border-radius: 0; */
  color: aqua;
  font-size: 14px;
}
.toManage:first-child{
  margin-bottom: 10px;
}
.Department {
  position: relative;
}
.mt60 {
  margin-top: 60px;
}
.dm-left,
.dm-right {
  border: 2px solid #205cbf;
  border-radius: 20px;
  position: relative;
  /* overflow: hidden; */
}
/* .departmentMiddle .dm-left  ul li{
  height:  300px !important;
} */
.dm-left {
  width: 830px;
  height: 680px;
  margin-right: 68px;
}
.dm-right {
  width: 490px;
  height: 680px;
}
.departmentMiddle {
  box-sizing: border-box;
  width: 100%;
  margin-top: 21px;
}
</style>
