<template>
  <div id ="each_day_box_bottom" :style="cssWidth">
    <div v-for="i in 24" :id="calTimeLineHourId(i)" :key="i" class="one_hour" :style="cssHeightHour">
      <div v-for="j in 4" :id="calTimeLineMinutesId(i, j)" :key="j" :style="cssHeightMinutes" :class="{scheduled_area: returnPaintId.indexOf(calTimeLineMinutesId(i, j)) >= 0 }">
        <p v-if="j == 1" class="time">{{i - 1}}:00</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: "day_week_bottom",
  props: {
    day_or_week: Number,
    time: Number,
  },
  computed: {
    cssWidth() {
      return {
        '--content-width': (100 / this.day_or_week) + '%'
      }
    },
    ...mapState({
      cssHeightHour(state) {
        return {
          'min-height': 3 + state.zoom + 'vh'
        }
      },
      cssHeightMinutes(state) {
        return {
          'min-height': 1 + state.zoom + 'vh'
        }
      }
    }),
    ...mapGetters(['returnPaintId'])
  },
  methods: {
    calTimeLineHourId(i){
      this.$store.commit('changeBeginTime', {newtime:this.time})
      this.$store.commit('changeEndTime', {newtime:this.time})
      //idを設定
      var baseDate = new Date(this.time)
      return String(baseDate.getFullYear()) + String(baseDate.getMonth() + 1)
           + String(baseDate.getDate()) + String(i - 1);
    },
    calTimeLineMinutesId(i, j){
      var baseDate = new Date(this.time)
      return String(baseDate.getFullYear()) + String(baseDate.getMonth() + 1)
              + String(baseDate.getDate()) + String(('00' + (i - 1)).slice(-2)) + String((j - 1) * 15);
    },

  },
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
    border-top: solid 1px #c9c9c9;
    text-align: left;
  }

  .time {
    display: inline;
    font-size: 0.75em;
    color: #8f8f8f;
  }

  p {
    z-index: 2;
  }

  .scheduled_area {
    background-color: #fcbc6d;
  }

  .eachtask {
    min-height: 4vh;
    width: 100%;
    position: relative;
    /*background-color: coral;*/
    z-index:10;
  }
</style>