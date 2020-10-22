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
        <label>開始日時：<input type="datetime-local"></label><br>
        <label>終了日時：<input type="datetime-local"></label><br>
        <textarea placeholder="詳細" maxlength="10000" v-model="task_detail" cols="50" rows="10"></textarea>
        <template slot="footer">
          <button class="enter_task" @click="doSend">決定</button>
        </template>
      </MyModal>
    </div>
  </div>
</template>

<script>
import MyModal from './MyModal.vue'
import {mapState} from 'vuex'

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
      if (this.title.length > 0) {
        alert(this.title)
        this.title = ''
        this.closeModal()
      } else {
        alert('メッセージを入力してください')
      }
    }
  },
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
