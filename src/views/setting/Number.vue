<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charger</p>
    <div>
      <div class="tables">
        <ul class="ultit">
          <li><p>OBD No.</p></li>
          <li><p>Vehicle Identification No</p></li>
          <li><p>EV Model</p></li>
          <li><p>Vehicle No</p></li>
          <li><p>Number Starting</p></li>
          <li><p>Department</p></li>
        </ul>
        <template v-if="vehicleNumberList.length != 0">
          <ul
            class="uldatas w100"
            v-for="(item, index) in vehicleNumberList"
            :key="index"
          >
            <li><p>001</p></li>
            <li><p>ADCBG13654</p></li>
            <li><p>LEAF</p></li>
            <li><p>XY123</p></li>
            <li @click="isShowSlete1 = !isShowSlete1">
              <p>001</p>
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
import { VNFindAll } from "../../common/api";
export default {
  name: "Number",
  data() {
    return {
      isShowSlete1: false,
      isShowSlete2: false,
      page: 1,
      count: 0,
      vehicleNumberList: [],
    };
  },
  mounted() {
    this.getVNFList();
  },
  methods: {
    getVNFList(){
      let data = {
        userId:localStorage.getItem('userId'),
        page:this.page,
        limit:10
      }
      VNFindAll(data).then(res=>{
        console.log(res);
        if(res.code==100){
          this.vehicleNumberList = res.extend.vehicleNumberList;
          this.count = res.extend.count;
        }
      })
    },
  },
};
</script>

<style scoped></style>
