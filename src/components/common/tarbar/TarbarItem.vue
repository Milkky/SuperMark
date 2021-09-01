<template>
  <div class="tarbar-item" @click="itemClick">
    <slot name="item-icon" v-if="isActive"></slot>
    <!--在定义一个插槽，用于放active时的图片-->
    <slot name="item-icon-active" v-else></slot>
    <!--动态绑定样式-->
    <div :style="isActiveStyle">
    <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TarbarItem",

    props:{
      path:{
        type:String
      },

      /*用户可以自定义传入颜色*/
      activeColor:{
        type:String,
        default:'red'
      }
    },

    methods:{
      //设置item点击事件，切换为所点的对应路径
      itemClick(){
        //console.log(this.$router,this.$route)
        this.$router.replace(this.path)
      }
    },

    //自定义计算属性：isActive
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) === -1
      },
      isActiveStyle(){
        return !this.isActive ? {color:this.activeColor} :{}
      }
    }
  }
</script>


<style scoped>
.tarbar-item{
  /*对flex下的每个item进行均等分*/
  flex:1;
  /*让每个item进行居中对齐*/
  text-align: center;
  /*设置高度、字体高度、颜色*/
  height:49px;
  font-size:14px;
  color:#000000;
}
  /*设置item下图片样式*/
.tarbar-item img{
  width:24px;
  height:24px;
  margin: 4px 0 2px 0;
  vertical-align: middle;
}
</style>
