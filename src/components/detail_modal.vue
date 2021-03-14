<template>
  <MyModal class="detail_modal" @close="closeTaskDetailModal">
    <form>
    <span v-if="!isEdit" @click="edit()"><font-awesome-icon icon="edit" class="fa-lg"/></span>
    <p v-if="!isEdit">{{dispTaskTitle(detailTaskId)}}</p>
    <input type="text" id="taskTitle" name="taskTitle" v-if="isEdit" :value="dispTaskTitle(detailTaskId)" class="inputBox">
    <p v-if="!isEdit">{{dispTaskBeginDate(detailTaskId)}} - {{dispTaskEndDate(detailTaskId)}}</p>
    <input type="text" id="taskBegin" name="taskBegin" v-if="isEdit" :value="dispTaskBeginDate(detailTaskId)" class="inputBox">
    <input type="text" id="taskEnd" name="taskEnd" v-if="isEdit" :value="dispTaskEndDate(detailTaskId)" class="inputBox">
    <p v-if="!isEdit">{{dispTaskDetail(detailTaskId)}}</p>
    <textarea id="taskDetail" name="taskDetail" v-if="isEdit" :value="dispTaskDetail(detailTaskId)" class="inputBox"></textarea>
    <button type="button" v-if="isEdit" @click="update()" :disabled="noChange">更新</button>
    <button type="button" v-if="isEdit" @click="cancel()">キャンセル</button>
    </form>
  </MyModal>
</template>

<script>
import MyModal from './modal.vue'
import {mapState} from "vuex";
import dayjs from 'dayjs'
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
    // タスクの終了時間表示
    dispTaskEndDate(taskid){
      var endTimeId = Object.keys(this.$store.getters['mm/returnPaintId']).reduce( (r, key) => {
        return this.$store.getters['mm/returnPaintId'][key] === taskid ? key : r
      }, null);
      var endTime = dayjs(endTimeId).format('YYYY/MM/DD HH:') + endTimeId.slice(-2)
      return endTime
    },
    // タスクの詳細表示
    dispTaskDetail(taskid){
      return this.$store.getters['mm/returnDetail'][taskid];
    },
    edit(){
      this.isEdit = true;
    },
    // 入力情報をもとに更新
    update(){
      // api叩く
      // 各種stateの情報を更新する
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
  height: calc( 1em * 10 );
  line-height: 1em;
  padding: 4px;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  outline: none;
  font-size: 1.2em;
  margin: 0.5em;
  padding:0.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>