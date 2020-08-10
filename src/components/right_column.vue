<template>
    <div id ="right_main">
      <day_week_top/>
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
  }
}
</script>

<style scoped>
#right_main {
    flex: 1;
    min-height:100vh;
    background-color: oldlace;
}
</style>