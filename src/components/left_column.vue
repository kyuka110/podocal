<template>
  <div id="left-main">
    <h1>
    <img alt="podocal logo" id="podocal_logo" src="../assets/podocal.png">
    {{ msg }}
    </h1>
    <select>
      <option value="day">日</option>
      <option value="week">週</option>
      <option value="month">月</option>
    </select>
    <span class="page_change">＜</span>
    <span class="page_change">＞</span>
  </div>
</template>

<script>
export default {
  name: 'left_column',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left-main {
  width: 250px;
  min-height: 100vh;
  background-color: mintcream;
}

#podocal_logo {
  height:50px;
  vertical-align: middle;
}

select {
  font-size:1.1em;
  margin: 1em;
  padding: 0.5em;
  line-height: 1.5em;
  cursor: pointer;
  outline: none;
}

.page_change {
  margin: 0.5em;
}

h1 {
  line-height: 2.2;
  padding-bottom: 20px;
}
</style>
