<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swipper :topImages="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwipper from "./childComps/DetailSwipper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";
import { backTopMixin } from "common/mixin.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: null,
      message: ""
      // show: false
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取数据
      const data = res.result;

      //2.获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;
      //3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //5.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //6.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  components: {
    DetailNavBar,
    DetailSwipper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
    // Toast
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      //这里我们选择图片加载完后再进行获取高度
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //多加一个最大值，便于后面的判断
      this.themeTopYs.push(Number.MAX_VALUE);
      //页面   DOM渲染完后   会回调一次this.$nextTick里的回调函数
      // this.$nextTick(() => { });
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //这里的postion位置是在scroll组件里的位置
      let length = this.themeTopYs.length;
      const positionY = -position.y;

      for (let i = 0; i < length - 1; i++) {
        //不同的位置获得不同的index
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = positionY > 1000;
    },
    addToCart() {
      //1.获取购物车需要展示的东西
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // product.count = this.count;
      // 2.将商品添加到购物车里面
      //不要直接修改state，最好通过mutations修改
      //调用mutations里的方法用commit
      //调用actions里的方法调用dispatch
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 500);
        this.$toast.show(res, 800);
      });
      // console.log(this.$store.state.cartList);
      //3.添加到购物车成功
    }
  },
  mixins: [backTopMixin]
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: relative;
  height: calc(100vh - 44px - 49px);
}
</style>