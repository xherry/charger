<template>
  <div class="UptodateStatus">
    <div class="cneterShow flex flex-Updown">
      <span>Center</span>
      <div class="flex flex-Updown-between" @click="isOptionsId = !isOptionsId">
        <span>{{ ctypes.value }}</span>
        <img
          :style="{
            transform: `rotate(${isOptionsId ? '180' : '0'}deg)`,
          }"
          src="../../assets/index/setting/10.png"
          alt=""
        />
        <div class="seleterBody" :style="{ height: isOptionsId ? '200px' : '0px' }">
          <div
            class="button seleter_item"
            v-for="(p, i) in centerType"
            :key="i + 'ss'"
            @click="seleteCenter(p)"
          >
            {{ p.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <div class="ustable">
        <ul class="ustabletit">
          <li>
            <p>Charger No.</p>
          </li>
          <li>
            <p>Total Charging Time（Hour）</p>
          </li>
          <li>
            <p>Total No. of Charging（Times）</p>
          </li>
          <li>
            <p>Total Charging Energy（kWh）</p>
          </li>
        </ul>
        <!--  -->
        <div v-if="cdetails.length != 0">
          <div class="loadMore box" v-infinite-scroll="loadMore">
            <div class="udetails">
              <ul
                class="ustablemain"
                v-for="(item, index) in cdetails"
                :key="index + 'k'"
              >
                <li>
                  <p>{{ item.vehicleNo }}</p>
                </li>
                <li>
                  <p v-if="item.chargingTime">{{ item.chargingTime | value2 }}</p>
                </li>
                <li>
                  <p v-if="item.chargerNo">{{ item.chargerNo | value2 }}</p>
                </li>
                <li>
                  <p v-if="item.charingEnergy">
                    {{ item.charingEnergy | val2 }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else>
          <ul class="ustablemain">
            <li>
              <p>{{ loadingName }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBYN, findByDataRecord } from "../../common/api";
export default {
  name: "UptodateStatus",
  data() {
    return {
      isOptionsId: false,
      count: 0,
      page: 1,
      centreId: "",
      centerType: [
        { centreId: 1, name: "Hung Hom", value: null, cid: "CLP2101" },
        { centreId: 0, name: "Sha Tin", value: null, cid: "CLP3301" },
        { centreId: 2, name: "Sham Shui Po", value: null, cid: "CLP2201" },
        { centreId: 5, name: "Shek Wu Hui", value: null, cid: "CLP3101" },
        { centreId: 3, name: "Tsing Yi", value: null, cid: "CLP3801" },
        { centreId: 4, name: "Yuen Long", value: null, cid: "CLP3701" },
      ],
      cdetails: [],
      ctypes: {
        centreId: "",
        value: "",
      },
      loadingName: "No Data!",
      loadingInstance: null,
    };
  },
  created() {},
  filters: {
    val2(val) {
      return Number(val).toFixed(2);
    },
  },
  mounted() {
    this.ctypes = {
      centreId: this.$route.query.cid,
      value: this.$store.state.centerType.filter(
        (item) => item.cid == this.$route.query.cid
      )[0].value,
    };
    this.findData();
  },
  beforeDestroy() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
  methods: {
    loadMore() {
      if (this.page > Math.ceil(this.count / 1000000))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.findData();
    },
    seleteCenter(p) {
      this.ctypes.centreId = p.centreId;
      this.ctypes.value = p.name;
      this.findData();
    },
    // 根据地区查询 充电桩的充电总时长等2
    findData() {
      let data = {
        userId: localStorage.getItem("userId"),
        centre: this.ctypes.centreId,
        // location: value.value.location||"G",
        limit: 1000000,
        page: this.page,
      };
      this.loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      this.loadingName = "please wait...";
      findByDataRecord(data) ///api/chargerInfo/findByDataRecord
        .then((res) => {
          // console.log(res, " 根据地区查询 充电桩的充电总时长等");
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loadingInstance.close();
          });
          this.loadingName = "No Data!";
          if (res.code == 100) {
            this.cdetails = [...this.cdetails, ...res.extend.chargerRecordList];
            this.count = res.extend.count;
          }
        })
        .catch((err) => {
          if (this.loadingInstance != null) {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loadingInstance.close();
          }
        });
    },
  },
};
</script>

<style scoped>
.urtable {
  overflow: hidden;
}
.loadMore {
  /* background: red; */
  max-height: 580px !important;
  overflow-y: scroll;
}
.cneterShow {
  position: absolute;
  right: 60px;
  top: 30px;
  z-index: 9999;
}
.cneterShow span {
  font-size: 18px;
}
.cneterShow > div {
  width: 250px;
  height: 38px;
  border: 1px solid #205cbf;
  border-radius: 4px;
  background: transparent;
  padding: 0 17px 0 23px;
  box-sizing: border-box;
  color: #63d1ff;
  font-size: 17px;
  cursor: pointer;
  margin-left: 10px;
}
.cneterShow > div > img {
  width: 15px;
  height: 10px;
  transition: all 0.2s linear;
}
.seleterBody {
  width: 250px;
}

.UptodateStatus {
  position: relative;
}
.sees {
  width: 85px;
  height: 32px;
  /* line-height: 40px; */
  font-size: 16px;
  outline: 0;
  border: 0;
  background: rgb(32 93 193);
  color: #ffffff;
  border-radius: 5px;
}
.ortoptit {
  line-height: 55px;
}
.ustabletit {
  background: #0d264e;
}
.ustablemain {
  background: transparent;
}
.ustable ul {
  border-bottom: 2px solid #205cbf;
}
.ustable ul:last-child {
  border-bottom: none;
}
.ustable li {
  border-right: 2px solid #205cbf;
}
.ustable li:last-child {
  border-right: none;
}
.overRights {
  margin-top: 53px;
  height: 810px;
}
.ustabletit {
  padding-right: 12px;
}
.ustable {
  width: 1406px;
  /* height: 677px; */
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
  position: relative;
}
</style>
