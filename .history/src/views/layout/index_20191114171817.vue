<template>
  <div class="layout">
    <zHeader/>
    <div class="nav z-flex">
      <router-link class="nav-item" to="/goods">商品</router-link>
      <router-link class="nav-item" to="/ratings">评价</router-link>
      <router-link class="nav-item" to="/seller">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import request from '@/utils/request'
import zHeader from '../header/index'
export default{
  data(){
    return{
    }
  },
  components:{
    zHeader
  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style scoped lang="scss">
  .layout{
    background: #fff;
    height: 100vh;
    .nav{
      width:100%;
      .nav-item{
        flex:1;
        text-align: center;
      }
    }
  }
</style>
