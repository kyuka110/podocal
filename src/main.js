import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
library.add(faEdit, faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
