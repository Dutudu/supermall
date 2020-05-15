import Vue from 'vue'
import Vuex from 'vuex'

//导入export default的js文件不用加{}
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
//1.安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
  isCheckAll: true
}
//2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
//3.挂载到Vue实例中
export default store