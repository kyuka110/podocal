<template>
  <div id ="each_day_box_bottom" :style="cssWidth">
    <div v-for="i in 24" :id="calTimeLineHourId(i)" :key="i" class="one_hour" :style="cssHeightHour">
      <div v-for="j in 4" :id="calTimeLineMinutesId(i, j)" :key="j" :style="cssHeightMinutes" :class="{scheduled_area: paintId.indexOf(calTimeLineMinutesId(i, j)) >= 0 }">
        <p v-if="j == 1" class="time">{{i - 1}}:00</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  name: "day_week_bottom",
  props: {
    day_or_week: Number,
    time: Number
  },
  data (){
    return {
      paintId:[]
    }
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
    calPaintId(starttime, endtime){
      var paintId = [];
      var i = 0;
      var unixStartTime = starttime * 1000;
      var unixEndTime = endtime * 1000;
      for (; ;) {
        if (unixEndTime <= (unixStartTime + 900000 * i)) {
          break;
        }
        var startmiltime = new Date(unixStartTime + 900000 * i);
        paintId.push(String(startmiltime.getFullYear()) + String(startmiltime.getMonth() + 1)
                + String(startmiltime.getDate()) + String(('00' + startmiltime.getHours()).slice(-2)) + String(startmiltime.getMinutes()));
        i++;
      }
      this.paintId = paintId;
    }
  },
  created() {
      axios.get('https://jxff6ecyn2.execute-api.ap-northeast-1.amazonaws.com/prod/getsingletask')
              .then(response => {
                this.calPaintId(response.data["body"]["0"]["unix_start_time"], response.data["body"]["0"]["unix_end_time"])
              })
              .catch((reason) => {
                console.log(reason.message)
              })
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