import axios from "axios"

export function request(config) {
  //1.创建axios实例
  const instance1 = axios.create({
    baseURL: "http://152.136.185.210:8000/api/n3",
    timeout: 5000
  })
  //2.axios的拦截器
  //2.1请求拦截
  // instance1.interceptors.request.use(res => {
  //   // console.log(res);
  //   return res; //拦截后需要返回不然，后面的就接受不到了

  // }, err => { //请求拦截失败
  //   return err

  // })
  //2.2响应结果拦截
  instance1.interceptors.response.use(res => {
    //响应拦截一般是拿来过滤数据，一般只需要返回res.data
    return res.data //拦截后需要返回不然，后面的就接受不到了
  }, err => {
    // console.log('拦截失败');
    // return err

  })
  //3.发送真正的网络请求
  return instance1(config)

}