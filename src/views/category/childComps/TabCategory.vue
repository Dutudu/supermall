<template>
  <div class="tabcategoty">
    <div class="item" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt class="item-img" />
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.tabcategoty {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.item {
  flex: 28%;
  text-align: center;
  margin: 15px 0 0;
}
.item .item-img {
  width: 64.8px;
  height: 64.8px;
}
.item .item-text {
  margin-top: 10px;
  font-size: 13px;
}
</style>