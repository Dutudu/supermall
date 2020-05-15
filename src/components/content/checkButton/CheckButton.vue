<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.check-button {
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #aaa;
}
.check {
  border-color: red;
  background-color: red;
}
</style>