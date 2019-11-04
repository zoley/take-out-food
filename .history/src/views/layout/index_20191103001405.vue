<template>
  <div id="layout">
    <div class="header">header</div>
    <div class="nav z-flex">
      <router-link class="nav-item" to="/goods">商品</router-link>
      <router-link class="nav-item" to="/ratings">评价</router-link>
      <router-link class="nav-item" to="/seller">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{

    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style scoped lang="scss">
  .layout{
    .nav{
      width:100%;
      .nav-item{
        flex:1;
      }
    }
  }
</style>
