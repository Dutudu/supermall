<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item,index) in categories"
        :key="index"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  props: {
    categories: Array
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  }
};
</script>

<style scoped>
#tab-menu {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
  width: 100px;
  background-color: #f6f6f6;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.menu-list-item.active {
  border-left: 3px solid var(--color-high-text);
  font-weight: bolder;
  color: var(--color-high-text);
  background-color: #fff;
}
</style>