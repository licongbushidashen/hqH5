<template>
  <view>
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index" class="list_zx1">
        <view class="list_zx" @click="openurl(item)">
          <h1>{{item.title}}</h1>
          <p>{{item.content}}</p>
          <view style="display:flex;">
            <image :class="'img_'+ind" v-for="(val,ind) in item.img" :key="ind" :src="val" mode="" style="margin:32rpx 0px;width: 202rpx;height: 202rpx;"></image>
          </view>
          <h2>
            <!-- {{item.num}}阅读 -->
            {{item.creationTime |formatDate}}
          </h2>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.articleList()
  },
  methods: {
    articleList() {
      let data = {}
      this.$res.get(`${this.https}/api/logistics/article`, data).then(res => {
        this.list = res.data.items
      })
    },
    scrolltolower() {},
    openurl(item) {
      uni.navigateTo({
        url: `/pages/content/index?id=${item.id}`
      })
    }
  }
}
</script>
<style lang="scss" >
.img_1 {
  margin: 16px 8rpx !important;
}
.list_zx1:first-child {
  margin-top: 20px;
}
.list_zx1 {
  padding: 0rpx 16px 0px 16px;
}
.list_zx {
  padding: 32rpx;
  background: #ffffff;
  box-shadow: 5px 5px 20px 10px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  margin-bottom: 12px;
}
h1 {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #282828;
}
h2 {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  span {
    margin-left: 60rpx;
  }
}
p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #828894;
  overflow: hidden;
  display: -webkit-box; //将元素设为盒子伸缩模型显示
  -webkit-box-orient: vertical; //伸缩方向设为垂直方向
  -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
  margin: 20rpx 0px;
}
</style>
