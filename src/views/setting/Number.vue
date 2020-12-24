<template>
  <div class="Number">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables">
        <ul class="ultit">
          <li><p>OBD No.</p></li>
          <li><p>Vehicle Identification No</p></li>
          <li><p>EV Model</p></li>
          <li><p>Vehicle No</p></li>
          <!-- <li><p>Number Starting</p></li> -->
          <li><p>Department</p></li>
        </ul>
        <!-- v-if="vehicleNumberList.length != 0" -->
        <template v-if="vehicleNumberList.length != 0">
          <ul
            :class="['uldatas', 'w100', isUpdate === index ? 'bshow' : '']"
            v-for="(item, index) in vehicleNumberList"
            :key="index"
            @click="isUpdate = index"
          >
            <li>
              <p>
                <input
                  type="text"
                  disabled
                  v-model="item.id"
                  v-if="item.vehicleNo !== null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate !== index"
                  v-model="item.vehicleIdentificationNo"
                  v-if="item.vehicleIdentificationNo !== null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate !== index"
                  v-model="item.evModel"
                  v-if="item.evModel !== null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate !== index"
                  v-model="item.vehicleNo"
                  v-if="item.vehicleNo !== null"
                />
              </p>
            </li>
            <!-- <li @click="isShowSlete1 = isShowSlete1 === index ? '' : index">
              <p>001</p>
              <img
                class="seleters"
                :style="{
                  transform: `rotate(${isShowSlete1 === index ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete1 === index ? '130px' : '0px' }"
              >
                <div
                  class="button seleter_item"
                  v-for="(p, i) in $store.state.centerType"
                  :key="i + 'ss'"
                >

                  {{ p.value }}
                </div>
              </div>
            </li> -->
            <li @click="isShowSlete2 = isShowSlete2 === index ? '' : index">
              <p>{{ item.department }}</p>
              <img
                class="seleters"
                :style="{
                  transform: `rotate(${isShowSlete2 === index ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete2 === index ? '130px' : '0px' }"
              ></div>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="uldatas w100">
            <li><p>暂无数据！</p></li>
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
      <div class="button operation" @click="updateNum">Update</div>
      <div class="button operation" @click="cancelUpdate">Cancel</div>
    </div>
  </div>
</template>

<script>
import { VNFindAll, VNSaveOrUpdEntity } from "../../common/api";
export default {
  name: "Number",
  data() {
    return {
      isShowSlete1: "",
      isShowSlete2: "",
      isUpdate: "",
      page: 1,
      count: 0,
      vehicleNumberList: [],
    };
  },
  mounted() {
    this.getVNFList();
  },
  methods: {
    // 修改
    updateNum() {
      if (this.isUpdate === "") {
        this.$message.warning("请选择修改项");
        return;
      }
      let value = this.vehicleNumberList[this.isUpdate];
      let data = {
        userId: localStorage.getItem("userId"),
        vehicleNumberId: value.id,
        vehicleIdentificationNo: value.vehicleIdentificationNo,
        evModel: value.evModel,
        vehicleNo: value.vehicleNo,
        centreId: value.centreId,
        department: value.department,
      };
      this.$msgbox({
        message: "确认修改权限？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            VNSaveOrUpdEntity(data).then((res) => {
              // console.log(res);
              if (res.code == 100) {
                instance.confirmButtonLoading = false;
                done();
                this.$message.success("修改成功");
                this.isShowSlete1 = "";
                this.isShowSlete2 = "";
                this.isUpdate = "";
                this.getVNFList();
              }
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        },
      });
    },
    // 取消修改
    cancelUpdate() {
      this.isShowSlete1 = "";
      this.isShowSlete2 = "";
      this.isUpdate = "";
      this.getVNFList();
    },
    //
    sizeChange(value) {
      this.page = value;
      this.getVNFList();
    },
    //
    getVNFList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background: "rgba(0,0,0,.5)",
      });
      VNFindAll(data)
        .then((res) => {
          // console.log(res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.vehicleNumberList = res.extend.vehicleNumberList;
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
.Number {
  position: relative;
}
</style>
