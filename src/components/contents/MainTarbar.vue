<template>
 <tarbar>
   <tarbar-item path="/home" activeColor="blue">
     <img slot="item-icon" src="~assets/images/tabbar/home.svg" alt="" />
     <img slot="item-icon-active" src="~assets/images/tabbar/home_active.svg" alt="" />
     <div slot="item-text">首页</div>
   </tarbar-item>

   <tarbar-item path="/category" activeColor="blue">
     <img slot="item-icon" src="~assets/images/tabbar/category.svg" alt="" />
     <img slot="item-icon-active" src="~assets/images/tabbar/category_active.svg" alt="" />
     <div slot="item-text">分类</div>
   </tarbar-item>

   <tarbar-item path="/cart" activeColor="blue">
     <img slot="item-icon" src="~assets/images/tabbar/shopcart.svg" alt="" />
     <img slot="item-icon-active" src="~assets/images/tabbar/shopcart_active.svg" alt="" />
     <div slot="item-text">购物车</div>
   </tarbar-item>

   <tarbar-item path="/me" activeColor="blue">
     <img slot="item-icon" src="~assets/images/tabbar/profile.svg" alt="" />
     <img slot="item-icon-active" src="~assets/images/tabbar/profile_active.svg" alt="" />
     <div slot="item-text">我的</div>
   </tarbar-item>
 </tarbar>
</template>

<script>

  //导入组件
  import Tarbar from 'components/common/tarbar/Tarbar'
  import TarbarItem from 'components/common/tarbar/TarbarItem'

  export default {
    name: "MainTarbar",
    components:{
      Tarbar,TarbarItem
    }
  }

</script>

<style scoped>

</style>
