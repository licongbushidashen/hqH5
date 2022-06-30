<template>
  <view class="my">
    <view class="my_content">
      <u--image class="my_content_img" :showLoading="true" :src="src" width="70px" height="70px" radius="50%"></u--image>
      <view class="my_content_name">
        <h1>{{name}}</h1>
        <h2>{{phone}}</h2>
      </view>
    </view>
    <view class="qtgn">
      <h1>其他功能</h1>
      <u-cell-group>
         <u-cell title="我的预约" isLink url="/pages/content/venue?value=1"></u-cell>
      </u-cell-group>

    </view>
  </view>
</template>
<script>
import users from '../../../static/img/users.png'
export default {
  data() {
    return {
      src: users,
      name: '',
      phone: ''
    }
  },
  mounted() {
    this.name = this.$store.state.vuex_user.currentUser.name || '--'
    var reg = /(\d{3})\d{4}(\d{4})/ //正则表达式
    // this.phone = this.$store.state.vuex_user.currentUser.phoneNumber.replace(reg, '$1****$2')
    this.phone = this.$store.state.vuex_user.currentUser.userName || '--'
  }
}
</script>
<style lang="scss" scoped>
.my {
  padding: 60rpx 48rpx 0rpx 48rpx;

  background: url('../../../static/img/Ellipse.png') no-repeat;
  background-position-x: 180rpx;
  background-size:100% 100%
}
.qtgn {
  background: #ffffff;
  border-radius: 8px;
  min-height: 276rpx;
  margin-top: 80rpx;
  padding: 24rpx 48rpx;
  box-shadow: 0px 7px 40px 0px rgb(0 0 0 / 7%);

  h1 {
    font-size: 18px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC;
    font-weight: 500;
    color: #282828;
    margin-bottom: 13px;
  }
}
.my_content {
  display: flex;

  .my_content_name {
    flex: 1;
    margin-left: 24rpx;
    h1 {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1b2a3b;
      margin-top: 30rpx;
      margin-bottom: 4rpx;
    }
    h2 {
      font-size: 14px;
      font-family: Helvetica;
      color: #5f6975;
    }
  }
}
</style>

