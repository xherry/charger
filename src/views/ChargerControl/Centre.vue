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
            v-for="(item, index) in $store.state.centerType"
            :key="index"
            @click="seleteCenter(item)"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <!-- <div class="ct-item flex flex-Updown-between">
        <span>Location</span>
        <input type="text" v-model="Location" placeholder="Location" />
      </div> -->
      <!-- <div class="Confirm button" @click="demandData">Confirm</div> -->
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
      <div class="allTables">
        <div class="urtable">
          <ul class="ultit">
            <li @click="sorting">
              <div class="flex flex-Updown-between sorting">
                <p>Charger No.</p>
                <img
                  src="../../assets/index/top.png"
                  :style="{ transform: `rotate(${chargerNo === 1 ? '-180deg' : '0'})` }"
                  alt=""
                />
              </div>
            </li>
            <li><p>Enable/Disable</p></li>
            <li>
              <div class="flex uconcrol w100">
                <p>Start</p>
                <p>Stop</p>
              </div>
            </li>
            <li>
              <div class="flex uconcrol w100">
                <p>LMS</p>
                <p>Full</p>
              </div>
            </li>
          </ul>
          <div v-if="chargerInfoList.length != 0">
            <div class="loadMore box" v-infinite-scroll="loadMore">
              <ul
                :class="[
                  'uldatas',
                  'w100',
                  item.status == 'Disconnected' ||
                  item.status == 'OffLine' ||
                  item.status == 'Disable'
                    ? 'Disable'
                    : '',
                ]"
                v-for="(item, index) in chargerInfoList"
                :key="index"
              >
                <li>
                  <p>{{ item.chargerno }}</p>
                </li>
                <li>
                  <img
                    v-if="
                      item.status != 'Disconnected' &&
                      item.status != 'Offline' &&
                      item.status != 'Disable'
                    "
                    src="../../assets/index/useraccount/04.png"
                    alt=""
                    @click="setStatus(1, item.status, item.chargerno, item.centre, index)"
                  />
                  <div class="cancelX" v-else>
                    <p>x</p>
                    <img
                      @click="
                        setStatus(0, item.status, item.chargerno, item.centre, index)
                      "
                      src="../../assets/index/useraccount/03.png"
                      alt=""
                    />
                  </div>
                </li>
                <li>
                  <div class="flex uconcrol w100">
                    <div
                      @click="
                        setStatus(3, item.status, item.chargerno, item.centre, index)
                      "
                    >
                      <img
                        v-if="
                          item.status != 'Disconnected' &&
                          item.status != 'Offline' &&
                          item.status != 'Disable' &&
                          item.status != 'InUse' &&
                          item.status != 'WaitCharging'
                        "
                        src="../../assets/index/useraccount/04.png"
                        alt=""
                      />
                      <div class="cancelX" v-else>
                        <p>x</p>
                        <img src="../../assets/index/useraccount/03.png" alt="" />
                      </div>
                    </div>
                    <div
                      @click="
                        setStatus(2, item.status, item.chargerno, item.centre, index)
                      "
                    >
                      <img
                        v-if="
                          item.status != 'Disconnected' &&
                          item.status != 'Offline' &&
                          item.status != 'Disable' &&
                          item.status != 'Charging'
                        "
                        src="../../assets/index/useraccount/04.png"
                        alt=""
                      />
                      <div class="cancelX" v-else>
                        <p>x</p>
                        <img src="../../assets/index/useraccount/03.png" alt="" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="flex uconcrol w100">
                    <div
                      @click="
                        setStatus(4, item.status, item.chargerno, item.centre, index)
                      "
                    >
                      <img
                        v-if="
                          item.status != 'Disconnected' &&
                          item.status != 'OffLine' &&
                          item.status == 'Disabled'
                        "
                        src="../../assets/index/useraccount/04.png"
                        alt=""
                      />
                      <div class="cancelX" v-else>
                        <p>x</p>
                        <img src="../../assets/index/useraccount/03.png" alt="" />
                      </div>
                    </div>
                    <div
                      @click="
                        setStatus(5, item.status, item.chargerno, item.centre, index)
                      "
                    >
                      <img
                        v-if="
                          item.status != 'Disconnected' &&
                          item.status != 'OffLine' &&
                          item.status == 'Disabled'
                        "
                        src="../../assets/index/useraccount/04.png"
                        alt=""
                      />
                      <div class="cancelX" v-else>
                        <p>x</p>
                        <img src="../../assets/index/useraccount/03.png" alt="" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <ul class="uldatas w100 p12">
              <li><p>No Data！</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="pagination">
      <el-pagination
        @current-change="sizeChange"
        background
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="count"
        hide-on-single-page
        :page-size="10"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { findByDetails, controlCharger, findByChargerType } from "../../common/api";
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
        { centreId: 1, value: "Hung Hom HQ" },
        { centreId: 2, value: "Sham Shui Po Centre" },
        { centreId: 3, value: "Tsing Yi Centre" },
        { centreId: 4, value: "Yuen Long Centre" },
        { centreId: 5, value: "Shek Wu Hui Centre" },
      ],
      chargerInfoList: [],
      Location: "",
      count: 0,
      page: 1,
      chargerNo: null,
    };
  },
  created() {
    this.ctypes = {
      centreId: this.$store.state.loginInfos.cid,
      value: this.$store.state.loginInfos.cid
        ? this.$store.state.centerType.filter(
            (item) => item.cid == this.$store.state.loginInfos.cid
          )[0].value
        : "",
    };
    this.getNowData();
    // console.log(this.$store.state.loginInfos);
  },
  mounted() {},
  methods: {
    loadMore() {
      if (this.page >= Math.ceil(this.count / 10))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.getNowData();
    },
    sorting() {
      this.page = 1;
      this.chargerNo = this.chargerNo === 1 ? 2 : 1;
      this.chargerInfoList = [];
      this.getNowData();
    },
    // 操作开关
    setStatus(type, status, chargerno, centre, index) {
      let data = {
        userIds: localStorage.getItem("userId"),
        type: type,
        centre: centre,
        chargerNo: chargerno,
      };
      if (status == "Disconnected" || status == "OffLine") {
        this.$message.warning("Equipment offline！");
        return;
      }
      // if (type == 1) {
      //   if (status != "Disable") {
      //     this.$message.warning("Unable to enable！");
      //     return;
      //   }
      // }
      // if (type == 0) {
      //   if (status == "Disable") {
      //     this.$message.warning("Unable to enable！");
      //     return;
      //   }
      // }
      if (type == 3) {
        if (status != "InUse" || status != "WaitCharging") {
          this.$message.warning("Unable to enable！");
          return;
        }
      }
      if (type == 2) {
        if (status != "Charging") {
          this.$message.warning("Unable to enable！");
          return;
        }
      }
      if (type == 4 || type == 5) {
        if (status != "Disabled") {
          this.$message.warning("Unable to enable！");
          return;
        }
      }
      controlCharger(data).then((res) => {
        // console.log(res, "操作开关");
        if (res.code == 100) {
          this.$message.success("Send command successfully！");
          // this.getNowData();
          if (type == 0 || type == 1) {
            this.chargerInfoList[index].status =
              status == "Disable" ? "Enable" : "Disable";
          }
          this.$forceUpdate();
        }
      });
    },
    // 选择中心
    seleteCenter(prop) {
      this.ctypes.centreId = prop.cid;
      this.ctypes.value = prop.value;
      this.page = 1;
      this.chargerInfoList = [];
      this.getNowData();
    },
    //查询
    demandData() {},
    // 查询数据
    findByChargerType() {
      let data = {};
    },
    // 查询充电桩的实时数据
    getNowData() {
      //  || this.Location !== ""
      let chargerNo = this.chargerNo ? { chargerNo: this.chargerNo } : {};
      let datas =
        this.ctypes.centreId !== ""
          ? {
              centre: this.ctypes.centreId,
            }
          : {};
      let data = {
        page: this.page,
        limit: 10,
        userId: localStorage.getItem("userId"),
        status: 6,
        ...chargerNo,
        ...datas,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      findByDetails(data)
        .then((res) => {
          // console.log(res, "查询充电桩的实时数据");
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
        .catch(() => {
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
.Disable {
  /* background-color: #99999930; */
  opacity: 0.4;
}
.loadMore {
  /* background: red; */
  height: 550px;
  overflow-y: scroll;
}
.uldatas > li img {
  left: 50%;
  transform: translateX(-50%);
}
.uldatas > li {
  flex: 1;
}
.sorting > img {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  transition: all 0.1s linear;
}
.pagination {
  bottom: -80px;
}
.Centre {
  position: relative;
}
.uldatas img {
  width: 25px;
  height: 25px;
}
.allTables {
  width: 1486px;
  margin-left: 10px;
  padding: 0 250px;
}
.urtable {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgb(27, 91, 187);
  overflow-x: hidden;
  overflow-y: auto;
}
.urtable ul {
  border-top: 1px solid rgb(27, 91, 187);
  /* border-right: 1px solid rgb(27, 91, 187);
  border-left: 1px solid rgb(27, 91, 187); */
  box-sizing: border-box;
  width: 100%;
}
.urtable ul {
  /* border-bottom: 0px; */
}
.urtable ul li {
  border-right: 1px solid rgb(27, 91, 187);
}
.urtable ul li:last-child {
  border: 0;
}
.urtable .ultit {
  /* padding-right:262px */
  width: calc(100% - 12px);
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
.seleterBody {
  width: 250px;
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
.cancelX {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cancelX p {
  color: red;
  font-size: 26px;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
}
.uconcrol {
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}
.bor1 {
  border: 1px solid #acd1fe;
}
.uconcrol > P,
.uconcrol > div {
  width: 50% !important;
}
.uldatas .uconcrol img {
  position: static;
  transform: translateX(0) !important;
}
</style>
