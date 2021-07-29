import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import toast from 'components/common/toast'
import pay from 'components/common/pay'

Vue.config.productionTip = false


//安装toast插件
Vue.use(toast);
Vue.use(pay);

//解决移动端300ms延迟
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
