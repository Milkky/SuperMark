/*定义一个请求网络，配置baseURL,创建axios实例*/

import axios from 'axios'


//导出一个请求函数,用户可以自定义传入一些配置
export function request(config) {
  /*创建axios实例*/
  const instance = new axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout:5000
  });



  /*请求拦截器*/
  instance.interceptors.request.use(config =>{
    //在发送请求前做什么
    return config
  },err =>{
    //在请求错误的时候做些什么
    console.log(err)
  })


//响应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })

/*返回axios实例*/
  return instance(config)


}



