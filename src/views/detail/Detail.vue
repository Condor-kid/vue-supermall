<template>
  <div id="datail">
    <detail-nav-bar> </detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import { getDetail } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    //1、保存传入的id
    this.iid = this.$route.params.iid;

    //2、根据id请求详情数据
    getDetail(this.iid).then((res) => {
      //   console.log(res);
      //获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
    });
  },
};
</script>

<style>
</style>