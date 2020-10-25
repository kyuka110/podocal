<template>
  <div id="app">
    <left_column msg="podocal"/>
    <right_column/>
  </div>
</template>

<script>
import left_column from './components/left_column.vue'
import right_column from './components/right_column.vue'
export default {
  name: 'App',
  components: {
    left_column,
    right_column
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
