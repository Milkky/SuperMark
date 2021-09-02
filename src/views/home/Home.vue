<template>
  <div>
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <home-swiper :cbanners="banners"></home-swiper>
    <RecommendView :crecommends="recommends"></RecommendView>
  </div>
</template>

<script>
   /*导入组件*/
   import NavBar from 'components/common/navbar/NavBar'
   import HomeSwiper from './childComps/HomeSwiper'
   import RecommendView from './childComps/RecommendView'


   /*导入js*/
   import {getHomeMultiDate} from 'network/home'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },

    data(){
      return{
        /*存放横幅照片数组*/
        banners:[],
        recommends:[]
      }
    },

    /*组件创建时调用的生命周期函数*/
    created(){
      this.getHomeDate()
    },


    methods:{
      /*定义网络请求方法*/
      getHomeDate(){
        getHomeMultiDate().then(res =>{
          console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list

        })
      }
    }

  }
</script>

<style scoped>

  .home-nav-bar{
    color:#fff;
    background-color: var(--color-tint);

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动,但是固定后会脱离标准流，会让后面的元素顶上来
      ，所以我就注释掉了*/
    /*position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;*/
  }
</style>
