<template>
  <div class="header">
    <div class="header-top z-flex">
      <div class="image-wrap">
        <img class="img" :src="header.avatar" alt="">
      </div>
      <div class="content-wrap">
        <h1><b>品牌</b>{{header.name}}</h1>
        <p>{{header.description}}/{{header.deliveryTime}}分钟送达</p>
        <p><b class="icon-font red-color">减</b>{{header.supports && header.supports[0].description}}</p>
      </div>
    </div>
    <div class="header-bottom z-flex">
      <b>公告</b>
      <p>{{header.bulletin}}</p>
      <i class="iconfont icon-right"></i>
    </div>
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
</style>