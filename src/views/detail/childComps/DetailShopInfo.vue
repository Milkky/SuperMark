<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="cshop.logo" alt="" />
      <span>{{cshop.name}}</span>
    </div>

    <div class="shop-middle">

      <div class="shop-middle-left">

        <div class="info-sells">
          <div class="sell-count">{{cshop.sells | sellCountFilter()}}</div>
          <div class="sell-text">总销量</div>
        </div>

        <div class="info-goods">
          <div class="goods-count">{{cshop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>

      </div>

      <div class="shop-middle-right">
        <table>
          <tr v-for="(item,index) in cshop.score" :key="index" >
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-high':item.isBetter}">{{item.score}}</td>
            <td class="evaluation" :class="{'eva-high':item.isBetter}">{{item.isBetter ? '高':'低'}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="shop-bottom">
      <div>进店看看</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",

    props:{
      cshop:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    /*过滤器*/
    filters:{
      sellCountFilter(value){
        if(value < 10000){
          return value
        }
        else{
          return (value/10000).toFixed(2) + '万'
        }
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding:25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top{
    display: flex;
    line-height: 45px;
    /*元素垂直中心对齐*/
    align-items: center;
  }

  .shop-top img{
    width:45px;
    height: 45px;
    border: 1px solid rgba(220,20,60,.5);
    border-radius: 50%;
  }

  .shop-top span{
    margin-left: 10px;
    vertical-align: center;
  }

  .shop-middle{
    display: flex;
  }

  /*左右flex居中布局*/
  .shop-middle-left,.shop-middle-right{
    flex:1;
  }

  .shop-middle-left{
    color: #333;
    border-right:1px solid rgba(0,0,0,.1);
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  .sell-count, .goods-count {
    font-size: 18px;
  }

  .sell-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right{
    font-size: 13px;
    color: #333;
  }

  /*设置table*/
  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .score{
    color: #5ea732;
  }

  /*设置高评分样式*/
  .score-high{
    color: #f13e3a;
  }

  .evaluation{
    color: #fff;
    background-color: #5ea732;
    text-align: center;
  }

  .eva-high{
    background-color: #f13e3a;
  }

  .shop-bottom{
    text-align: center;
    margin-top: 10px;
  }

  .shop-bottom div{
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    display: inline-block;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
