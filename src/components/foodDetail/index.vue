<template>
  <transition name="shift">
    <div class="detail-box" v-show="isShow">
      <div class="detail-wrap">
        <div class="img-header">
          <img class="img" :src="selectedFood.image" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    selectedFood:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      isShow:false
    }
  },
  mounted() {
    console.log(this.selectedFood);
  },
  methods: {
    showRatings(){
      this.isShow=true;
    }
  }
};
</script>

<style lang="scss" scoped>
  .detail-box{
    position:fixed;
    left:0;
    top:0;
    width:100vw;
    height:100vh;
    z-index:40;
    background:white;
    &.shift-enter-active,&.shift-leave-active{
      transition:0.4s all ease;
    }
    &.shift-enter,&.shift-leave-to{
      transform:translate3d(100%,0,0);
      opacity: 0;
    }
    .img-header{
      width:100%;
      height:0;
      position:relative;
      padding-top:100%;
      .img{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        object-fit: over;
      }
    }
  }
</style>