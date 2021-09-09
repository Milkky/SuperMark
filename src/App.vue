<template>
  <div id="app">
    <main-tarbar></main-tarbar>
    <!--排除detail-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import MainTarbar from 'components/contents/MainTarbar'
export default {
  name: 'App',
  components: {
    MainTarbar
  }
}
</script>

<style>
/*css引入*/
  @import 'assets/css/base.css';
</style>
