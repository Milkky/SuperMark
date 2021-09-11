<template>
  <div class="param-info" v-if="Object.keys(cgoodsParam).length !== 0">
    <table class="info-size"
           v-for="(table,index) in cgoodsParam.sizes"
           :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="item in cgoodsParam.infos">
        <td class="param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>

    <div class="info-img">
      <img :src="cgoodsParam.image" alt=""/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",

    props:{
      cgoodsParam:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info{
    /*设置内边距*/
    padding: 20px 15px;
    font-size:15px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table{
    width: 100%;
    border-collapse:collapse;
  }

  .param-info table tr{
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.5);
  }

  .info-param {
    border-top: 1px dashed rgba(134,17,17,.8);
  }

  .param-key{
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
