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
    .nav{
      width:100%;
      height:40px;
      background: white;
      border-bottom:1px solid rgba(7,17,27,0.1);
      box-sizing: border-box;
      .nav-item{
        flex:1;
        text-align: center;
        color:rgb(77,85,93);
        font-size:14px;
        text-decoration:none;
        height:100%;
        line-height: 40px;
        &.router-link-active{
          color:rgb(240,20,20);
        }
      }
    }
  }
</style>
