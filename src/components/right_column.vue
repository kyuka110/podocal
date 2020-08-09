<template>
    <div id ="right_main">
      <cal_week/>
    </div>
</template>

<script>
import cal_week from './cal_week.vue'
export default {
  name: 'right_column',
  components: {cal_week}
}
</script>

<style scoped>
#right_main {
    flex: 1;
    min-height:100vh;
    background-color: oldlace;
}
</style>