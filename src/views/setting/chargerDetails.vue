<template>
  <div>
    <p class="ortoptit">Electric Vehicle</p>
    <div class="cd flex flex-Updown-between">
      <div class="cdleft">
        <div class="cdltop">
          <div class="cdltopitem flex flex-Updown-between">
            <span>EV Manufacturer</span>
            <input type="text" value="Nissan" />
          </div>
          <div
            class="cdltopitem flex flex-Updown-between"
            @click="isShowSlete = !isShowSlete"
          >
            <span>EV Model</span>
            <p class="flex flex-Updown-between">
              <span>LEAF</span>
              <img
                :style="{ transform: `rotate(${isShowSlete ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div
              class="seleterBody"
              :style="{ height: isShowSlete ? '200px' : '0px' }"
            ></div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Image </span>
            <input type="text" />
          </div>
          <p>Upload image</p>
        </div>
        <div class="cdlbottom">
          <ul class="ultit">
            <li><p>Manufacturer</p></li>
            <li><p>Model</p></li>
            <li><p>Image Uploaded</p></li>
          </ul>
          <ul class="uldatas w100" v-for="(item, index) in 10" :key="index">
            <li><p>Nissan</p></li>
            <li><p>LEAF</p></li>
            <li><p>Yes</p></li>
          </ul>
        </div>
      </div>
      <div class="cdright">
        <p>Preview</p>
        <div class="cdrmiddle">
          <img src="../../assets/index/setting/09.png" alt="" />
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
import { EVFindById, EVFindBySelect } from "../../common/api";
export default {
  name: "chargerDetails",
  data() {
    return {
      isShowSlete: false,
    };
  },
  created() {
    this.getCarDeatils();
    this.getOptions();
  },
  methods: {
    // 获取下拉框信息
    getOptions() {
      let data = {};
      EVFindBySelect(data).then((res) => {
        console.log("获取下拉框信息", res);
      });
    },
    getCarDeatils() {
      let data = {
        userId: 2,
        electricVehicleId: 1,
      };
      EVFindById(data).then((res) => {
        console.log("查询单个车辆信息", res);
      });
    },
  },
};
</script>

<style scoped>
.cdright p {
  color: #fff;
  font-size: 18px;
}
.cdrmiddle {
  margin-top: 20px;
  width: 649px;
  height: 603px;
  border: 2px solid #205cbf;
  border-radius: 20px;
}
.cdrmiddle img {
  width: 550px;
  height: 285px;
  margin: 50% 0 0 50%;
  transform: translate(-50%, -50%);
}
.cdlbottom {
  width: 644px;
  height: 366px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 16px;
  overflow-x: hidden;
  overflow-y: auto;
}
.cd {
  margin-top: 21px;
}
.cdltop > p {
  font-size: 18px;
  color: #fff;
  text-align: right;
  margin-top: 15px;
}
.cdltopitem img {
  width: 18px;
  height: 10px;
  transition: all 0.2s linear;
}
.cdltopitem input,
.cdltopitem p {
  width: 365px;
  height: 46px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 20px 0 36px;
  box-sizing: border-box;
  color: #fff;
  font-size: 18px;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 18px;
  display: inline-block;
  width: 140px;
  text-align: right;
}
.seleterBody {
  width: 365px;
  position: absolute;
  right: 0;
  top: 100%;
  height: 300px;
  background: #205cbf;
  z-index: 66;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s linear;
}
.cdltopitem {
  margin-top: 34px;
  position: relative;
}
.cdltop {
  width: 644px;
  height: 296px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  padding: 0 64px 0 38px;
  box-sizing: border-box;
}
</style>
