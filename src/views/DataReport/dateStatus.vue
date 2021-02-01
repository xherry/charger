<template>
  <div class="dateStatus">
    <div class="chargerTop flex flex-Updown-between">
      <div class="w100 flex flex-Updown">
        <div
          class="dsmleftitem cdltopitem flex flex-Updown"
          @click="isShowSlete = isShowSlete == 1 ? 0 : 1"
        >
          <span>Centre</span>
          <div class="seleteY flex flex-Updown-between p15">
            <p>{{ searchs.Centre.value }}</p>
            <img
              :style="{ transform: `rotate(${isShowSlete == 1 ? '-180' : '0'}deg)` }"
              src="../../assets/index/says/02.png"
              alt=""
            />
          </div>
          <div :class="['seleterBody', isShowSlete == 1 ? 'h200' : 'h0']">
            <div
              class="button seleter_item"
              v-for="(p, i) in $store.state.centerType"
              :key="i + 'ss'"
              @click.stop="seleteCenter(p)"
            >
              {{ p.value }}
            </div>
          </div>
        </div>
        <div class="dsmleftitem cdltopitem flex flex-Updown">
          <span>Charger NO.</span>
          <div class="seleteY flex flex-Updown-between p15">
            <!-- cdltopitem img -->
            <input
              type="text"
              v-model="searchs.ChargerNo.value"
              @blur="inputBlur"
              @focus="getFocus"
            />
            <img
              class="cnoImg"
              @click="isShowSlete = isShowSlete == 2 ? 0 : 2"
              :style="{
                transform: `rotate(${isShowSlete === 2 ? '-180' : '0'}deg)`,
              }"
              src="../../assets/index/says/02.png"
              alt=""
            />
          </div>
          <div class="seleterBody" :class="[isShowSlete === 2 ? 'h200' : 'h0', 'box']">
            <template
              v-if="
                searchs.ChargerNo.arrs.length != 0 && searchs.ChargerNo.list.length != 0
              "
            >
              <div
                class="button seleter_item"
                v-for="(item, index) in searchs.ChargerNo.arrs"
                :key="index"
                @click="seletCNOV(item)"
              >
                {{ item }}
              </div>
            </template>
            <div v-else class="button seleter_item">{{ loadingName1 }}</div>
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
              v-model="searchs.VehicleNo"
            />
          </div>
        </div>
      </div>
      <div
        class="dsmleftitem cdltopitem flex flex-Updown"
        @click="showList.isTable = !showList.isTable"
      >
        <span class="dsmleftitemSpan">Table</span>
        <img v-if="showList.isTable" src="../../assets/index/useraccount/04.png" alt="" />
        <img v-else src="../../assets/index/useraccount/03.png" alt="" />
      </div>
      <div
        class="dsmleftitem cdltopitem flex flex-Updown"
        @click="showList.isTable = !showList.isTable"
      >
        <span class="dsmleftitemSpan">Figure</span>
        <img
          v-if="!showList.isTable"
          src="../../assets/index/useraccount/04.png"
          alt=""
        />
        <img v-else src="../../assets/index/useraccount/03.png" alt="" />
      </div>
    </div>
    <div class="chargerBottom overRights">
      <p class="ortoptit">Search Conditions</p>
      <div class="timeSelete flex flex-Updown">
        <div
          class="titem flex flex-Updown"
          @click="(showList.isTime = 0), (startTime = ''), (endTime = '')"
        >
          <p>Daily</p>
          <img
            v-if="showList.isTime == 0"
            src="../../assets/index/useraccount/04.png"
            alt=""
          />
          <img v-else src="../../assets/index/useraccount/03.png" alt="" />
        </div>
        <div
          class="titem flex flex-Updown"
          @click="(showList.isTime = 1), (startTime = ''), (endTime = '')"
        >
          <p>Monthly</p>
          <img
            v-if="showList.isTime == 1"
            src="../../assets/index/useraccount/04.png"
            alt=""
          />
          <img v-else src="../../assets/index/useraccount/03.png" alt="" />
        </div>
        <div
          class="titem flex flex-Updown"
          @click="(showList.isTime = 2), (startTime = ''), (endTime = '')"
        >
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
              :value-format="
                showList.isTime == 0
                  ? 'yyyy-MM-dd'
                  : showList.isTime == 1
                  ? 'yyyy-MM'
                  : 'yyyy'
              "
              :format="
                showList.isTime == 0
                  ? 'yyyy-MM-dd'
                  : showList.isTime == 1
                  ? 'yyyy-MM'
                  : 'yyyy'
              "
              :clearable="false"
              :type="
                showList.isTime == 0 ? 'date' : showList.isTime == 1 ? 'month' : 'year'
              "
              @change="getStartTime"
              v-model="startTime"
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
              :value-format="
                showList.isTime == 0
                  ? 'yyyy-MM-dd'
                  : showList.isTime == 1
                  ? 'yyyy-MM'
                  : 'yyyy'
              "
              :format="
                showList.isTime == 0
                  ? 'yyyy-MM-dd'
                  : showList.isTime == 1
                  ? 'yyyy-MM'
                  : 'yyyy'
              "
              :clearable="false"
              :type="
                showList.isTime == 0 ? 'date' : showList.isTime == 1 ? 'month' : 'year'
              "
              @change="getEndTime"
              v-model="endTime"
              placeholder="选择日期"
            >
              <!-- -->
            </el-date-picker>
          </div>
          <p class="flex seleteY flex-Updown-between">
            <span>{{ endTime }}</span>
            <img src="../../assets/index/setting/10.png" alt="" />
          </p>
        </div>
      </div>
      <div class="dsmains">
        <div :class="['dsmain', showList.isTable ? '' : 'transnY001']">
          <!-- v-show="showList.isTable" , !showList.isTable ? 'visibility' : ''-->
          <div :class="['drtable']" ref="forms">
            <div class="w100 p12">
              <ul class="ultit w100">
                <li><p>Date</p></li>
                <li v-if="DataTypes[0].choose"><p>Total Charging Time (H)</p></li>
                <li v-if="DataTypes[1].choose"><p>Total No. of Charging (Ts)</p></li>
                <li v-if="DataTypes[2].choose"><p>Total Charging Energy (KWh)</p></li>
                <li v-if="DataTypes[3].choose"><p>Average Charging Power (kWh)</p></li>
                <li v-if="DataTypes[4].choose"><p>Unilization Rate (%)</p></li>
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
                    <p>{{ item.date }}</p>
                  </li>
                  <li v-if="DataTypes[0].choose">
                    <p>{{ item.totalChargingTime | value2 }}</p>
                  </li>
                  <li v-if="DataTypes[1].choose">
                    <p>{{ item.totalNoofCharging }}</p>
                  </li>
                  <li v-if="DataTypes[2].choose">
                    <p>{{ item.totalChargingEnergy | value2 }}</p>
                  </li>
                  <li v-if="DataTypes[3].choose">
                    <p>{{ item.averageChargingPower | value2 }}</p>
                  </li>
                  <li v-if="DataTypes[4].choose">
                    <p>{{ item.unilizationRate | value2 }}%</p>
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
          <!-- v-show="!showList.isTable" -->
        </div>
        <div :class="['dsmain', !showList.isTable ? 'transnY001' : '']">
          <div :class="['charts']">
            <div style="width: 100%; overflow: hidden" ref="dsrmr">
              <div class="flex chartItems">
                <div class="chart-items" v-if="DataTypes[0].choose">
                  <div class="chartP"><p>Total Charging Time</p></div>
                  <div class="setCharts" id="chart1"></div>
                </div>
                <div class="chart-items nobr" v-if="DataTypes[1].choose">
                  <div class="chartP"><p>Total No. of Charging</p></div>
                  <div class="setCharts" id="chart2"></div>
                </div>
              </div>
              <div class="flex chartItems">
                <div class="chart-items" v-if="DataTypes[2].choose">
                  <div class="chartP"><p>Total Charging Energy</p></div>
                  <div class="setCharts" id="chart3"></div>
                </div>
                <div class="chart-items nobr" v-if="DataTypes[3].choose">
                  <div class="chartP"><p>Average Charging Power</p></div>
                  <div class="setCharts" id="chart4"></div>
                </div>
              </div>
              <div class="flex chartItems">
                <div class="chart-items nobb" v-if="DataTypes[4].choose">
                  <div class="chartP"><p>Unilization Rate</p></div>
                  <div class="setCharts" id="chart5"></div>
                </div>
              </div>
            </div>
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
              @click="downList.isTable = !downList.isTable"
            >
              <span class="dsmleftitemSpan">Table</span>
              <img
                v-if="downList.isTable"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
            <div
              class="dsmleftitem cdltopitem flex flex-Updown mt0 mb10"
              @click="downList.isFigure = !downList.isFigure"
            >
              <span class="dsmleftitemSpan">Figure</span>
              <img
                v-if="downList.isFigure"
                src="../../assets/index/useraccount/04.png"
                alt=""
              />
              <img v-else src="../../assets/index/useraccount/03.png" alt="" />
            </div>
          </div>
          <div class="dltopitem flex flex-Updown-around">
            <div
              class="titem flex flex-Updown"
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
            <span class="button" @click="toPprintOut">Downlod</span>
          </p>
          <p>PDF format saved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { findBySelectCNO, findByDataReport } from "../../common/api";
