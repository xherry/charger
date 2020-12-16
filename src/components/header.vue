<template>
  <div>
    <div
      class="flex flex-between tops"
      v-for="(p, i) in num"
      :key="i"
      :class="i == 0 ? 'pf' : ''"
    >
      <div class="top1"><img src="../assets/icon.png" alt="" /></div>
      <div class="top2">Intelligent EV Charging System</div>
      <div class="top3">{{ nowDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headeTop",
  data() {
    return {
      num: 2,
      nowDate: "",
    };
  },
  created() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    setInterval(() => {
      second += 1;
      if (second == 60) {
        second = 0;
        minute += 1;
        if (minute == 60) {
          minute = 0;
          hour += 1;
          if (hour == 24) {
            hour = 0;
            day += 1;
            if (day > this.getMonthDay(parseInt(month) - 1)) {
              day = 1;
              month += 1;
              if (parseInt(month) > 12) {
                month = 1;
                year += 1;
              }
            }
          }
        }
      }
      this.nowDate =
        year +
        "-" +
        this.setVal(month) +
        "-" +
        this.setVal(day) +
        " " +
        this.setVal(hour) +
        ":" +
        this.setVal(minute) +
        ":" +
        this.setVal(second);
    }, 1000);
  },
  methods: {
    setVal(val) {
      if (val < 10) {
        return "0" + val;
      }
      return val;
    },
    getMonthDay(val) {
      let year = new Date().getFullYear();
      let dayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((year % 100 != 0 && year % 4 == 0) || year % 400 == 0) {
        dayList[1] = 29;
      }
      return dayList[val];
    },
  },
};
</script>

<style scoped>
.pf {
  top: 0;
  left: 0;
  z-index: 99;
  position: absolute;
}
.tops {
  margin-top: 38px;
  align-items: flex-start;
  width: 100%;
}
.top1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.top1 > img {
  width: 120px;
  height: 30px;
  margin-top: 8px;
}

.top1,
.top2,
.top3 {
  text-align: center;
}
.top1,
.top3 {
  width: 566px;
  height: 58px;
  line-height: 73px;
  font-size: 20px;
}
.top1 {
  background: url("../assets/index/left.png");
  background-size: 100% 100%;
}
.top2 {
  width: 681px;
  height: 80px;
  background: url("../assets/index/middle.png");
  background-size: 100% 100%;
  line-height: 80px;
  font-size: 35px;
}
.top3 {
  background: url("../assets/index/right.png");
  background-size: 100% 100%;
}
</style>
