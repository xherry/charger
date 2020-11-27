<template>
  <div class="">
    <div class="overRights">
      <p class="ortoptit">User Records</p>
      <div class="urtable">
        <ul class="ultit">
          <li><p>User Id</p></li>
          <li><p>Staf Id</p></li>
          <li><p>Name</p></li>
          <li><p>User Type</p></li>
          <li><p>Centre</p></li>
          <li><p>Department</p></li>
          <li><p>E-mail</p></li>
          <li><p>Mobile No.</p></li>
        </ul>
        <ul class="uldatas w100" @click="$router.push('chargerDetails')">
          <li><p>0001</p></li>
          <li><p>1346</p></li>
          <li><p>ASDF</p></li>
          <li><p>DFBDFGH</p></li>
          <li><p>fddfghfgh</p></li>
          <li><p>sdhthfgth</p></li>
          <li><p>fdgggfh 126@126.com</p></li>
          <li><p>18868845698</p></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-center">
      <div class="button UpdateCancel" style="margin-right: 144px">Edit</div>
      <div class="button UpdateCancel">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRecords",
  data() {
    return {};
  },
};
</script>

<style scoped>
.urtable{
  width: 1486px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}
.overRights {
  height: 747px;
}
</style>
