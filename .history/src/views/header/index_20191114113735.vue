<template>
  <div>
    header
  </div>
</template>

<script>

import request from '@/utils/request'
export default {
  data() {
    return {};
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