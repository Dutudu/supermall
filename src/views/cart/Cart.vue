<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center" class="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import cartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
//vuex里面的getters可以直接通过vuex拿到
//然后   ...mapGetters(['需要的计算属性名'])
//注意：这里名称一定为mapGetters
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    cartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // }
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  position: relative;
  z-index: 9;
}
.center {
  color: #fff;
  font-size: 20px;
}
</style>