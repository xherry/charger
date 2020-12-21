<template>
  <div class="Centre">
    <div class="chargerTop flex flex-center">
      <div class="ct-item flex flex-Updown-between" @click="isShowSlete = !isShowSlete">
        <span>Centre</span>
        <div class="seleter flex flex-Updown-between">
          <p>{{ ctypes.value }}</p>
          <img
            :style="{ transform: `rotate(${isShowSlete ? '-180' : '0'}deg)` }"
            src="../../assets/index/says/02.png"
            alt=""
          />
        </div>
        <div class="seleterBody" :style="{ height: isShowSlete ? '200px' : '0px' }">
          <div
            class="button seleter_item"
            v-for="(item, index) in centerType"
            :key="index"
            @click="seleteCenter(item)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" v-model="Location" placeholder="wherehere" />
      </div>
      <div class="Confirm button" @click="demandData">Confirm</div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Charge No.</p></li>
          <li><p>Enable</p></li>
          <li><p>Disable</p></li>
        </ul>
        <template v-if="chargerInfoList.length!=0">
          <ul class="uldatas w100" v-for="(item, index) in chargerInfoList" :key="index">
            <li><p>SSPO-001</p></li>
            <li>
              <img v-if="''" src="../../assets/index/useraccount/04.png" alt="" />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </li>
            <li>
              <img v-if="''" src="../../assets/index/useraccount/03.png" alt="" />
              <img v-else src="../../assets/index/useraccount/04.png" alt="" />
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
  </div>
</template>

<script>
import { findByDetails } from "../../common/api";
export default {
  name: "Centre",
  data() {
    return {
      isShowSlete: false,
      ctypes: {
        centreId: "",
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
      chargerInfoList: [],
      Location: "",
      count: 0,
      page: 1,
    };
  },
  created() {},
  mounted() {
    this.getNowData();
  },
  methods: {
    // 
    sizeChange(value){
      this.page = value;
      this.getNowData();
    },
    // 选择中心
    seleteCenter(prop) {
      this.ctypes.centreId = prop.centreId;
      this.ctypes.value = prop.value;
    },
    //查询
    demandData() {
      this.page = 1;
      this.getNowData();
    },
    // 查询充电桩的实时数据
    getNowData() {
      let data = {
        page: this.page,
        count: 10,
        userId: localStorage.getItem("userId"),
        centre: this.ctypes.centreId,
        location: this.Location,
      };
      findByDetails(data).then((res) => {
        console.log(res, "查询充电桩的实时数据");
        if (res.code == 100) {
          this.chargerInfoList = res.extend.chargerInfoList;
          this.count = res.extend.count;
        }
      });
    },
  },
};
</script>

<style scoped>
.pagination{
  bottom: -80px;
}
.Centre{
  position: relative;
}
.uldatas img {
  width: 25px;
  height: 25px;
}
.urtable {
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.urtable > ul {
  padding: 0 380px;
  box-sizing: border-box;
}
.overRights {
  height: 714px;
  margin-top: 32px;
}
.chargerTop {
  width: 100%;
}
.seleter,
.ct-item input {
  width: 224px;
  height: 38px;
  padding: 0 24px 0 15px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
}
.ct-item input {
  background: transparent;
  outline: none;
}
.seleter > img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}

.ct-item {
  margin-right: 60px;
  position: relative;
}
.ct-item > span {
  color: #ffffff;
  font-size: 18px;
}
.Confirm {
  width: 246px;
  height: 51px;
  line-height: 42px;
  background: url("../../assets/index/charger/01.png") no-repeat;
  background-size: 100% 100%;
  font-size: 20px;
}
</style>
