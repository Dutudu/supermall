import BackTop from "components/content/BackTop/BackTop";

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      // better-scroll有个scrollTo方法，能滑到指定位置，最后面的是滑动时间
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: 'sell',
      titles: ["pop", "new", "sell"]
    }
  },
  methods: {
    tabClick(index) {
      this.currentType = this.titles[index]
      // console.log(this.currentType);

    }
  }
}