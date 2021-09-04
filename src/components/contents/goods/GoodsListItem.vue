<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt=""
          @load="imgLoad"/>
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    methods:{
      /*滚动到底部会出现BUG
      * 1.scroll对象中的scrollHeight(可滚动高度没有及时更新-->和图片加载有关)
      * 2.所以要在这里监听图片加载完成
      * 3.而该组件和Home组件不存在父子关系，这里用事件总线方法
      * */
      imgLoad() {
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width:48%;
    position: relative;
    padding-bottom: 40px;
    /*border: 2px dashed red;*/
  }
  .goods-item img{
    width:100%;
    /*图片圆角和加边框*/
    border-radius: 5px;
    border:2px solid firebrick;
  }

  .good-info{
    font-size:16px;
    /*商品信息展示用绝对定位，父元素要用相对定位*/
    position: absolute;
    left:0;
    right: 0;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
    /*border: 2px dashed wheat;*/
  }

  .good-info p{
    /*不换行，超出部分显示...*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .good-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .good-info .collect {
    position: relative;
  }

  /*前面添加伪元素*/
  .good-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/common/collect.svg') 0 0/14px 14px
  }

</style>
