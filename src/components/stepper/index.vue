<template>
  <div class="stepper z-flex">
    <transition name="fade">
      <i v-if="food.count>0" class="iconfont icon-jian"  @click.stop.prevent="countReduce($event)"></i>
    </transition>
    <span v-if="food.count>0" class="count">{{food.count}}</span>
    <i class="iconfont icon-jia" @click.stop.prevent="countAdd($event)"></i>
  </div>
</template>

<script>
   export default {
     props:{
       food:{
         type:Object,
         default(){
           return {
             count:0
           }
         }
       }
     },
     data(){
       return{
       }
     },
     mounted(){
     },
     methods:{
       countAdd(e){
        if(!e._constructed) {
          return;
        }
        if(!this.food.hasOwnProperty('count')){
          this.$set(this.food,'count',1)
        }else{
          this.food.count++;
        }
        this.$emit('add', e.target);
       },
       countReduce(e){
        if(!e._constructed) {
          return;
        }
         this.food.count--;
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
      cursor: pointer;
      &:active{
        color:#5e6c71;
      }
    }
  }
  .fade-enter-active,.fade-leave-active{
    transition:0.4s all ease;
  }
  .fade-enter,.fade-leave-to{
    transform:translate3d(30px,0,0)rotate(180deg);
    opacity: 0;
  }
</style>