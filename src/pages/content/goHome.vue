<template>
  <view style="text-align: center; margin-top: 30%">
    <img src="../../static/img/scuss.png" width="64" alt="" />
    <p style="color: rgba(0, 0, 0, 0.9); font-size: 22px; margin-top: 23px">
      预约成功
    </p>
    <p class="tip">后勤人员将按预约时间提前开启场馆</p>
    <div class="button" style="margin-top: 80rpx">
      <button @click="openurl('home')">返回首页</button>
      <button @click="openurl()">我的预约</button>
    </div>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    openurl(val) {
      if (val == "home") {
        uni.switchTab({
          url: `/pages/tabBar/home/index`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/content/venue?value=${1}`,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  // display: flex;
  padding: 50px;
}
button {
  flex: 1;
  margin-right: 5px;
  height: 94rpx;
  background: #5282ec;
  border-radius: 24px;
  line-height: 94rpx;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  margin-bottom: 40rpx;
  color: #ffffff;
}

.tip {
  margin-top: 20px;
  color: #333;
}
</style>