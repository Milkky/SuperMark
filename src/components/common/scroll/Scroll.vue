<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  /*导入better-scroll框架*/
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",

    data(){
      return{
      /*创建一个变量，用于保存mounted的scroll对象*/
      scroll:null,
      }
    },

    /*既然是封装的scroll，那可以由外面决定scroll对象*/
    props:{
      /*1.滚动监听属性*/
      /*probeType: 0/1/2(手指滚动)/3(只要是滚动)*/
      probeType:{
        type:Number,
        default:0
      },

      /*2.上拉加载属性：pullUpload(true/false)*/
      pullUpLoad:{
        type: Boolean,
        default: false
      },

      /*3.点击click属性（true:下面的按钮、div都可点击.false:按钮可点击，div不行）*/
      click:{
        type: Boolean,
        default: true
      }
    },


    /*当组件中的模板（template渲染完成执行）*/
    mounted(){
      /*使用方法：
      * const bscroll = new BScroll(el, {})
      * el表示需要挂载的元素
       */
      /*创建一个scroll对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })


      /*监听滚动位置*/
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) =>{
          //console.log(position)
          /*向Home父组件发射事件，并传参数'position'*/
          this.$emit('scroll',position)
        })
      }

      /*监听滚动底部事件'pullingUp'*/
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() =>{
          /*默认只能调用一次*/
          //console.log("=====")
          /*当需要重新再调用时，需要执行finishPullUp()方法*/
          //this.scroll.finishPullUp()
          this.$emit('pullingUp')
        })
      }

    },


    /*scroll组件定义一些方法*/
    methods:{
      scrollTo(x,y,time = 1000){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      refresh(){
        this.scroll && this.scroll.refresh()
      },

      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },

      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
/*使用该框架需要给外包裹元素给一个高度，这里用绝对定位*/
  .wrapper{
    /*当不在该高度范围进行隐藏*/
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
    left:0;
    right:0;
  }
</style>
