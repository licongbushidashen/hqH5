 <template>
  <view class="service">
    <view v-for="(item,index) in listsss" :key="index" class="service_dev1">
      <h1 @click="testx">{{item.name}}</h1>
      <view class="service_dev2">
        <u-grid col="4" :border="false">
          <u-grid-item v-for="(baseListItem,baseListIndex) in item.items" :key="baseListIndex" @tap="clicks(baseListItem)">
            <u--image :src="urlhttp+baseListItem.icon" width="51px" height="51px" />
            <text class="grid-text" style="margin:8px 0px; color: #282828;font-size:14px">{{baseListItem.name}}</text>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
  </view>
</template>
 <script>
export default {
  data() {
    return {
      listsss: []
    }
  },
  mounted() {
    this.appInfo()
  },
  methods: {
    testx(){
	uni.navigateTo({
				url: `/pages/content/pad`,
			})
    },
    clicks(item) {
      // window.location.href = item.url
      this.openUrlWin(item.url, this)
    },
    appInfo() {
      let data = {}
      this.$res.get(`${this.https}/api/logistics/appInfo/all`, data).then(res => {
        this.listsss = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.service {
  position: relative;
  top: 15px;
  padding: 0px 16px;
  .service_dev1:last-child {
    margin-bottom: 36px;
  }
  .service_dev1 {
    padding: 20rpx 16px 24px 16px;
    background: #ffffff;
    box-shadow: 0px 7px 40px 0px rgba(0, 0, 0, 0.07);
    border-radius: 12px;
    margin-bottom: 12px;
    h1 {
      margin-bottom: 32rpx;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #282828;
    }
    .service_dev2 {
      p {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #282828;
      }
    }
  }
}
</style>

 