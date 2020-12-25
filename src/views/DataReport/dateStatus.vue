<template>
  <div class="dateStatus">
    <div class="overRights">
      <p class="ortoptit">Search Conditions</p>
      <div class="dsmain flex">
        <div class="dsmaincontent">
          <div
            v-for="(item, index) in searchs"
            :key="index"
            class="dsmleftitem cdltopitem flex flex-Updown-between"
            @click="
              optionsId = item.id == 1 ? (optionsId === item.id ? '' : item.id) : ''
            "
          >
            <span>{{ item.name }}</span>
            <p class="flex flex-Updown-between" v-if="item.children != 0">
              <span>{{ item.value }}</span>
              <img
                :style="{
                  transform: `rotate(${optionsId === item.id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <input type="text" v-model="item.value" v-else />
            <div
              class="seleterBody"
              :style="{ height: optionsId === item.id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in item.children"
                :key="i + 'ss'"
                @click="seleteCenter(p)"
              >
                {{ p.name }}
              </div>
            </div>
          </div>
          <div class="dsmleftitem cdltopitem flex flex-Updown-between">
            <span>Start From</span>
            <div class="seleteDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                :clearable="false"
                v-model="startTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <p class="flex flex-Updown-between">
              <span>{{ startTime }}</span>
              <!-- :style="{
                  transform: `rotate(${optionsId === item.id ? '180' : '0'}deg)`,
                }" -->
              <img src="../../assets/index/setting/10.png" alt="" />
            </p>
          </div>
          <div class="dsmleftitem cdltopitem flex flex-Updown-between">
            <span>End To</span>
            <div class="seleteDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                :clearable="false"
                v-model="endTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <p class="flex flex-Updown-between">
              <span>{{ endTime }}</span>
              <img src="../../assets/index/setting/10.png" alt="" />
            </p>
          </div>
          <p class="dttit">Data Type：</p>
          <div
            class="dtatas flex flex-Updown"
            v-for="(item, index) in DataTypes"
            :key="'d' + item.id"
            @click="showTable(index)"
          >
            <img v-if="item.choose" src="../../assets/index/useraccount/04.png" alt="" />
            <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="dsmain-right">
          <div class="drtable">
            <ul class="ultit">
              <li><p>From</p></li>
              <li><p>To</p></li>
              <li v-if="DataTypes[0].choose"><p>Charging Voltage【v】</p></li>
              <li v-if="DataTypes[1].choose"><p>Average Charging Current【A】</p></li>
              <li v-if="DataTypes[2].choose"><p>Average Charging Power【kw】</p></li>
              <li v-if="DataTypes[3].choose"><p>Total Charging Energy【kwh】</p></li>
              <li v-if="DataTypes[4].choose"><p>Charging Time【Hour】</p></li>
              <li v-if="DataTypes[5].choose"><p>SoC Before Charging【%】</p></li>
              <li v-if="DataTypes[6].choose">
                <p>Mileage Travelled Before Charging【km】</p>
              </li>
            </ul>
            <!-- -->
            <template v-if="chargerInfoList.length != 0">
              <!-- , updateId === index ? 'bshow' : '' -->
              <ul
                :class="['uldatas', 'w100']"
                v-for="(item, index) in chargerInfoList"
                :key="index + 's'"
              >
                <!-- @click="updateId = index" -->
                <li>
                  <p>{{ startTime }}</p>
                </li>
                <li>
                  <p>{{ endTime }}</p>
                </li>
                <li v-if="DataTypes[0].choose">
                  <p>{{ item.chargingVoltage }}</p>
                </li>
                <li v-if="DataTypes[1].choose">
                  <p>{{ item.chargingCurrent }}</p>
                </li>
                <li v-if="DataTypes[2].choose">
                  <p>{{ item.chargingPower }}</p>
                </li>
                <li v-if="DataTypes[3].choose">
                  <p>{{ item.chargingEnergy }}</p>
                </li>
                <li v-if="DataTypes[4].choose">
                  <p>{{ item.chargingTime }}</p>
                </li>
                <li v-if="DataTypes[5].choose">
                  <p>{{ item.socBeforeCharging }}</p>
                </li>
                <li v-if="DataTypes[6].choose">
                  <p>{{ item.mileageTravelled }}</p>
                </li>
              </ul>
            </template>
            <template v-else>
              <ul class="uldatas w100">
                <li><p>暂无数据！</p></li>
              </ul>
            </template>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="sizeChange"
              background
              layout=" prev, pager, next, jumper, ->, total, slot"
              :total="count"
              :page-size="8"
              hide-on-single-page
            >
            </el-pagination>
          </div>
        </div>
        <p class="Update">
          <span class="button" @click="getParams">Update</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { findByParamsAll } from "../../common/api";
export default {
  name: "dateStatus",
  data() {
    return {
      updateId: "",
      tableDatas: [],
      isShowSlete: false,
      optionsId: "",
      count: 0,
      searchs: [
        {
          name: "Centre",
          value: "",
          cid: "",
          children: [
            { centreId: 0, name: "Shatin Centre" },
            { centreId: 1, name: "Hung HoM HQ" },
            { centreId: 2, name: "Sham Shui Po Centre" },
            { centreId: 3, name: "Tsing Yi Centre" },
            { centreId: 4, name: "Yuen Long Centre" },
            { centreId: 5, name: "Shek Wu Hui Centre" },
          ],
          id: 1,
        },
        { name: "Location", value: "", children: [], id: 2 },
        { name: "Charger Type", value: "", children: [], id: 3 },
        { name: "Charger No.", value: "", children: [], id: 4 },
        { name: "Manufacturer", value: "", children: [], id: 5 },
        { name: "Model", value: "", children: [], id: 6 },
        { name: "Vehicle No.", value: "", children: [], id: 6 },
      ],
      startTime: "",
      endTime: "",
      DataTypes: [],
      page: 1,
      chargerInfoList: [],
    };
  },
  created() {
    this.DataTypes = this.$store.state.DataTypes;
  },
  mounted() {},
  methods: {
    //展示表格
    showTable(index) {
      this.DataTypes[index].choose = !this.DataTypes[index].choose;
      this.$store.commit("showTableUl", this.DataTypes);
    },
    //
    sizeChange(value) {
      this.page = value;
      this.getParams();
    },
    //
    seleteCenter(value) {
      this.searchs[0].value = value.name;
      this.searchs[0].cid = value.centreId;
      // this.getParams();
    },

    //条件筛选查询
    getParams() {
      let searchs = this.searchs;
      try {
        if (searchs[0].cid === "") throw "请选择中心！";
        if (searchs[1].value === "") throw "请输入地址！";
        if (searchs[2].value === "") throw "请输入充电桩类型！";
        if (searchs[3].value === "") throw "请输入充电桩编号！";
        // if (searchs[4].value === "") throw "请输入车辆类型！";
        // if (searchs[5].value === "") throw "请输入车辆类型model！";
        if (searchs[6].value === "") throw "请输入车牌号码！";
        if (this.startTime === "") throw "请输入开始时间！";
        if (this.endTime === "") throw "请输入结束时间！";
      } catch (err) {
        this.$message.warning(err);
        return;
      }
      let data = {
        centre: this.searchs[0].cid,
        location: this.searchs[1].value,
        chargerType: this.searchs[2].value,
        chargerNo: this.searchs[3].value,
        manufacturer: this.searchs[4].value,
        model: this.searchs[5].value,
        vehicleNo: this.searchs[6].value,
        startDate: this.startTime,
        endDate: this.endTime,
      };
      let datas = { userIds: localStorage.getItem("userId"), page: this.page, limit: 8 };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background: "rgba(0,0,0,.5)",
      });
      this.$store.commit("getChargerInfoData", data);
      findByParamsAll({ ...data, ...datas })
        .then((res) => {
          console.log("条件筛选查询", res);
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
.seleteDate {
  width: 180px;
  height: 31px;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  opacity: 0;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner > input {
  width: 100% !important;
  height: 31px !important;
}
.el-input__inner {
  height: 31px !important;
  box-sizing: border-box;
}
.Update > span {
  width: 160px;
  height: 44px;
  line-height: 44px;
  display: inline-block;
  /* background: #1F53AD; */
  border-radius: 10px;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: 600;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 23px;
}
.Update {
  position: absolute;
  right: 31px;
  bottom: 22px;
}
.uldatas {
  background: transparent;
}
.ultit {
  background: #0d264e;
  margin-top: 0;
  position: sticky;
  top: 0;
}
ul > li {
  font-size: 14px;
}
.drtable li:last-child {
  border-right: 2px solid #205cbf;
}
.drtable li {
  border-left: 2px solid #205cbf;
}
.drtable ul {
  border-top: 2px solid #205cbf;
}
.drtable ul:last-child {
  border-bottom: 2px solid #205cbf;
}
.drtable {
  width: 100%;
}
.dsmain-right {
  width: 1503px;
  margin-left: 31px;
  max-height: 590px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 28px;
  position: relative;
}
.drtable {
  height: 562px;
}
.dtatas > img {
  width: 12px;
  height: 12px;
  margin-right: 8px;
}
.dtatas {
  margin-top: 14px;
  font-size: 12px;
  cursor: pointer;
}
.dttit {
  font-size: 14px;
  margin-top: 20px;
}
.seleterBody {
  width: 180px;
}
.dsmleftitem {
  width: 300px;
}
.cdltopitem img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.cdltopitem p {
  cursor: pointer;
}
.cdltopitem input,
.cdltopitem p {
  width: 180px;
  height: 31px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 15px;
  box-sizing: border-box;
  color: #63d1ff;
  font-size: 14px;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 14px;
  display: inline-block;
  margin-right: 16px;
}
.cdltopitem {
  margin-top: 15px;
  position: relative;
}
.dsmain {
  width: 1406px;
  height: 705px;
  border: 2px solid #205cbf;
  margin-top: 27px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
}
.overRights {
  margin-top: 53px;
  height: 810px;
}
.ortoptit {
  line-height: 55px;
}
</style>
