<template>
    <div id ="right_main">
      <div id ="day_week_box_top">
        <day_week_top v-for="i in returnDispDays" :key="firstDay + i" :day_or_week="returnDispDays" :day="setDay(i)" :day_of_the_week="setDayOfTheWeek(i)"></day_week_top>
      </div>
      <div id ="day_week_box_bottom">
        <day_week_bottom v-for="i in returnDispDays" :key="firstDay + i" :day_or_week="returnDispDays" :time="setDate(i)"></day_week_bottom>
      </div>
    </div>
</template>

<script>
import day_week_top from './day_week_top.vue'
import day_week_bottom from './day_week_bottom.vue'
import {mapGetters} from "vuex";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore);

export default {
  name: 'right_column',
  components: {
    day_week_top,
    day_week_bottom
  },
  data () {
    return {
      firstDay: 29,
    }
  },
  computed: {
      ...mapGetters('mm', ['returnDispDays'])
  },
  methods: {
     // 今日の0時 + 1日、2日…と返す
     setDate(i){
       // 今日の0時
       var jst0 = dayjs().startOf('date');
       var returnDate = jst0.add(i - 1,'day');
       return returnDate.unix();
     },
     // 日付返却
     setDay(i){
       var returnDate = dayjs().add(i - 1,'day');
       return returnDate.date();
     },
      // 曜日返却
     setDayOfTheWeek(i){
         var returnDate = dayjs().add(i - 1,'day');
         var dayStr = '日'
         switch(returnDate.day()){
             case 0:
                 dayStr = '日';
                 break;
             case 1:
                 dayStr = '月';
                 break;
             case 2:
                 dayStr = '火';
                 break;
             case 3:
                 dayStr = '水';
                 break;
             case 4:
                 dayStr = '木';
                 break;
             case 5:
                 dayStr = '金';
                 break;
             case 6:
                 dayStr = '土';
                 break;
         }
         return dayStr;
     },
      add (value, taskId){
          this.$store.commit('mm/addPaintId', {
            id:value,
            taskId:taskId
          })
      },
      // タスクがある場所として塗るところを計算
      calPaintId(starttime, endtime, taskId) {
          var i = 0;
          var startTime = dayjs.unix(starttime);
          var endTime = dayjs.unix(endtime);
          for (; ;) {
            var paintTime = startTime.add(i * 15,'minute');
            if (endTime.isSameOrBefore(paintTime)){
              break;
            }
            this.add(paintTime.format('YYYYMMDDHHmm'), taskId);
            i++;
          }
      },
      calTaskTitleTime(time){
          var dateobj = dayjs.unix(time);
          return dateobj.format('YYYYMMDDHHmm');
      }
  }
}
</script>

<style scoped>
#right_main {
    flex: 1;
    min-height:100vh;
}

#day_week_box_top, #day_week_box_bottom{
  margin: 1em 1em 0;
  display: flex;
  justify-content: space-between;
}

#day_week_box_bottom {
  overflow: auto;
  height: 86vh;
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