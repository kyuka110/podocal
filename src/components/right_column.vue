<template>
    <div id ="right_main">
      <day_week_top/>
    </div>
</template>

<script>
import day_week_top from './day_week_top.vue'
export default {
  name: 'right_column',
  components: {
    day_week_top
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