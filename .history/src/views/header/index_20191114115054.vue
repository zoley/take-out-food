<template>
  <div>
    <div class="header-top z-flex">
      <div class="image-wrap">
        <img :src="header.avatar" alt="">
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