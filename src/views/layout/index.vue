<template>
  <div class="layout">
    <zHeader :header="seller"/>
    <div class="nav z-flex">
      <router-link class="nav-item" to="/goods">商品</router-link>
      <router-link class="nav-item" to="/ratings">评价</router-link>
      <router-link class="nav-item" to="/seller">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import zHeader from '../header/index'
export default{
  data(){
    return{
      seller:{}
    }
  },
  components:{
    zHeader
  },
  created(){
    this.getSellerData();
  },
  methods:{
    /**
     * 获取header数据
     */
    getSellerData(){
      request.get('/api/seller').then((res)=>{
        this.seller=Object.assign({},res.data);
      })
    },
  }
}
</script>
<style scoped lang="scss">
  .layout{
    max-width: 1024px;
    margin:0 auto;
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
