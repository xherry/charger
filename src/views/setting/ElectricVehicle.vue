<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle</p>
    <div>
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
        <template v-if="eveList.length!=0">
          <ul class="uldatas w100" @click="$router.push('chargerDetails')" v-for="(item,index) in eveList" :key='index'>
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
import { EVFindAll } from "../../common/api";
export default {
  name: "ElectricVehicle",
  data() {
    return {
      eveList:[],
      page:1,
      count:0
    };
  },
  created() {
    this.getCarAll();
  },
  methods: {
    //
    getCarAll() {
      let data = {
        userId: this.$store.state.userId,
        page: this.page,
        limit: 5,
      };
      EVFindAll(data).then((res) => {
        console.log("查询所有的车辆信息", res);
      });
    },
  },
};
</script>

<style scoped></style>
