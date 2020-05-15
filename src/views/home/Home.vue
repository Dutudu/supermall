<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      :title="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    ></tab-control>
    <scroll
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{fixed:isTabFixed}"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 组件不能监听点击，但是能加class名 -->
    <!-- 如果要监听逐渐后面要加native -->
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";
import { backTopMixin } from "common/mixin.js";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      type: ["pop", "new", "sell"],
      currentType: "pop",

      tabOffsetTop: null,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata(),
      //2.请求商品数据
      this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //3.监听图片加载完成
    //事件总线$bus
    //这里的$bus是在main.js里创建的Vue实例
    //用$on来监听事件
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //如果下一次的图片加载时间超过200ms，那么就会请求一次refresh
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局事件的监听
    // 通过$off来取消 dom.$off("事件名",相对应的函数)
  },
  methods: {
    /*
     *事件监听相关方法
     */
    //切记，子组件用$emit("tabClick",index)发送的事件，标签那
    //不用写参数，参数可直接在这拿到
    tabClick(index) {
      this.currentType = this.type[index];
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // this.$refs.tabControl.$el这个可以换取对应组件的dom元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
     *网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  mixins: [backTopMixin]
};
</script>

<style>
#home {
  /* 这里vh代表视口高度，viewheight */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.scroll-content {
  /* 这里'-'号两边记得加空格 */
  position: relative;
  height: calc(100% - 49px);
  overflow: hidden;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>