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
          <div class="star-wrap">
            <label>服务态度</label>
            <star :score="seller.serviceScore" :size="18"/>
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="star-wrap">
            <label>描述相符</label>
            <star :score="seller.foodScore" :size="18"/>
            <span>{{seller.foodScore}}</span>
          </div>
          <div class="star-wrap">
            <label>送达时间</label>
            <span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
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

</style>