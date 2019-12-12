<template>
  <div class="ratings-box" v-show="isShow">
    <div class="ratings-wrap">
      哈哈哈
    </div>
  </div>
</template>

<script>
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
      isShow:false
    }
  },
  mounted() {
    console.log(this.selectedFood);
  },
  methods: {
    showRatings(){
      this.isShow=true;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>