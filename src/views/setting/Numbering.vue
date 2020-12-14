<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables flex flex-between">
        <div style="width: 49.5%">
          <ul class="ultit">
            <li><p>Centre</p></li>
            <li><p>Location (Carpark / Floor|）</p></li>
            <li><p>Charger Tvpe</p></li>
          </ul>
          <ul class="uldatas w100">
            <li @click="isShowSlete1 = !isShowSlete1">
              <p>hung Hom</p>
              <img
                class="seleters"
                :style="{ transform: `rotate(${isShowSlete1 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete1 ? '200px' : '0px' }"
              ></div>
            </li>
            <li><p>G/F</p></li>
            <li @click="isShowSlete2 = !isShowSlete2">
              <p>Polyu AC Medium Charger</p>
              <img
                class="seleters"
                :style="{ transform: `rotate(${isShowSlete2 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
              <div
                class="sleterMain"
                :style="{ height: isShowSlete2 ? '200px' : '0px' }"
              ></div>
            </li>
          </ul>
        </div>
        <div style="width: 49.5%">
          <ul class="ultit">
            <li><p>Prefix</p></li>
            <li><p>Number Starting</p></li>
            <li><p>Preview</p></li>
          </ul>
          <ul class="uldatas w100">
            <li><p>HH</p></li>
            <li><p>001</p></li>
            <li><p>HH-001</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation">Update</div>
      <div class="button operation">Cancel</div>
    </div>
  </div>
</template>

<script>
import { ECNFindAll, CNFindAll } from "../../common/api";
export default {
  name: "Numbering",
  data() {
    return {
      isShowSlete1: false,
      isShowSlete2: false,
      page: 1,
      count: 0,
      chargerNumberingList: [],
    };
  },
  created() {},
  mounted() {
    this.getCNFList();
    this.getCNList();
  },
  methods: {
    getCNList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
      };
      CNFindAll(data).then((res) => {
        console.log("查询所有充电器编号", res);
        if (res.code == 100) {
          this.chargerNumberingList = res.extend.chargerNumberingList;
          this.count = res.extend.count;
        }
      });
    },
    getCNFList() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
      };
      ECNFindAll(data).then((res) => {
        console.log("电动车充电器编号", res);
        if (res.code == 100) {
          this.chargerNumberingList = res.extend.chargerNumberingList;
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.tables {
  border: 0px;
  border-radius: 0px;
}
.tables > div {
  border: 2px solid #205cbf;
  border-radius: 20px;
}
</style>
