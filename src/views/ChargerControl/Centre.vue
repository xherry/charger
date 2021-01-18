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
      <div class="Confirm button" @click="demandData">Confirm</div>
    </div>
    <div class="overRights">
      <p class="ortoptit">Control Centre EV Charger</p>
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
          <li><p>Enable</p></li>
          <li><p>Disable</p></li>
        </ul>
        <div v-if="chargerInfoList.length != 0">
          <div class="loadMore box" v-infinite-scroll="loadMore">
            <ul
              class="uldatas w100"
              v-for="(item, index) in chargerInfoList"
              :key="index"
            >
              <li>
                <p>{{ item.chargerno }}</p>
              </li>
              <li @click="setStatus(1, item.status, item.chargerno, item.centre, index)">
                <img
                  v-if="item.status != 'Disable'"
                  src="../../assets/index/useraccount/04.png"
                  alt=""
                />
                <img v-else src="../../assets/index/useraccount/03.png" alt="" />
              </li>
              <li @click="setStatus(0, item.status, item.chargerno, item.centre, index)">
                <img
                  v-if="item.status == 'Disable'"
                  src="../../assets/index/useraccount/04.png"
                  alt=""
                />
                <img v-else src="../../assets/index/useraccount/03.png" alt="" />
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
      chargerNo: 6,
    };
  },
  created() {},
  mounted() {
    this.getNowData();
  },
  methods: {
    loadMore() {
      if (this.page > Math.ceil(this.count / 10))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.getNowData();
    },
    sorting() {
      this.chargerNo = this.chargerNo === 1 ? 2 : 1;
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
      if (type == 1) {
        if (status != "Disable") {
          this.$message.warning("Unable to enable！");
          return;
        }
      }
      if (type == 0) {
        if (status == "Disable") {
          this.$message.warning("Unable to enable！");
          return;
        }
      }
      controlCharger(data).then((res) => {
        // console.log(res, "操作开关");
        if (res.code == 100) {
          this.$message.success("Send command successfully！");
          // this.getNowData();
          this.chargerInfoList[index].status = status == "Disable" ? "Enable" : "Disable";
          this.$forceUpdate();
        }
      });
    },
    // 选择中心
    seleteCenter(prop) {
      this.ctypes.centreId = prop.cid;
      this.ctypes.value = prop.value;
    },
    //查询
    demandData() {
      this.page = 1;
      this.getNowData();
    },
    // 查询数据
    findByChargerType() {
      let data = {};
    },
    // 查询充电桩的实时数据
    getNowData() {
      //  || this.Location !== ""
      let datas =
        this.ctypes.centreId !== ""
          ? {
              centre: this.ctypes.centreId,
              // location: this.Location,
            }
          : {};
      let data = {
        page: this.page,
        limit: 10,
        userId: localStorage.getItem("userId"),
        chargerNo: this.chargerNo,
        status: 1,
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
.urtable {
  overflow: hidden;
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
.urtable {
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.urtable ul {
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
</style>
