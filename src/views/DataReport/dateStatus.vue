<template>
  <div class="dateStatus">
    <div class="overRights">
      <p class="ortoptit">Search Conditions</p>
      <div class="dsmain flex">
        <div class="dsmaincontent">
          <!-- v-for="(item, index) in searchs"
            :key="index" -->
          <div
            class="dsmleftitem cdltopitem flex flex-Updown-between"
            @click="optionsId = optionsId === searchs[0].id ? '' : searchs[0].id"
          >
            <span>{{ searchs[0].name }}</span>
            <p class="flex flex-Updown-between">
              <span>{{ searchs[0].value }}</span>
              <img
                :style="{
                  transform: `rotate(${optionsId === searchs[0].id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div
              class="seleterBody"
              :style="{ height: optionsId === searchs[0].id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in searchs[0].children"
                :key="i + 'ss'"
                @click="seleteCenter(p)"
              >
                {{ p.value }}
              </div>
            </div>
          </div>
          <div class="dsmleftitem cdltopitem flex flex-Updown-between">
            <span>{{ searchs[1].name }}</span>
            <input type="text" @blur="getLocation" v-model="searchs[1].value" />
          </div>
          <div
            class="dsmleftitem cdltopitem flex flex-Updown-between"
            @click="openSelete(1)"
          >
            <span>{{ searchs[2].name }}</span>
            <p class="flex flex-Updown-between">
              <span>{{ searchs[2].value }}</span>
              <img
                :style="{
                  transform: `rotate(${optionsId === searchs[2].id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div
              class="seleterBody"
              :style="{ height: optionsId === searchs[2].id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in ChargerType"
                :key="i + 'ss'"
                @click="seletes(p, 1)"
              >
                {{ p.chargerType }}
              </div>
            </div>
          </div>
          <div class="dsmleftitem cdltopitem flex flex-Updown-between">
            <span>{{ searchs[3].name }}</span>
            <input type="text" v-model="searchs[3].value" />
          </div>
          <div
            class="dsmleftitem cdltopitem flex flex-Updown-between"
            @click="optionsId = optionsId === searchs[4].id ? '' : searchs[4].id"
          >
            <span>{{ searchs[4].name }}</span>
            <p class="flex flex-Updown-between">
              <span>{{ searchs[4].value }}</span>
              <img
                :style="{
                  transform: `rotate(${optionsId === searchs[4].id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div
              class="seleterBody"
              :style="{ height: optionsId === searchs[4].id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in BySelectTwo"
                :key="i + 'ss'"
                @click="seletes(p, 3)"
              >
                {{ p }}
              </div>
            </div>
          </div>
          <div
            class="dsmleftitem cdltopitem flex flex-Updown-between"
            @click="optionsId = optionsId === searchs[5].id ? '' : searchs[5].id"
          >
            <span>{{ searchs[5].name }}</span>
            <p class="flex flex-Updown-between">
              <span>{{ searchs[5].value }}</span>
              <img
                :style="{
                  transform: `rotate(${optionsId === searchs[5].id ? '180' : '0'}deg)`,
                }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div
              class="seleterBody"
              :style="{ height: optionsId === searchs[5].id ? '200px' : '0px' }"
            >
              <div
                class="button seleter_item"
                v-for="(p, i) in Model"
                :key="i + 'ss'"
                @click="seletes(p, 4)"
              >
                {{ p }}
              </div>
            </div>
          </div>
          <div class="dsmleftitem cdltopitem flex flex-Updown-between">
            <span>{{ searchs[6].name }}</span>
            <input type="text" v-model="searchs[6].value" />
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
            <div v-if="chargerInfoList.length != 0">
              <!-- , updateId === index ? 'bshow' : '' -->
              <div class="loadMore box" v-infinite-scroll="loadMore">
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
              </div>
            </div>
            <div v-else>
              <ul class="uldatas w100">
                <li><p>No Data！</p></li>
              </ul>
            </div>
          </div>
          <!-- <div class="pagination">
            <el-pagination
              @current-change="sizeChange"
              background
              layout=" prev, pager, next, jumper, ->, total, slot"
              :total="count"
              :page-size="8"
              hide-on-single-page
            >
            </el-pagination>
          </div> -->
        </div>
        <p class="Update">
          <span class="button" @click="getParams">Update</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// EVFindBySelect 下拉框查询 车辆名称
// EVFindBySelectTwo 下拉框查询 车辆类型
// findByChargerType 根据中心和层数 查询车类类别
// findByModel 根据车辆类型查询车牌号
import {
  findByParamsAll,
  EVFindBySelect,
  EVFindBySelectTwo,
  findByChargerType,
  findByModel,
} from "../../common/api";
export default {
  name: "dateStatus",
  data() {
    return {
      updateId: "",
      tableDatas: [],
      isShowSlete: false,
      optionsId: "",
      count: 0,
      BySelect: [], //车辆名称
      BySelectTwo: [], //车辆类型
      ChargerType: [], //查询车类类别
      Model: [], //根据车辆类型查询车牌号
      searchs: [
        {
          name: "Centre",
          value: "",
          cid: "",
          centreId: "",
          children: [
            { centreId: 0, value: "Shatin Centre", cid: "CLP3301" },
            { centreId: 1, value: "Hung Hom HQ", cid: "CLP2101" },
            { centreId: 2, cid: "", value: "Sham Shui Po Centre", cid: "CLP2201" },
            { centreId: 3, value: "Tsing Yi Centre", cid: "CLP3801" },
            { centreId: 4, value: "Yuen Long Centre", cid: "CLP3701" },
            { centreId: 5, value: "Shek Wu Hui Centre", cid: "CLP3101" },
          ],
          id: 1,
        },
        { name: "Location", value: "", children: [], id: 2 },
        { name: "Charger Type", cid: "", value: "", children: [], id: 3 },
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
    this.getBySelect();
  },
  mounted() {},
  methods: {
    loadMore() {
      if (this.page > Math.ceil(this.count / 10))
        return this.$message.warning("No more data!");
      this.page += 1;
      this.getParams();
    },
    openSelete(type) {
      if (type == 1) {
        if (this.searchs[0].centreId === "" || this.searchs[1].value === "") {
          this.$message.warning(
            "Please select the center and fill in the location first"
          );
        }
        this.optionsId = this.optionsId === this.searchs[2].id ? "" : this.searchs[2].id;
      }
    },
    // 选择
    seletes(value, i) {
      if (i == 1) {
        this.searchs[2].value = value.chargerType;
        this.searchs[2].cid = value.id;
      }
      if (i == 3) {
        this.searchs[4].value = value;
      }
      if (i == 4) {
        this.searchs[5].value = value;
      }
    },
    // 车辆名称EVFindBySelect
    async getBySelect() {
      let result = await EVFindBySelect({ userId: localStorage.getItem("userId") });
      // console.log("车辆名称EVFindBySelect", result);
      if (result.code == 100) {
        // this.BySelect = result.extend.electricVehicleList;
        result.extend.electricVehicleList.forEach((item) => {
          if (item.evManufacturer) {
            this.getBySelectTwo(item.evManufacturer);
          }
          if (item.evModel) {
            this.getModel(item.evModel);
          }
        });
      }
    },
    // 车辆类型EVFindBySelectTwo
    async getBySelectTwo(value) {
      let data = {
        manufacturer: value,
        userId: localStorage.getItem("userId"),
      };
      let result = await EVFindBySelectTwo(data);
      // console.log("车辆类型EVFindBySelectTwo", result);
      if (result.code == 100) {
        this.BySelectTwo = result.extend.vehicleNumberList.map((item) => {
          if (item.evManufacturer) {
            return item.evManufacturer;
          }
        });
      }
    },
    getLocation() {
      if (this.searchs[0].centreId !== "" && this.searchs[1].value !== "") {
        this.getChargerType();
      }
    },
    // findByChargerType 根据中心和层数 查询车类类别
    async getChargerType() {
      let data = {
        userId: localStorage.getItem("userId"),
        centreId: this.searchs[0].centreId,
        location: this.searchs[1].value,
      };
      let result = await findByChargerType(data);
      // console.log("查询车类类别", result);
      if (result.code == 100) {
        this.ChargerType = result.extend.chargerNumberingList;
      }
    },
    // // findByModel 根据车辆类型查询车牌号
    async getModel(value) {
      let data = {
        userId: localStorage.getItem("userId"),
        evModel: value,
      };
      let result = await findByModel(data);
      // console.log("根据车辆类型查询车牌号", result);
      if (result.code == 100) {
        this.Model = result.extend.vehicleNumberList.map((item) => {
          if (item.evModel) {
            return item.evModel;
          }
        });
      }
    },
    //展示表格
    showTable(index) {
      this.DataTypes[index].choose = !this.DataTypes[index].choose;
      this.$store.commit("showTableUl", this.DataTypes);
    },
    //
    seleteCenter(value) {
      this.searchs[0].value = value.value;
      this.searchs[0].centreId = value.centreId;
      this.searchs[0].cid = value.cid;
      if (this.searchs[1].value !== "") {
        this.getChargerType();
      }
      // if(!this.searchs[0].cid&&!this.searchs[1].value){
      //   this.$message.warning("Please select the center and fill in the location first")
      //   return
      // }
      // this.getParams();
    },

    //条件筛选查询
    getParams() {
      let searchs = this.searchs;
      // try {
      //   if (searchs[0].cid === "") throw "Please select center！";
      //   if (searchs[1].value === "") throw "Please enter the Location";
      //   if (searchs[2].value === "") throw "Please enter the Charger Type";
      //   // if (searchs[3].value === "") throw "Please enter the Charger No.！";
      //   // // if (searchs[4].value === "") throw "请输入车辆类型！";
      //   // // if (searchs[5].value === "") throw "请输入车辆类型model！";
      //   // if (searchs[6].value === "") throw "Please select the Vehicle No.！";
      //   if (this.startTime === "") throw "Please select  startTime";
      //   if (this.endTime === "") throw "Please select  endTime";
      // } catch (err) {
      //   this.$message.warning(err);
      //   return;
      // }
      let data = {
        centre: this.searchs[0].cid,
        location: this.searchs[1].value,
        chargerType: this.searchs[2].cid,
        chargerNo: this.searchs[3].value,
        manufacturer: this.searchs[4].value,
        model: this.searchs[5].value,
        vehicleNo: this.searchs[6].value || "null",
        startDate: this.startTime,
        endDate: this.endTime,
      };
      let datas = { userIds: localStorage.getItem("userId"), page: this.page, limit: 8 };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      this.$store.commit("getChargerInfoData", data);
      findByParamsAll({ ...data, ...datas })
        .then((res) => {
          // console.log("条件筛选查询", res);
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
.urtable {
  overflow: hidden;
}
.loadMore {
  /* background: red; */
  max-height: 580px !important;
  overflow-y: scroll;
}
.seleteDate {
  width: 190px;
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
  width: 190px;
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
  width: 190px;
  height: 31px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 10px;
  box-sizing: border-box;
  color: #63d1ff;
  font-size: 12px;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 12px;
  display: inline-block;
  margin-right: 5px;
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
