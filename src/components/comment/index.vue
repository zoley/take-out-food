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
        <div class="z-flex title">
          <span class="date">{{val.rateTime}}</span>
          <div class="z-flex user-info">
            <span>{{val.username}}</span>
            <img :src="val.avatar" alt="">
          </div>
        </div>
        <div class="z-flex content">
          <i class="iconfont icon-zan" v-if="val.rateType===0"></i>
          <i class="iconfont icon-tread negative" v-if="val.rateType===1"></i>
          <p class="text">{{val.text}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
  }
};
</script>

<style lang="scss" scoped>
  .comment-wrap{
    overflow:hidden;
    .tab-wrap{
      margin:0 18px;
      padding-bottom:12px;
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
      }
    }
  }
</style>