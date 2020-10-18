<template>
  <div id ="each_day_box_bottom" :style="cssWidth">
    <div v-for="i in 24" :id="calTimeLineId(i)" :key="i" class="one_hour" :style="cssHeight">
      <p class="time">{{i - 1}}:00</p>
    </div>
    {{dataOutput}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "day_week_bottom",
  props: {
    day_or_week: Number,
    time: Number
  },
  data () {
    return {
      searchBeginTime: 0,
      searchEndTime: 0
    }
  },
  computed: {
    cssWidth() {
      return {
        '--content-width': (100 / this.day_or_week) + '%'
      }
    },
    dataOutput() {
      return this.$store.getters.getStateDataSet["body"]
    },
    ...mapState({
      cssHeight(state) {
        return {
          'min-height': 8 + state.zoom + 'vh'
        }
      }
    })
  },
  methods: {
    calTimeLineId(i){
      if (this.time > this.searchBeginTime){
        hogehoge
      }
      var baseDate = new Date(this.time)
      return String(baseDate.getFullYear()) + String(baseDate.getMonth() + 1)
           + String(baseDate.getDate()) + String(i - 1);
    }
  },
  created() {
    this.$store.dispatch('commitDataSet')
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