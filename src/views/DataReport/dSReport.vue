<template>
  <div class="dSReport">
    <div class="overRights">
      <p class="ortoptit">Report Includes</p>
      <div class="dsrmain flex" id="dsrmain">
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
            v-for="(item, index) in DataTypes"
            :key="'d' + item.id"
          >
            <div class="seleteImg" @click="item.Table = !item.Table">
              <img v-if="item.Table" src="../../assets/index/useraccount/04.png" alt="" />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div class="seleteImg" @click="isSetPDF(index)">
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
        <div class="dsrmr" id="dsrmr" ref="dsrmr">
          <!--  -->
          <!-- v-if="$store.state.DataTypes[0].choose"  -->
          <div class="echart">
            <p>Charging Voltage</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="ChargingVoltage【v】"
            ></div>
          </div>
          <!--  -->
          <div class="echart" v-show="$store.state.DataTypes[1].choose">
            <p>Average Charging Current</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="AverageChargingCurrent【A】"
            ></div>
          </div>
          <!--  -->
          <div class="echart" v-show="$store.state.DataTypes[2].choose">
            <p>Average Charging Power</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="AverageChargingPower【kw】"
            ></div>
          </div>
          <div class="echart" v-show="$store.state.DataTypes[3].choose">
            <p>Total Charging Energy</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="TotalChargingEnergy【kwh】"
            ></div>
          </div>
          <div class="echart" v-show="$store.state.DataTypes[4].choose">
            <p>Charging Time</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="ChargingTime【Hour】"
            ></div>
          </div>
          <div class="echart" v-show="$store.state.DataTypes[5].choose">
            <p>SoC Before Charging</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="SoCBeforeCharging【%】"
            ></div>
          </div>
          <div class="echart" v-show="$store.state.DataTypes[6].choose">
            <p>Mileage Travelled Before Charging</p>
            <div
              class=""
              :style="{ width: '110%', height: '100%' }"
              id="MileageTravelledBeforeCharging【km】"
            ></div>
          </div>
        </div>
        <p class="Update flex flex-Updown">
          <span class="button" @click="printOut('Report')">Generate PDF</span>
          <span class="button">Download</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { findBIC, findByParamsAll } from "../../common/api";
