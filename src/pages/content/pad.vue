<template>

  <view class="pad">
    <u-loading-icon text="加载中" textSize="18" :show="show"></u-loading-icon>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index" :class="'img' + (index + 1)"
          @click.stop="open(item)">
          <div v-if="index + 1 == 1" style="        padding-top: 23px;">
            <img style=" height: 149px;" v-if="index + 1 == 1" src="../../static/img/pad11.png" alt="">
            <img style=" height: 149px;" v-if="index + 1 == 2" src="../../static/img/pad12.png" alt="">
            <img style=" height: 149px;" v-if="index + 1 == 3" src="../../static/img/pad13.png" alt="">
            <p>{{ item.name }}</p>
            <h1>{{ item.content }}</h1>
            <!-- <img src="../../static/img/jiantou.png"  style="position: absolute;width: 32px;
    bottom: 12%;
    left: 43%;" alt=""> -->
          </div>
          <div v-else style="    padding-left: 50px;    padding-right: 50px;    padding-top: 23px;"
            @click.stop="open(item)">
            <img style=" height: 149px;" v-if="index + 1 == 1" src="../../static/img/pad11.png" alt="">
            <img style=" height: 149px;" v-if="index + 1 == 2" src="../../static/img/pad12.png" alt="">
            <img style=" height: 149px;" v-if="index + 1 == 3" src="../../static/img/pad13.png" alt="">
            <p>{{ item.name }}</p>
            <h1>{{ item.content }}</h1>
            <!-- <img src="../../static/img/jiantou.png" style="position: absolute;width: 32px; 
    bottom: 12%;
    left: 43%;" alt=""> -->
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <!-- <div class="swiper-pagination"></div> -->
      <view class="bottoms" @click="openphone('5200')"></view>
    </div>
  </view>

</template>

  <script>
import pad1 from '../../static/img/pad11.png'
import pad2 from '../../static/img/pad12.png'
import pad3 from '../../static/img/pad13.png'

export default {
  data() {
    return {
      test: '',
      show: false,
      list: [
        {
          url: '/pages/content/index?id=3a03e209-a5a3-d6b3-878a-2225f97a8983&pad=1',
          name: '补充零食',
          content: '补充想要的零食',

        },
        {
          url: '/pages/content/index?id=3a03e20a-695b-25f6-4885-3dd0627c3dcf&pad=1',
          name: '代取快递',
          content: '帮忙代取快递'
        }, {
          url: '/pages/content/index?id=3a044e53-40c2-7302-b9f5-c0a40a6f5611&pad=1',
          name: '准备茶水',
          content: '准备茶水'
        },

      ],
    }
  },
  mounted() {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
 
    var query = this.$route.query
    if (query.accessToken) {
      this.$u.vuex('query_token', query.accessToken)
    }
    if (query.accessToken || localStorage.getItem('query_token')) {
      this.show = true
      if (query.accessToken) {
        localStorage.setItem('query_token', query.accessToken)
      }
      var params = {
        grant_type: 'onekey',
        access_token:
          query.accessToken || localStorage.getItem('query_token'),
        client_id: 'Logistics_App',
        client_secret: '1q2w3e*',
      }
      this.$res
        .post(this.rzss, params, {
          'content-type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        })
        .then((res) => {
          if (!res.error) {
            this.$u.vuex('vuex_token', res.data.access_token)
            this.$res
              .get(
                `${this.https}/api/abp/application-configuration`
              )
              .then((info) => {
                if (!res.error) {
                  this.show = false
                  this.$u.vuex('vuex_user', info.data)
                  localStorage.setItem(
                    'vuex_userId',
                    info.data.currentUser.id
                  )
                  // this.$u.api.getAbpConfiguration().then(cfg => {
                  //   this.$u.vuex('vuex_config', cfg)
                  //   if (cfg.auth.grantedPolicies['Feedbacks.Audit']) {
                  //     this.$u.vuex('vuex_auditPolices', true)
                  //   }
                  //   this.$u.route('/pages/feedbacks/index')
                  // })
                } else {
                  this.title = '对不起'
                  this.info = '进入系统失败，错误码:10022'
                  window.location.href='http://sso.zhejianglab.com/cas/login'
                }
              })
          } else {
            this.title = '对不起'
            this.info = '进入系统失败，错误码:10021'
            window.location.href='http://sso.zhejianglab.com/cas/login'
          }
        })
    } else {
      if (
        this.vuex_config.currentUser === undefined ||
        !this.vuex_config.currentUser.isAuthenticated
      ) {
        this.title = '非法访问'
        this.info = '请从正规途径进入系统'
      } else {
        this.$u.route('/pages/feedbacks/index')
      }
    }

  },
  methods: {
    open(item) {
      uni.navigateTo({
        url: item.url,
      })
    }
  }
}
</script>

<style>
.u-loading-icon {

  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c8c9cc;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #00000087;
}

body {
  background: #0b0d20;
}

img {}

.swiper-wrapper {
  padding-left: 37px;
}

.bottoms {
  background: url('../../static/img/call.png') no-repeat !important;
  background-size: 100% 100%;
  width: 270px;
  height: 134px;
  position: fixed;
  right: -1px;
  bottom: -10px;
  z-index: 9;
}

.img1,
.img2,
.img3 {

  border-radius: 34px;
  display: block !important;
}

.img1 {
  background-color: #0000 !important;
  background: url('../../static/img/pad1.png') no-repeat !important;
  background-size: 100% 100% !important;
}

.img2 {
  background-color: #0000 !important;
  background: url('../../static/img/pad2.png') no-repeat !important;
  background-size: 100% 100% !important;
  margin-right: 7px !important;
  margin-left: 7px !important;
}

.img3 {
  background-color: #0000 !important;
  background: url('../../static/img/pad3.png') no-repeat !important;
  background-size: 100% 100% !important;
}

/deep/.u-swiper {
  height: 50% !important;
  background-color: rgb(255 255 255 / 0%) !important;
  top: 25%;
}

.u-swiper__wrapper__item {
  width: 33% !important;
}

/* .pad> div{
      background: #0b0d20;
} */
.pad {
  width: 100%;
  height: 100%;
  background: #0B0D20;
  overflow: hidden;
}

uni-page-body {
  height: 100%;
}
</style>
  <style>
p {

  font-size: 26px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 24px;
}

h1 {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  top: 22px;
  position: relative;
  height: 356px;
  /* padding-left: 37px; */
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.9);
}

.img1.swiper-slide-active {
  margin-right: 0px !important;
  padding-right: 0px !important;
}

.swiper-slide-active,
.swiper-slide-duplicate-active {
  /* transform: scale(0.83,0.9); */
}

.swiper-slide-active+div {
  transform: scale(0.9);
}
</style>