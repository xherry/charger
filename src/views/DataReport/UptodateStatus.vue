<template>
  <div class="UptodateStatus">
    <button
      v-if="isToDetail"
      class="button goback"
      @click="(isToDetail = false), (queryData = {})"
    >
      返回
    </button>
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <!-- 数据 -->
      <template v-if="!isToDetail">
        <div class="ustable">
          <ul class="ustabletit">
            <li>
              <p>Centre</p>
            </li>
            <li>
              <p>Total Charging Time(h)</p>
            </li>
            <li>
              <p>Total Charging Time(ts)</p>
            </li>
            <li>
              <p>Total Charging Energy(kW/h)</p>
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
              <p v-if="item.value">{{ item.value.totalchargingenergy }}</p>
            </li>
            <li>
              <p><button class="button sees" @click="seeDetails(item)">查看</button></p>
            </li>
          </ul>
        </div>
      </template>
      <!-- 详情 -->
      <template v-else>
        <div class="ustable">
          <ul class="ustabletit">
            <li>
              <p>Charger No.</p>
            </li>
            <li>
              <p>Total Charging Time(h)</p>
            </li>
            <li>
              <p>Total Charging Time(ts)</p>
            </li>
            <li>
              <p>Total Charging Energy(kW/h)</p>
            </li>
          </ul>
          <template v-if="cdetails.length != 0">
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
                  <p>{{ item.chargingtime }}</p>
                </li>
                <li>
                  <p>{{ item.batterycapacity }}</p>
                </li>
                <li>
                  <p>{{ item.chargingenergy }}</p>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <ul class="ustablemain">
              <li>
                <p>暂无数据！</p>
              </li>
            </ul>
          </template>
        </div>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="sizeChange"
        background
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="count"
        :page-size="10"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { findBYN, findByDataRecord } from "../../common/api";
export default {
  name: "UptodateStatus",
  data() {
    return {
      isToDetail: false,
      count: 0,
      page: 1,
      centerType: [
        { centreId: 0, name: "Hung Hom", value: null },
        { centreId: 1, name: "Satin", value: null },
        { centreId: 2, name: "Sham Shui Po", value: null },
        { centreId: 3, name: "Shek Wu Hui", value: null },
        { centreId: 4, name: "Tsing Yi", value: null },
        { centreId: 5, name: "Yuen Long", value: null },
      ],
      cdetails: [],
      queryData: {},
    };
  },
  created() {
    this.getSixData();
  },
  methods: {
    sizeChange(value) {
      this.page = value;
      // this.cdetails = JSON.parse(JSON.stringify(this.oldDatas)).splice(
      //   (value - 1) * 10,
      //   10
      // );
      this.findData();
    },
    //  根据地区查询 充电桩的充电总时长等
    seeDetails(value) {
      // console.log(value);
      if (!value.value) {
        this.$message.warning("无更多数据！");
        return;
      }
      this.queryData = value;
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
        limit: 10,
        page: this.page,
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
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
            // this.oldDatas = res.extend.chargerInfoList;
            this.cdetails = res.extend.chargerInfoList || [];
            //  JSON.parse(JSON.stringify(res.extend.chargerInfoList)).splice(
            //   0,
            //   10
            // );
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
    getSixData() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
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
              { centreId: 0, name: "Hung Hom", value: values.hh },
              { centreId: 1, name: "Satin", value: values.s },
              { centreId: 2, name: "Sham Shui Po", value: values.ssp },
              { centreId: 3, name: "Shek Wu Hui", value: values.swh },
              { centreId: 4, name: "Tsing Yi", value: values.ty },
              { centreId: 5, name: "Yuen Long", value: values.yl },
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
.goback {
  width: 80px;
  height: 30px;
  color: #ffffff;
  font-size: 16px;
  outline: 0;
  border: 0;
  background: rgb(32 93 193);
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
