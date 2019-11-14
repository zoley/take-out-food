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
      <div class="support-num">
        <span>{{header.supports.length}} 个</span>  
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div class="header-bottom z-flex">
      <b class="font-special">公告</b>
      <p class="bulletin">{{header.bulletin}}</p>
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
    position: relative;
    height:124px;
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
      -webkit-filter:blur(10px);
      filter:blur(10px);
    }
    .header-top{
      height:96px;
      position:relative;
      .image-wrap{
        width:64px;
        height:64px;
        border-radius:$radius;
        overflow: hidden;
        margin-left:20px;
        margin-right:20px;
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
          font-size:16px;
          font-size:600;
          b{
            background:$red;
            color:white;
            font-size:15px;
            border-radius:$light-radius;
            padding:2px 6px;
            padding-top:0;
            margin-right:10px;
          }
        }
        .desc{
          margin:10px 0;
        }
      }
      .support-num{
        position:absolute;
        bottom:10px;
        right:10px;
        height:30px;
        line-height: 26px;
        border-radius:30px;
        padding:0px 10px;
        color:white;
        background: rgba(0,0,0,0.2);
      }
    }
    .header-bottom{
      height:28px;
      background: rgba(7,17,27,0.2);
      color:white;
      b{
        color:#333;
        width:26px;
        flex:0 0 26px;
        padding:2px;
        margin-left:5px;
      }
      .bulletin{
        width:calc(100% - 62px);
        flex:0 0 calc(100% - 62px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>