<template>
  <div class="UserInformation flex rz mt50">
    <div class="overLeft">
      <p>User Information</p>
    </div>
    <div>
      <div class="overRight">
        <p class="ortoptit">User Information</p>
        <div class="uifmain flex">
          <div class="uifleft">
            <p class="uf-tit">User Information</p>
            <div class="flex cdltopitem flex-Updown">
              <span>User Type</span>
              <input type="text"  v-model="infos.UserType" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>User ID</span>
              <input type="text"  v-model="infos.UserID" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Password</span>
              <input type="text"  v-model="infos.Password" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Centre</span>
              <input type="text"  v-model="infos.Centre" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Department</span>
              <input type="text"  v-model="infos.Department" class="blueInput" />
            </div>
          </div>
          <div class="uifright">
            <p class="uf-tit">Contact Information</p>
            <div class="flex cdltopitem flex-Updown">
              <span>Name</span>
              <input type="text" v-model="infos.Name" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Staff ID</span>
              <input type="text" v-model="infos.StaffID" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Email</span>
              <input type="text" v-model="infos.Email" class="blueInput" />
            </div>
            <div class="flex cdltopitem flex-Updown">
              <span>Mobile Phone No.</span>
              <input type="text" v-model="infos.MobilePhoneNo" class="blueInput" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-Updown">
        <div class="button operation">Update</div>
        <div class="button operation">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInformation",
  data() {
    return {
      infos:{
        UserType:'',
        UserID:'',
        Password:'',
        Centre:'',
        Department:'',
        Name:'',
        StaffID:'',
        Email:'',
        MobilePhoneNo:''
      }
    };
  },
};
</script>

<style scoped>
.uifleft {
  margin-right: 136px;
}
.uifmain {
  margin-top: 54px;
}
.uf-tit {
  font-size: 18px;
  margin-bottom: 49px;
}
.cdltopitem {
  margin-top: 34px;
  position: relative;
}
.cdltopitem > span {
  color: #ffffff;
  font-size: 18px;
  display: inline-block;
  width: 160px;
  text-align: right;
  margin-right: 35px;
}
.overRight {
  height: 727px;
}
</style>
