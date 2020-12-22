<template>
  <div class="dSReport">
    <div class="overRights">
      <p class="ortoptit">Report Includes</p>
      <div class="dsrmain flex">
        <div class="dsrml">
          <div class="dtatas flex flex-Updown">
            <div class="dtspan">
              <span>Table</span>
            </div>
            <div class="dtspan">
              <span>Figure</span>
            </div>
            <p></p>
          </div>
          <div
            class="dtatas flex flex-Updown"
            v-for="item in DataTypes"
            :key="'d' + item.id"
          >
            <div class="seleteImg" @click="item.Table = !item.Table">
              <img v-if="item.Table" src="../../assets/index/useraccount/04.png" alt="" />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="seleteImg" @click="item.Figure = !item.Figure">
              <img
                v-if="item.Figure"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="dsrmr">
          <div class="echart" v-if="$store.state.DataTypes[0].choose">
            <p >Charging Voltage【v】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="ChargingVoltage【v】"
            ></div>
          </div>
          <div class="echart" v-if="$store.state.DataTypes[1].choose">
            <p >Average Charging Current【A】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="AverageChargingCurrent【A】"
            ></div>
          </div>
          <div class="echart" v-if="$store.state.DataTypes[2].choose">
            <p >Average Charging Power【kw】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="AverageChargingPower【kw】"
            ></div>
          </div>
          <div class="echart" v-if="$store.state.DataTypes[3].choose">
            <p >Total Charging Energy【kwh】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="TotalChargingEnergy【kwh】"
            ></div>
          </div>
          <div class="echart" v-if="$store.state.DataTypes[4].choose">
            <p >Charging Time【Hour】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="ChargingTime【Hour】"
            ></div>
          </div>
          <div class="echart"  v-if="$store.state.DataTypes[5].choose">
            <p>SoC Before Charging【%】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="SoCBeforeCharging【%】"
            ></div>
          </div>
          <div class="echart" v-if="$store.state.DataTypes[6].choose">
            <p >Mileage Travelled Before Charging【km】</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="MileageTravelledBeforeCharging【km】"
            ></div>
          </div>
        </div>
        <p class="Update flex flex-Updown">
          <span class="button">Generate PDF</span>
          <span class="button">Download</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { findBIC, findByParamsAll } from "../../common/api";
