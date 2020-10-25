<template>
  <div id="left_main">
    <h1>
      <img alt="podocal logo" id="podocal_logo" src="../assets/podocal.png">
      {{ msg }}
    </h1>
<!--    あとで追加する-->
<!--    <p>-->
<!--      <select>-->
<!--        <option value="day">日</option>-->
<!--        <option value="week">週</option>-->
<!--        <option value="month">月</option>-->
<!--      </select>-->
<!--      <span class="page_change">＜</span>-->
<!--      <span class="page_change">＞</span>-->
<!--    </p>-->
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
      task_end_time: ''
    }
  },
  computed: {
    ...mapState(['zoom'])
  },
  methods: {
    plusClick() {
      this.$store.commit('plusClick')
    },
    minusClick() {
      this.$store.commit('minusClick')
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
      var starttime = Date.parse(this.task_start_time) / 1000;
      var endtime =  Date.parse(this.task_end_time) / 1000;
      if(starttime >= endtime){
          alert('開始時刻は終了時刻より前に設定して下さい');
          return;
      }
      this.setTask(starttime, endtime);
    },
    add (value){
        this.$store.commit('addPaintId', {id:value})
    },
    calPaintId(starttime, endtime){
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
    },
    setTask(starttime, endtime){
      axios.get('https://wa1mn8ww9e.execute-api.ap-northeast-1.amazonaws.com/prod/setSingleTask', {
        params: {
          unix_start_time: starttime,
          unix_end_time: endtime,
          title: this.task_title,
          detail: this.task_detail
        }
      });
      this.calPaintId(starttime, endtime);
      this.task_title = '';
      this.task_detail = '';
      this.closeModal();
      return;
    }
  }
}
</script>

<style scoped>
#left_main {
  width: 250px;
  min-height: 100vh;
  background-color: mintcream;
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
  margin: 2em;
}
/*select {*/
/*  font-size:1.1em;*/
/*  margin: 1em;*/
/*  padding: 0.5em;*/
/*  line-height: 1.5em;*/
/*  cursor: pointer;*/
/*  outline: none;*/
/*}*/

button {
  background-color: white;
  border-width: 1px;
}

.scale_change {
  font-size: 1.5em;
  padding: 0.2em;
}

.task_add_modal {
  line-height: 2em;
}

.task_add_button {
  padding: 0.2em;
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
