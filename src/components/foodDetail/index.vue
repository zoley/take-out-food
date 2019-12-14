<template>
  <transition name="shift">
    <div class="detail-box" v-show="isShow">
      <div class="back iconfont icon-left" @click="closeDetail"></div>
      <div class="detail-wrap">
        <div class="img-header">
          <img class="img" :src="selectedFood.image" alt="">
        </div>
        <div class="detail-con">
          <h3>{{selectedFood.name}}</h3>
          <p class="con-sell">月售 {{selectedFood.sellCount}} 份  &nbsp;&nbsp; 好评率 {{selectedFood.rating}}%</p>
          <p class="price"><span class="red-color">￥{{selectedFood.price}}</span><del v-if="selectedFood.oldPrice" class="gray-color">￥{{selectedFood.oldPrice}}</del></p>  
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
    showDetail(){
      this.isShow=true;
    },
    closeDetail(){
      this.isShow=false;
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
    .back{
      font-size:36px;
      color:white;
      padding:0 4px;
      position:absolute;
      top:10px;
      left:0px;
      z-index:10;
      cursor: pointer;
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