<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" />
      </div>

      <div slot="center" class="title">
        <div class="title-item"
             v-for="(item,index) in titles"
             @click="titleItemClick(index)"
             :class="{active:index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  /*导入组件*/
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",

    components:{
      NavBar
    },

    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },

    methods:{
      titleItemClick(index){
        this.currentIndex = index
      },

      /*点击返回*/
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size:16px;
  }

  .title-item{
    flex:1;
  }

  .back img{
    margin-top: 11px;
  }

  .active{
    color:var(--color-high-text)
  }
</style>
