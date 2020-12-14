<template>
  <div>
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
          <ul class="uldatas w100" v-for="(item, index) in chargerList" :key="index">
            <li><p>1</p></li>
            <li><p>Polyu AC Medium Charger</p></li>
            <li><p>AC</p></li>
            <li><p>3</p></li>
            <li><p>21</p></li>
            <li><p>Yes</p></li>
            <li><p>polyu</p></li>
          </ul>
        </template>
        <template v-else>
          <ul class="uldatas w100">
            <li><p>暂无数据！</p></li>
          </ul>
        </template>
      </div>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation">Update</div>
      <div class="button operation">Cancel</div>
    </div>
  </div>
</template>

<script>
import { ChargerFindAll } from "../../common/api";
export default {
  name: "Charger",
  data() {
    return {
      page: 1,
      count: 0,
      chargerList: [],
    };
  },
  mounted() {
    this.getChargeList();
  },
  created() {},
  methods: {
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

<style scoped></style>
