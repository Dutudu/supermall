<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <span slot="center">商品分类</span>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="scroll-content" ref="scroll">
        <div>
          <tab-category :subcategories="showSubcategory"></tab-category>
          <tab-control class="tab-control" :title="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <tab-detail :categoryDetail="showCategoryDetail"></tab-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import Scroll from "components/common/scroll/Scroll";
import TabCategory from "./childComps/TabCategory";
import TabDetail from "./childComps/TabDetail";
import TabControl from "components/content/TabControl/TabControl";

import { tabControlMixin } from "common/mixin";
import { debounce } from "common/utils.js";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabCategory,
    TabDetail,
    TabControl
  },
  data() {
    return {
      categories: [],
      categoryData: [],
      currentIndex: -1
    };
  },
  created() {
    // 1.请求分类数据
    this.getCategory();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    this.$bus.$on("categoryImageLoad", () => {
      refresh();
    });
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      // console.log(this.currentType);

      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        //1.获取分类数据
        // console.log(res);

        this.categories = res.data.category.list;

        //2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        //3.请求第一个分类的数据
        this.getSubcategories(0);
      });
    },
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubCategory(mailKey).then(res => {
        // console.log(res);

        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },
    getCategoryDetail(type) {
      //1.获取请求的minWallkey
      const miniWallKey = this.categories[this.currentIndex].miniWallkey;
      //2.发送请求，传入miniWallKey和type
      getCategoryDetail(miniWallKey, type).then(res => {
        //3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
        // console.log(this.categoryData);
      });
    },

    //事件相关方法
    selectItem(index) {
      this.getSubcategories(index);
    }
  },
  mixins: [tabControlMixin]
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}
.content {
  display: flex;
}
.scroll-content {
  height: calc(100vh - 44px - 49px);
  flex: 1;
}
.tab-control {
  margin-top: 10px;
}
</style>