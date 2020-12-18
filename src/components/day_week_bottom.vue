<template>
  <div id="each_day_box_bottom" :style="cssWidth">
    <div v-for="i in 24" :id="calTimeLineHourId(i)" :key="i" class="one_hour" :style="cssHeightHour">
      <div v-for="j in 4" :id="calTimeLineMinutesId(i, j)" :key="j" :style="cssHeightMinutes" :class="{scheduled_area: returnPaintId.indexOf(calTimeLineMinutesId(i, j)) >= 0}">
        <span v-if="j == 1" class="time">{{i - 1}}:00 </span><span class="title" :style="cssTitle">{{dispTaskTitle(calTimeLineMinutesId(i, j))}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import dayjs from 'dayjs'
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
          'min-height': 72 + state.zoom + 'px'
        }
      },
      cssHeightMinutes(state) {
        return {
          'min-height': 18 + state.zoom + 'px'
        }
      },
      cssTitle(state) {
        return {
          'font-size': 0.75 + state.zoom / 20 + 'em'
        }
      }
    }),
    ...mapGetters(['returnPaintId'])
  },
  methods: {
    // 1時間ごとのdiv要素のidを作成
    calTimeLineHourId(i){
      this.$store.commit('changeBeginTime', {newtime:this.time})
      this.$store.commit('changeEndTime', {newtime:this.time})
      //idを設定
      var baseDate = dayjs.unix(this.time);
      return baseDate.format('YYYYMMDDHH') + String(i - 1);
    },
    // 15分ごとのdiv要素のidを作成
    calTimeLineMinutesId(i, j){
      var baseDate = dayjs.unix(this.time);
      return baseDate.format('YYYYMMDD')+ String(('00' + (i - 1)).slice(-2)) + String((j - 1) * 15);
    },
    // タスクのタイトル表示
    dispTaskTitle(checkId){
      for(var i = 0; i< this.$store.state.first.length; i++){
          if (checkId == this.$store.state.first[i]){
              return this.$store.state.title[i];
          }
      }
    }
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
    border-top: solid 1px #b3c5d6;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .time {
    display: inline;
  }

  span {
    z-index: 2;
    font-size: 0.75em;
    color: #8a96a3;
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
  }

  .title {
    color: #2c3e50;
    overflow: hidden;
  }

  .scheduled_area {
    background-color: #f5b895;
    font-size: 100%;
  }
</style>