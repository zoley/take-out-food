<template>
  <div class="shopcart z-flex">
    <div class="cart-icon-wrap">
      <div class="cart-icon z-flex" :class="{highlight:totalCount>0}">
        <i class="iconfont icon-gouwuche"></i>
        <b v-if="totalCount>0" class="select-count red-bg" >{{totalCount}}</b>
      </div>
    </div>
    <div class="cart-con z-flex">
      <b class="con-price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</b>
      <div class="con-line"></div>
      <span class="con-desc">另需配送费￥{{deliveryPrice}}元</span>
    </div>
    <div class="cart-pay z-flex" :class="{enough:totalPrice>=minPrice}">{{payDesc}}</div>
  </div>
</template>

<script>
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return []
      }
    },
    minPrice:{
      type:Number,
      default(){
        return 20
      }
    },
    deliveryPrice:{
      type:Number,
      default(){
        return 4
      }
    },
  },
  computed:{
    totalCount(){
      return this.selectFoods.reduce((prev,cur)=>{
        return prev + cur.count;
      },0)
    },
    totalPrice(){
      return this.selectFoods.reduce((prev,cur)=>{
        return prev + cur.count*cur.price;
      },0)
    },
    payDesc(){
      if(this.totalPrice===0){
        return `￥${this.minPrice}起送`;
      }else if(this.totalPrice<this.minPrice){
        let diff=this.minPrice-this.totalPrice;
        return `还差￥${diff}起送`;
      }else{
        return '去结算';
      }
    }
  },
  data(){
    return{

    }
  },
  methods:{

  }

}
</script>

<style lang="scss" scoped>
  .shopcart{
    justify-content: space-between;
    height:100%;
    width:100%;
    color:rgba(255,255,255,0.4);
    .cart-icon-wrap{
      flex:0 0 80px;
      width:80px;
      &:after{
        content:'';
        width:56px;
        height:56px;
        border-radius:50%;
        position:absolute;
        z-index:1;
        bottom:2px;
        left:12px;
        background: #141d27;
      }
      .cart-icon{
        width:44px;
        flex:0 0 44px;
        margin: 0 auto 8px;
        height:44px;
        position:relative;
        z-index:2;
        background:#2b343c;
        border-radius:50%;
        justify-content: center;
        .iconfont{
          font-size:24px;
          color:rgba(255,255,255,0.4);
        }
        &.highlight{
          background:#409EFF;
          .iconfont{
            color:white;
          }
        }
        .select-count{
          position: absolute;
          top:-10px;
          right:-10px;
          color:white;
          width:24px;
          height:16px;
          border-radius:15px;
          line-height: 15px;
          text-align: center;
          font-weight: 400;
        }
      }
    }
    .cart-con{
      flex:1;
      height:100%;
      .con-price{
        font-size:16px;
        &.highlight{
          color:white;
        }
      }
      .con-line{
        height:24px;
        width:1px;
        background: rgba(255,255,255,0.1);
        margin:0 12px;
      }
      .con-desc{
        font-size:12px;
      }
    }
    .cart-pay{
      width:106px;
      flex:0 0 106px;
      height:100%;
      font-size:14px;
      justify-content: center;
      background:#2b343c;
      &.enough{
        color:white;
        background: #00b43c;
      }
    }
  }
  @media screen and (max-width: 340px) {
    .shopcart{
      .cart-icon-wrap{
        flex:0 0 72px;
        width:72px;
        &:after{
          left:8px;
        }
      }
      .cart-con{
        flex:1;
        height:100%;
        .con-price{
          font-size:16px;
        }
        .con-line{
          height:24px;
          width:1px;
          background: rgba(255,255,255,0.1);
          margin:0 12px;
        }
        .con-desc{
          font-size:12px;
        }
      }
      .cart-pay{
        width:84px;
        flex:0 0 84px;
      }
    }
  }
</style>