<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" @load="imageLoad" /> -->
    <!-- 下面使用vue-lazyload -->
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    imageLoad() {
      //这里的$bus是在main.js里创建的Vue实例，Vue实例可以发送事件
      if (this.$route.path.indexOf("/home") !== -1) {
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("/detail") !== -1) {
        this.$bus.$emit("detailImageLoad");
      } else if (this.$route.path.indexOf("/category") !== -1) {
        this.$bus.$emit("categoryImageLoad");
      }
    },
    itemClick() {
      // this.$router.push("/detail/" + this.goodsItem.iid);
      this.$router.push({
        name: "detail",
        params: {
          iid: this.goodsItem.iid
        }
      });
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 47%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
  margin: 5px 0;
}
.goods-info p {
  width: 100%;
  height: 18px;
  overflow: hidden;
}
.goods-info .price {
  color: var(--color-high-text);
}
.goods-info .price::after {
  content: "";
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px;
}
</style>