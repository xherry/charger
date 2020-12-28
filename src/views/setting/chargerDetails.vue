<template>
  <div>
    <p class="ortoptit">Electric Vehicle</p>
    <div class="cd flex flex-Updown-between">
      <div class="cdleft">
        <div class="cdltop">
          <div class="cdltopitem flex flex-Updown-between">
            <span>EV Manufacturer</span>
            <input
              type="text"
              v-model="electricVehicle.evManufacturer"
              placeholder="Nissan"
            />
          </div>
          <div
            class="cdltopitem flex flex-Updown-between"
            @click="isShowSlete = !isShowSlete"
          >
            <span>EV Model</span>
            <p class="flex flex-Updown-between">
              <span>{{ electricVehicle.evModel }}</span>
              <img
                :style="{ transform: `rotate(${isShowSlete ? '180' : '0'}deg)` }"
                src="../../assets/index/setting/10.png"
                alt=""
              />
            </p>
            <div class="seleterBody" :style="{ height: isShowSlete ? '200px' : '0px' }">
              <div
                class="button seleter_item"
                v-for="(p, i) in electricVehicleList"
                :key="i + 'e'"
                @click="electricVehicle.evModel = p.evModel"
              >
                {{ p.evModel }}
              </div>
            </div>
          </div>
          <div class="cdltopitem flex flex-Updown-between">
            <span>Image </span>
            <div class="inputs">
              <!-- <input type="text" v-model="imgName" placeholder="选择图片" /> -->
              <p class="flex flex-Updown-between">
                <span>{{
                  imgName ? imgName : "请选择图片"
                }}</span>
                <i
                  v-if="imgName"
                  @click="upIcon === 'el-icon-close' ? (imgName = '') : ''"
                  :class="!isUpload ? upIcon : 'el-icon-loading'"
                ></i>
              </p>
              <input
                class="inputImg"
                @change="seleteImg"
                type="file"
                accept="image/*"
                id="file"
              />
            </div>
          </div>
          <p class="head" @click="uploadImg" id="uploadImg">Upload image</p>
        </div>
        <!--  -->
        <div class="cdlbottom" v-infinite-scroll="load" :infinite-scroll-delay="200">
          <ul class="ultit pk">
            <li><p>Manufacturer</p></li>
            <li><p>Model</p></li>
            <li><p>Image Uploaded</p></li>
          </ul>
          <ul class="uldatas w100" v-for="(item, index) in elist" :key="index">
            <!-- <li><p>{{index}}</p></li>
            <li><p>11</p></li>
            <li><p>11</p></li> -->
            <li>
              <p v-if="item.evManufacturer">{{ item.evManufacturer }}</p>
            </li>
            <li>
              <p v-if="item.evModel">{{ item.evModel ? item.evModel : "" }}</p>
            </li>
            <li>
              <p>{{ item.image ? "Yes" : "No" }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="cdright">
        <p>Preview</p>
        <div class="cdrmiddle">
          <img :src="electricVehicle.image?electricVehicle.image:require('../../assets/index/setting/09.png')" alt="" />
        </div>
      </div>
    </div>
    <div class="flex flex-Updown mt30">
      <div class="button operation" @click="updateCars">Update</div>
      <div class="button operation" @click="cancelUpdate">Cancel</div>
    </div>
  </div>
</template>

<script>
import {
  EVFindById,
  EVFindBySelect,
  EVDelEntity,
  imageUpload,
  EVSaveOrUpdEntity,
  EVFindAll,
} from "../../common/api";
export default {
  name: "chargerDetails",
  data() {
    return {
      isShowSlete: false,
      imgName: "",
      id: "",
      electricVehicleList: [],
      electricVehicle: {
        evManufacturer: "",
        evModel: "",
        image: "",
        id: "",
      },
      page: 0,
      count: 0,
      elist: [],
      oldObj: {},
      isUpload: false,
      upIcon: "",
      
    };
  },
  created() {
    this.getCarDeatils(this.$route.query.id);
    this.getOptions();
  },
  methods: {
    // 取消修改
    cancelUpdate() {
      this.electricVehicle = this.oldObj;
    },
    // 上滑加载
    load() {
      this.page += 1;
      this.getCarAll();
    },
    //查询所有的车辆信息
    getCarAll() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 6,
      };
      EVFindAll(data).then((res) => {
        // console.log("查询所有的车辆信息", res);
        if (res.code == 100) {
          if (res.extend.count > 6 && Math.ceil(res.extend.count / 6) < this.page) {
            this.$message.warning("无更多数据！");
            return;
          }
          // console.log(Math.ceil(res.extend.count / 6));
          this.elist = [...this.elist, ...res.extend.electricVehicleList];
          this.count = res.extend.count;
        }
      });
    },
    // 修改车辆信息
    updateCars() {
      let data = {
        userId: localStorage.getItem("userId"),
        electricVehicleId: this.electricVehicle.id,
        evManufacturer: this.electricVehicle.evManufacturer,
        evModel: this.electricVehicle.evModel,
        image: this.electricVehicle.image,
      };
      this.$msgbox({
        title: "提示",
        message: "确认修改？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            EVSaveOrUpdEntity(data).then((res) => {
              if (res.code == 100) {
                instance.confirmButtonLoading = false;
                done();
                this.$message.success("修改成功");
                this.getCarDeatils(this.$route.query.id);
              }
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        },
      });
    },
    // 选择图片
    seleteImg(e) {
      let files = e.target.files[0];
      this.imgName = files.name;
    },
    // 上传图片
    uploadImg() {
      this.isUpload = true;
      let oFile = document.querySelector("#file"); //获取input file节点
      if (oFile.files.length == 0) {
        this.$message.warning("请选择图片！");
        return;
      }
      this.isUpload = true;
      let data = new FormData();
      data.append("file", oFile.files[0]);
      imageUpload(data)
        .then((res) => {
          // console.log(res)
          if(res.code==0){
            this.$message.success("上传成功！");
            this.isUpload = false;
            // console.log(res, "上传图片");
            this.upIcon = "el-icon-check";
            this.electricVehicle.image = this.$base_url + res.data.srcs;
          }

        })
        .catch(() => {
          this.upIcon = "el-icon-close";
          this.isUpload = false;
          this.$message.warning("上传失败！");
        });
    },
    // 获取下拉框信息
    getOptions() {
      let data = {
        userId: localStorage.getItem("userId"),
      };
      EVFindBySelect(data).then((res) => {
        // console.log("获取下拉框信息", res);
        if (res.code == 100) {
          this.electricVehicleList = res.extend.electricVehicleList;
        }
      });
    },
    getCarDeatils(id) {
      let data = {
        userId: localStorage.getItem("userId"),
        electricVehicleId: id,
      };
      let loadingInstance = this.$loading({
        text: "Loading...",
        background: "rgba(0,0,0,.5)",
      });
      EVFindById(data)
        .then((res) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          // console.log("查询单个车辆信息", res);
          if (res.code == 100) {
            this.oldObj = res.extend.electricVehicle;
            this.electricVehicle = JSON.parse(JSON.stringify(res.extend.electricVehicle));
            this.imgName = JSON.parse(JSON.stringify(res.extend.electricVehicle)).image;
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
.inputImg {
  position: absolute;
  left: 0;
  background: #f00;
  width: 85% !important;
  bottom: 0px;
  opacity: 0;
  /* visibility: hidden; */
}
.inputs>p>span{
   width: 85% !important;
   display: inline-block;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
.head {
  cursor: pointer;
}
.head:active {
  color: #205cbf;
}
.cdright p {
  color: #fff;
  font-size: 18px;
}
.cdrmiddle {
  margin-top: 20px;
  width: 649px;
  height: 603px;
  border: 2px solid #205cbf;
  border-radius: 20px;
}
.cdrmiddle img {
  width: 550px;
  height: 285px;
  margin: 50% 0 0 50%;
  transform: translate(-50%, -50%);
}
.cdlbottom {
  width: 644px;
  height: 366px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.pk {
  position: sticky;
  top: 0;
  z-index: 33;
  background: #083265;
}
.cd {
  margin-top: 21px;
}
.cdltop > p {
  font-size: 18px;
  color: #fff;
  text-align: right;
  margin-top: 15px;
}
.cdltopitem img {
  width: 18px;
  height: 10px;
  transition: all 0.2s linear;
}

.cdltopitem .inputs,
.cdltopitem input,
.cdltopitem p {
  width: 365px;
  height: 46px;
  border: 1px solid #63d1ff;
  border-radius: 4px;
  background: transparent;
  padding: 0 20px 0 36px;
  box-sizing: border-box;
  color: #fff;
  font-size: 18px;
}

.cdltopitem .inputs p {
  width: 100%;
  height: 100%;
  line-height: 46px;
}
.cdltopitem .inputs {
  position: relative;
  padding: 0;
}
.cdltopitem input {
  outline: 0;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 18px;
  display: inline-block;
  width: 140px;
  text-align: right;
}
.seleterBody {
  width: 365px;
  position: absolute;
  right: 0;
  top: 100%;
  height: 300px;
  background: #205cbf;
  z-index: 66;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s linear;
}
.cdltopitem {
  margin-top: 34px;
  position: relative;
}
.cdltop {
  width: 644px;
  height: 296px;
  border: 2px solid #205cbf;
  border-radius: 20px;
  padding: 0 64px 0 38px;
  box-sizing: border-box;
  position: relative;
}
</style>
