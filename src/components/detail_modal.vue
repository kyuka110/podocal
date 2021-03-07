<template>
  <MyModal class="detail_modal" @close="closeTaskDetailModal">
    <p>{{dispTaskTitle(detailTaskId)}}</p>
    <p>{{dispTaskBeginDate(detailTaskId)}} - {{dispTaskEndDate(detailTaskId)}}</p>
    <p>{{dispTaskDetail(detailTaskId)}}</p>
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
  computed: {
    ...mapState('mm', ['detailTaskId']),
  },
  methods: {
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
  }
}
</script>

<style scoped>

.detail_modal {
  text-align: left;
}

.detail_modal p{
  margin: 0.7em;
}
</style>