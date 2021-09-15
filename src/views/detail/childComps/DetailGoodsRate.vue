<template>
  <div class="goods-rate">
    <div class="info-header">
      <div>用户评价</div>
      <div>更多</div>
    </div>

    <div class="info-content" v-if="Object.keys(cgoodsRate).length !== 0">
      <div class="user">
        <span>
          <img :src="comment.user.avatar" alt=""/>
        </span>
        <span class="name">{{comment.user.uname}}</span>
      </div>
      <div class="comment-detail">
        <div class="desc">{{comment.content}}</div>
        <div class="other">
          <span class="date">{{comment.created | showDate}}</span>
          <span class="color">{{comment.style}}</span>
        </div>
        <div class="comment-image" v-if="comment.images && comment.images.length">
          <img v-for="(item,index) in comment.images"
               :src="item"
               :key="index"
               alt="" />
        </div>
      </div>
    </div>
    <div v-else>暂时没有评论 ≥Ö‿Ö≤ </div>
  </div>

</template>

<script>

  export default {
    name: "DetailGoodsRate",
    props:{
      cgoodsRate:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    computed:{
      comment(){
        return this.cgoodsRate.list[0]
      }
    },

    filters:{
     /*时间格式化*/
      showDate(value){
        /*向Date对象原型中加入时间格式化方法(format)*/
        Date.prototype.format = function(fmt) {
          var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
          };
          if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          }
          for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
          }
          return fmt;
        }

        /*将时间戳转化为时间对象，*1000是变为毫秒*/
        return new Date(value * 1000).format('yyyy-MM-dd/hh:mm')
      }
    }
  }
</script>

<style scoped>
  .goods-rate {
    padding: 8px 8px 20px;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
  }
  .info-header {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgba(100, 100, 100, .1);
  }
  .info-content {
    margin-top: 8px;
  }
  .info-content .user img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .info-content .user .name {
    position: relative;
    top: -15px;
    left: 8px;
  }
  .comment-detail .desc {
    padding: 4px;
    text-indent: 2em;
    color: var(--color-text);
  }
  .comment-detail .other {
    color: var(--color-text);
  }
  .comment-detail .other span {
    padding: 4px;
  }
  .comment-detail .comment-image {
    display: flex;
  }
  .comment-image img {
    width: 25%;
    padding-right: 6px;
  }
</style>
