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

export function getGoodsRecommend() {
  return request({
    url:'./recommend'
  })
}

/*导出类
* ES6定义类class
* */

/*定义商品详情对象*/
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


/*定义店铺信息对象*/
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

/*定义参数信息对象*/
export  class Param{
  constructor(info,rule){
    this.infos = info.set;
    this.sizes = rule.tables;
    /*images可能没有*/
    this.image = info.images ? info.image[0] : ''
  }
}
