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
              <p><input type="text" disabled value="1" /></p>
            </li>
            <li>
              <p>
                <input
                  type="text"
                  :disabled="isUpdate != index"
                  value="Polyu AC Medium Charger"
                />
              </p>
            </li>
            <li>
              <p><input type="text" :disabled="isUpdate != index" value="AC" /></p>
            </li>
            <li>
              <p><input type="text" :disabled="isUpdate != index" value="3" /></p>
            </li>
            <li>
              <p><input type="text" :disabled="isUpdate != index" value="21" /></p>
            </li>
            <li>
              <p><input type="text" :disabled="isUpdate != index" value="Yes" /></p>
            </li>
            <li>
              <p><input type="text" value="polyu" /></p>
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
        message: "确认修改权限？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action.confirm) {
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
              console.log(res);
              if (res.code == 100) {
                done();
                instance.confirmButtonLoading = false;
                this.isUpdate = "";
                this.getChargeList();
                this.$message.success("修改成功");
              }
            });
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
      ChargerFindAll(data).then((res) => {
        console.log(res, "分页查询所有充电桩");
        if (res.code == 100) {
          this.chargerList = res.extend.chargerList;
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.Charger {
  position: relative;
}
</style>
