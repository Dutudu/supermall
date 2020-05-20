import Vue from 'vue'
import VueRouter from 'vue-router'


const home = () => import('views/home/Home')
const cart = () => import('views/cart/Cart')
const profile = () => import('views/profile/Profile')
const category = () => import('views/category/Category')
const detail = () => import('views/detail/Detail')
Vue.use(VueRouter)
const routes = [
{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  component: home
}, {
  path: '/cart',
  component: cart
}, {
  path: '/category',
  component: category
}, {
  path: '/profile',
  component: profile
}, {
  name: "detail",
  path: '/detail/:iid',
  component: detail
}]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router