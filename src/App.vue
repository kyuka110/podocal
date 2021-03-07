<template>
  <div id="app">
    <left_column msg="podocal"/>
    <right_column/>
  </div>
</template>

<script>
import left_column from './components/left_column.vue'
import right_column from './components/right_column.vue'
import axios from "axios";
export default {
  name: 'App',
  components: {
    left_column,
    right_column
  },
  beforeCreate() {
    // タスク取得
    axios.get('https://jxff6ecyn2.execute-api.ap-northeast-1.amazonaws.com/prod/getsingletask')
        .then(response => {
          for(var i = 0; i < response.data.body.length; i++){
            this.calPaintId(response.data['body'][i]['unix_start_time'], response.data['body'][i]['unix_end_time'], response.data['body'][i]['id']);
            this.$store.commit('mm/addTask', {
              taskid: response.data['body'][i]['id'],
              title: response.data['body'][i]['title'],
              detail: response.data['body'][i]['detail'],
              first: this.calTaskTitleTime(response.data['body'][i]['unix_start_time'])
            })
          }
        })
        .catch((reason) => {
          console.log(reason.message)
        })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border-color: #424242;
  display: flex;
}
</style>
