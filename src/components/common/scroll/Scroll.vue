<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//better-scroll插件一定要类似这种结构才能用
/* <div class="wrapper">
    <div class="content"></div>
  </div> */
import BSroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BSroll(this.$refs.wrapper, {
      probeType: this.probeType,
      // 在better-scroll里面button可以点击，div要添加下面的属性才可以点击
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    if (this.probeType === 2 || this.probeType === 3) {
      //2.监听滚动的位置
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    //3.监听上拉事件
    this.pullUpLoad &&
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>


<style scoped>
/* 这里的scoped代表这里的样式只在这个组件起效果 */
</style>>