import echarts from "echarts";
export default {
  name: "dSReport",
  data() {
    return {
      DataTypes: [
        { name: "Charging Voltage", Table: false, Figure: false, id: "1" },
        { name: "Average Charging Current", Table: false, Figure: false, id: "2" },
        { name: "Average Charging Power", Table: false, Figure: false, id: "3" },
        { name: "Charging Energy", Table: false, Figure: false, id: "4" },
        { name: "Charging Time", Table: false, Figure: false, id: "5" },
        { name: "SoC", Table: false, Figure: false, id: "6" },
        { name: "Mile age Travelled", Table: false, Figure: false, id: "7" },
      ],
    };
  },
  created() {
    console.log(this.$store.state.DataTypes);
  },
  mounted() {
    let _this = this;
    this.$store.state.DataTypes.forEach((item, index) => {
      if (item.choose) {
        item.name = item.name.replace(/[ ]/gi, "");
        _this.drawLine(item.name, false);
      }
    });
    // _this.drawLine("SoC", false);
    // _this.drawLine("DataType1", false);
    // _this.drawLine("DataType2", false);
    // _this.drawLine("DataType3", false);
    // _this.drawLine("DataType4", false);
  },
  methods: {
    // 获取数据
    getDatas() {
      let data = {
        userId: localStorage.getItem("userId"),
        centre: "",
        location: "",
        chargerNo: "",
        vehicleNo: "",
      };
    },
    //
    drawLine(id, ishowX) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(id));
      var count = 100;
      var intervalCount = 0;
      var baseTop = 10;
      var gridHeight = 65;

      var data = {
        cpu: [],
        xMin: 0,
        xMax: count * 100,
      };

      for (var i = 0; i < count; i++) {
        var now = i * 100;
        data.cpu.push([now, Math.floor(Math.random() * 100)]);
      }

      function makeXAxis(gridIndex, opt) {
        return echarts.util.merge(
          {
            type: "time",
            gridIndex: gridIndex,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#205CBF",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            min: data.xMin,
            max: data.xMax,
            axisPointer: {
              lineStyle: {
                color: "#00B7EE",
              },
            },
          },
          opt || {},
          true
        );
      }

      function makeYAxis(gridIndex, opt) {
        return echarts.util.merge(
          {
            type: "value",
            gridIndex: gridIndex,
            nameLocation: "middle",
            nameTextStyle: {
              color: "#333",
            },
            boundaryGap: ["30%", "30%"],
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#205CBF",
              },
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          opt || {},
          true
        );
      }

      function makeGrid(top, opt) {
        return echarts.util.merge(
          {
            top: top,
            height: gridHeight,
          },
          opt || {},
          true
        );
      }
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          borderColor: "rgba(0, 0, 200, 0.2)",
          borderWidth: 1,
          borderRadius: 0,
          padding: 10,
          formatter: function (params) {
            if (params.length) {
              params.unshift({
                seriesName: "time",
                value: [null, Math.floor(params[0].value[0]) + " ms"],
                color: "#5193f2",
              });
              return echarts.util
                .map(["time", "cpu"], function (seriesName) {
                  for (var i = 0; i < params.length; i++) {
                    var param = params[i];
                    var style = "color: " + param.color;
                    if (param.seriesName === seriesName) {
                      return (
                        '<span style="' +
                        style +
                        '">' +
                        param.seriesName +
                        '：</span><span style="' +
                        style +
                        '">' +
                        param.value[1] +
                        "</span>"
                      );
                    }
                  }
                })
                .join("<br>");
            }
          },
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: "all",
            },
          ],
          snap: false,
        },
        grid: [
          makeGrid(baseTop),
          makeGrid(baseTop + gridHeight),
          makeGrid(baseTop, {
            show: true,
            height: gridHeight * 1,
            borderColor: "#205CBF",
            borderWidth: 1,
            z: 10,
          }),
        ],
        xAxis: [
          makeXAxis(0),
          makeXAxis(0, {
            position: "bottom",
            axisLine: {
              show: false,
              onZero: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: ishowX,
              textStyle: {
                color: "#fff",
              },
            },
            axisPointer: {
              show: true,
              lineStyle: {
                color: "#00B7EE",
                width: 1,
              },
            },
          }),
        ],
        yAxis: [
          makeYAxis(0, {
            nameTextStyle: {
              color: "#fff",
              // padding: 20,
              // rich: {
              //   height: "30",
              //   width: "30",
              // },
            },
            axisLabel: {
              show: true,
              margin: 2,
              min: 0,
              interval: "auto",
              showMinLabel: true,
              showMaxLabel: true,
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },
          }),
        ],
        series: [
          {
            name: "cpu",
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            itemStyle: {
              normal: {
                color: "#27F3FD",
              },
            },
            data: data.cpu,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.echart {
  width: 900px;
  height: 85px;
  background: transparent;
  /* margin-left: 150px; */
  margin-top: 10px;
  position: relative;
}
.echart > p {
  position: absolute;
  color: #ffffff;
  font-size: 14px;
  /* transform: ; */
  top: 50%;
  left: -15px;
  z-index: 99999999;
  width: 70px;
  text-align: center;
  transform: translateY(-50%) rotateZ(-90deg);
}
.dsrml {
  padding-left: 36px;
}
.dtatas .dtspan {
  width: 60px;
  text-align: center;
  margin-right: 20px;
  font-size: 14px;
  margin-top: 15px;
}
.seleteImg {
  margin-right: 15px;
  width: 60px;
  text-align: center;
}
.dtatas img {
  width: 12px;
  height: 12px;
}
.dtatas {
  margin-top: 14px;
  font-size: 12px;
  cursor: pointer;
}
.Update > span:last-child {
  margin-left: 54px;
}
.Update > span {
  width: 160px;
  height: 44px;
  line-height: 44px;
  display: inline-block;
  /* background: #1F53AD; */
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 23px;
}
.Update {
  position: absolute;
  left: 36px;
  bottom: 48px;
}
.dsrmain {
  width: 1406px;
  height: 705px;
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  border: 2px solid #205cbf;
  border-radius: 20px;
  position: relative;
  justify-content: space-between;
  padding-right: 20px;
}
.overRights {
  height: 810px;
  margin-top: 53px;
}
.ortoptit {
  line-height: 52px;
}
</style>
