export default {
  addCart(context, addProduct) {
    return new Promise((resolve, reject) => {
      //find方法返回第一个满足条件的数组里的数(item)
      //filter方法是返回全部满足条件的数组
      let product = context.state.cartList.find(item => item.iid === addProduct.iid)
      if (product) {
        context.commit("addCount", product)
        //利用promise判断是否加入购物车成功
        resolve('当前商品数量+1')
      } else {
        context.commit("addToCart", addProduct)
        resolve('添加了新的商品')
      }
    })
  }
}