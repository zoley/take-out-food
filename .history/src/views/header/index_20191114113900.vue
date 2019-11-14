<template>
  <div>
    header
  </div>
</template>

<script>

import request from '@/utils/request'
export default {
  data() {
    return {
      header:null
    };
  },
  mounted() {
    this.getHeaderData();
  },
  methods: {
    getHeaderData(){
      request.get('/api/seller').then((res)=>{
        this.header=res.data;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>