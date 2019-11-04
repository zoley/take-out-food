<template>
  <div class="layout">
    <div class="header">header</div>
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
import request from '@/utils/request'
export default{
  data(){
    return{
      header:''
    }
  },
  mounted(){
    this.getHeaderData();
  },
  methods:{
    getHeaderData(){
      request.get('/api/seller').then((res)=>{
        this.header=res.data;
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .layout{
    .nav{
      width:100%;
      .nav-item{
        flex:1;
        text-align: center;
      }
    }
  }
</style>
