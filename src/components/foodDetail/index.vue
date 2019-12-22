<template>
  <transition name="shift">
    <div class="detail-box" v-show="isShow" ref="detailBox">
      <div class="detail-wrap">
        <div class="img-header">
          <img class="img" :src="selectedFood.image" alt="">
        </div>
        <div class="detail-con">
          <h3 class="con-title">{{selectedFood.name}}</h3>
          <p class="con-sell">月售 {{selectedFood.sellCount}} 份  &nbsp;&nbsp; 好评率 {{selectedFood.rating}}%</p>
          <p class="price"><span class="red-color">￥{{selectedFood.price}}</span><del v-if="selectedFood.oldPrice" class="gray-color">￥{{selectedFood.oldPrice}}</del></p>  
          <div class="stepper-wrap">
            <stepper :food="selectedFood" @add="addFood" v-if="selectedFood.count && selectedFood.count>0"/>
            <button class="add-cart" v-else @click="addCart">加入购物车</button>
          </div>
        </div>
        <div class="separate-line"></div>
        <div class="detail-desc" v-if="selectedFood.info">
          <h3 class="desc-title">商品介绍</h3>
          <div class="desc-con">{{selectedFood.info}}</div>
        </div>
        <div class="separate-line" v-if="selectedFood.info"></div>
        <div class="detail-desc detail-comment" v-if="selectedFood.ratings">
          <h3 class="desc-title">商品评价</h3>
          <comment :comments="selectedFood.ratings" @refresh="refreshSCroll"/>
        </div>
      </div>
      <div class="back iconfont icon-left" @click="closeDetail"></div>
    </div>
  </transition>
</template>
<script>
import stepper from '@/components/stepper/index'
import comment from '@/components/comment/index'
import BScroll from 'better-scroll'
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
      isShow:false,
      detailScroll:null
    }
  },
  mounted() {
  },
  components:{
    stepper,
    comment
  },
  methods: {
    showDetail(){
      this.isShow=true;
      this.$nextTick(()=>{
        if(!this.detailScroll){
          this.detailScroll=new BScroll(this.$refs.detailBox,{
            click:true,
            scrollY:true
          })
        }else{
          this.detailScroll.refresh();
        }
      })
    },
    closeDetail(){
      this.isShow=false;
    },
    addFood(target){
      this.$emit('detailAddFood', target);
    },
    addCart(){
      this.$set(this.selectedFood,'count',1);
    },
    refreshSCroll(){
      this.$nextTick(()=>{
        this.detailScroll.refresh();
      })
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
    overflow: hidden;
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
    .detail-wrap{padding-bottom:50px;}
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
        &:after{
          content:'暂无图片';
          position:absolute;
          left:0;
          top:0;
          width:100%;
          height:100%;
          background: #f1f1f1;
          display:flex;
          justify-content: center;
          align-items: center;
          font-size:20px;
          letter-spacing: 2px;
        }
      }
    }
    .detail-con{
      position:relative;
      padding:18px;
      .con-title{
        color:rgba(7, 17, 27, 1);
        font-size:14px;
      }
      .con-sell{
        font-size:12px;
        color:#999;
        line-height: 16px;
        margin:8px 0 18px;
      }
      .price{
        font-size:12px;
        span{
          margin-right:12px;
          font-size:14px;
        }
      }
      .stepper-wrap{
        position: absolute;
        bottom:18px;
        right:18px;
        .add-cart{
          border-radius:24px;
          outline:none;
          padding:6px 10px;
          font-size:12px;
          color:white;
          border:none;
          background: rgb(0,160,220);
        }
      }
    }
    .detail-desc{
      padding:18px;
      .desc-title{
        font-size:14px;
        font-weight:500;
        color:#333;
        margin-bottom:10px;
      }
      .desc-con{
        color:#888;
        font-size:12px;
        line-height:24px;
      }
    }
    .detail-comment{
      padding:0;
      .desc-title{
        padding:18px 18px 6px; 
        margin-bottom:0;
      }
    }
  }
</style>