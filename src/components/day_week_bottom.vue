<template>
  <div id ="day_week_box_bottom">
    <div v-for="i in 24" :key="i" class="one_hour">
      <p class="time">{{i - 1}}:00</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "day_week_bottom"
}

</script>

<style scoped>
  #day_week_box_bottom {
    margin: 0 1em 0;
  }

  .one_hour {
    min-height: 8vh;
    border-top: solid 1px #9c9c9c;
    text-align: left;
  }

  .time {
    display: inline;
    font-size: 0.75em;
    color: dimgrey;
  }
</style>