export default {
  name: "dateStatus",
  data() {
    return {
      updateId: "",
      tableDatas: [],
      isShowSlete: 0,
      optionsId: "",
      count: 0,
      searchs: {
        Centre: {
          value: "",
          cid: "",
        },
        ChargerNo: {
          list: [],
          arrs: [],
          value: "",
        },
        VehicleNo: "",
      },
      startTime: "",
      endTime: "",
      DataTypes: [
        { name: "Total Charging Time", choose: true, id: "1" },
        { name: "Total No. of Charging", choose: true, id: "2" },
        { name: "Total Charging Energy", choose: true, id: "3" },
        { name: "Average Charging Power", choose: true, id: "4" },
        { name: "Unilization Rate", choose: true, id: "5" },
      ],
      page: 1,
      chargerInfoList: [],
      showList: {
        isTable: true,
        isTime: 0,
      },
      downList: {
        isTable: true,
        isFigure: false,
        isTime: 0,
      },
      chartList: {
        TCT: [],
        TNC: [],
        TCE: [],
        ACP: [],
        UR: [],
        times: [],
      },
      loadingName1: "No Data!",
    };
  },
  created() {},
  mounted() {
    let loginInfos = JSON.parse(localStorage.getItem("chargerInfo"));
    if (Object.keys(loginInfos).length != 0) {
      this.searchs.Centre = {
        cid: this.$store.state.loginInfos.cid
          ? this.$store.state.loginInfos.cid
          : loginInfos.centre,
        value: this.$store.state.centerType.filter(
          (item) =>
            item.cid ==
            (this.$store.state.loginInfos.cid
              ? this.$store.state.loginInfos.cid
              : loginInfos.centre)
        )[0].value,
      };
      this.getNowData(loginInfos.centre);
      this.searchs.ChargerNo.value = this.$store.state.loginInfos.cno;
      this.searchs.VehicleNo = localStorage.getItem("vno");
    }
  },
  watch: {
    "searchs.ChargerNo.value"() {
      let chargerNumber = this.searchs.ChargerNo.value;
      let a = chargerNumber.split("-")[0];
      let b = chargerNumber.split("-")[1];
      let c = chargerNumber.split("-")[2];
      if (this.searchs.ChargerNo.list.length > 0) {
        this.searchs.ChargerNo.arrs = this.searchs.ChargerNo.list.filter((item) => {
          if (chargerNumber.split("-").length == 3) {
            return item.includes(a.toUpperCase() + "-" + b + "-" + c);
          }
          return item.includes(chargerNumber);
        });
      }
      if (
        this.searchs.ChargerNo.arrs.length > 0 &&
        this.searchs.ChargerNo.list.length == 0
      ) {
        this.isShowSlete = 0;
      } else {
        this.isShowSlete = 2;
      }
    },
  },
  methods: {
    setCharts(id, yData, xData, type) {
      let myChart = echarts.init(document.getElementById(id));
      let option;
      if (type == 1) {
        option = {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData,
            axisLine: {
              lineStyle: {
                color: "#4699CE",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4699CE",
              },
            },
            axisLabel: {
              interval: xData.length > 10 ? 4 : 0,
              rotate: 40,
            },
          },
          yAxis: {
            type: "value",
            minInterval: 1, //最小是1
            axisLine: {
              lineStyle: {
                color: "#4699CE",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4699CE",
              },
            },
          },
          series: [
            {
              data: yData, // ,
              type: "line",
              smooth: true, //曲线平滑
              areaStyle: {},
              label: {
                normal: {
                  show: true,
                  color: "#fff",
                },
              },
              itemStyle: {
                normal: {
                  // color:'rgba(0,146,246,.3)',
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1, //变化度
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "rgba(0,146,246,.8)",
                      },
                      {
                        offset: 0.5,
                        color: "rgba(0,146,246,.3)",
                      },
                      {
                        offset: 1,
                        color: "rgba(0,146,246,0)",
                      },
                    ]
                  ),
                  lineStyle: {
                    color: "#0092f6",
                    width: 1,
                  },
                },
              },
            },
          ],
        };
      }
      if (type == 2) {
        option = {
          xAxis: {
            type: "category",
            data: xData,
            axisLabel: {
              interval: xData.length > 10 ? 4 : 0,
              rotate: 40,
              color: "#fff",
            },
            axisLine: {
              lineStyle: {
                color: "#4699CE",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4699CE",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            minInterval: 1, //最小是1
            axisLine: {
              lineStyle: {
                color: "#4699CE",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4699CE",
              },
            },
          },
          series: [
            {
              data: yData,
              type: "bar",
              itemStyle: {
                normal: {
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: "#205cbf", //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: "top",
                    color: "#FFFFFF",
                  },
                },
              },
            },
          ],
        };
      }
      myChart.setOption(option);
    },
    toPprintOut() {
      if (this.downList.isTable) {
        this.printOut("forms");
      }
      if (this.downList.isFigure) {
        this.printOut("dsrmr");
      }
    },
    // 导出PDF
    printOut(theRef) {
      this.$nextTick(() => {
        // if (this.showList.isTable) return false;
        let shareContent = this.$refs[theRef]; //document.getElementById("dsrmr"); //需要截图的包裹的（原生的）DOM 对象
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
            let PDF = new JsPDF("l", "in", [
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
            PDF.save("DataReport" + ".pdf"); // 这里是导出的文件名
          });
        }, 500);
      });
    },
    js_getDPI() {
      var arrDPI = new Array();
      // console.log(window.screen.deviceXDPI);
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
    getStartTime(e) {
      if (this.searchs.ChargerNo.value !== "" && this.endTime !== "") {
        this.getParams();
      }
    },
    getEndTime(e) {
      if (this.searchs.ChargerNo.value !== "" && this.startTime !== "") {
        this.getParams();
      }
    },
    // 填写车牌号
    getValue() {
      if (
        (this.VehicleNo === "" && this.searchs.ChargerNo.value !== "") ||
        this.VehicleNo !== ""
      ) {
        this.getParams();
      }
    },
    // 选择充电编号
    seletCNOV(item) {
      this.searchs.ChargerNo.value = item;
      if (this.startTime !== "" && this.endTime !== "") {
        this.getParams();
      }
    },
    getFocus() {
      this.isShowSlete = 2;
    },
    inputBlur() {
      setTimeout(() => {
        if (
          this.searchs.ChargerNo.value !== "" &&
          this.startTime !== "" &&
          this.endTime !== ""
        ) {
          this.getParams();
        }
        this.isShowSlete = 0;
      }, 200);
    },
    // 查询充电桩的实时数据
    getNowData(centreId) {
      this.loadingName1 = "please wait...";
      let data = {
        centre: centreId,
      };
      findBySelectCNO(data)
        .then((res) => {
          if (res.code == 100) {
            if (res.extend.chargerInfoList.length != 0) {
              let arrs = res.extend.chargerInfoList.map((item) => item.chargerno);
              this.searchs.ChargerNo.list = this.searchs.ChargerNo.arrs = arrs;
            } else {
              this.loadingName1 = "No Data...";
            }
            this.count = res.extend.count;
          } else {
            this.loadingName1 = "Data loading failed";
          }
        })
        .catch(() => {
          this.loadingName1 = "Data loading failed";
        });
    },
    loadMore() {
      // if (this.page > Math.ceil(this.count / 10))
      //   return this.$message.warning("No more data!");
      // this.page += 1;
    },
    //
    seleteCenter(value) {
      this.searchs.ChargerNo = {
        list: [],
        arrs: [],
        value: "",
      };
      this.searchs.Centre.value = value.value;
      this.searchs.Centre.cid = value.cid;
      this.isShowSlete = 0;
      this.getNowData(value.cid);
    },

    //条件筛选查询
    getParams() {
      if (this.searchs.VehicleNo === "") {
        if (this.searchs.Centre.cid === "") {
          return this.$message.warning("Centre cannot be empty");
        }
        if (this.searchs.ChargerNo.value === "") {
          return this.$message.warning("Chargerno cannot be empty");
        }
      }
      if (this.startTime === "") {
        return this.$message.warning("Please select a start time");
      }
      if (this.endTime === "") {
        return this.$message.warning("Please select an end time");
      }
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      let data = {
        centre: this.searchs.Centre.cid,
        chargerNo: this.searchs.ChargerNo.value,
        vehicleNo: this.searchs.VehicleNo,
        type: this.showList.isTime,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      findByDataReport(data)
        .then((res) => {
          console.log("条件筛选查询", res);
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.code == 100) {
            this.chargerInfoList = res.extend.chargerRecordList;
            let chartList = {
              TCT: res.extend.chargerRecordList.map((item) =>
                item.totalChargingTime ? Number(item.totalChargingTime).toFixed(2) : 0
              ),
              TNC: res.extend.chargerRecordList.map((item) =>
                item.totalNoofCharging ? item.totalNoofCharging : 0
              ),
              TCE: res.extend.chargerRecordList.map((item) =>
                item.totalChargingEnergy ? Number(item.totalChargingEnergy).toFixed(2) : 0
              ),
              ACP: res.extend.chargerRecordList.map((item) =>
                item.totalChargingEnergy
                  ? Number(item.averageChargingPower).toFixed(2)
                  : 0
              ),
              UR: res.extend.chargerRecordList.map((item) =>
                item.unilizationRate ? Number(item.unilizationRate).toFixed(2) : 0
              ),
              times: res.extend.chargerRecordList.map((item) => item.date),
            };
            this.chartList = chartList;
            setTimeout(() => {
              this.setCharts("chart1", chartList.TCT, chartList.times, 1);
              this.setCharts("chart2", chartList.TCT, chartList.times, 1);
              this.setCharts("chart3", chartList.TCT, chartList.times, 1);
              this.setCharts("chart4", chartList.TCT, chartList.times, 2);
              this.setCharts("chart5", chartList.TCT, chartList.times, 2);
            }, 200);
            // this.chargerInfoList = [
            //   ...this.chargerInfoList,
            //   ...res.extend.chargerInfoList,
            // ];
            // this.count = res.extend.count;
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
.transnY100 {
  transform: translateY(100%);
}
.transnY001 {
  transform: translateY(-100%);
}
.visibility {
  visibility: hidden;
}
.charts {
  width: 1376px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 2px solid #205cbf;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 0;
}
.chartItems {
  /* width: 1376px; */
  width: 100%;
  height: 400px;
}
.chart-items {
  /* width: 688px; */
  /* width: 50%; */
  flex: 1;
  height: 100%;
  position: relative;
  border-right: 1px solid #205cbf;
  border-bottom: 1px solid #205cbf;
}
.nobr {
  border-right: 0;
}
.nobb {
  border: 0;
}

.chart-items .chartP {
  position: absolute;
  /* width: 688px; */
  width: 100%;
  left: 0;
  top: 20px;
}
.chart-items p {
  /* width: 688px; */
  width: 100%;
  font-size: 18px;
  text-align: center;
}

.chart-items .setCharts {
  /* width: 688px; */
  width: 100%;
  height: 350px;
  /* position: absolute;
  bottom:0; */
}

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
}
.dsmleftitemSpan,
.titem p {
  font-size: 16px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  letter-spacing: 1.5px;
  font-weight: 500;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  cursor: pointer;
}
.titem .tbp {
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
  letter-spacing: 2px;
  font-weight: 600;
  display: inline-block;
  background: url("../../assets/index/datas/01.png") no-repeat;
  background-size: 100% 100%;
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
.drtable {
  width: 100%;
  min-height: 550px;
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

.cnoImg {
  position: absolute;
  right: 20px;
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
  width: 210px;
  right: 10px;
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
.cdltopitem .seleteY {
  width: 210px;
}
.cdltopitem input {
  outline: 0;
}
.seleteY input {
  position: absolute;
  right: 10px;
  top: 0;
  width: 210px;
  height: 31px;
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
.dsmains {
  width: 1406px;
  height: 550px;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}
.dsmain {
  width: 1406px;
  height: 550px;
  /* background: red; */
  /* border: 2px solid #205cbf; */
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
/* .seleterBody {
  width: 230px;
} */
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
