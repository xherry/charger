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
          <div class="dtatas flex flex-Updown" v-for="item in DataTypes" :key="'d' + item.id">
            <div class="seleteImg" @click="item.Table = !item.Table">
              <img v-if="item.Table" src="../../assets/index/useraccount/04.png" alt="" />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="seleteImg" @click="item.Figure = !item.Figure">
              <img v-if="item.Figure" src="../../assets/index/useraccount/04.png" alt="" />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="dsrmr">
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="TravellingMileage"></div>
          </div>
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="SoC"></div>
          </div>
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="DataType1"></div>
          </div>
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="DataType2"></div>
          </div>
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="DataType3"></div>
          </div>
          <div class="echart">
            <div class="" :style="{ width: '110%', height: '100%' }" id="DataType4"></div>
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

  },
  mounted() {
    let _this = this;
    _this.drawLine("TravellingMileage", "Travelling Mileage (km)", false);
    // _this.drawLine("SoC", "SoC(%)", false);
    // _this.drawLine("DataType1", "Data Type", false);
    // _this.drawLine("DataType2", "Data Type", false);
    // _this.drawLine("DataType3", "Data Type", false);
    // _this.drawLine("DataType4", "Data Type", false);
  },
  methods: {
    drawLine(id, name, ishowX,gridHeight) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(id));
      var count = 70;
      var intervalCount = 50;
      var baseTop = 38;
      var gridHeight = 70;

      var data = {
        cpu: [],
        memory: [],
        frame: [],
        main: [],
        fake: [],
        else: [],
        gdsfg: [],
        xMin: 0,
        xMax: count * 1000,
      };

      for (var i = 0; i < count; i++) {
        var now = i * 1000;
        data.cpu.push([now, Math.floor(Math.random() * 1000)]);
        // data.memory.push([now, Math.floor(Math.random() * 1000)]);
        // data.frame.push([now, Math.floor(Math.random() * 1000)]);
        // data.fake.push([now, Math.floor(Math.random() * 1000)]);
        // data.main.push([now, Math.floor(Math.random() * 1000)]);
        // data.else.push([now, Math.floor(Math.random() * 1000)]);
        // data.gdsfg.push([now, Math.floor(Math.random() * 1000)]);
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
                      return '<span style="' + style + '">' + param.seriesName + '：</span><span style="' + style + '">' + param.value[1] + "</span>";
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
          // makeGrid(baseTop + gridHeight * 2),
          // makeGrid(baseTop + gridHeight * 3 + 5),
          // makeGrid(baseTop + gridHeight * 4 + 5),
          // makeGrid(baseTop + gridHeight * 5 + 5),
          // makeGrid(baseTop + gridHeight * 6 + 5),
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
          // makeXAxis(1),
          // makeXAxis(2),
          // makeXAxis(3),
          // makeXAxis(4),
          // makeXAxis(5),
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
            // name: name,
            nameTextStyle: {
              color: "#fff",
              padding: 20,
              rich: {
                height: "30",
                width: "30",
              },
            },
            axisLabel: {
              show: true,
              margin: 2,
              showMinLabel: true,
              showMaxLabel: true,
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },
          }),
          // makeYAxis(1, {
          //   name: "Travelling Mileage (km)",
          // }),
          // makeYAxis(2, {
          //   name: "frame",
          // }),
          // makeYAxis(3, {
          //   name: "fake",
          // }),
          // makeYAxis(4, {
          //   name: "main",
          // }),
          // makeYAxis(5, {
          //   name: "else",
          // }),
          // makeYAxis(6, {
          //   name: "gsdgsd",
          // }),
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
          // {
          //   name: "memory",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 1,
          //   yAxisIndex: 1,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.memory,
          // },
          // {
          //   name: "frame",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 2,
          //   yAxisIndex: 2,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.frame,
          // },
          // {
          //   name: "main",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 3,
          //   yAxisIndex: 3,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.fake,
          // },
          // {
          //   name: "main",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 4,
          //   yAxisIndex: 4,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.fake,
          // },
          // {
          //   name: "else",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 5,
          //   yAxisIndex: 5,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.else,
          // },
          // {
          //   name: "else",
          //   type: "line",
          //   symbol: "circle",
          //   symbolSize: 2,
          //   xAxisIndex: 6,
          //   yAxisIndex: 6,
          //   itemStyle: {
          //     normal: {
          //       color: "#27F3FD",
          //     },
          //   },
          //   data: data.else,
          // },
        ],
      });
    },
  },
};
</script>

<style scoped>
.echart {
  width: 900px;
  height: 110px;
  background: transparent;
  margin-left: 150px;
  margin-top: 0px;
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
}
.overRights {
  height: 810px;
  margin-top: 53px;
}
.ortoptit {
  line-height: 52px;
}
</style>
