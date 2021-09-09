<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <!--tab-control吸顶效果-->
    <tab-control :titles="tabTitles"
                 ref="tabControl1"
                 v-show="isFixed"
                 class="tabControl1"
                 @a="tabClick">
    </tab-control>

    <!--放入到自定义封装的Scroll中-->
    <scroll ref="scroll"
            :probeType="3"
            :pullUpLoad="true"
            @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swiper :cbanners="banners"
                   @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <RecommendView :crecommends="recommends"></RecommendView>
      <feature-view />
      <tab-control :titles="tabTitles"
                   ref="tabControl2"
                   @a="tabClick">
      </tab-control>
      <goods-list :cgoods="showGoods"></goods-list>
    </scroll>
    <!--组件默认不可点击，需要加修饰符：native-->
    <back-top @click.native="backTopClick"
              v-show="isShowBackTop"></back-top>


  </div>
</template>

<script>
   /*导入组件*/
   import NavBar from 'components/common/navbar/NavBar'
   import HomeSwiper from './childComps/HomeSwiper'
   import RecommendView from './childComps/RecommendView'
   import FeatureView from './childComps/FeatureView'
   import TabControl from 'components/contents/TabControl'
   import GoodsList from 'components/contents/goods/GoodsList'
   import Scroll from 'components/common/scroll/Scroll'
   import backTop from 'components/contents/backTop'


   /*导入js*/
   import {getHomeMultiDate,getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      backTop
    },

    data(){
      return{
        /*存放横幅照片数组*/
        banners:[],
        recommends:[],
        tabTitles:['流行','新款','精选'],

        /*保存商品的数据结构，比较复杂*/
        goods:{
          //有3种类型
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isFixed:false,
        saveY:0
      }
    },

    /*在组件keep-alive下，组件不会频繁创建*/
    /*1.当组件离开时保存一下Y值*/
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },

    /*2.组件活跃时重新赋为Y值*/
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      /*重新调用refresh()*/
      this.$refs.scroll.refresh()
    },

    /*组件创建时调用的生命周期函数*/
    created(){
      this.getHomeMultiDateDate()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    /*在组件模板渲染完成后执行*/
    mounted(){
      /*接受GoodListItem发来的事件,在进行回调函数*/
      this.$bus.$on('itemImageLoad',() =>{
        //console.log('图片加载完毕---！')
        /*此时获取scroll对象进行刷新*/
      this.$refs.scroll.refresh()
      })

    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },

    },

    methods:{
      //定义网络请求方法
      /*1.首页多元数据请求*/
      getHomeMultiDateDate(){
        getHomeMultiDate().then(res =>{
          //console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },

      /*2.首页商品数据请求*/
      //该函数需要传入一种类型参数
      getHomeGoods(type){

        const page = this.goods[type].page +1
        getHomeGoods(type,page).then(res =>{
        //console.log(res)
        //往原有数组中添加元素
        this.goods[type].list.push(...res.data.list)
        //默认page为0，需要+1
        this.goods[type].page += 1

          /*完成上拉加载更多*/
        this.$refs.scroll.finishPullUp()
      })

      },



      //定义事件监听事件
      tabClick(index) {
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },


      backTopClick(){
        this.$refs.scroll.scrollTo(0,0)
      },

      /*内容滚动位置监听*/
      contentScroll(position){
        this.isShowBackTop = -(position.y) >1000

        this.isFixed = -(position.y) > this.tabOffsetTop
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad(){
        /*访问组件元素：$el*/
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        //console.log(this.tabOffsetTop)
      }
    }

  }
</script>

<style scoped>
  #home{
    /*vh:view-height（视图高度）*/
    height: 100vh;
    position: relative;
  }

  .home-nav-bar{
    color:#fff;
    background-color: var(--color-tint);

    /*position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;*/
  }


  .tabControl1{
    position: relative;
    z-index: 9;
    background-color: #999999;
  }
</style>
