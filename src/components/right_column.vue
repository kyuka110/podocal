<template>
    <div id ="right_main">
      <div id ="day_week_box_top">
        <day_week_top v-for="i in day_or_week" :key="first_day + i" :day_or_week="day_or_week" :day="setDay(i)" :day_of_the_week="setDayOfTheWeek(i)"></day_week_top>
      </div>
      <div id ="day_week_box_bottom">
        <day_week_bottom v-for="i in day_or_week" :key="first_day + i" :day_or_week="day_or_week" :time="setDate(i)"></day_week_bottom>
      </div>
    </div>
</template>

<script>
import day_week_top from './day_week_top.vue'
import day_week_bottom from './day_week_bottom.vue'
import axios from "axios"
export default {
  name: 'right_column',
  components: {
    day_week_top,
    day_week_bottom
  },
  data () {
    return {
      day_or_week: 7,
      first_day: 29,
    }
  },
  methods: {
     // 今日の0時 + 1日、2日…と返す
     setDate(i){
       var today = new Date()
       // 今日の0時のunixtime(UTC)
       var utc0unix = Date.UTC( today.getFullYear(), today.getMonth(), today.getDate());
       // 32400000 = 9時間。
       var jst0unix = utc0unix + 32400000;
       var jst0 = new Date(jst0unix);
       jst0.setTime(jst0.getTime() + (i - 1) * 86400000);
       return jst0.getTime();
     },
     // 日付返却
     setDay(i){
         var today = new Date();
         today.setDate(today.getDate() + i - 1);
         return today.getDate();
     },
      // 曜日返却
     setDayOfTheWeek(i){
         var today = new Date();
         today.setDate(today.getDate() + i - 1);
         var dayStr = '日'
         switch(today.getDay()){
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
      add (value){
          this.$store.commit('addPaintId', {id:value})
      },
      calPaintId(starttime, endtime) {
          var i = 0;
          var unixStartTime = starttime * 1000;
          var unixEndTime = endtime * 1000;
          for (; ;) {
              if (unixEndTime <= (unixStartTime + 900000 * i)) {
                  break;
              }
              var startmiltime = new Date(unixStartTime + 900000 * i);
              this.add(String(startmiltime.getFullYear()) + String(startmiltime.getMonth() + 1)
                  + String(startmiltime.getDate()) + String(('00' + startmiltime.getHours()).slice(-2)) + String(startmiltime.getMinutes()));
              i++;
          }
      }
  },
  created() {
      axios.get('https://jxff6ecyn2.execute-api.ap-northeast-1.amazonaws.com/prod/getsingletask')
          .then(response => {
              for(var i = 0; i < response.data.body.length; i++){
                  this.calPaintId(response.data["body"][i]["unix_start_time"], response.data["body"][i]["unix_end_time"])
              }
          })
          .catch((reason) => {
              console.log(reason.message)
          })
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