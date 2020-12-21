<template>
  <div class="Department">
    <p class="ortoptit">Electric Vehicle Charging Centre and Department</p>
    <div class="flex flex-Updown departmentMiddle">
      <div class="dm-left">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Address</p></li>
          <li><p>Location ( Carpark / Floor )</p></li>
        </ul>
        <template v-if="centreDepartmentList.length != 0">
          <ul
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
            <li>
              <p>
                <input
                  :disabled="isUpdate1 != index"
                  type="text"
                  v-model="item.address"
                  v-if="item.address != null"
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
          </ul>
        </template>
        <template v-else>
          <ul>
            <li>
              <p>暂无数据！</p>
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
              <p>暂无数据！</p>
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
        :page-size='10'
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
        this.$message.warning("请选择修改项");
        return;
      }
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
                  console.log(res);
                  if (res.code == 100) {
                    done();
                    instance.confirmButtonLoading = false;
                    this.isUpdate1 = "";
                    this.isUpdate2 = "";
                    this.getList();
                    this.$message.success("修改成功");
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
      CDFindAll(data).then((res) => {
        console.log(res);
        if (res.code == 100) {
          this.centreDepartmentList = res.extend.centreDepartmentList;
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
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
.dm-left {
  width: 810px;
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
