<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <!--放入到自定义封装的Scroll中-->
    <scroll ref="scroll"
            @scroll="contentScroll">
      <home-swiper :cbanners="banners"></home-swiper>
      <RecommendView :crecommends="recommends"></RecommendView>
      <feature-view />
      <tab-control :titles="tabTitles"
                   @a="tabClick"></tab-control>
      <goods-list :cgoods="showGoods"></goods-list>


      <ul>
        <li>1111</li>
        <li>1112</li>
        <li>1113</li>
        <li>1114</li>
        <li>1115</li>
        <li>1116</li>
        <li>1117</li>
        <li>1118</li>
        <li>1119</li>
        <li>11110</li>
        <li>11111</li>
        <li>11112</li>
        <li>11113</li>
        <li>11114</li>
        <li>11115</li>
        <li>11116</li>
        <li>11117</li>
        <li>11118</li>
        <li>11119</li>
        <li>11120</li>
        <li>11121</li>
        <li>11122</li>
        <li>11123</li>
        <li>11124</li>
        <li>11125</li>
        <li>11126</li>
        <li>11127</li>
        <li>11128</li>
        <li>11129</li>
        <li>11130</li>
        <li>11131</li>
        <li>11132</li>
        <li>11133</li>
        <li>11134</li>
        <li>11135</li>
        <li>11136</li>
        <li>11137</li>
        <li>11138</li>
        <li>11139</li>
        <li>11140</li>
        <li>11141</li>
        <li>11142</li>
        <li>11143</li>
        <li>11144</li>
        <li>11145</li>
        <li>11146</li>
        <li>11147</li>
        <li>11148</li>
        <li>11149</li>
        <li>11150</li>
      </ul>
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
        isShowBackTop:false
      }
    },

    /*组件创建时调用的生命周期函数*/
    created(){
      this.getHomeMultiDateDate()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
      },


      backTopClick(){
        this.$refs.scroll.scrollTo(0,0)
      },

      contentScroll(position){
        this.isShowBackTop = -(position.y) >1000
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
</style>
