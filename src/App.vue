<template>
  <div id="app">
    <!-- 大写之间用‘-’连接 -->
    <router-view></router-view>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
export default {
  name: "App",
  components: {
    MainTabbar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
