<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :ctopImages="topImages"></detail-swiper>
    <detail-base-info :cgoods="goods"></detail-base-info>
  </div>
</template>

<script>
  /*导入组件*/
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import  DetailBaseInfo from './childComps/DetailBaseInfo'


  /*导入js*/
  import {getGoodsDetail,Goods} from 'network/detail'

  export default {
    name: "Detail",

    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
  },

    data(){
      return{
        iid:null,
        /*存放轮播图照片*/
        topImages:[],
        goods:{}
      }
    },

    /*组件创建时自动请求网络数据*/
    created(){
      //console.log(this.$route)
      this.iid = this.$route.params.iid
      getGoodsDetail(this.iid).then(res =>{
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //console.log(this.topImages)

        /*获取商品信息*/
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        console.log(this.goods)

      })

    }

  }
</script>

<style scoped>

</style>