export default {
  name: "dSReport",
  data() {
    return {
      DataTypes: [],
    };
  },
  created() {
    // console.log(this.$store.state.DataTypes);
    this.DataTypes = [
      {
        name: "Charging Voltage",
        Table: false,
        Figure: this.$store.state.DataTypes[0].choose,
        id: "1",
      },
      {
        name: "Average Charging Current",
        Table: false,
        Figure: this.$store.state.DataTypes[1].choose,
        id: "2",
      },
      {
        name: "Average Charging Power",
        Table: false,
        Figure: this.$store.state.DataTypes[2].choose,
        id: "3",
      },
      {
        name: "Charging Energy",
        Table: false,
        Figure: this.$store.state.DataTypes[3].choose,
        id: "4",
      },
      {
        name: "Charging Time",
        Table: false,
        Figure: this.$store.state.DataTypes[4].choose,
        id: "5",
      },
      {
        name: "SoC",
        Table: false,
        Figure: this.$store.state.DataTypes[5].choose,
        id: "6",
      },
      {
        name: "Mile age Travelled",
        Table: false,
        Figure: this.$store.state.DataTypes[6].choose,
        id: "7",
      },
    ];
  },
  mounted() {
    this.getParams();
    this.drawLine("ChargingVoltage【v】", false, [], "V");
  },
  methods: {
    //
    isSetPDF(index) {
      this.DataTypes[index].Figure = !this.DataTypes[index].Figure;
      let oldDataTypes = this.$store.state.DataTypes;
      oldDataTypes[index].choose = !oldDataTypes[index].choose;
      this.$store.commit("showTableUl", oldDataTypes);
    },
    // 导出PDF
    printOut(name) {
      this.$nextTick(() => {
        let strIsFalse = this.DataTypes.filter((item) => !item.Figure);
        console.log(strIsFalse);
        if (strIsFalse.length === this.DataTypes.length) {
          this.$message.warning("请选择至少一条内容！");
          return;
        }
        let shareContent = this.$refs.dsrmr; //document.getElementById("dsrmr"); //需要截图的包裹的（原生的）DOM 对象
        let width = shareContent.clientWidth, //950, //获取dom 宽度
          backgroundColor = "#333333",
          height = shareContent.clientHeight, //获取dom 高度
          canvas = document.createElement("canvas"), //创建一个canvas节点
          scale = 1; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.style.width = shareContent.clientWidth * scale + "px";
        canvas.style.height = shareContent.clientHeight * scale + "px";
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        let opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          logging: false, //日志开关，便于查看html2canvas的内部执行流程
          backgroundColor,
          width: width, //dom 原始宽度
          height: height,
          useCORS: true, // 【重要】开启跨域配置
        };
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setTimeout(() => {
          html2canvas(shareContent, opts).then(() => {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            let pageHeight = (contentWidth / 592.28) * 841.89;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = 595.28;
            let imgHeight = (592.28 / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL("image/jpeg", 1.0);
            // var PDF = new jspdf("", "pt", "a4");
            let arrDPI = this.js_getDPI(); //获取显示器DPI
            let dpiX = 96;
            let dpiY = 96;
            if (arrDPI.length > 0) {
              dpiX = arrDPI[0];
              dpiY = arrDPI[1];
            }
            //l:横向， p：纵向；单位： in:英寸，mm毫米；画布大小：a3,a4,leter,[]（当内容为数组时，为自定义大小）
            let PDF = new jspdf("l", "in", [
              (contentWidth + 10) / dpiX,
              (contentHeight + 10) / dpiY,
            ]); // 自定义页面大小
            if (leftHeight <= pageHeight) {
              PDF.addImage(pageData, "JPEG", 5 / dpiX, 5 / dpiY);
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, "JPEG", 0, position);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                  PDF.addPage();
                }
              }
            }
            PDF.save(name + ".pdf"); // 这里是导出的文件名
          });
        }, 500);
      });
    },
    js_getDPI() {
      var arrDPI = new Array();
      console.log(window.screen.deviceXDPI);
      if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
      } else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText =
          "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
      }
      return arrDPI;
    },
    //绘制出图表
    drawLine(id, ishowX, values, unit) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(id));
      var count = 100;
      var intervalCount = 0;
      var baseTop = 10;
      var gridHeight = 65;

      var data = {
        values: values,
        // xMin: 0,
        // xMax: count * 100,
      };

      for (var i = 0; i < count; i++) {
        var now = i * 100;
        data.values.push([now, Math.floor(Math.random() * 100)]);
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
            // min: data.xMin,
            // max: data.xMax,
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
                value: [null, Math.floor(params[0].value[0]) + "" + unit],
                color: "#5193f2",
              });
              return echarts.util
                .map(["time", "value"], function (seriesName) {
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
            name: "value",
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            itemStyle: {
              normal: {
                color: "#27F3FD",
              },
            },
            data: data.values,
          },
        ],
      });
    },
    //条件筛选查询
    getParams() {
      let datas = { userIds: localStorage.getItem("userId"), page: 1, limit: 100 };
      let data = this.$store.state.chargerInfoData;
      let DataTypes = this.$store.state.DataTypes;
      if (Object.keys(data).length === 0) {
        this.$message.warning("请在上一页添加筛选条件");
        // this.$message.warning("请在上一页添加筛选条件");
        return;
      }
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      findByParamsAll({ ...data, ...datas })
        .then((res) => {
          console.log("条件筛选查询", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            let chargerInfoList = res.extend.chargerInfoList;
            if (chargerInfoList.length == 0) {
              this.$message.warning("暂无数据！");
              return;
            }
            let chargingVoltage = chargerInfoList.map((item) => item.chargingVoltage), // 充电电压
              chargingCurrent = chargerInfoList.map((item) => item.chargingCurrent), // 充电电流
              chargingPower = chargerInfoList.map((item) => item.chargingPower), // 充电电源
              chargingEnergy = chargerInfoList.map((item) => item.chargingEnergy), //充电能量
              chargingTime = chargerInfoList.map((item) => item.chargingTime), //充电时间
              socBeforeCharging = chargerInfoList.map((item) => item.socBeforeCharging), //soc前充电
              mileageTravelled = chargerInfoList.map((item) => item.mileageTravelled); //里程
            if (DataTypes[0].choose) {
              this.drawLine("ChargingVoltage【v】", false, chargingVoltage, "V");
            }
            if (DataTypes[1].choose) {
              this.drawLine("AverageChargingCurrent【A】", false, chargingCurrent, "A");
            }
            if (DataTypes[2].choose) {
              this.drawLine("AverageChargingPower【kw】", false, chargingPower, "kw");
            }
            if (DataTypes[3].choose) {
              this.drawLine("TotalChargingEnergy【kwh】", false, chargingEnergy, "kwh");
            }
            if (DataTypes[4].choose) {
              this.drawLine("ChargingTime【Hour】", false, chargingTime, "Hour");
            }
            if (DataTypes[5].choose) {
              this.drawLine("SoCBeforeCharging【%】", false, socBeforeCharging, "%");
            }
            if (DataTypes[6].choose) {
              this.drawLine(
                "MileageTravelledBeforeCharging【km】",
                false,
                mileageTravelled,
                "km"
              );
            }
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
.echart {
  width: 900px;
  height: 85px;
  background: transparent;
  /* margin-left: 150px; */
  margin-top: 10px;
  position: relative;
  color: rgb(188, 188, 188);
}
.echart > p {
  position: absolute;
  color: #ffffff;
  font-size: 14px;
  /* transform: ; */
  top: 50%;
  left: 30px;
  z-index: 99999999;
  width: 50px;
  text-align: center;
  height: 70px;
  transform: translateY(-50%) rotate(-90deg);
  white-space: pre-wrap;
}
.dsrmr {
  /* width: 950px; */
  height: 100%;
  /* background: #000; */
  padding-left: 0px;
  padding-right: 20px;
  position: relative;
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
