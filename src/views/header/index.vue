<template>
  <div class="header">
    <div class="header-top z-flex">
      <div class="image-wrap">
        <img class="img" :src="header.avatar" alt="">
      </div>
      <div class="content-wrap">
        <h1 class="title"><b>品牌</b>{{header.name}}</h1>
        <p class="desc">{{header.description}} / {{header.deliveryTime}}分钟送达</p>
        <p class="support"><b class="font-special red-color">减</b>{{header.supports && header.supports[0].description}}</p>
      </div>
      <div class="support-num" @click="changeMask">
        <span>{{header.supports && header.supports.length}} 个</span>  
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div class="header-bottom z-flex" @click="changeMask">
      <b class="font-special">公告</b>
      <p class="bulletin">{{header.bulletin}}</p>
      <i class="iconfont icon-right"></i>
    </div>
    <img class="bg-fix" :src="header.avatar" alt="">
    <div class="mask" v-show="showMask">
      <div class="actual-content">
        <h1 class="title">{{header.name}}</h1>
        <star :score="header.score" :size="size"/>
        <div class="line-box z-flex">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="ul">
          <li v-for="(item,i) in header.supports" :key="i">
            <b v-if="item.type===0" class="font-special red-color">减</b>
            <b v-if="item.type===1" class="font-special blue-color">折</b>
            <b v-if="item.type===2" class="font-special green-color">特</b>
            <b v-if="item.type===3" class="font-special orange-color">惠</b>
            {{item.description}}
          </li>
        </ul>
        <div class="line-box z-flex">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="declare">{{header.bulletin}}</div>
      </div>
      <div class="actual-footer z-flex" @click="changeMask">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

import star from '@/components/star/index'
export default {
  data() {
    return {
      header:{},
      showMask:false,
      size:18
    };
  },
  components:{
    star
  },
  mounted() {
    this.getHeaderData();
  },
  methods: {
    /**
     * 获取header数据
     */
    getHeaderData(){
      request.get('/api/seller').then((res)=>{
        this.header=Object.assign({},res.data);
      })
    },
    /**
     * 改变遮罩层显示与否
     */
    changeMask(){
      this.showMask=!this.showMask;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '@/assets/css/variables';
  .header{
    width:100%;
    position: relative;
    height:124px;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
    .bg-fix{
      position:fixed;
      left:0;
      top:0;
      width:100vw;
      height:100vh;
      object-fit: fill;
      z-index: -1;
      -webkit-filter:blur(10px);
      filter:blur(10px);
    }
    .header-top{
      height:96px;
      position:relative;
      .image-wrap{
        width:64px;
        height:64px;
        border-radius:$radius;
        overflow: hidden;
        margin-left:20px;
        margin-right:20px;
        .img{
          vertical-align: top;
          width:100%;
          height:100%;
        }
      }
      .content-wrap{
        flex:1;
        color:white;
        .title{
          font-size:16px;
          font-size:600;
          b{
            background:$red;
            color:white;
            font-size:15px;
            border-radius:$light-radius;
            padding:2px 6px;
            margin-right:10px;
          }
        }
        .desc{
          margin:10px 0;
        }
      }
      .support-num{
        position:absolute;
        bottom:10px;
        right:10px;
        height:30px;
        line-height: 26px;
        border-radius:30px;
        padding:0px 10px;
        color:white;
        background: rgba(0,0,0,0.2);
        .iconfont{
          position:relative;
          top:2px;
        }
      }
    }
    .header-bottom{
      height:28px;
      background: rgba(7,17,27,0.2);
      color:white;
      b{
        color:#333;
        width:26px;
        flex:0 0 26px;
        padding:2px;
        margin-left:5px;
      }
      .bulletin{
        width:calc(100% - 62px);
        flex:0 0 calc(100% - 62px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .mask{
      position:fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      z-index:100;
      background: rgba(7,17,27,0.9);
      color:white;
      overflow: auto;
      .actual-content{
        min-height:100vh;
        padding-bottom:70px;
        overflow:hidden;
        box-sizing: border-box;
        .title{
          text-align: center;
          margin:50px 0 15px;
          font-size:16px;
          font-weight: 600;
        }
        .line-box{
          width:80%;
          margin:20px auto 10px;
          .line{
            flex:1;
            height:0;
            border-bottom:1px solid rgba(255,255,255,0.5);
          }
          .text{
            padding:0 20px;
            font-size:14px;
          }
        }
        .ul{
          width:72%;
          margin:10px auto;
          li{
            line-height: 30px;
          }
        }
        .declare{
          width:72%;
          margin:10px auto;
          line-height: 24px;
        }
      }
      .actual-footer{
        margin-top:-70px;
        justify-content: center;
        .iconfont{
          font-size:24px;
          color:white;
          padding:20px;
        }
      }
    }
  }
</style>