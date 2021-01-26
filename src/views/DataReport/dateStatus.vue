<template>
  <div class="dateStatus">
    <div class="chargerTop flex flex-Updown-between">
      <div class="w100 flex flex-Updown">
        <div
          class="dsmleftitem cdltopitem flex flex-Updown"
          @click="optionsId = optionsId === searchs[0].id ? '' : searchs[0].id"
        >
          <span>Centre</span>
          <div class="seleteY flex flex-Updown-between p15">
            <p>{{ searchs[0].value }}</p>
            <img
              :style="{ transform: `rotate(${isShowSlete ? '-180' : '0'}deg)` }"
              src="../../assets/index/says/02.png"
              alt=""
            />
          </div>
          <div
            class="seleterBody"
            :style="{ height: optionsId === searchs[0].id ? '200px' : '0px' }"
          >
            <div
              class="button seleter_item"
              v-for="(p, i) in searchs[0].children"
              :key="i + 'ss'"
              @click="seleteCenter(p, 1)"
            >
              {{ p.value }}
            </div>
          </div>
        </div>
        <div class="dsmleftitem cdltopitem flex flex-Updown" @click="seleteCharger">
          <span>Charger NO.</span>
          <div class="seleteY flex flex-Updown-between p15">
            <p>{{ searchs[1].value }}</p>
            <img
              :style="{
                transform: `rotate(${optionsId === searchs[1].id ? '-180' : '0'}deg)`,
              }"
              src="../../assets/index/says/02.png"
              alt=""
            />
          </div>
          <div
            class="seleterBody"
            :class="[optionsId === searchs[1].id ? 'h200' : 'h0', 'box']"
            v-infinite-scroll="loadMore1"
            infinite-scroll-immediate="false"
          >
            <div
              class="button seleter_item"
              v-for="(item, index) in searchs[1].children"
              :key="index"
              @click="seleteCenter(item, 2)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="or dsmleftitem cdltopitem flex flex-Updown"><span>or</span></div>
        <div class="dsmleftitem cdltopitem flex flex-Updown">
          <span>Vehicle No.</span>
          <div class="flex flex-Updown-between">
            <input
              type="text"
              @blur="getValue"
              placeholder="Vehicle No."
              v-model="searchs[2].value"
            />
          </div>
        </div>
      </div>
      <div
        class="dsmleftitem cdltopitem flex flex-Updown"
        @click="showList.table = !showList.table"
      >
        <span class="dsmleftitemSpan">Table</span>
        <img v-if="showList.table" src="../../assets/index/useraccount/04.png" alt="" />
        <img v-else src="../../assets/index/useraccount/03.png" alt="" />
      </div>
      <div
        class="dsmleftitem cdltopitem flex flex-Updown"
        @click="showList.figure = !showList.figure"
      >
        <span class="dsmleftitemSpan">Figure</span>
        <img v-if="showList.figure" src="../../assets/index/useraccount/04.png" alt="" />
        <img v-else src="../../assets/index/useraccount/03.png" alt="" />
      </div>
    </div>
    <div class="chargerBottom overRights">
      <p class="ortoptit">Search Conditions</p>
      <div class="timeSelete flex flex-Updown">
        <div class="titem flex flex-Updown" @click="showList.isTime = 0">
          <p>Daily</p>
          <img
            v-if="showList.isTime == 0"
            src="../../assets/index/useraccount/04.png"
            alt=""
          />
          <img v-else src="../../assets/index/useraccount/03.png" alt="" />
        </div>
        <div class="titem flex flex-Updown" @click="showList.isTime = 1">
          <p>Monthly</p>
          <img
            v-if="showList.isTime == 1"
            src="../../assets/index/useraccount/04.png"
            alt=""
          />
          <img v-else src="../../assets/index/useraccount/03.png" alt="" />
        </div>
        <div class="titem flex flex-Updown" @click="showList.isTime = 2">
          <p>Annual</p>
          <img
            v-if="showList.isTime == 2"
            src="../../assets/index/useraccount/04.png"
            alt=""
          />
          <img v-else src="../../assets/index/useraccount/03.png" alt="" />
        </div>
        <div class="dsmleftitem cdltopitem flex flex-Updown" style="margin-top: 0">
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
          <p class="flex seleteY flex-Updown-between">
            <span>{{ startTime }}</span>
            <!-- :style="{
                  transform: `rotate(${optionsId === item.id ? '180' : '0'}deg)`,
                }" -->
            <img src="../../assets/index/setting/10.png" alt="" />
          </p>
        </div>
        <div class="dsmleftitem cdltopitem flex flex-Updown" style="margin-top: 0">
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
          <p class="flex seleteY flex-Updown-between">
            <span>{{ endTime }}</span>
            <img src="../../assets/index/setting/10.png" alt="" />
          </p>
        </div>
      </div>
      <div class="dsmain flex">
        <div class="drtable">
          <div class="w100 p12">
            <ul class="ultit w100">
              <li><p>Date</p></li>
              <li ><p>Total Charging Time (H)</p></li>
              <li ><p>Total No. of Charging (Ts)</p></li>
              <li><p>Total Charging Energy (KWh)</p></li>
              <li ><p>Average Charging Power (kWh)</p></li>
              <li><p>Unilization Rate (%)</p></li>
            </ul>
          </div>
          <!--   -->
          <div v-if="chargerInfoList.length != 0">
            <!-- , updateId === index ? 'bshow' : '' -->
            <div class="loadMore box" v-infinite-scroll="loadMore">
              <ul
                :class="['uldatas', 'w100']"
                v-for="(item, index) in chargerInfoList"
                :key="index + 's'"
              >
                <li>
                  <p>{{ startTime }}</p>
                </li>
                <li >
                  <p>{{ item.chargingVoltage }}</p>
                </li>
                <li >
                  <p>{{ item.chargingCurrent }}</p>
                </li>
                <li >
                  <p>{{ item.chargingPower }}</p>
                </li>
                <li>
                  <p>{{ item.chargingEnergy }}</p>
                </li>
                <li>
                  <p>{{ item.chargingTime }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="p12">
            <ul class="uldatas w100 btb">
              <li><p>No Data！</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex flex-Updown-between w100 dlist">
        <div class="dlleft">
          <div class="dltopitem flex flex-Updown-around">
            <div class="titem flex flex-Updown" @click="downList.isTime = 0">
              <p>Daily</p>
              <img
                v-if="downList.isTime == 0"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="titem flex flex-Updown" @click="downList.isTime = 1">
              <p>Monthly</p>
              <img
                v-if="downList.isTime == 1"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="titem flex flex-Updown" @click="downList.isTime = 2">
              <p>Annual</p>
              <img
                v-if="downList.isTime == 2"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div
              class="dsmleftitem cdltopitem flex flex-Updown mt0 mb10"
              @click="showList.table = !downList.table"
            >
              <span class="dsmleftitemSpan">Table</span>
              <img
                v-if="downList.table"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div
              class="dsmleftitem cdltopitem flex flex-Updown mt0 mb10"
              @click="downList.figure = !downList.figure"
            >
              <span class="dsmleftitemSpan">Figure</span>
              <img
                v-if="downList.figure"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
          </div>
          <div class="dltopitem flex flex-Updown-around">
            <div
              class="titem  flex flex-Updown"
              v-for="(item, index) in DataTypes"
              :key="'c' + index"
              @click="item.choose = !item.choose"
            >
              <p class="tbp">{{ item.name }}</p>
              <img
                v-if="item.choose"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
          </div>
        </div>
        <div class="" style="text-align: center">
          <p class="Update">
            <!-- @click="getParams" -->
            <span class="button">Downlod</span>
          </p>
          <p>PDF format saved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        { name: "Charger No.", value: "", children: [], id: 4, cid: "" },
        { name: "Vehicle No.", value: "", children: [], id: 6 },
      ],
      startTime: "",
      endTime: "",
      DataTypes: [
        { name: "Total Charging Time", choose: false, id: "1" },
        { name: "Total No. of Charging", choose: false, id: "2" },
        { name: "Total Charging Energy", choose: false, id: "3" },
        { name: "Average Charging Power", choose: false, id: "4" },
        { name: "Unilization Rate", choose: false, id: "5" },
      ],
      page: 1,
      chargerInfoList: [],
      showList: {
        table: false,
        figure: false,
        isTime: 0,
      },
      downList: {
        table: false,
        figure: false,
        isTime: 0,
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    loadMore1() {},
    loadMore() {
      if (this.page > Math.ceil(this.count / 10))
        return this.$message.warning("No more data!");
      this.page += 1;
    },
    seleteCharger() {},
    openSelete(type) {},
    // 选择
    seletes(value, i) {},

    getLocation() {},
    getValue() {},
    //展示表格
    showTable(index) {
      // this.DataTypes[index].choose = !this.DataTypes[index].choose;
      // this.$store.commit("showTableUl", this.DataTypes);
    },
    //
    seleteCenter(value) {},

    //条件筛选查询
    getParams() {
      let searchs = this.searchs;
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
.dlist {
  margin-top: 20px;
  padding: 0 60px 0 50px;
}
.mb10 {
  margin-bottom: 10px !important;
}
.mr15 {
  margin-right: 15px !important;
}
.btb {
  border-bottom: 2px solid #205cbf;
}
.timeSelete {
  width: 100%;
  justify-content: space-around;
  margin-top: 40px;
}
.dlist .titem {
  margin-bottom: 10px;
  /* margin-right: 15px; */
}
.titem {
  /* margin-right: ; */
}
.dsmleftitemSpan,
.titem p {
  font-size: 16px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  /* font-size: 20px; */
  /* background: #1F53AD; */
  letter-spacing: 1.5px;
  font-weight: 500;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.titem .tbp{
 width: 180px;
  font-size: 12px;
}
.dsmleftitemSpan:active,
.titem p:active {
  opacity: 0.7;
}
.titem img {
  width: 20px;
  height: 20px;
  margin-left: 15px;
}
.urtable {
  overflow: hidden;
}
.loadMore {
  /* background: red; */
  max-height: 470px !important;
  overflow-y: scroll;
  border-bottom: 2px solid #205cbf;
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
.dlleft {
  width: 85%;
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
  border-radius: 10px;
  font-size: 20px;
  /* background: #1F53AD; */
  letter-spacing: 2px;
  font-weight: 600;
  display: inline-block;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
  /* margin-top: 23px; */
}
.Update {
  /* position: absolute; */
  /* right: 31px; */
  /* bottom: 22px; */
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
.drtable ul:last-of-type {
  /* border-bottom: 2px solid #205cbf; */
}
.drtable {
  width: 100%;
}
.dsmain-right {
  width: 1503px;
  margin-left: 31px;
  /* max-height: 590px; */
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 28px;
  position: relative;
}
.drtable {
  /* height: 562px; */
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
  /* width: 300px; */
  margin-right: 15px;
}

.cdltopitem img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.dsmleftitem > img {
  width: 20px;
  height: 20px;
  margin-left: 15px;
}
.chargerTop {
  padding: 0 40px;
}
.cdltopitem p {
  cursor: pointer;
}
.cdltopitem .seleteY {
  margin: 0 10px;
}
.or {
  margin: 0 10px;
}
.or > span {
  font-size: 18px !important;
}
.seleterBody {
  width: 190px;
}
.cdltopitem .seleteY,
.cdltopitem input,
.cdltopitem > p {
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
  font-size: 14px;
  display: inline-block;
  margin-right: 5px;
}
.cdltopitem {
  margin-top: 15px;
  position: relative;
}
.dsmain {
  width: 1406px;
  height: 550px;
  /* background: red; */
  /* border: 2px solid #205cbf; */
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  padding: 0 30px 0 0;
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
.seleter {
  width: 230px;
  height: 38px;
  margin-left: 20px;
  border: 1px solid #acd1fe;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  box-sizing: border-box;
  padding-right: 15px;
}
.seleterBody {
  width: 230px;
}
.seleter > img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.chargerBottom {
  width: 1483px;
  height: 831px;
  margin-top: 20px;
  position: relative;
}
</style>
