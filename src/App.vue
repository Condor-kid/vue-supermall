<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <mainTabbar v-show="this.$route.path.indexOf('detail') === -1"></mainTabbar>
  </div>
</template>

<script>
import mainTabbar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    mainTabbar,
  },
};
</script>

<style scoped>
@import "assets/css/base.css";
/* .mainTabbar {
  z-index: 7;
} */
</style>
