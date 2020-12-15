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
            @click="optionsId = item.id == 1 ? (optionsId == 1 ? '' : 1) : ''"
          >
            <span>{{ item.name }}</span>
            <p class="flex flex-Updown-between" v-if="item.children != 0">
              <span>{{ item.value }}</span>
              <img
                :style="{ transform: `rotate(${optionsId == 1 ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <input type="text" v-model="item.value" v-else />
            <div
              class="seleterBody"
              :style="{ height: optionsId == item.id ? '200px' : '0px' }"
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
          <p class="dttit">Data Type：</p>
          <div
            class="dtatas flex flex-Updown"
            v-for="item in DataTypes"
            :key="'d' + item.id"
            @click="item.choose = !item.choose"
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
              <li><p>Charging Energy[kwh}</p></li>
              <li><p>Charging Time[Hour]</p></li>
              <li><p>SOC[%]</p></li>
              <li><p>Mileage Travelled[km]</p></li>
            </ul>
            <template v-if="tableDatas.length != 0">
              <ul class="uldatas w100" v-for="item in tableDatas" :key="item + 's'">
                <li><p></p></li>
                <li><p></p></li>
                <li><p></p></li>
                <li><p></p></li>
                <li><p></p></li>
                <li><p></p></li>
              </ul>
            </template>
            <template v-else>
              <ul class="uldatas w100">
                <li><p>暂无数据！</p></li>
              </ul>
            </template>
          </div>
        </div>
        <p class="Update">
          <span class="button">Update</span>
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
      tableDatas: [],
      isShowSlete: false,
      optionsId: "",
      searchs: [
        {
          name: "Centre",
          value: "",
          cid: "0",
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
        { name: "Vehicle", value: "", children: [], id: 6 },
        { name: "Vehicle No.", value: "", children: [], id: 7 },
        { name: "Start From", value: "", children: [], id: 8 },
        { name: "End To", value: "", children: [], id: 9 },
      ],
      DataTypes: [
        { name: "Charging Voltage【v】", choose: false, id: "1" },
        { name: "Average Charging Current【A】", choose: false, id: "2" },
        { name: "Average Charging Power【kw】", choose: false, id: "3" },
        { name: "Total Charging Energy【kwh】", choose: false, id: "4" },
        { name: "Charging Time【Hour】", choose: false, id: "5" },
        { name: "SoC Before Charging【%】", choose: false, id: "6" },
        { name: "Mileage Travelled Before Charging【km】", choose: false, id: "7" },
      ],
      page: 1,
    };
  },
  mounted() {
    this.getParams();
  },
  methods: {
    seleteCenter(value) {
      this.searchs[0].value = value.name;
      this.searchs[0].cid = value.centreId;
      this.optionsId = "";
    },
    //条件筛选查询
    getParams() {
      let data = {
        userIds: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
        centre: this.searchs[0].cid,
        location: this.searchs[1].value,
        chargerType: this.searchs[2].value,
        chargerNo: this.searchs[3].value,
        manufacturer: this.searchs[4].value,
        model: this.searchs[5].value,
        vehicleNo: this.searchs[6].value,
        startDate: this.searchs[7].value,
        endDate: this.searchs[8].value,
      };
      findByParamsAll(data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
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
  max-height: 572px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 28px;
  position: relative;
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
  width: 160px;
}
.dsmleftitem {
  width: 280px;
}
.cdltopitem img {
  width: 14px;
  height: 8px;
  transition: all 0.2s linear;
}
.cdltopitem input,
.cdltopitem p {
  width: 160px;
  height: 31px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 17px 0 23px;
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
