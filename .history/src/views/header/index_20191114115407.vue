<template>
  <div class="header">
    <div class="header-top z-flex">
      <div class="image-wrap">
        <img class="img" :src="header.avatar" alt="">
      </div>
      <div class="content-wrap">
        <h1><b>品牌</b></h1>
      </div>
    </div>
    <div class="header-bottom">
      
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