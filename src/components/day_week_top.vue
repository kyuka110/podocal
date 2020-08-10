<template>
  <div id ="each_day_box">
    <!-- 1行目 曜日 -->
    <span class="days_of_week">日</span>
    <!-- 2行目 日付 -->
    <span class="days">{{first_day}}</span>
    <!-- 3行目 終日予定 -->
    <p class="all_day">
      <span> {{day_or_week}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'day_week_top',
  props: {
    day_or_week: Number,
    first_day: Number
  }
}

</script>

<style scoped>
#each_day_box {
  /*margin: 1em 1em 0;*/
  /*display: flex;*/
  /*flex-wrap: wrap;*/
}

p {
  width: 100%;
  min-height: 8vh;
}

span {
  width: 100%;
  margin: 0.5% 0;
}

.days_of_week {
  font-size: 13px;
}

.days {
  font-size: 33px;
}

.all_day {
  height: 3em;
  background-color: aquamarine;
}
</style>