<template>
  <div class="goods-rate">
    <div class="content" v-for="item in cgoodsRate.list">
      <span>{{item.content}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsRate",
    props:{
      cgoodsRate:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
