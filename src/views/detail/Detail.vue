<template>
  <div id="datail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <div class="wrapper">
      <scroll
        class="content"
        ref="scroll"
        :probeType="3"
        @scroll="contentScroll"
      >
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info
          :detail-info="detailInfo"
          @imageLoad="imageLoad"
        ></detail-goods-info>
        <detail-param-info
          :param-info="paramInfo"
          ref="params"
        ></detail-param-info>
        <detail-comment-info
          :comment-info="commentInfo"
          ref="comment"
        ></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    </div>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { backTopMixin } from "common/mixin";

import { debounce } from "common/utils";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    //1、保存传入的id
    this.iid = this.$route.params.iid;

    //2、根据id请求详情数据
    getDetail(this.iid).then((res) => {
      //   console.log(res);
      //1、获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;

      //2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3、创建店铺信息
      this.shop = new Shop(data.shopInfo);

      //4、保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5、获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3、请求详情数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    //4、给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
    }, 200);
  },
  mounted() {
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  },
  updated() {
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  },
  methods: {
    imageLoad() {
      // console.log("123");
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
    },
    contentScroll(position) {
      // console.log(position);
      //获取y值
      const positionY = -position.y;

      //与主题中的值对比
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // console.log(i);
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(i);
        }
      }
      if (
        this.currentIndex !== this.themeTopYs.length - 1 &&
        positionY >= this.themeTopYs[this.themeTopYs.length - 1]
      ) {
        // console.log(this.themeTopYs.length - 1);
        this.currentIndex = this.themeTopYs.length - 1;
        this.$refs.nav.currentIndex = this.currentIndex;
        // console.log(this.currentIndex);
      }

      //是否显示回到顶部
      this.listenShowBackTop(position);
    },
    addToCart() {
      // console.log("123");
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车里面
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.wrapper {
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
</style>