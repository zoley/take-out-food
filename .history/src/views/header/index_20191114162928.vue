<template>
  <div class="header">
    <div class="header-top z-flex">
      <div class="image-wrap">
        <img class="img" :src="header.avatar" alt="">
      </div>
      <div class="content-wrap">
        <h1 class="title"><b>品牌</b>{{header.name}}</h1>
        <p class="desc">{{header.description}} / {{header.deliveryTime}}分钟送达</p>
        <p class="support"><b class="font-special red-color">减</b>{{header.supports && header.supports[0].description}}</p>
      </div>
    </div>
    <div class="header-bottom z-flex">
      <b>公告</b>
      <p>{{header.bulletin}}</p>
      <i class="iconfont icon-right"></i>
    </div>
    <img class="bg-fix" :src="header.avatar" alt="">
  </div>
</template>

<script>

import request from '@/utils/request'
export default {
  data() {
    return {
      header:{}
    };
  },
  mounted() {
    this.getHeaderData();
  },
  methods: {
    getHeaderData(){
      request.get('/api/seller').then((res)=>{
        this.header=Object.assign({},res.data);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '@/assets/css/variables';
  .header{
    width:100%;
    height:120px;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
    .bg-fix{
      position:fixed;
      left:0;
      top:0;
      width:100vw;
      height:100vh;
      object-fit: fill;
      z-index: -1;
    }
    .header-top{
      height:96px;
      .image-wrap{
        width:64px;
        height:64px;
        border-radius:$radius;
        overflow: hidden;
        margin-left:20px;
        .img{
          vertical-align: top;
          width:100%;
          height:100%;
        }
      }
      .content-wrap{
        flex:1;
        color:white;
        .title{
          font-size:18px;
          font-size:600;
          b{
            background:$red;
            color:white;
            font-size:16px;
            border-radius:$light-radius;
            padding:2px 6px;
            margin-right:10px;
          }
        }
        .desc{
          margin:15px 0;
        }
      }
    }
  }
</style>