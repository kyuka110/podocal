<template>
  <div id="left_main">
    <h1>
      <img alt="podocal logo" id="podocal_logo" src="../assets/podocal.png">
      {{ msg }}
    </h1>
    <p>
      <select>
        <option value="day">日</option>
        <option value="week">週</option>
        <option value="month">月</option>
      </select>
      <span class="page_change">＜</span>
      <span class="page_change">＞</span>
    </p>
    <p>
      <button class="scale_change" v-on:click="plusClick">＋</button>
      <button class="scale_change" v-on:click="minusClick">－</button>
    </p>
      <button @click="onclick">API叩く</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
var URL = 'https://jxff6ecyn2.execute-api.ap-northeast-1.amazonaws.com/prod/getsingletask'

export default {
  name: 'left_column',
  props: {
    msg: String
  },
  computed: mapState(['zoom']),
  methods: {
    plusClick() {
      this.$store.commit('plusClick')
    },
    minusClick() {
      this.$store.commit('minusClick')
    },
    onclick: function() {
      this.$http(URL).then((response) => {
        return response.json()
      })
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

button {
  background-color: white;
  border-width: 1px;
}

.scale_change {
  font-size: 1.5em;
  padding: 0.2em;
}

h1 {
  line-height: 2.2;
  padding-bottom: 20px;
}
</style>
