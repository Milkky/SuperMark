<template>
  <div class="goods">
    <goods-list-item v-for="item in cgoods"
                      :goods-item = item>
    </goods-list-item>
  </div>
</template>

<script>

  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },

    props:{
      cgoods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap:wrap;
    /*项目位于各行之前、之间、之后都留有空白的容器内*/
    justify-content: space-around;

    padding: 2px;
  }
</style>
