<template>
  <div class="star z-flex" :style="'letter-spacing:'+letterSpace+'px;'">
    <i v-for="(v,i) in fullStar" class="iconfont icon-full-star orange-color" :style="'font-size:'+size+'px'" :key="'full'+i"></i>
    <i v-if="halfStar" class="iconfont icon-half-star orange-color" :style="'font-size:'+size+'px'"></i>
    <i v-for="(m,n) in emptyStar" class="iconfont icon-empty-star orange-color" :style="'font-size:'+size+'px'" :key="'empty'+n"></i>
  </div>
</template>

<script>
export default {
  props:{
    score:{
      type:Number,
      default(){
        return 5;
      }
    },
    size:{
      type:Number,
      default(){
        return 18;
      }
    },
    letterSpace:{
      type:Number,
      default(){
        return 5;
      }
    },
  },
  computed:{
    fullStar(){
      let actual=Math.floor(this.score*2)/2; // 3.6=>3.5 ; 3.4=>3 ;
      return Math.floor(actual);
    },
    halfStar(){
      let actual=Math.floor(this.score*2)/2; // 3.6=>3.5 ; 3.4=>3 ;
      return actual%1!==0;
    },
    emptyStar(){
      let actual=Math.floor(this.score*2)/2; // 3.6=>3.5 ; 3.4=>3 ;
      if(actual%1!==0){
        return 4 - Math.floor(actual);
      }else{
        return 5 - Math.floor(actual);
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
  .star{
    width:100%;
    justify-content: center;
  }
</style>