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
        <ul class="uldatas w100" v-for="(item, index) in 9" :key="'s' + index">
          <li @click="isShowSlete = isShowSlete === 's' + index ? '' : 's' + index">
            <p>Hung Hom</p>
            <img
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
                @click="seleteCenter(item)"
              >
                {{ item.value }}
              </div>
            </div>
          </li>
          <li><p>Laguna Verde</p></li>
          <li><p>Laguna verde B2</p></li>
        </ul>
        <div class="pagination">
          <el-pagination
            @current-change="sizeChange1"
            background
            layout=" prev, pager, next, jumper, ->, total, slot"
            :total="count1"
          >
          </el-pagination>
        </div>
      </div>
      <div class="dm-right">
        <ul class="ultit">
          <li><p>Center</p></li>
          <li><p>Department</p></li>
        </ul>
        <ul class="uldatas w100" v-for="(item, index) in 2" :key="item">
          <li @click="isShowSlete = isShowSlete === index ? '' : index">
            <p>{{ ctypes.value }}</p>
            <img
              class="seleters imgSelete"
              :style="{ transform: `rotate(${isShowSlete === index ? '180' : '0'}deg)` }"
              src="../../assets/index/setting/10.png"
              alt=""
            />
            <div
              class="sleterMain"
              :style="{ height: isShowSlete === index ? '200px' : '0px' }"
            >
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
         <div class="pagination">
          <el-pagination
            @current-change="sizeChange2"
            background
            layout=" prev, pager, next, jumper, ->, total, slot"
            :total="count2"
          >
          </el-pagination>
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
import { CDFindById, CDFindAll } from "../../common/api";
export default {
  name: "Department",
  data() {
    return {
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
      count1:0,
      count2:0
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    // 
    sizeChange1(){

    },
    sizeChange2(){
      
    },
    // 
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
  position: relative;
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
