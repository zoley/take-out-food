<template>
  <div class="ratings-box">
    <div class="ratings-wrap">
      <div class="overview z-flex">
        <div class="overview-left z-flex">
          <div class="score">{{seller.score}}</div>
          <div class="desc">综合评分</div>
          <div class="rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right z-flex">
          <div class="star-wrap z-flex">
            <label>服务态度</label>
            <star :score="seller.serviceScore" :size="16"/>
            <span class="star-score orange-color">{{seller.serviceScore}}</span>
          </div>
          <div class="star-wrap z-flex">
            <label>描述相符</label>
            <star :score="seller.foodScore" :size="16"/>
            <span class="star-score orange-color">{{seller.foodScore}}</span>
          </div>
          <div class="star-wrap z-flex">
            <label>送达时间</label>
            <span class="star-score gray-color">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="separate-line"></div>
    </div>
  </div>
</template>
<script>
import star from '@/components/star/index'
export default {
  props:{
    seller:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
  
    }
  },
  components:{
    star
  },
  mounted() {
    console.log(this.seller);
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.ratings-box{
  height:calc(100vh - 164px);
  overflow:hidden;
  background:#fff;
  .overview{
    width:100%;
    box-sizing: border-box;
    padding:18px 0;
    .overview-left{
      flex:0 0 36%;
      width:36%;
      flex-direction: column;
      justify-content: center;
      border-right:1px solid rgba(7,17,27,0.1);
      .score{
        font-size:24px;
        color:rgb(255,153,0);
      }
      .desc{
        color:rgb(7,17,27);
        font-size:12px;
        margin:10px 0;
      }
      .rate{
        color:rgba(7,17,27,0.5);
        font-size:12px;
      }
    }
    .overview-right{
      flex:1;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left:20px;
      .star-wrap{
        width:100%;
        justify-content: flex-start;
        label{
          flex:0 0 60px;
          width:60px;
        }
        .star{
          width:120px;
          flex:0 0 120px;
          justify-content: flex-start;
        }
        .star-score{
          font-size:14px;
        }
        &:nth-of-type(2){
          margin:10px 0;
        }
      }
    }
    @media screen and (max-width:330px){
      .overview-right{
        padding-left:10px;
        .star-wrap{
          label{
            flex:0 0 52px;
            width:52px;
          }
          .star{
            width:110px;
            flex:0 0 110px;
          }
        }
      }
    }
  }
}

</style>