export default {
  //mutations里面最好放一种结果的函数，如果是多种操作结果
  //的函数，devtool就会跟踪不准确，因此把多种操作结果的
  //放到actions里面比较好
  addCount(state, product) {
    product.count++
  },
  addToCart(state, product) {
    product.count = 1
    product.checked = true
    state.cartList.push(product)
  }
}