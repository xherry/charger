<template>
  <div class="UptodateStatus">
    <button
      v-if="isToDetail"
      class="button goback"
      @click="(isToDetail = false), (queryData = {})"
    >
      Back
    </button>
    <div class="cneterShow flex flex-Updown" v-if="isToDetail">
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
      <!-- 数据 -->
      <div v-if="!isToDetail">
        <div class="ustable">
          <ul class="ustabletit">
            <li>
              <p>Centre</p>
            </li>
            <li>
              <p>Total Charging Time（Hour）</p>
            </li>
            <li>
              <p>Total No. of Charging（Time）</p>
            </li>
            <li>
              <p>Total Charging Energy（kWh）</p>
            </li>
            <li>
              <p>Detail</p>
            </li>
          </ul>
          <ul class="ustablemain" v-for="(item, index) in centerType" :key="index">
            <li>
              <p>{{ item.name }}</p>
            </li>
            <li>
              <p v-if="item.value">{{ item.value.totalchargingtime }}</p>
            </li>
            <li>
              <p v-if="item.value">{{ item.value.totalofcharging }}</p>
            </li>
            <li>
              <p v-if="item.value">{{ item.value.totalchargingenergy | val2 }}</p>
            </li>
            <li>
              <p><button class="button sees" @click="seeDetails(item)">View</button></p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 详情 -->
      <div v-else>
        <div class="ustable">
          <ul class="ustabletit">
            <li>
              <p>Charger No.</p>
            </li>
            <li>
              <p>Total Charging Time（Hour）</p>
            </li>
            <li>
              <p>Total No. of Charging（Time）</p>
            </li>
            <li>
              <p>Total Charging Energy（kWh）</p>
            </li>
          </ul>
          <!--  -->
          <div v-if="cdetails.length != 0">
            <div class="loadMore" v-infinite-scroll="loadMore">
              <div class="udetails">
                <ul
                  class="ustablemain"
                  v-for="(item, index) in cdetails"
                  :key="index + 'k'"
                >
                  <li>
                    <p>{{ item.chargerno }}</p>
                  </li>
                  <li>
                    <p v-if="item.totalchargingtime">{{ item.totalchargingtime }}</p>
                  </li>
                  <li>
                    <p v-if="item.totalofcharging">{{ item.totalofcharging }}</p>
                  </li>
                  <li>
                    <p v-if="item.totalchargingenergy">
                      {{ item.totalchargingenergy | val2 }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else>
            <ul class="ustablemain">
              <li>
                <p>No Data！</p>
              </li>
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
        :page-size="10"
        hide-on-single-page
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { findBYN, findByDataRecord } from "../../common/api";
export default {
  name: "UptodateStatus",
  data() {
    return {
      isToDetail: false,
      isOptionsId: false,
      count: 0,
      page: 1,
      centreId: "",
      centerType: [
        { centreId: 1, name: "Hung Hom", value: null, cid: "CLP2101" },
        { centreId: 0, name: "Shatin", value: null, cid: "CLP3301" },
        { centreId: 2, name: "Sham Shui Po", value: null, cid: "CLP2201" },
        { centreId: 5, name: "Shek Wu Hui", value: null, cid: "CLP3101" },
        { centreId: 3, name: "Tsing Yi", value: null, cid: "CLP3801" },
        { centreId: 4, name: "Yuen Long", value: null, cid: "CLP3701" },
      ],
      cdetails: [],
      queryData: {},
      ctypes: {
        centreId: "",
        value: "",
      },
    };
  },
  created() {
    this.getSixData();
  },
  filters: {
    val2(val) {
      return Number(val).toFixed(2);
    },
  },
  methods: {
    loadMore() {
      if (this.page > Math.ceil(this.count / 15))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.findData();
    },
    seleteCenter(p) {
      this.ctypes.centreId = p.centreId;
      this.ctypes.value = p.name;
      this.queryData.centre = p.centreId;
      this.findData();
    },
    //  根据地区查询 充电桩的充电总时长等
    seeDetails(value) {
      console.log(value);
      if (!value.value) {
        this.$message.warning("No more data！");
        return;
      }
      this.queryData = value;
      this.ctypes.value = value.name;
      this.isToDetail = true;
      this.findData();
    },
    // 根据地区查询 充电桩的充电总时长等2
    findData() {
      let value = this.queryData;
      let data = {
        userId: localStorage.getItem("userId"),
        centre: value.value.centre,
        location: value.value.location,
        limit: 15,
        page: this.page,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      findByDataRecord(data)
        .then((res) => {
          // console.log(res, " 根据地区查询 充电桩的充电总时长等");
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.cdetails = [...this.cdetails, ...res.extend.chargerInfoList];
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
    // 查询六个地区下充电桩等信息
    async getSixData() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      findBYN(data)
        .then((res) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          // console.log(res, "查询六个地区下充电桩等信息");
          if (res.code == 100) {
            let values = res.extend;
            this.centerType = [
              { centreId: 1, name: "Hung Hom", value: values.hh || null, cid: "CLP2101" },
              { centreId: 0, name: "Shatin", value: values.s || null, cid: "CLP3301" },
              {
                centreId: 2,
                name: "Sham Shui Po",
                value: values.ssp || null,
                cid: "CLP2201",
              },
              {
                centreId: 5,
                name: "Shek Wu Hui",
                value: values.swh || null,
                cid: "CLP3101",
              },
              { centreId: 3, name: "Tsing Yi", value: values.ty || null, cid: "CLP3801" },
              {
                centreId: 4,
                name: "Yuen Long",
                value: values.yl || null,
                cid: "CLP3701",
              },
            ];
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
  width: 224px;
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
.goback {
  width: 80px;
  height: 30px;
  color: #ffffff;
  font-size: 16px;
  outline: 0;
  border: 0;
  background: rgb(32, 93, 193);
  position: absolute;
  top: 40px;
  left: 55px;
  border-radius: 5px;
  z-index: 9999;
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
