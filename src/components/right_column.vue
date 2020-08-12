<template>
    <div id ="right_main">
      <div id ="day_week_box_top">
        <day_week_top v-for="i in day_or_week" :key="first_day + i" :day_or_week="day_or_week" :first_day_2="first_day_2.getDate()" :day="first_day + i"></day_week_top>
      </div>
      <div id ="day_week_box_bottom">
        <day_week_bottom v-for="i in day_or_week" :key="first_day + i" :day_or_week="day_or_week"></day_week_bottom>
      </div>
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
    var today = new Date();
    return {
      day_or_week: 7,
      first_day: 10,
      first_day_2: today
    }
  },
  computed: {
    calDate() {

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

#day_week_box_top, #day_week_box_bottom{
  margin: 1em 1em 0;
  display: flex;
  justify-content: space-between;
}

#day_week_box_bottom {
  overflow: auto;
  height: 78vh;
}

::-webkit-scrollbar{
  width: 10px;
}
::-webkit-scrollbar-track{
  background: #fff;
  border-left: solid 1px #ececec;
}
::-webkit-scrollbar-thumb{
  background: #ccc;
  border-radius: 10px;
  box-shadow: inset 0 0 0 2px #fff;
}
</style>