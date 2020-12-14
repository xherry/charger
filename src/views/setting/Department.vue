<template>
  <div class="">
    <p class="ortoptit">Electric Vehicle Charging Centre and Department</p>
    <div class="flex flex-Updown departmentMiddle">
      <div class="dm-left">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Address</p></li>
          <li><p>Location ( Carpark / Floor )</p></li>
        </ul>
        <ul class="uldatas w100">
          <li><p>Hung Hom</p></li>
          <li><p>Laguna Verde</p></li>
          <li><p>Laguna verde B2</p></li>
        </ul>
        <ul class="uldatas w100">
          <li><p>Sham Shui Po</p></li>
          <li><p>Fuk Wah Street</p></li>
          <li><p>G/F</p></li>
        </ul>
      </div>
      <div class="dm-right">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Department</p></li>
        </ul>
        <ul class="uldatas w100">
          <li @click="isShowSlete = !isShowSlete">
            <p>{{ctypes.value}}</p>
            <img
              class="seleters"
              :style="{ transform: `rotate(${isShowSlete ? '180' : '0'}deg)` }"
              src="../../assets/index/setting/10.png"
              alt=""
            />
            <div class="sleterMain" :style="{ height: isShowSlete ? '200px' : '0px' }">
              <div
                class="button seleter_item"
                v-for="(item, index) in centerType"
                :key="index"
                @click="seleteCenter(item)"
              >
                {{ item.value }}
              </div>
            </div>
          </li>
          <li><p>Assess Controol</p></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation">Update</div>
      <div class="button operation">Cancel</div>
    </div>
  </div>
</template>

<script>
import { CDFindById, CDFindAll } from "../../common/api";
export default {
  name: "Department",
  data() {
    return {
      isShowSlete: false,
      centreDepartmentList: [],
      count: 0,
      ctypes: {
        centreId: "",
        value: "Shatin Centre",
      },
      centerType: [
        { centreId: 0, value: "Shatin Centre" },
        { centreId: 1, value: "Hung HoM HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
      ],
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    seleteCenter(prop) {
      this.ctypes.centreId = prop.centreId;
      this.ctypes.value = prop.value;
      this.isShowSlete2 = false;
      let data = {
        userId: 1,
        centreDepartmentId: prop.centreId,
      };
      CDFindById(data).then((res) => {
        console.log(res);
      });
    },
    getList() {
      let data = {
        userId: 2,
        page: 1,
        limit: 5,
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
.dm-left,
.dm-right {
  border: 2px solid #205cbf;
  border-radius: 20px;
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
