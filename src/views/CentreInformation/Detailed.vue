<template>
  <div class="Detailed">
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
            v-for="(p, i) in centerType"
            :key="i"
            @click="seleteCenter(p)"
          >
            {{ p.value }}
          </div>
        </div>
      </div>
      <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" v-model="Location" placeholder="wherehere " />
      </div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Charge No.</p></li>
          <li><p>Status</p></li>
          <li><p>EV Type</p></li>
          <li><p>Vehicle No</p></li>
          <li>
            <div>
              <p>Charging Time</p>
              <p>(HOUR)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Energy</p>
              <p>(kw/h)</p>
            </div>
          </li>
          <li><p>Charging Voltage</p></li>
          <li>
            <div>
              <p>Charging Current</p>
              <p>(A)</p>
            </div>
          </li>
        </ul>
        <!-- v-if="chargerInfoList.length != 0" -->
        <template>
          <ul class="uldatas w100" v-for="(item, index) in chargerInfoList" :key="index">
            <li>
              <p>{{ item.chargerno | valNO }}</p>
            </li>
            <li>
              <p>{{ item.status | valNO }}</p>
            </li>
            <li>
              <p>{{ item.chargertype | valNO }}</p>
            </li>
            <li>
              <p>{{ item.vehicleno | valNO }}</p>
            </li>
            <li>
              <p>{{ item.chargingtime | valNO }}</p>
            </li>
            <li>
              <p>{{ item.chargingenergy | valNO }}</p>
            </li>
            <li>
              <p>{{ item.chargingvoltage | valNO }}</p>
            </li>
            <li>
              <p>{{ item.chargingcurrent | valNO }}</p>
            </li>
          </ul>
        </template>
        <!-- <template v-else>
          <ul class="uldatas w100">
            <li><p>暂无数据！</p></li>
          </ul>
        </template> -->
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="sizeChange"
        background
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="count"
        :page-size="10"
      >
        <!-- hide-on-single-page -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { findByDetails } from "../../common/api";
export default {
  name: "Detailed",
  data() {
    return {
      Location: "",
      isShowSlete: false,
      chargerInfoList: [],
      count: 0,
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
      page: 1,
      count: 0,
    };
  },
  created() {},
  mounted() {
    this.getCCECDetail();
  },
  methods: {
    //
    sizeChange(value) {
      this.page = value;
      this.getCCECDetail();
    },
    //
    seleteCenter(values) {
      this.ctypes = {
        centreId: values.centreId,
        value: values.value,
      };
      this.getCCECDetail();
    },
    //
    getCCECDetail() {
      let datas =
        this.ctypes.centreId && this.Location
          ? {
              centre: this.ctypes.centreId,
              location: this.Location,
            }
          : {};
      let data = {
        page: this.page,
        limit: 10,
        userId: localStorage.getItem("userId"),
        ...datas,
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background: "rgba(0,0,0,.5)",
      });
      findByDetails(data)
        .then((res) => {
          // console.log("查询充电桩的实时数据", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.chargerInfoList = res.extend.chargerInfoList;
            this.count = res.extend.count;
          }
        })
        .catch((err) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
        });
    },
  },
};
</script>

<style scoped>
.pagination {
  bottom: -80px;
}
.Detailed {
  position: absolute;
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
  box-sizing: border-box;
}
.overRights {
  height: 714px;
  margin-top: 32px;
  overflow: hidden;
}
.chargerTop {
  width: 100%;
}
.seleterBody {
  width: 250px;
}
.seleter,
.ct-item input {
  width: 250px;
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
</style>
