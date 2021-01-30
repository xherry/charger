<template>
  <div class="Detailed">
    <div class="chargerTop flex flex-Updown-between">
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
        <div class="seleterBody" :style="{ height: isShowSlete ? '250px' : '0px' }">
          <div
            class="button seleter_item"
            v-for="(p, i) in $store.state.centerType"
            :key="i"
            @click="seleteCenter(p)"
          >
            {{ p.value }}
          </div>
        </div>
      </div>
      <div class="refresh button" @click="refresh">Refresh</div>
      <!-- <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" v-model="Location" @blur="getValue" placeholder="Location " />
      </div> -->
    </div>
    <div class="overRights">
      <p class="ortoptit">Detailed Centre Information</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>Parking No.</p></li>
          <li @click="sorting(1)">
            <div class="flex flex-Updown-between sorting">
              <p>Charger No.</p>
              <img
                src="../../assets/index/top.png"
                :style="{ transform: `rotate(${chargerNo === 1 ? '-180deg' : '0'})` }"
                alt=""
              />
            </div>
          </li>
          <li @click="sorting(2)">
            <div class="flex flex-Updown-between sorting">
              <p>Status</p>
              <img
                src="../../assets/index/top.png"
                :style="{ transform: `rotate(${status === 1 ? '-180deg' : '0'})` }"
                alt=""
              />
            </div>
          </li>
          <li><p>Charger Type</p></li>
          <li><p>Vehicle No.</p></li>
          <li>
            <div>
              <p>Charging Time</p>
              <p>(Hour)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Energy</p>
              <p>(kWh)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Voltage</p>
              <p>(V)</p>
            </div>
          </li>
          <li>
            <div>
              <p>Charging Current</p>
              <p>(A)</p>
            </div>
          </li>
        </ul>
        <!-- v-if="chargerInfoList.length != 0" -->
        <div v-if="chargerInfoList.length != 0">
          <div class="loadMore box" v-infinite-scroll="loadMore">
            <ul
              :class="[
                'uldatas',
                'w100',
                seleteUtits == item.chargerno ? 'seleteUtits' : '',
              ]"
              v-for="(item, index) in chargerInfoList"
              :key="index"
              @dblclick="toDetails(item.centre, item.chargerno)"
              @click="seleteCenters(item.chargerno)"
            >
              <li>
                <p>{{ item.parkingspaceNumber | valNO }}</p>
              </li>
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
                <p>{{ item.chargingtime | value2 }}</p>
              </li>
              <li>
                <p>{{ item.chargingenergy | value2 }}</p>
              </li>
              <li>
                <p>{{ item.chargingvoltage | val3 }}</p>
              </li>
              <li>
                <p>{{ item.chargingcurrent | value2 }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <ul class="uldatas w100">
            <li><p>No Data！</p></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="pagination">
      <el-pagination
        @current-change="sizeChange"
        background
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="count"
        :page-size="10"
        hide-on-single-page
      >
      </el-pagination>
    </div> -->
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
        centreId: "CLP2201",
        value: "Sham Shui Po Centre",
      },
      page: 1,
      count: 0,
      chargerNo: null,
      status: 6,
      seleteUtits: "",
    };
  },
  created() {},
  mounted() {
    let loginInfos = JSON.parse(localStorage.getItem("chargerInfo"));
    if (this.$route.query.cid) {
      this.ctypes.value = this.$store.state.centerType.filter(
        (item) => item.cid == this.$route.query.cid
      )[0].value;
      this.ctypes.centreId = this.$route.query.cid;
    } else {
      this.ctypes = {
        centreId: this.$store.state.loginInfos.cid?this.$store.state.loginInfos.cid:loginInfos.centre,
        value: this.$store.state.centerType.filter(
              (item) => item.cid == (this.$store.state.loginInfos.cid?this.$store.state.loginInfos.cid:loginInfos.centre)
            )[0].value,
      };
    }
    this.getCCECDetail();
  },
  filters: {
    val3(val) {
      if (val) {
        let vz = val.split("Φ");
        return vz[0] + "Φ" + parseFloat(vz[1]).toFixed(2);
      } else {
        return "";
      }
    },
  },
  methods: {
    toDetails(cid, chargerno) {
      this.$store.commit("isBacked", 1);
      this.$router.push({ path: "detailInform", query: { cid, chargerno } });
    },
    seleteCenters(value) {
      this.seleteUtits = value;
    },
    loadMore() {
      if (this.page >= Math.ceil(this.count / 1000000))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.getCCECDetail();
    },
    // 排序
    sorting(type) {
      if (type == 1) {
        this.chargerNo = this.chargerNo === 1 ? 2 : 1;
      }
      if (type == 2) {
        this.status = this.status === 1 ? 2 : 1;
      }
      this.chargerInfoList = [];
      this.page = 1;
      this.getCCECDetail();
    },
    getValue() {
      this.page = 1;
      this.getCCECDetail();
    },
    //
    // sizeChange(value) {
    //   this.page = value;
    //   this.getCCECDetail();
    // },
    //
    seleteCenter(values) {
      this.ctypes = {
        centreId: values.cid,
        value: values.value,
      };
      this.chargerInfoList = [];
      this.page = 1;
      this.getCCECDetail();
    },
    refresh() {
      this.page = 1;
      this.chargerNo = null;
      this.chargerInfoList = [];
      this.status = 6;
      this.getCCECDetail();
    },
    //
    getCCECDetail() {
      //  || this.Location !== ""
      let chargerNo = this.chargerNo ? { chargerNo: this.chargerNo } : {};
      let datas =
        this.ctypes.centreId !== ""
          ? {
              centre: this.ctypes.centreId,
              // location: this.Location,
            }
          : {};
      let data = {
        page: this.page,
        limit: 1000000,
        userId: localStorage.getItem("userId"),
        status: this.status,
        ...chargerNo,
        ...datas,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
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
            this.chargerInfoList = [
              ...this.chargerInfoList,
              ...res.extend.chargerInfoList,
            ];
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
.seleteUtits {
  box-shadow: inset 0 0 10px #ffffff;
}
.urtable {
  overflow: hidden;
}
.loadMore {
  /* background: red; */
  height: 550px;
  overflow-y: scroll;
}
/* .sorting{
  width: 100%;
} */
.sorting > img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: all 0.1s linear;
}
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
.ultit {
  padding-right: 12px;
}
.urtable > ul {
  box-sizing: border-box;
}
.refresh {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  border-radius: 6px;
  background: #1450b0;
  text-align: center;
  /* margin-left: 200px; */
}
.overRights {
  height: 714px;
  margin-top: 32px;
  overflow: hidden;
}
.chargerTop {
  width: 100%;
  padding: 0 60px 0 150px;
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
  font-size: 15px;
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
