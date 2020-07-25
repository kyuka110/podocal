<template>
  <div id="left-main">
    <h1>
    <img alt="podocal logo" id="podocal_logo" src="../assets/podocal.png">
    {{ msg }}
    </h1>
    <h2>fugyofugyo</h2>
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

h1 {
  line-height: 2.2;
  padding-bottom: 20px;
}
</style>
