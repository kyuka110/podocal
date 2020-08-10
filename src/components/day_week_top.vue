<template>
  <div id ="day_week_box_top">
    <!-- 1行目 曜日 -->
    <span class="days_of_week">日</span>
    <!-- 2行目 日付 -->
    <span class="days">9</span>
    <!-- 3行目 終日予定 -->
    <p class="all_day">
      <span> よてい<br>aaaaaaaa</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "day_week_top"
}
</script>

<style scoped>
#day_week_box_top {
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
}

p {
  width: 14.28%; /* 親要素に対して7等分する */
  min-height: 8vh;
}

span {
  width: 14.28%; /* 親要素に対して7等分する */
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

#timeline {
  width: 100%;
  border: solid 1px #2c3e50;
}
</style>