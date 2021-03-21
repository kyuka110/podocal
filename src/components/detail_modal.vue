<template>
  <MyModal class="detail_modal" @close="closeTaskDetailModal">
    <form>
    <span v-if="!isEdit" @click="edit()"><font-awesome-icon icon="edit" class="fa-lg"/></span>
    <span v-if="!isEdit"><font-awesome-icon icon="trash-alt" class="fa-lg"/></span>
    <p v-if="!isEdit">{{dispTaskTitle(detailTaskId)}}</p>
    <input type="text" id="taskTitle" name="taskTitle" v-if="isEdit" v-model="task_title" class="inputBox">
    <p v-if="!isEdit">{{dispTaskBeginDate(detailTaskId)}} - {{dispTaskEndDate(detailTaskId)}}</p>
    <vue-ctk-date-time-picker
        v-if="isEdit" id="begin" label="開始時刻" :noClearButton="true"
        v-model="task_start_time" :minute-interval="15"
        :overray="true" :format="'YYYY-MM-DD HH:mm'">
    </vue-ctk-date-time-picker>
    <vue-ctk-date-time-picker
        v-if="isEdit" id="end" label="終了時刻" :noClearButton="true"
        v-model="task_end_time" :minute-interval="15"
        :overray="true" :format="'YYYY-MM-DD HH:mm'">
    </vue-ctk-date-time-picker>
    <p v-if="!isEdit">{{dispTaskDetail(detailTaskId)}}</p>
    <textarea id="taskDetail" name="taskDetail" v-if="isEdit" v-model="task_detail" class="inputBox"></textarea>
    <button type="button" v-if="isEdit" @click="update()" :disabled="noChange">更新</button>
    <button type="button" v-if="isEdit" @click="cancel()">キャンセル</button>
    </form>
  </MyModal>
</template>

<script>
import MyModal from './modal.vue'
import {mapState} from "vuex";
import dayjs from 'dayjs'
import axios from "axios";
export default {
  components: {
    MyModal
  },
  name: 'detail_modal',
  props: {
  },
  data () {
    return {
      isEdit: false,
      task_title: '',
      task_detail: '',
      task_start_time: '',
      task_end_time: '',
    }
  },
  computed: {
    ...mapState('mm', ['detailTaskId']),
    noChange() {
      return !(this.isEdit);
    }
  },
  methods: {
    // モーダルを閉じる
    closeTaskDetailModal() {
      this.$store.commit('mm/isDispDetailModal', {isOpen: false})
    },
    // タスクのタイトル表示
    dispTaskTitle(taskid){
        return this.$store.getters['mm/returnTitle'][taskid];
    },
    // タスクの開始時間表示
    dispTaskBeginDate(taskid){
      var beginTimeId = this.$store.getters['mm/returnFirst'][taskid];
      var beginTime = dayjs(beginTimeId).format('YYYY/MM/DD HH:') + beginTimeId.slice(-2)
      return beginTime
    },
    // 開始時間表示datatime-localの初期値用
    dataTimeLocalBegin(taskid){
      var beginTimeId = this.$store.getters['mm/returnFirst'][taskid];
      var beginTime = dayjs(beginTimeId).format('YYYY-MM-DDTHH:') + beginTimeId.slice(-2) + ':00'
      return beginTime
    },
    // タスクの終了時間表示
    dispTaskEndDate(taskid){
      var endTimeId = Object.keys(this.$store.getters['mm/returnPaintId']).reduce( (r, key) => {
        return this.$store.getters['mm/returnPaintId'][key] === taskid ? key : r
      }, null);
      var endTime = dayjs(endTimeId).format('YYYY/MM/DD HH:') + String(Number(endTimeId.slice(-2)) + 15)
      return endTime
    },
    // 終了時間表示datatime-localの初期値用
    dataTimeLocalEnd(taskid){
      var endTimeId = Object.keys(this.$store.getters['mm/returnPaintId']).reduce( (r, key) => {
        return this.$store.getters['mm/returnPaintId'][key] === taskid ? key : r
      }, null);
      var endTime = dayjs(endTimeId).format('YYYY-MM-DDTHH:') + String(Number(endTimeId.slice(-2)) + 15) + ':00'
      return endTime
    },
    // タスクの詳細表示
    dispTaskDetail(taskid){
      return this.$store.getters['mm/returnDetail'][taskid];
    },
    edit(){
      this.isEdit = true;
      this.task_title = this.dispTaskTitle(this.detailTaskId),
      this.task_detail = this.dispTaskDetail(this.detailTaskId),
      this.task_start_time = this.dataTimeLocalBegin(this.detailTaskId),
      this.task_end_time = this.dataTimeLocalEnd(this.detailTaskId)
    },
    // 入力情報をもとに更新
    update(){
      axios.get('https://ntny99vg0e.execute-api.ap-northeast-1.amazonaws.com/prod/updateSingleTask', {
        params: {
          id: this.detailTaskId,
          title: this.task_title,
          unix_start_time: dayjs(this.task_start_time).unix(),
          unix_end_time: dayjs(this.task_end_time).unix(),
          detail: this.task_detail
        }
      });
      this.$store.commit('mm/addTask', {
        taskid: this.detailTaskId,
        title: this.task_title,
        detail: this.task_detail,
        first: dayjs(this.task_start_time)
      })
      alert('更新しました')
      return
    },
    cancel() {
      this.isEdit = false;
    }
  }
}
</script>

<style scoped>

.detail_modal p{
  text-align: left;
}

span{
  float: right;
  margin: 0 0.5em;
}

.detail_modal p{
  margin: 0.7em;
}

#taskTitle {
  width: 100%
}

#taskDetail {
  width: 100%
}

input[type=text]{
  font-size: 1.2em;
  padding: 3px;
  margin-bottom: 25px;
}

.inputBox {
  font-size: 1.2em;
}

textarea {
  height: calc( 1em * 20 );
  line-height: 1em;
  margin-top: 25px;
  padding: 4px;

}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  outline: none;
  font-size: 1.2em;
  margin: 0.5em 0.5em 1em 0.5em;
  padding:0.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>