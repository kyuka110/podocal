<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <left_column msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import left_column from './components/left_column.vue'
// import right_column from './components/right_column.vue'

export default {
  name: 'App',
  components: {
    left_column,
    // right_column
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
