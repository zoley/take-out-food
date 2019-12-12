<template>
  <div class="shop-template">
    <div class="shopcart z-flex" @click="onToggle">
      <div class="cart-icon-wrap">
        <div class="cart-icon z-flex" :class="{highlight:totalCount>0}">
          <i class="iconfont icon-gouwuche"></i>
          <b v-if="totalCount>0" class="select-count red-bg">{{totalCount}}</b>
        </div>
      </div>
      <div class="cart-con z-flex">
        <b class="con-price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</b>
        <div class="con-line"></div>
        <span class="con-desc">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <div
        class="cart-pay z-flex"
        :class="{enough:totalPrice>=minPrice}"
        @click.stop.prevent="toPay"
      >{{payDesc}}</div>
    </div>
    <transition name="slide">
      <div class="shopcart-list" v-show="slideShow">
        <h3 class="z-flex title">
          <span>购物车</span>
          <span class="clear" @click="clearList">清空</span>
        </h3>
        <div class="list-con" ref="listCon">
          <ul>
            <li class="shop-item z-flex" v-for="(item,index) in selectFoods" :key="index">
              <span>{{item.name}}</span>
              <div class="z-flex mr-special">
                <span class="list-price red-color">￥{{item.count*item.price}}</span>
                <stepper :food="item" @add="addFood"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="slideShow" @click="hideList"></div>
    </transition>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition
          class="drop"
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner blue-bg inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import stepper from "../stepper/index";
import BScroll from "better-scroll";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    minPrice: {
      type: Number,
      default() {
        return 20;
      }
    },
    deliveryPrice: {
      type: Number,
      default() {
        return 4;
      }
    }
  },
  computed: {
    totalCount() {
      return this.selectFoods.reduce((prev, cur) => {
        return prev + cur.count;
      }, 0);
    },
    totalPrice() {
      return this.selectFoods.reduce((prev, cur) => {
        return prev + cur.count * cur.price;
      }, 0);
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return "去结算";
      }
    },
    slideShow() {
      if (!this.totalCount) {
        this.open = false;
        return false;
      }
      if (this.open) {
        this.$nextTick(() => {
          if (!this.scrollList) {
            this.scrollList = new BScroll(this.$refs.listCon, {
              scrollY: true,
              click: true
            });
          } else {
            this.scrollList.refresh();
          }
        });
      }
      return this.open;
    }
  },
  components: {
    stepper
  },
  data() {
    return {
      open: false,
      scrollList: null,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    };
  },
  methods: {
    //是否显示购物车详情
    onToggle() {
      if (!this.totalCount) {
        return false;
      }
      this.open = !this.open;
    },
    //清空购物车
    clearList() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    //隐藏列表
    hideList() {
      this.open = false;
    },
    toPay() {
      alert(`去支付${this.totalPrice}元`);
    },
    //小球动起来
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 16);
          el.style.display='';
          el.style.webkitTransform=`translate3d(0,${y}px,0)`;
          el.style.transform=`translate3d(0,${y}px,0)`;
          let inner=el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
          inner.style.transform=`translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el) {
      let rf = el.offsetHeight;//浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`;
        el.style.transform = `translate3d(0,0,0)`;
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        inner.style.transform = `translate3d(0,0,0)`;
      });
    },
    afterDrop(el) {
      let ball=this.dropBalls.shift();
      if(ball.show){
        ball.show=false;
        el.style.display="none";
      }
    },
    addFood(target){
      //优化体验，防止卡顿
      this.$nextTick(() => {
        this.drop(target);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-template {
  width: 100%;
  height: 100%;
  .shopcart {
    justify-content: space-between;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 50;
    color: rgba(255, 255, 255, 0.4);
    background: #141d27;
    .cart-icon-wrap {
      flex: 0 0 80px;
      width: 80px;
      &:after {
        content: "";
        width: 56px;
        height: 56px;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        bottom: 2px;
        left: 12px;
        background: #141d27;
      }
      .cart-icon {
        width: 44px;
        flex: 0 0 44px;
        margin: 0 auto 8px;
        height: 44px;
        position: relative;
        z-index: 2;
        background: #2b343c;
        border-radius: 50%;
        justify-content: center;
        .iconfont {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
        }
        &.highlight {
          background: #409eff;
          .iconfont {
            color: white;
          }
        }
        .select-count {
          position: absolute;
          top: -10px;
          right: -10px;
          color: white;
          width: 24px;
          height: 16px;
          border-radius: 15px;
          line-height: 15px;
          text-align: center;
          font-weight: 400;
        }
      }
    }
    .cart-con {
      flex: 1;
      height: 100%;
      .con-price {
        font-size: 16px;
        &.highlight {
          color: white;
        }
      }
      .con-line {
        height: 24px;
        width: 1px;
        background: rgba(255, 255, 255, 0.1);
        margin: 0 12px;
      }
      .con-desc {
        font-size: 12px;
      }
    }
    .cart-pay {
      width: 106px;
      flex: 0 0 106px;
      height: 100%;
      font-size: 14px;
      justify-content: center;
      background: #2b343c;
      &.enough {
        color: white;
        background: #00b43c;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 49;
    transform: translate3d(0, -100%, 0);
    &.slide-enter-active,
    &.slide-leave-active {
      transition: 0.4s all ease;
    }
    &.slide-enter,
    &.slide-leave-to {
      transform: translate3d(0, 0, 0);
    }
    .title {
      justify-content: space-between;
      padding-left: 18px;
      color: #333;
      height: 40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 14px;
      font-weight: 400;
      .clear {
        cursor: pointer;
        color: rgb(0, 160, 220);
        padding: 10px 18px;
      }
    }
    .list-con {
      max-height: 50vh;
      overflow: hidden;
      ul {
        padding-bottom: 16px;
        .shop-item {
          justify-content: space-between;
          margin: 0 18px;
          height: 48px;
          font-size: 14px;
          color: rgb(7, 17, 27);
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .mr-special {
            margin-right: -8px;
            .list-price {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 48;
    background: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
    &.fade-enter-active,
    &.fade-leave-active {
      opacity: 1;
      transition: 0.4 all ease;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }
  .ball-container {
    .ball{
      position: fixed;
      left: 32px;
      bottom: 16px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transition: all 0.4s linear;
      }
    }
  }
}
@media screen and (max-width: 340px) {
  .shop-template {
    .shopcart {
      .cart-icon-wrap {
        flex: 0 0 72px;
        width: 72px;
        &:after {
          left: 8px;
        }
      }
      .cart-con {
        flex: 1;
        height: 100%;
        .con-price {
          font-size: 16px;
        }
        .con-line {
          height: 24px;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 12px;
        }
        .con-desc {
          font-size: 12px;
        }
      }
      .cart-pay {
        width: 84px;
        flex: 0 0 84px;
      }
    }
  }
}
</style>