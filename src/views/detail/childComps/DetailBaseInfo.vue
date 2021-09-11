<template>
  <div class="base-info" v-if="isCgoodsEmpty">
    <div class="info-title">{{cgoods.title}}</div>

    <div class="info-price">
      <span class="n-price">{{cgoods.newPrice}}</span>
      <span class="o-price">{{cgoods.oldPrice}}</span>
      <span class="discount" v-if="isEmpty">{{cgoods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{cgoods.columns[0]}}</span>
      <span>{{cgoods.columns[1]}}</span>
      <span>{{cgoods.services[cgoods.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span v-for="index in cgoods.services.length-1" class="info-service-item" :key="index">
        <img :src="cgoods.services[index].icon" alt="" />
        <span>{{cgoods.services[index].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",

    props:{
      cgoods:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    computed:{
      /*判断cgoods对象中是否有discount属性*/
      isEmpty(){
        if(this.cgoods.discount){
          return true
        }
        else{
          return false
        }
      },

      /*判断cgoods对象是否为空*/
      isCgoodsEmpty(){
        if(Object.keys(this.cgoods).length !== 0){
          return true
        }
        else{
          return false
        }
      }
    },
  }
</script>

<style scoped>
  .base-info{
    color: #999999;
    border-bottom: 5px solid #f2f5f8;
    margin-top: 15px;
    padding: 0 8px;
  }

  .info-title{
    color: #222222;
  }

  .info-price{
    margin-top: 10px;
  }

  .n-price{
    font-size:24px;
    color:var(--color-high-text)
  }

  .o-price{
    font-size:13px;
    text-decoration: line-through;
    margin-left: 5px;
  }

  .discount{
    font-size:12px;
    color: #ffffff;
    background-color:var(--color-high-text);
    margin-left: 5px;
    border-radius: 5px;
    padding: 2px 5px;

    /*对元素进行微调，使用相对定位*/
    position: relative;
    top:-5px;
  }

  .info-other{
    font-size: 13px;
    border-bottom: 1px solid rgba(100 100 100 0.1);
    display: flex;
    line-height: 30px;
    justify-content: space-between;
  }

  /*.info-other span{
    flex:1;
    text-align: center;
  }*/

  .info-service{
    display: flex;
    line-height: 60px;
    justify-content: space-between;
  }


  .info-service-item img{
    width: 14px;
    height:14px;
    /*对元素进行微调，使用相对定位*/
    position: relative;
    top:2px;
  }

  .info-service-item span{
    font-size: 12px;
    color:#333;
  }
</style>
