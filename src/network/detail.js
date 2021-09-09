/*获取商品数据网络请求*/

import {request} from './request'

export function getGoodsDetail(iid) {
  return request({
    /*
    * /detail?iid='值'
    * */
    url:'./detail',
    params:{
      iid
    }
  })
}

/*导出类
* ES6定义类class
* */
export class Goods{
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
