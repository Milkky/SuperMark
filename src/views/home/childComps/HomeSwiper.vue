<template>
  <Swiper>
   <SwiperItem v-for="item in cbanners">
     <a :href="item.link">
       <img :src="item.image" alt=""/>
     </a>
   </SwiperItem>
  </Swiper>
</template>

<script>

  /*导入*/
  import Swiper from 'components/common/swiper/Swiper'
  import SwiperItem from 'components/common/swiper/SwiperItem'

  export default {
    name: "HomeSwiper",
    components:{
      Swiper,SwiperItem
    },
    props:{
      cbanners:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }

</script>

<style scoped>

</style>
