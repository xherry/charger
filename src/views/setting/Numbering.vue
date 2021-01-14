<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables flex flex-between">
        <div style="width: 49.5%" class="tablesLeft">
          <ul class="ultit">
            <li><p>Centre</p></li>
            <li><p>Location (Carpark / Floor|）</p></li>
            <li><p>Charger Tvpe</p></li>
          </ul>
          <template v-if="chargerNumberings.length != 0">
            <ul
              :class="['uldatas', 'w100', isUpdate1 === index ? 'bshow' : '']"
              v-for="(item, index) in chargerNumberings"
              :key="index"
              @click="(isUpdate1 = index), (isUpdate2 = '')"
            >
              <li @click="isShowSlete1 = isShowSlete1 === index ? '' : index">
                <p v-if="item.centreId != null">{{ item.centreId | ctype }}</p>
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
                  :style="{ height: isShowSlete1 === index ? '120px' : '0px' }"
                >
                  <div
                    class="button seleter_item"
                    v-for="(p, i) in $store.state.centerType"
                    :key="i + 'ss'"
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
                    :disabled="isUpdate1 != index"
                    v-model="item.location"
                    v-if="item.location != null"
                  />
                </p>
              </li>
              <li @click="isShowSlete2 = isShowSlete2 === index ? '' : index">
                <p>
                  <!-- {{ item.chargerType }} -->
                  <input
                    type="text"
                    :disabled="isUpdate1 != index"
                    v-model="item.chargerType"
                    v-if="item.chargerType != null"
                  />
                </p>
                <!-- <img
                  class="seleters"
                  :style="{
                    transform: `rotate(${isShowSlete2 === index ? '180' : '0'}deg)`,
                  }"
                  src="../../assets/index/setting/10.png"
                  alt=""
                />
                <div
                  class="sleterMain"
                  :style="{ height: isShowSlete2 === index ? '120px' : '0px' }"
                ></div> -->
              </li>
            </ul>
          </template>
          <template v-else>
            <ul class="uldatas w100">
              <li><p>No Data！</p></li>
            </ul>
          </template>
          <div class="pagination">
            <el-pagination
              @current-change="sizeChange1"
              background
              layout=" prev, pager, next, jumper, ->, total, slot"
              :total="count1"
              hide-on-single-page
              :page-size="9"
            >
            </el-pagination>
          </div>
        </div>
        <div style="width: 49.5%" class="tablesLRight">
          <ul class="ultit">
            <li><p>Prefix</p></li>
            <li><p>Number Starting</p></li>
            <li><p>Preview</p></li>
          </ul>
          <template v-if="chargerNumberingList != 0">
            <ul
              class="uldatas w100"
              v-for="(item, index) in chargerNumberingList"
              :key="index + 'sss'"
              :class="['uldatas', 'w100', isUpdate2 === index ? 'bshow' : '']"
              @click="(isUpdate2 = index), (isUpdate1 = '')"
            >
              <li>
                <p>
                  <input
                    :disabled="isUpdate2 != index"
                    type="text"
                    v-model="item.preflx"
                    v-if="item.preflx"
                  />
                </p>
              </li>
              <li>
                <p>
                  <input
                    :disabled="isUpdate2 != index"
                    type="text"
                    v-model="item.numberStarting"
                    v-if="item.numberStarting"
                  />
                </p>
              </li>
              <li>
                <p>
                  <input
                    :disabled="isUpdate2 != index"
                    type="text"
                    v-model="item.preview"
                    v-if="item.preview"
                  />
                </p>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul class="uldatas w100">
              <li><p>No Data！</p></li>
            </ul>
          </template>
          <div class="pagination">
            <el-pagination
              @current-change="sizeChange2"
              background
              layout=" prev, pager, next, jumper, ->, total, slot"
              :total="count2"
              hide-on-single-page
              :page-size="9"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation" @click="updateNumber">Update</div>
      <div class="button operation" @click="cancelUpdate">Cancel</div>
    </div>
  </div>
</template>

<script>
import {
  ECNFindAll,
  CNFindAll,
  CNSaveOrUpdEntity, //分页查询所有充电器编号
  ECNSaveOrUpdEntity, //电动车充电器编号
} from "../../common/api";
export default {
  name: "Numbering",
  data() {
    return {
      isShowSlete1: "",
      isShowSlete2: "",
      isUpdate2: "",
      isUpdate1: "",
      page1: 1,
      count1: 0,
      page2: 1,
      count2: 0,
      chargerNumberings: [], //查询所有充电器编号
      chargerNumberingList: [], //电动车充电器编号
    };
  },
  created() {},
  mounted() {
    this.getCNFList();
    this.getCNList();
  },
  methods: {
    // 修改
    updateNumber() {
      let _this = this;
      if (this.isUpdate2 === "" && this.isUpdate1 === "") {
        this.$message.warning("Please select the modification item");
        return;
      }
      this.$msgbox({
        title: "提示",
        message: "确认修改？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "waiting...";
            // console.log(this.isUpdate1, this.isUpdate2);
            if (this.isUpdate1 !== "") {
              let value = this.chargerNumberings[this.isUpdate1];
              let data = {
                userId: localStorage.getItem("userId"),
                chargerNumberingId: value.id,
                centreId: value.centreId,
                location: value.location,
                chargerType: value.chargerType,
              };
              CNSaveOrUpdEntity(data).then((res) => {
                // console.log(res);
                instance.confirmButtonLoading = false;
                done();
                if (res.code == 100) {
                  this.$message.success("Modify the success");
                  this.isUpdate1 = "";
                  this.isUpdate2 = "";
                  this.getCNList();
                }
              });
            }
            if (this.isUpdate2 !== "") {
              // console.log(this.chargerNumberingList);
              let value = this.chargerNumberingList[this.isUpdate2];
              // console.log(value);
              let data = {
                userId: localStorage.getItem("userId"),
                evChargerNumberingId: value.id,
                preflx: value.preflx,
                numberStarting: value.numberStarting,
                preview: value.preview,
              };
              ECNSaveOrUpdEntity(data)
                .then((res) => {
                  // console.log(res);
                  instance.confirmButtonLoading = false;
                  done();
                  if (res.code == 100) {
                    this.$message.success("Modify the success");
                    this.isUpdate1 = "";
                    this.isUpdate2 = "";
                    this.getCNFList();
                  }
                })
                .catch(() => {
                  instance.confirmButtonLoading = false;
                  done();
                });
            }
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        },
      });
    },
    // 取消修改
    cancelUpdate() {},
    sizeChange1(value) {
      this.page1 = value;
      this.getCNList();
    },
    sizeChange2(value) {
      this.page2 = value;
      this.getCNFList();
    },
    // 查询所有充电器编号
    getCNList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page1,
        limit: 9,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      CNFindAll(data)
        .then((res) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          // console.log("查询所有充电器编号", res);
          if (res.code == 100) {
            this.chargerNumberings = res.extend.chargerNumberingList;
            this.count1 = res.extend.count;
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
    // 电动车充电器编号
    getCNFList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page2,
        limit: 9,
      };
      ECNFindAll(data).then((res) => {
        // console.log("电动车充电器编号", res);
        if (res.code == 100) {
          this.chargerNumberingList = res.extend.evChargerNumberingList;
          this.count2 = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.tablesLeft,
.tablesLRight {
  position: relative;
}
.pagination {
  right: -20px;
  bottom: -15px;
}
.tables {
  border: 0px;
  border-radius: 0px;
}
.tables > div {
  border: 2px solid #205cbf;
  border-radius: 20px;
}
</style>
