<template>
  <div id="datail">
    <detail-nav-bar class="detail-nav"> </detail-nav-bar>
    <div class="wrapper">
      <scroll class="content">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
      </scroll>
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

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
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
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
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
    });
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