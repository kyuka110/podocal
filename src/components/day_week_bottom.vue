<template>
  <div id ="each_day_box_bottom" :style="cssProps">
    <div v-for="i in 24" :key="i" class="one_hour">
      <p class="time">{{i - 1}}:00</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "day_week_bottom",
  props: {
    day_or_week: Number
  },
  computed: {
    cssProps() {
      return {
        '--content-width': (100 / this.day_or_week) + "%"
      }
    }
  }
}

</script>

<style scoped>
  #each_day_box_bottom {
    --content-width: 100%;
    width: var(--content-width);
    display: flex;
    flex-wrap: wrap;
  }

  .one_hour {
    width: 100%;
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