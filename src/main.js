import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

// css
import "assets/css/base.css";
import "assets/css/normalize.css"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//安装toast插件,然后他会调用toast里的install函数
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)


//使用vue懒加载
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')