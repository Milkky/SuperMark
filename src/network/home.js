/*创建专门用于请求home数据*/


//导入request
import {request} from './request'



/*导出首页多元数据函数,该函数返回一个Promise对象*/
export function getHomeMultiDate() {
  return request({
    url:'/home/multidata'
  })
}


/*请求首页商品数据（分类处理）*/
export function getHomeGoods(type,page) {
  return request({
    /*
    * /home/data?type=pop&page=1
    * */
    url:'/home/data',
    params:{type,page}
  })
}

