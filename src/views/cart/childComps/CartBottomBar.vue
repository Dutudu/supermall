<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：￥{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      console.log(555);

      if (this.isSelectAll) {
        //如果已经全部选中，那么点一次就全不选
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买商品", 1000);
      }
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((preValue, item) => item.price * item.count + preValue, 0)
        .toFixed(2);
    },
    checkLength() {
      //   return this.$store.state.cartList.filter(item => item.checked).length;
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((pre, item) => {
          return item.count + pre;
        }, 0);
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      //如果有一个是没选中的，就返回false
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  padding-left: 10px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
}
.calculate {
  margin-left: auto;
  background-color: red;
  color: #fff;
  padding: 0 10px;
}
</style>