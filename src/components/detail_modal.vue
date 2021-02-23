<template>
  <div>
    <button @click="openTaskDetailModal">詳細画面表示</button>
    <MyModal class="detail_modal" @close="closeTaskDetailModal" v-if="task_detail_modal">
      <p>{{dispTaskTitle(6)}}</p>
      <p>{{dispTaskBeginDate(6)}}</p>
      <p>{{dispTaskDetail(4)}}</p>
    </MyModal>
  </div>
</template>

<script>
import MyModal from './modal.vue'
export default {
  components: {
    MyModal
  },
  name: 'detail_modal',
  props: {
  },
  data() {
    return {
      task_detail_modal: false,
    }
  },
  computed: {
  },
  methods: {
    openTaskDetailModal() {
      this.task_detail_modal = true
    },
    closeTaskDetailModal() {
      this.task_detail_modal = false
    },
    // タスクのタイトル表示
    dispTaskTitle(checkId){
        return this.$store.getters['mm/returnTitle'][checkId];
    },
    // タスクの開始時間表示
    dispTaskBeginDate(checkId){
      return this.$store.getters['mm/returnFirst'][checkId];
    },
    // タスクの終了時間表示
    // dispTaskEndDate(checkId){
    //   return this.$store.getters['mm/returnTitle'][checkId];
    // },
    // タスクの詳細表示
    dispTaskDetail(checkId){
      return this.$store.getters['mm/returnDetail'][checkId];
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