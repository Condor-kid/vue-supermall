<template>
  <div class="pay" v-show="isShow">
    <div>{{ message }}</div>
    <img src="~assets/img/pay/pay.jpg" alt="" class="img" />
  </div>
</template>

<script>
export default {
  name: "Pay",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    pshow(message = "默认文字", duration = 30000) {
      this.isShow = true;
      this.message = message;
      //   console.log(duration);
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.pay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
  text-align: center;
  /* border-radius: 60%; */
}
.img {
  height: 300px;
  width: 250px;
  /* border-radius: 40%; */
}
</style>