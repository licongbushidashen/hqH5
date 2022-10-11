<template>

  <view  class="" style="padding:10rpx 20rpx" >
    <u-loading-page :loading="loading"></u-loading-page>
    <!-- <u-navbar :title="h" @rightClick="rightClick" @leftClick="leftClick">
    </u-navbar> -->
    <h1 v-if="ShowTitle &&pad" style="    color: #555;font-size:24px;    font-weight: 700;">{{h}}</h1>
    <p v-if="ShowTitle &&pad" style=" color: #555;font-size:14px;margin:10rpx 0px 40rpx 0px">发布时间：{{creationTime | formatDate}}</p>
    <view v-if="!pad" class="contnet" v-html="title1" @click.native="open($event)"></view>
     <view v-if="pad" class="contnet" v-html="title" @click.native="open($event)"></view>
      <view v-if="!pad" class="bottoms"  @click="openphone('5200')"></view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title1:'',
      shows:false,
      content:true,
      loading:true,
      title: '',
      h: '',
      show:false,
      src:'',
      imageUrl:[],
      creationTime:'',
      ShowTitle:true,
      pad:true
    }
  },
  onLoad: function(option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option.id) //打印出上个页面传递的参数。
    console.log(option.name) //打印出上个页面传递的参数。
    this.article(option.id)
    if(option.pad==1){
        this.pad=false
    } 
  },
  methods: {
    open(e){
      if(e.target.nodeName=='IMG' &&this.pad){
       	uni.previewImage({
			urls:[e.target.currentSrc] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
		})
      }
    },

    article(val) {

      this.$res.get(`${this.https}/api/logistics/article/${val}`, {}).then(res => {
        if(this.pad==false &&res.statusCode=='401'){
        window.location.href='http://sso.zhejianglab.com/cas/login'
        }
         this.loading=false
         this.ShowTitle=res.data.howTitle
        this.title = res.data ? res.data.content.content : '暂无数据'
        this.title1= res.data ? res.data.content.content : ''
        this.h = res.data ? res.data.title : '暂无数据'
        this.creationTime = res.data.creationTime
      }).catch(res=>{
      })
    },

    rightClick() {
      console.log('rightClick')
    },
    leftClick() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bottoms{
    background: url('../../static/img/call.png') no-repeat !important; 
    background-size: 100% 100%;
    width: 270px;
    height: 134px;
    position: fixed;
    right: -160px;
    bottom: 0px;
    z-index: 9;
}
 ::v-deep .contnet {
  font-size: 18px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #202020;

  img{
    max-width: 100%;
  }
}

</style>
