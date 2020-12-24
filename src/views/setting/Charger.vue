<template>
  <div class="Charger">
    <div class="">
      <p class="ortoptit">Electric Vehicle Charger</p>
      <div class="tables">
        <ul class="ultit">
          <li><p>Ttpe No.</p></li>
          <li><p>Charger Type</p></li>
          <li><p>Output Voltase</p></li>
          <li><p>No. of Phase</p></li>
          <li><p>Output Power [ kw ]</p></li>
          <li><p>LMS Supported</p></li>
          <li><p>Manufacturer / Brand</p></li>
        </ul>
        <template v-if="chargerList.length != 0">
          <ul
            :class="['uldatas', 'w100', isUpdate === index ? 'bshow' : '']"
            v-for="(item, index) in chargerList"
            :key="index"
            @click="isUpdate = index"
          >
            <li>
              <p><input type="text" disabled :value="item.id" /></p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.chargerType"
                  v-if="item.chargerType != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.outputVoltage"
                  v-if="item.outputVoltage != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.noPhase"
                  v-if="item.noPhase != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.outputPower"
                  v-if="item.outputPower != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.lmsSupported"
                  v-if="item.lmsSupported != null"
                />
              </p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  v-model="item.manufacturer"
                  v-if="item.manufacturer != null"
                />
              </p>
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
        :page-size='10'
      >
      </el-pagination>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation" @click="updateCharge">Update</div>
      <div class="button operation" @click="cancelUpdate">Cancel</div>
    </div>
  </div>
</template>

<script>
import { ChargerFindAll, ChargerSaveOrUpdEntity } from "../../common/api";
export default {
  name: "Charger",
  data() {
    return {
      page: 1,
      count: 0,
      chargerList: [],
      isUpdate: "",
    };
  },
  mounted() {
    this.getChargeList();
  },
  created() {},
  methods: {
    // 修改
    updateCharge() {
      if (this.isUpdate === "") {
        this.$message.warning("请选择修改项");
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
            instance.confirmButtonText = "执行中...";
            let value = this.chargerList[this.isUpdate];
            let data = {
              userId: localStorage.getItem("userId"),
              chargerId: value.id,
              chargerType: value.chargerType,
              outputVoltage: value.outputVoltage,
              noPhase: value.noPhase,
              outputPower: value.outputPower,
              lmsSupported: value.lmsSupported,
              manufacturer: value.manufacturer,
            };
            ChargerSaveOrUpdEntity(data).then((res) => {
              // console.log(res);
              if (res.code == 100) {
                done();
                instance.confirmButtonLoading = false;
                this.isUpdate = "";
                this.getChargeList();
                this.$message.success("修改成功");
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
      this.isUpdate = "";
      this.getChargeList;
    },
    sizeChange(value) {
      this.page = value;
      this.getChargeList;
    },
    //
    getChargeList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background:"rgba(0,0,0,.5)"
      });
      ChargerFindAll(data).then((res) => {
        // console.log(res, "分页查询所有充电桩");
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        if (res.code == 100) {
          this.chargerList = res.extend.chargerList;
          this.count = res.extend.count;
        }
      }).catch(()=>{
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      })
    },
  },
};
</script>

<style scoped>
.Charger {
  position: relative;
}
</style>
