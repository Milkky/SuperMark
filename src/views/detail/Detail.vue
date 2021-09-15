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
      <detail-recommend></detail-recommend>

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
  import DetailRecommend from './childComps/DetailRecommend'


  /*导入函数或类*/
  import {getGoodsDetail,getGoodsRecommend,Goods,Shop,Param} from 'network/detail'

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
      DetailGoodsRate,
      DetailRecommend
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
        goodsRate:{},
        recommendList:[],
      }
    },

    /*组件创建时自动请求网络数据*/
    created(){
      //console.log(this.$route)
      //获取iid
      this.iid = this.$route.params.iid

      //获取商品信息
      this.getGoodsDetail()

      //获取推荐信息
      getGoodsRecommend().then(res =>{
        this.recommendList = res.data.list;
        console.log(this.recommendList)
      })
    },
    
    methods:{
      /*监听事件*/
      imgLoad(){
        //console.log('图片加载完成')
        this.$refs.scroll.refresh()
      },

      /*获取商品信息*/
      getGoodsDetail(){
        getGoodsDetail(this.iid).then(res =>{
          const data = res.result
          this.topImages = data.itemInfo.topImages

          /*获取商品信息*/
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          /*获取店铺信息*/
          this.shop = new Shop(data.shopInfo)

          /*请求商品详细数据*/
          this.goodsDetailInfo = data.detailInfo

          /*获取商品参数数据*/
          this.goodsParam = new Param(data.itemParams.info,data.itemParams.rule)

          /*商品评论数据*/
          this.goodsRate = data.rate

        }).catch(err =>{
          console.log('Whoops,something bad happened~');
        })
      }
    }

  }
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
    z-index: 9;
  }

  .nav-bar{
    position: relative;
    background-color: white;
  }

  .scroll-wrapper{
    /*1.计算高度方法*/
    background-color: white;
    height:calc(100% - 44px);
    overflow: hidden;
  }
</style>
