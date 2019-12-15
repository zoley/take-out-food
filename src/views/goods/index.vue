<template>
  <div class="goods-wrap">
    <div class="goods z-flex">
      <div class="goods-left" ref="leftWrapper">
        <div class="left-ul left-ul-hook">
          <div class="left-li z-flex left-li-hook" v-for="(item,index) in goods" :key="index" :class="{active:current===index}" @click="selectCondition($event,index)">
            <span>
              <b v-if="item.type===0" class="font-special-bg red-bg">减</b>
              <b v-if="item.type===1" class="font-special-bg blue-bg">折</b>
              <b v-if="item.type===2" class="font-special-bg green-bg">特</b>
              <b v-if="item.type===3" class="font-special-bg orange-bg">惠</b>
              {{item.name}}
            </span>
            <span :class="{'no-line':index===current-1}" class="bottom-line"></span>
          </div>
        </div>
      </div>
      <div class="goods-right" ref="rightWrapper">
        <div class="right-content">
          <div class="right-ul right-ul-hook" v-for="(item,index) in goods" :key="index">
            <h2 class="right-title">{{item.name}}</h2>
            <div class="right-li z-flex" v-for="(x,y) in item.foods" :key="y" @click="onSelectedFood(x,$event)">
              <img class="li-img" :src="x.icon" alt="">
              <div class="right-con">
                <h4 class="con-title">{{x.name}}</h4>
                <p class="con-desc" v-if="x.description">{{x.description}}</p>
                <p class="con-sell">月售 {{x.sellCount}} 份  &nbsp;&nbsp; 好评率 {{x.rating}}%</p>
                <p class="price"><span class="red-color">￥{{x.price}}</span><del v-if="x.oldPrice" class="gray-color">￥{{x.oldPrice}}</del></p>
              </div>
              <div class="stepper-wrap">
                <stepper :food="x" @add="addFood"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcart-wrap">
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"/>  
    </div>
    <foodDetail ref="foodDetail" :selectedFood="selectedFood"  @detailAddFood="addFood"/>
  </div>
</template>
<script>
import request from '@/utils/request'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/index'
import stepper from '@/components/stepper/index'
import foodDetail from '@/components/foodDetail/index'
export default {
  props:{
    seller:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data() {
    return {
      goods:[],
      listHeight:[],
      leftScroll:null,
      rightScroll:null,
      scrollY:0,
      selectedFood:{}
    };
  },
  created(){
    this.getGoodsResult();
  },  
  mounted() {
    
  },
  computed:{
    current(){
      for(var i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
          return i;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        });
      })
      return foods;
    }
  },
  watch:{
    //左侧居中跟着走啊喂
    current(val){
      let leftDom=this.$refs.leftWrapper.getElementsByClassName('left-li-hook');
      let curDom=leftDom[val];
      let dis=this.$refs.leftWrapper.getElementsByClassName('left-ul-hook')[0].offsetHeight-this.$refs.leftWrapper.offsetHeight;
      let y=curDom.offsetTop+curDom.offsetHeight/2-this.$refs.leftWrapper.offsetHeight/2;
      // console.log(curDom.offsetTop,curDom.offsetHeight/2,this.$refs.leftWrapper.offsetHeight/2,y,dis)
      if(y<=0 || dis<=0){
        y=0;
      }else if(y>=dis && dis>0){
        y=dis;
      }
      this.leftScroll.scrollTo(0,-y,300);
    }
  },
  components:{
    shopcart,
    stepper,
    foodDetail
  },
  methods: {
    initScroll(){
      this.leftScroll=new BScroll(this.$refs.leftWrapper,{
        scrollY:true,
        click:true
      });
      this.rightScroll=new BScroll(this.$refs.rightWrapper,{
        scrollY:true,
        click:true,
        probeType:3
      });
      this.rightScroll.on('scroll',(pos)=>{
        this.scrollY=Math.round(Math.abs(pos.y));
      })
    },
    calcHeight(){
      let rightDom=this.$refs.rightWrapper.getElementsByClassName('right-ul-hook');
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<rightDom.length;i++){
        height+=rightDom[i].offsetHeight
        this.listHeight.push(height);
      }
    },
    getGoodsResult(){
      request('/api/goods').then((res)=>{
        this.goods=Object.assign([],res.data);
        this.$nextTick(()=>{
          this.initScroll();
          this.calcHeight();
        })
      }).catch((err)=>{
        console.log(err);
      })
    },
    selectCondition(e,i){
      if(!e._constructed){
        e.preventDefault();
      }
      let rightDom=this.$refs.rightWrapper.getElementsByClassName('right-ul-hook');
      this.rightScroll.scrollToElement(rightDom[i],300);
    },
    addFood(target){
      //优化体验，防止卡顿
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    //选中某个food
    onSelectedFood(food,e){
      if(!e._constructed){
        e.preventDefault();
      }
      this.selectedFood=food;
      this.$refs.foodDetail.showDetail();
    }
  }
};
</script>
<style scoped lang="scss">
  .goods-wrap{
    position:relative;
    background: #fff;
    .goods{
      height:calc(100vh - 164px - 48px);
      align-items: flex-start;
      .goods-left{
        overflow: hidden;
        width:80px;
        flex:0 0 80px;
        position: relative;
        height:100%;
        background: #f3f5f7;
        .left-ul{
          .left-li{
            height:54px;
            color:#666;
            padding:0 12px;
            font-size:12px;
            justify-content: center;
            line-height: 16px;
            position:relative;
            .font-special-bg{
              margin-right:2px;
            }
            .bottom-line{
              position:absolute;
              bottom:0;
              left:12px;
              right:12px;
              height:1px;
              background:rgba(7, 17, 27, 0.1);
            }
            &.active{
              background: white;
              color:#333;
              .bottom-line{display:none;}
            }
            .no-line{
              display:none;
            }
          }
        }
      }
      .goods-right{
        flex:1;
        overflow: hidden;
        height:100%;
        .right-title{
          height:26px;
          background: #f3f5f7;
          border-left:2px solid #d9dde1;
          padding-left:12px;
          line-height: 26px;
          font-size:12px;
          font-weight: 400;
          color:#666;
        }
        .right-li{
          position:relative;
          margin:0 16px;
          padding:14px 0;
          border-bottom:1px solid rgba(7, 17, 27, 0.1);
          &:last-of-type{
            border:none;
          }
          .li-img{
            width:56px;
            height:56px;
            border-radius:4px;
            vertical-align: top;
            margin-right:10px;
          }
          .right-con{
            flex:1;
            .con-title{
              color:rgba(7, 17, 27, 1);
              font-size:14px;
            }
            .con-desc,.con-sell{
              font-size:12px;
              color:#999;
              margin:5px 0;
              line-height: 16px;
            }
            .price{
              font-size:12px;
              span{
                margin-right:12px;
                font-size:14px;
              }
            }
          }
          .stepper-wrap{
            position: absolute;
            bottom:10px;
            right:-8px;
          }
        }
      }
    }
    .shopcart-wrap{
      position: fixed;
      bottom:0;
      left:0;
      height:48px;
      width:100%;
      z-index:50;
      background: #141d27;
    }
  }
</style>
