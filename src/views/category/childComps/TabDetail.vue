<template>
  <div class="tab-detail">
    <good-list-item
      class="good-item"
      v-for="(item,index) in categoryDetail"
      :key="index"
      :goodsItem="item"
    ></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "components/content/goods/GoodsListItem";
export default {
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodListItem
  }
};
</script>

<style scoped>
.tab-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.good-item {
  margin-top: 5px;
}
</style>