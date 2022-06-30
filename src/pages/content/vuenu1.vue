<template>
  <view class="bg">
      <p>请选择场馆类型</p>
    <u-list>
      <u-list-item v-for="(item, index) in indexList" :key="index" class="yy_list_item">
        <div class="yy_list" @click="open(item)">
          <div class="yy_list_det">
            <p class="yy_list_title">
              <u-image
                slot="icon"
                shape="square"
                :src="urlhttp+item.banner"
                class="yy_list_img"
                width="40px"
                height="40px"
                style="float: left; margin-top: 20px;    margin-left: 10px;"
              ></u-image>
              <span class="names">{{ item.name }}</span>
              <span style="float: right; margin-right: 20px; color: #666">></span>
            </p>
          </div>
        </div>
      </u-list-item>
    </u-list>
  </view>
</template>
<script>
export default {
  data() {
    return {
      indexList: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    open(item) {
      uni.navigateTo({
        url: `/pages/content/venueDe?id=${item.id}`
      })
    },
    list() {
      this.$res.get(`${this.https}/api/logistics/reservations/spaceCategory`, {}).then(res => {
        this.indexList = res.data.items
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.bg {
  background: #5282ec;
  padding:100rpx 0px ;
  >p{
      margin-bottom: 80rpx;
      color: #fff;
      text-align: center;
    font-size: 20px;
  }
}
.yy_list_item {
  padding: 0px 40rpx;
}
.yy_list_det {
  height: 160rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 8px;
  line-height: 160rpx;
  padding: 0 20rpx;
}
.names {
  color: #666;
  margin-left: 40rpx;
}
</style>
