<template>
    <div id ="right_main">
      <div id ="day_week_box_top">
        <day_week_top v-for="i in day_or_week" :key="first_day + i" :day="first_day + i"></day_week_top>
      </div>
        <day_week_bottom/>
    </div>
</template>

<script>
import day_week_top from './day_week_top.vue'
import day_week_bottom from './day_week_bottom.vue'
export default {
  name: 'right_column',
  components: {
    day_week_top,
    day_week_bottom
  },
  data () {
    return {
      day_or_week: 7,
      first_day: 10
    }
  }
}
</script>

<style scoped>
#right_main {
    flex: 1;
    min-height:100vh;
    background-color: oldlace;
}

#day_week_box_top {
  margin: 1em 1em 0;
  display: flex;
  justify-content: space-between;
}
</style>