<template>
  <Swiper>
   <SwiperItem v-for="item in cbanners">
     <a :href="item.link">
       <img :src="item.image" alt="" @load="swiperImageLoad"/>
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
    },

    data(){
      return{
        count:0
      }
    },

    methods:{
      /*监听轮播图图片加载完成事件*/
      swiperImageLoad(){
        /*4张图片频繁发射事件，优化做法*/
        if(this.count === 0){
          this.$emit('swiperImageLoad')
          this.count++
        }

      }
    }
  }

</script>

<style scoped>

</style>
