<template>
  <div id="left_main">
    <h1>
      <img alt="podocal logo" id="podocal_logo" src="../assets/podocal.png">
      {{ msg }}
    </h1>
    <p>
      <select v-model="selected" @change="dispDayOrWeek">
        <option disabled value="">週 / 日</option>
        <option value=7>週</option>
        <option value=1>日</option>
      </select>
    </p>
    <p>
      <button class="scale_change" v-on:click="plusClick">＋</button>
      <button class="scale_change" v-on:click="minusClick">－</button>
    </p>
    <div class="task_add_modal">
      <button class="task_add_button" @click="openModal">タスク追加</button>
      <MyModal @close="closeModal" v-if="modal">
        <input class="title" type="text" maxlength="100" placeholder="タイトル" v-model="task_title"><br>
        <label>開始日時：<input type="datetime-local" step="900" v-model="task_start_time"></label><br>
        <label>終了日時：<input type="datetime-local" step="900" v-model="task_end_time"></label><br>
        <textarea placeholder="詳細" maxlength="10000" v-model="task_detail" cols="50" rows="10"></textarea>
        <template slot="footer">
          <button class="enter_task" @click="doSend">決定</button>
        </template>
      </MyModal>
    </div>
  </div>
</template>

<script>
import MyModal from './modal.vue'
import {mapState} from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter);

export default {
  components: {
    MyModal
  },
  name: 'left_column',
  props: {
    msg: String
  },
  data() {
    return {
      modal: false,
      task_title: '',
      task_detail: '',
      task_start_time: '',
      task_end_time: '',
      selected: ''
    }
  },
  computed: {
    ...mapState(['zoom']),
  },
  methods: {
    dispDayOrWeek(){
      this.$store.commit('mm/changeDispDays', {days:Number(this.selected)})
    },
    plusClick() {
      this.$store.commit('sm/plusClick')
    },
    minusClick() {
      this.$store.commit('sm/minusClick')
    },
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.task_title == '') {
        this.task_detail = ''
        this.closeModal();
        return;
      }
      if (this.task_title.trim() == '') {
        this.task_title = ''
        this.task_detail = ''
        this.closeModal();
        return;
      }
      var starttime = dayjs(this.task_start_time);
      var endtime =  dayjs(this.task_end_time);
      if(starttime.isSameOrAfter(endtime)){
          alert('開始時刻は終了時刻より前に設定して下さい');
          return;
      }
      this.setTask(starttime, endtime);
    },
    add (value){
        this.$store.commit('mm/addPaintId', {id:value})
    },
    // タスクがある場所として塗るところを計算
    calPaintId(starttime, endtime) {
      var i = 0;
      var startTime = dayjs.unix(starttime);
      var endTime = dayjs.unix(endtime);
      for (; ;) {
        var paintTime = startTime.add(i * 15,'minute');
        if (endTime.isSameOrBefore(paintTime)){
          break;
        }
        this.add(paintTime.format('YYYYMMDDHHm'));
        i++;
      }
    },
    calTaskTitleTime(time){
      var dateobj = dayjs.unix(time);
      return dateobj.format('YYYYMMDDHHm');
    },
    setTask(starttime, endtime){
      axios.get('https://wa1mn8ww9e.execute-api.ap-northeast-1.amazonaws.com/prod/setSingleTask', {
        params: {
          unix_start_time: starttime.unix(),
          unix_end_time: endtime.unix(),
          title: this.task_title,
          detail: this.task_detail
        }
      });
      this.calPaintId(starttime, endtime);
      this.$store.commit('mm/addTask', {
          title: this.task_title,
          first: starttime
      })
      this.task_title = '';
      this.task_detail = '';
      this.closeModal();
      return;
    },
  }
}
</script>

<style scoped>
#left_main {
  width: 250px;
  min-height: 100vh;
}

#podocal_logo {
  height:50px;
  vertical-align: middle;
}

h1 {
  line-height: 2.2;
  padding-bottom: 20px;
}

p {
  margin: 1.5em;
}
select {
  font-size:1.1em;
  padding: 0.5em;
  line-height: 1.5em;
  cursor: pointer;
  outline: none;
  background-color: #2c3e50;
  color: white;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.scale_change {
  font-size: 1.7em;
  padding: 0.2em 0.5em;
  margin: 0.1em;
}

.task_add_modal {
  line-height: 2em;
}

.task_add_button {
  font-size: 1.2em;
  padding:0.5em;
}

.title {
  margin: 0.5em;
  padding: 0.3em;
  font-size: 1.1em;
  width: 21em;
}

textarea {
  margin: 1em;
  padding: 0.6em;
  font-size: 1.1em;
}

.enter_task {
  padding: 0.7em 1.2em;
}
/*.page_change {*/
/*  margin: 0.5em;*/
/*}*/
</style>
