<template>
   <div class="stepper z-flex">
      <i v-if="count>0" class="iconfont icon-jian" @click="countReduce"></i>
      <span v-if="count>0" class="count">{{count}}</span>
      <i class="iconfont icon-jia" @click="countAdd"></i>
   </div>
</template>

<script>
   export default {
     data(){
       return{
         count:0
       }
     },
     mounted(){
       
     },
     methods:{
       countAdd(){
         this.count++;
       },
       countReduce(){
         this.count--;
       }
     }
   }
</script>

<style lang="scss" scoped>
  .stepper{
    width:100%;
    justify-content: flex-end;
    min-width:70px;
    .count{
      font-size:12px;
    }
    .iconfont{
      font-size:22px;
      color:#00a0dc;
      padding:0 8px;
      &:active{
        color:#5e6c71;
      }
    }
  }
</style>