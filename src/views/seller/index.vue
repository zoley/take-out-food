<template>
  <div class="seller-box" ref="sellerBox">
    <div class="seller-wrap">
      <div class="overview">
        <div class="overview-header z-flex">
          <div class="header-left">
            <span class="name">{{seller.name}}</span>
            <p>
              <span class="temp-star"><star :score="seller.score" :size="16" :letterSpace="3"/></span>
              <span  class="seller-count">月售 {{seller.sellCount}} 单</span>
            </p>
          </div>
          <div class="header-right z-flex" @click="isCollection">
            <i class="iconfont" :class="collection?'icon-xin':'icon-xin1'"></i>
            <span>{{collection?'已收藏':'收藏'}}</span>
          </div>
        </div>
        <div class="overview-body z-flex">
          <div class="cell z-flex">
            <span class="desc">起送价</span>
            <span><b>{{seller.minPrice}}</b> 元</span>
          </div>
          <div class="cell z-flex">
            <span class="desc">商家配送</span>
            <span><b>{{seller.deliveryPrice}}</b> 元</span>
          </div>
          <div class="cell z-flex">
            <span class="desc">平均配送时间</span>
            <span><b>{{seller.deliveryTime}}</b> 分钟</span>
          </div>
        </div>
      </div>
      <div class="separate-line"></div>
      <div class="detail-desc" v-if="seller.bulletin">
        <h3 class="desc-title">公告与活动</h3>
        <div class="desc-con">{{seller.bulletin}}</div>
      </div>
      <ul class="ul">
        <li v-for="(item,i) in seller.supports" :key="i">
          <b v-if="item.type===0" class="font-special-bg red-bg">减</b>
          <b v-if="item.type===1" class="font-special-bg blue-bg">折</b>
          <b v-if="item.type===2" class="font-special-bg green-bg">特</b>
          <b v-if="item.type===3" class="font-special-bg orange-bg">惠</b>
          {{item.description}}
        </li>
      </ul>
      <div class="separate-line" v-if="Array.prototype.isPrototypeOf(seller.pics) && seller.pics.length>0"></div>
      <div class="detail-desc" v-if="Array.prototype.isPrototypeOf(seller.pics) && seller.pics.length>0">
        <h3 class="desc-title">商家实景</h3>
        <div class="imgs-box" ref="imgBox">
          <div class="imgs-wrap" ref="imgWrap">
            <img v-for="(item,i) in seller.pics" :src="item" alt="" :key="i" class="business-img">
          </div>
        </div>
      </div>
      <div class="separate-line"></div>
      <div class="detail-desc" v-if="seller.bulletin">
        <h3 class="desc-title">商家信息</h3>
        <p class="desc-info" v-for="(item,i) in seller.infos" :key="i">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/index'
import BScroll from 'better-scroll'
export default {
  props:{
    seller:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    star
  },
  data() {
    return {
      collection:false,
      sellerScroll:null,
      imgScroll:null
    };
  },
  watch:{
    seller:{
      handler(val){
        this.initSellerSCroll();
        this.initImgSCroll();
      },
      deep:true
    }
  },
  mounted() {
    this.initSellerSCroll();
    this.initImgSCroll();
  },
  methods: {
    initSellerSCroll(){
      this.$nextTick(()=>{
        if(!this.sellerScroll){
          this.sellerScroll=new BScroll(this.$refs.sellerBox,{
            click:true,
            scrollY:true
          })
        }else{
          this.sellerScroll.refresh();
        }  
      })   
    },
    initImgSCroll(){
      this.$nextTick(()=>{
        if(Array.prototype.isPrototypeOf(this.seller.pics) && this.seller.pics.length>0){
          let W=this.seller.pics.length * (120+6)-6; 
          this.$refs.imgWrap.style.width=W+'px';
          if(!this.imgScroll){
            this.imgScroll=new BScroll(this.$refs.imgBox,{
              click:true,
              scrollX:true,
              eventPassthrough:'vertical'
            })
          }else{
            this.imgScroll.refresh();
          }
        }
      })
    },
    isCollection(){
      this.collection=!this.collection;
    }
  }
};
</script>

<style lang="scss" scoped>
.seller-box{
  height:calc(100vh - 164px);
  overflow:hidden;
  background:#fff;
  .overview{
    .overview-header{
      padding:16px 0;
      margin:0 16px;
      border-bottom:1px solid rgba(7,17,27,0.1);
      justify-content: space-between;
      .header-left{
        flex:1;
        .name{
          font-size:14px;
          color:rgb(7,17,27);
          margin-bottom:8px;
          display:block;
        }
        p{
          .temp-star{
            width:110px;
            display:inline-block;
            .star{
              justify-content: flex-start;
            }
          }
          .seller-count{
            color:rgba(7,17,27,0.7);
          }
        }
      }
      .header-right{
        flex:0 0 50px;
        width:50px;
        flex-direction:column;
        justify-content: center;
        font-size:12px;
        .iconfont{
          font-size:24px;
          color:rgba(7,17,27,0.5);
          margin-bottom:4px;
          &.icon-xin{
            color:rgb(240,20,20);
          }
        }
      }
    }
    .overview-body{
      padding:16px 0;
      .cell{
        flex:1;
        justify-content: center;
        flex-direction: column;
        font-size:12px;
        color:rgba(7,17,27,0.7);
        &:nth-of-type(2){
          border-left:1px solid rgba(7,17,27,0.1);
          border-right:1px solid rgba(7,17,27,0.1);
        }
        .desc{
          margin-bottom:6px;
          color:rgba(7,17,27,0.5);
        }
        b{
          color:rgba(7,17,27,1);
          font-size:24px;
          font-weight:100;
        }
      }
    }
  }
  .detail-desc{
    padding:18px;
    .desc-title{
      font-size:14px;
      font-weight:600;
      color:#333;
      margin-bottom:12px;
    }
    .desc-con{
      color:rgb(240,20,20);
      font-size:12px;
      line-height:24px;
    }
    .desc-info{
      font-size:12px;
      color:rgba(7,17,27,1);
      padding:12px 12px;
      line-height: 20px;
      border-top:1px solid rgba(7,17,27,0.1);
    }
    .imgs-box{
      width:100%;
      overflow: hidden;
      white-space: nowrap;
      .business-img{
        width:120px;
        height:90px;
        vertical-align: top;
        display:inline-block;
        margin-right:6px;
        &:last-child{
          margin-right:0;
        }
      }
    }
  }
  .ul{
    padding:0 18px;
    li{
      font-size:12px;
      color:rgba(7,17,27,1);
      padding:12px 12px;
      line-height: 20px;
      border-top:1px solid rgba(7,17,27,0.1);
    }
  }
}
</style>