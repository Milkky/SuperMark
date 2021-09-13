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
      <detail-param-info :cgoodsParam="goodsParam"></detail-param-info>
      <detail-goods-rate :cgoodsRate="goodsRate"></detail-goods-rate>

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
    </scroll>




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
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailGoodsRate from './childComps/DetailGoodsRate'


  /*导入函数或类*/
  import {getGoodsDetail,Goods,Shop,Param} from 'network/detail'

  export default {
    name: "Detail",

    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailGoodsRate
  },

    data(){
      return{
        iid:null,
        /*存放轮播图照片*/
        topImages:[],
        goods:{},
        shop:{},
        goodsDetailInfo:{},
        goodsParam:{},
        goodsRate:{}
      }
    },

    /*组件创建时自动请求网络数据*/
    created(){
      //console.log(this.$route)
      this.iid = this.$route.params.iid
      getGoodsDetail(this.iid).then(res =>{
        const data = res.result
        //console.log(data)
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
        //console.log(this.goodsDetailInfo)

        /*获取商品参数数据*/
        this.goodsParam = new Param(data.itemParams.info,data.itemParams.rule)
        //console.log(this.goodsParam)

        /*商品评论数据*/
        this.goodsRate = data.rate
        console.log(this.goodsRate)
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
