<template>
  <div id ="cal_week">
    <!-- 1行目 曜日 -->
    <span class="days_of_week">日</span>
    <span class="days_of_week">月</span>
    <span class="days_of_week">火</span>
    <span class="days_of_week">水</span>
    <span class="days_of_week">木</span>
    <span class="days_of_week">金</span>
    <span class="days_of_week">日</span>
    <!-- 2行目 日付 -->
    <span class="days">9</span>
    <span class="days">10</span>
    <span class="days">11</span>
    <span class="days">12</span>
    <span class="days">13</span>
    <span class="days">14</span>
    <span class="days">15</span>
    <!-- 3行目 終日予定 -->
    <p class="all_day">
      <span> よてい<br>aaaaaaaa</span>
    </p>
    <p class="all_day">
      <span> よてい2</span>
    </p>
    <p class="all_day">

    </p>
    <p class="all_day">

    </p>
    <p class="all_day">
      <span> よてい3</span>
    </p>
    <p class="all_day">

    </p>
    <p class="all_day">

    </p>
    <!-- 4行目 時間軸 -->
    <div id="timeline">
      aaaaaaaaaaa
    </div>
  </div>
</template>

<script>
export default {
  name: "cal_week"
}
</script>

<style scoped>
#cal_week {
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