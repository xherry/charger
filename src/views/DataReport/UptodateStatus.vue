<template>
  <div class="UptodateStatus">
    <div class="overRights">
      <p class="ortoptit">Summary of All Centre Charging Information</p>
      <div class="ustable">
        <ul class="ustabletit">
          <li>
            <p>Centre</p>
          </li>
          <li>
            <p>Charger No</p>
          </li>
          <li>
            <p>Charger Type</p>
          </li>
          <li>
            <p>Status</p>
          </li>
          <li>
            <p>Vehicle No.</p>
          </li>
          <li>
            <p>EV Type</p>
          </li>
          <li>
            <p>Charging Power[kw]</p>
          </li>
          <li>
            <p>Charging Time[Hour]</p>
          </li>
        </ul>
        <ul class="ustablemain">
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UptodateStatus",
  data() {
    return {};
  },
};
</script>

<style scoped>
.ortoptit{
    line-height: 55px;
  }
.ustabletit{
  background: #0D264E;
}
.ustablemain{
  background: transparent;
}
.ustable ul{
   border-bottom: 2px solid #205CBF;
}
.ustable ul:last-child{
  border-bottom: none;
}
.ustable li{
  border-right: 2px solid #205CBF;
}
.ustable li:last-child{
   border-right: none;
}
.overRights {
  margin-top: 53px;
  height: 810px;
}
.ustable {
  width: 1406px;
  /* height: 677px; */
  border: 2px solid #205cbf;
  border-radius: 20px;
  margin-top: 40px;
  margin-left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
}
</style>
