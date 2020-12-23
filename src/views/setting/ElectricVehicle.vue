<template>
  <div class="">
    <div>
      <p class="ortoptit">Electric Vehicle</p>
      <div>
        <div class="tables">
          <ul class="ultit">
            <li><p>Manufacturer</p></li>
            <li><p>Model</p></li>
            <li><p>Image Uploaded</p></li>
          </ul>
          <!-- v-if="eveList.length!=0" -->
          <template v-if="eveList.length != 0">
            <ul
              class="uldatas w100"
              @click="toChargerDetails(item.id)"
              v-for="(item, index) in eveList"
              :key="index"
            >
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
          </template>
          <template v-else>
            <ul class="uldatas w100">
              <li><p>暂无数据！</p></li>
            </ul>
          </template>
        </div>
      </div>
    </div>
    <div class="ElectricVehicle">
      <div class="pagination">
        <el-pagination
          @current-change="sizeChange"
          background
          layout=" prev, pager, next, jumper, ->, total, slot"
          :total="count"
          hide-on-single-page
          :page-size="10"
        >
        </el-pagination>
      </div>
    </div>
    <!-- <div class="flex flex-Updown mt30">
      <div class="button operation">Update</div>
      <div class="button operation">Cancel</div>
    </div> -->
  </div>
</template>

<script>
import { EVFindAll } from "../../common/api";
export default {
  name: "ElectricVehicle",
  data() {
    return {
      eveList: [],
      page: 1,
      count: 0,
    };
  },
  created() {
    this.getCarAll();
  },
  methods: {
    toChargerDetails(id) {
      this.$router.push({
        name: "chargerDetails",
        query: {
          id: id,
        },
      });
    },
    //
    sizeChange(value) {
      this.page = value;
      this.getCarAll();
    },
    //
    getCarAll() {
      let data = {
        userId: localStorage.getItem("userId"),
        page: this.page,
        limit: 10,
      };
      let loadingInstance = this.$loading({
        text: "加载中...",
        background: "rgba(0,0,0,.5)",
      });
      EVFindAll(data)
        .then((res) => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          console.log("查询所有的车辆信息", res);
          if (res.code == 100) {
            this.count = res.extend.count;
            this.eveList = res.extend.electricVehicleList;
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
.ElectricVehicle {
  position: relative;
  width: 100%;
  height: 100px;
}
.ultit,
.uldatas {
  padding: 0 300px;
}
</style>
