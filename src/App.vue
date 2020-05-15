<template>
  <div id="app">
    <!-- 大写之间用‘-’连接 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
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
</style>
