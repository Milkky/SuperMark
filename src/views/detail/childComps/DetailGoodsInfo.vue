<template>
  <div class="goods-info" v-if="isEmpty">

    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{cgoodslInfo.desc}}</div>
      <div class="end"></div>
    </div>

    <div v-for="itemA in cgoodslInfo.detailImage">
      <div class="info-key">{{itemA.key}}</div>
      <div class="info-list">
        <!--绑定key的作用主要是为了高效的更新虚拟DOM-->
        <img :src="item"
             v-for="(item,index) in itemA.list"
             :key="index"
             @load="imgLoad"
             alt="" />
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",

    props:{
      cgoodslInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    computed:{
      isEmpty(){
        if(Object.keys(this.cgoodslInfo).length !== 0){
          return true
        }
        else{
          return false
        }
      }
    },

    data(){
      return{
        count:0,
        imagesLength:0
      }
    },

    methods:{
      imgLoad() {
        this.count++
        if(this.count === this.imagesLength){
          this.$emit('displayImgLoad')
        }
      }
    },

    watch:{
      /*获取图片个数
      * watch监视cgoodslInfo对象，当图片完全加载成功时，把值赋给imagesLength
      * */
      cgoodslInfo(){
        this.imagesLength = this.cgoodslInfo.detailImage[0].list.length
        console.log(this.imagesLength)
      }
    }
  }
</script>

<style scoped>
  .goods-info{
    padding:20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc{
    padding:0 15px;
  }

  .desc{
    font-size: 16px;
    padding: 15px 0;
  }

  .start,.end{
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;

    /*因为需要在他们前面和后面加伪元素，要对其相对定位*/
    position: relative;
  }

  .start{
    float:left;
  }

  .end{
    float:right;
  }

  .start::before,.end::after{
    width: 5px;
    height: 5px;
    background-color: #333;
    content: '';
    position: absolute;
    bottom: 0;
  }

  .end::after{
    right: 0;
  }

  .info-key{
    color: #333;
    font-size: 16px;
    margin: 10px 0 10px 15px;
  }

  .info-list img{
    width: 100%;
  }
</style>
