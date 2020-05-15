<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  //   props: {
  //     message: {
  //       type: String,
  //       default: ""
  //     },
  //     show: {
  //       type: Boolean,
  //       default: false
  //     },
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = "默认文字", time = 1000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, time);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
  z-index: 999;
}
</style>