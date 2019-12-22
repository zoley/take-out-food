<template>
  <div class="comment-wrap">
    <div class="tab-wrap">
      <a href="javascript:;" v-for="(item,index) in tabListCopy" :key="index" @click="changeTab(item.type)"
      :class="{'positive tab-item':item.type!==1,'negative tab-item':item.type===1,'active tab-item':activeTab===item.type}">{{item.name}} <span>{{item.number}}</span></a>
    </div>
    <div class="switch" @click="changeSwitch">
      <i class="iconfont icon-duihao" :class="hasContent?'active':''"></i>
      <span>只看有内容的评价</span>
    </div>
    <ul class="ul">
      <li v-for="(val,key) in comments" :key="key" v-show="onlyShow(val.rateType,val.text)">
        <div class="z-flex title" v-if="mark==='detailComment'">
          <span class="date">{{val.rateTime | formatDate}}</span>
          <div class="z-flex user-info">
            <span>{{val.username}}</span>
            <img :src="val.avatar" alt="">
          </div>
        </div>
        <div class="z-flex content" v-if="mark==='detailComment'">
          <i class="iconfont icon-zan" v-if="val.rateType===0"></i>
          <i class="iconfont icon-tread negative" v-if="val.rateType===1"></i>
          <p class="text">{{val.text}}</p>
        </div>
        <div v-if="mark==='ratingComment'" class="rating-con z-flex">
          <div class="con-img"><img :src="val.avatar" alt=""></div>
          <div class="con-body">
            <div class="z-flex user-info">
              <span>{{val.username}}</span>
              <span class="date">{{val.rateTime | formatDate}}</span>
            </div>
            <div class="user-star">
              <span class="temp-star"><star :score="val.score" :size="14" :letterSpace="1"/></span>
              <span  class="delivery" v-if="val.deliveryTime">{{val.deliveryTime}}分钟送达</span>
            </div>
            <p class="user-text">{{val.text}}</p>
            <div class="label-box z-flex">
              <i class="iconfont icon-zan" v-if="val.rateType===0"></i>
              <i class="iconfont icon-tread negative" v-if="val.rateType===1"></i>
              <span v-for="(x,y) in val.recommend" :key="y" class="label">{{x}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import star from '@/components/star/index'
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
export default {
  props:{
    comments:{
      type:Array,
      default(){
        return []
      }
    },
    tabList:{
      type:Array,
      default(){
        return [{
          name:'全部',
          type:ALL,
          number:0
        },{
          name:'推荐',
          type:POSITIVE,
          number:0
        },{
          name:'吐槽',
          type:NEGATIVE,
          number:0
        }]
      }
    },
    mark:{
      type:String,
      default(){
        return 'detailComment'
      }
    }
  },
  computed:{
    tabListCopy(){
      let positive=this.comments.filter((item)=>{
        return item.rateType===POSITIVE
      })
      let negative=this.comments.filter((item)=>{
        return item.rateType===NEGATIVE
      })
      return this.tabList.map((tab,index,arr)=>{
        if(tab.type===ALL){
          return {
            ...tab,
            number:this.comments.length
          };
        }else if(tab.type===POSITIVE){
          return {
            ...tab,
            number:positive.length
          };
        }else if(tab.type===NEGATIVE){
          return {
            ...tab,
            number:negative.length
          };
        }
      })
    }
  },
  components:{
    star
  },
  data() {
    return {
      activeTab:ALL,
      hasContent:false,
    };
  },
  mounted() {
  },
  methods: {
    changeSwitch(){
      this.hasContent=!this.hasContent;
      this.$emit('refresh');
    },
    changeTab(type){
      this.activeTab=type;
      this.$emit('refresh');
    },
    onlyShow(type,text){
      if(this.hasContent && !text){
        return false;
      }
      if(this.activeTab===ALL){
        return true;
      }else{
        return this.activeTab===type;
      }
    }
  },
  filters:{
    formatDate(timestamp) {
      timestamp = new Date(timestamp);
      var year=timestamp.getFullYear();
      var month=timestamp.getMonth()+1;
      var dateTime=timestamp.getDate();
      var hour=timestamp.getHours();
      var minute=timestamp.getMinutes();
      // var second=timestamp.getSeconds();
      return year+"-"+(month>9?month:"0"+month)+"-"+(dateTime>9?dateTime:"0"+dateTime)+" "+(hour>9?hour:"0"+hour)+":"+(minute>9?minute:"0"+minute);
    } 
  }
};
</script>

<style lang="scss" scoped>
  .comment-wrap{
    overflow:hidden;
    .tab-wrap{
      margin:0 18px;
      padding:12px 0;
      border-bottom:1px solid rgba(7,17,27,0.1);
      .tab-item{
        padding:8px 12px;
        color:rgb(77,85,93);
        font-size:13px;
        border-radius:2px;
        margin-right:8px;
        display:inline-block;
        &.positive{
          background:rgba(0,160,220,0.2);
        }
        &.negative{
          background:rgba(77,85,93,0.2);
        }
        &.active{
          background:rgba(0,160,220,1);
          color:white;
        }
        .span{
          font-size:12px;
          margin-left:4px;
        }
      }
    }
    .switch{
      padding:12px 18px;
      border-bottom:1px solid #ddd;
      .iconfont{
        font-size:20px;
        vertical-align: text-bottom;
        color:#ccc;
        margin-right:8px;
        &.active{
          color:#67C23A;
        }
      }
      span{
        font-size:12px;
        color:#999;
      }
    }
    .ul{
      padding:0 18px;
      li{
        padding:16px 0;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .title{
          width:100%;
          margin-bottom:8px;
          justify-content: space-between;
          .user-info{
            justify-content: flex-end;
            img{
              width:14px;
              height:14px;
              vertical-align: top;
              border-radius:50%;
              margin-left:8px;
            }
          }
        }
        .content{
          .iconfont{
            color:rgba(0,160,220,1);
            font-size:14px;
            margin-right:8px;
            &.negative{
              color:#ccc;
            }
          }
          .text{
            color:rgba(7,17,27,1);
            line-height: 16px;
            font-size:12px;
          }
        }
        .rating-con{
          align-items: flex-start;
          .con-img{
            flex:0 0 28px;
            margin-right:12px;
            width:28px;
            height:28px;
            overflow:hidden;
            border-radius:50%;
            img{width:100%;height:100%;vertical-align: top;}
          }
          .con-body{
            flex:1;
            .user-info{
              justify-content: space-between;
              font-size:12px;
              color:rgb(7,17,27);
              .date{
                color:rgba(7,17,27,0.5);
              }
            }
            .user-star{
              width:100%;
              margin:10px 0;
              .temp-star{
                width:90px;
                display:inline-block;
                .star{
                  justify-content: flex-start;
                }
              }
              .delivery{
                color:rgba(7,17,27,0.5);
              }
            }
            .user-text{
              line-height:20px;
              font-size:14px;
              color:rgba(7,17,27,1);
              margin-bottom:10px;
            }
            .label-box{
              width:100%;
              flex-wrap: wrap;
              .iconfont{
                color:rgba(0,160,220,1);
                font-size:14px;
                margin-right:8px;
                margin-bottom:4px;
                &.negative{
                  color:#ccc;
                }
              }
              .label{
                display:inline-block;
                max-width:70px;
                border:1px solid rgba(7,17,27,0.1);
                padding:3px 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color:rgba(7,17,27,0.6);
                font-size:12px;
                margin-right:8px;
                margin-bottom:4px;
              }
            }
          }
        }
      }
    }
  }
</style>