<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  /*导入组件*/
  import DetailNavBar from './childComps/DetailNavBar'

  export default {
    name: "Detail",

    components:{
      DetailNavBar
  }

  }
</script>

<style scoped>

</style>
