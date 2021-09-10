<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"></detail-nav-bar>

    <!--引用滚动组件-->
    <scroll class="scroll-wrapper" ref="scroll">
      <detail-swiper :ctopImages="topImages"></detail-swiper>
      <detail-base-info :cgoods="goods"></detail-base-info>
      <detail-shop-info :cshop="shop"></detail-shop-info>
      <detail-goods-info :cgoodslInfo="goodsDetailInfo"
                          @displayImgLoad="imgLoad">
      </detail-goods-info>
    </scroll>



    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  /*导入组件*/
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import  DetailBaseInfo from './childComps/DetailBaseInfo'
  import  DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'


  /*导入函数或类*/
  import {getGoodsDetail,Goods,Shop} from 'network/detail'

  export default {
    name: "Detail",

    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo
  },

    data(){
      return{
        iid:null,
        /*存放轮播图照片*/
        topImages:[],
        goods:{},
        shop:{},
        goodsDetailInfo:{}
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
        //console.log(this.goods)

        /*获取店铺信息*/
        this.shop = new Shop(data.shopInfo)
        //console.log(this.shop)

        /*请求商品详细数据*/
        this.goodsDetailInfo = data.detailInfo
        console.log(this.goodsDetailInfo)
      })

    },
    
    methods:{
      /*监听事件*/
      imgLoad(){
        console.log('图片加载完成')
        this.$refs.scroll.refresh()
      }
    }

  }
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
  }

  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .scroll-wrapper{
    /*1.计算高度方法*/
    height:calc(100% - 93px);
  }
</style>
