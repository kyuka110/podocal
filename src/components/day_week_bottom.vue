<template>
  <div id="each_day_box_bottom" :style="cssWidth">
    <div v-for="i in 24" :id="calTimeLineHourId(i)" :key="i" class="one_hour" :style="cssHeightHour">
      <div v-for="j in 4" :id="calTimeLineMinutesId(i, j)" :key="j" :style="cssHeightMinutes">
        <div v-if="isScheduledArea(calTimeLineMinutesId(i, j))" class="scheduled_area" @click="openTaskDetailModal(calTimeLineMinutesId(i, j))" :style="cssHeightMinutes">
        <span v-if="j == 1" class="time">{{i - 1}}:00 </span>
        <span class="title" :style="cssTitle">{{dispTaskTitle(calTimeLineMinutesId(i, j))}}</span>
        </div>
        <div v-else :style="cssHeightMinutes">
        <span v-if="j == 1" class="time">{{i - 1}}:00 </span>
        </div>
      </div>
    </div>
    <detail_modal v-if="taskDetailModal" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import detail_modal from './detail_modal'
import dayjs from 'dayjs'
export default {
  components:{
    detail_modal
  },
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
    ...mapState('sm', {
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
          'font-size': 0.5 + state.zoom / 20 + 'em'
        }
      }
    }),
    ...mapState('mm', ['taskDetailModal']),
    ...mapGetters('mm', ['returnPaintId']),
  },
  methods: {
    // タスク詳細モーダル表示用
    openTaskDetailModal(checkId) {
      for(var key in this.$store.getters['mm/returnPaintId']){
        if (checkId == key){
          this.$store.commit('mm/changeDetailTaskId', {detailTaskId: this.$store.getters['mm/returnPaintId'][key]})
          this.$store.commit('mm/isDispDetailModal', {isOpen: true});
        }
      }
    },
    // 1時間ごとのdiv要素のidを作成
    calTimeLineHourId(i){
      this.$store.commit('mm/changeBeginTime', {newtime:this.time})
      this.$store.commit('mm/changeEndTime', {newtime:this.time})
      //idを設定
      var baseDate = dayjs.unix(this.time);
      return baseDate.format('YYYYMMDDHH') + String(i - 1);
    },
    // 15分ごとのdiv要素のidを作成
    calTimeLineMinutesId(i, j){
      var baseDate = dayjs.unix(this.time);
      return baseDate.format('YYYYMMDD')+ String(('00' + (i - 1)).slice(-2)) + String(('00' + (j - 1) * 15).slice(-2));
    },
    // タスクのタイトル表示
    dispTaskTitle(checkId){
      for(var key in this.$store.getters['mm/returnFirst']){
        if (checkId == this.$store.getters['mm/returnFirst'][key]){
          return this.$store.getters['mm/returnTitle'][key];
        }
      }
    },
    // 色を塗る場所を判定
    isScheduledArea(checkId) {
      for(var key in this.$store.getters['mm/returnPaintId']){
        if (checkId == key){
          return true;
        }
      }
      return false;
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
    height: 100%;
    width: 100%;
  }
</style>