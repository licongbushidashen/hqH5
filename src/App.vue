<script>
import { mapMutations } from 'vuex'
import { version } from './package.json'
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'

export default {
  onLaunch: function() {
    var query = this.$route.query

    if(query.entry){
            if(query.accessToken){
	          	this.$u.vuex('query_token', query.accessToken)
            }
	uni.navigateTo({
				url: `/pages/content/pad`,
			})
    }
    // this.$res
    //   .get(
    //     'http://zjlab-logistics-auth.demo.wy5u.com/.well-known/openid-configuration',
    //     {},
    //     { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    //   )
    //   .then(res => {
    //     this.contentToken(res.data.token_endpoint)
    //     this.$u.vuex('token_endpoint', res.data.token_endpoint)
    //   })
    // if (query.accessToken) {
    //   // var params = {
    //   //   grant_type: 'onekey',
    //   //   access_token: query.accessToken,
    //   //   client_id: 'Feedbacks_App',
    //   //   client_secret: '1q2w3e*'
    //   // }
    //   var params = {
    //     grant_type: 'onekey',
    //     access_token: query.accessToken,
    //     client_id: 'Feedbacks_App',
    //     client_secret: '1q2w3e*'
    //   }
    //   this.$u.api.getToken(params).then(res => {
    //     if (!res.error) {
    //       this.$u.vuex('vuex_token', res.access_token)
    //       this.$u.api.getLoginUser().then(info => {
    //         if (!res.error) {
    //           this.$u.vuex('vuex_user', info)
    //           this.$u.api.getAbpConfiguration().then(cfg => {
    //             this.$u.vuex('vuex_config', cfg)
    //             if (cfg.auth.grantedPolicies['Feedbacks.Audit']) {
    //               this.$u.vuex('vuex_auditPolices', true)
    //             }
    //             this.$u.route('/pages/feedbacks/index')
    //           })
    //         } else {
    //           this.title = '对不起'
    //           this.info = '进入系统失败，错误码:10022'
    //         }
    //       })
    //     } else {
    //       this.title = '对不起'
    //       this.info = '进入系统失败，错误码:10021'
    //     }
    //   })
    // } else {
    //   if (this.vuex_config.currentUser === undefined || !this.vuex_config.currentUser.isAuthenticated) {
    //     this.title = '非法访问'
    //     this.info = '请从正规途径进入系统'
    //   } else {
    //     this.$u.route('/pages/feedbacks/index')
    //   }
    // }
  },
  onShow: function() {},
  onHide: function() {},
  globalData: {
    test: ''
  },
  methods: {
    ...mapMutations(['setUniverifyErrorMsg', 'setUniverifyLogin']),
    contentToken(url) {
      let data = {
        grant_type: 'password',
        username: 'admin',
        password: '1q2w3E*',
        client_id: 'Logistics_App',
        client_secret: '1q2w3e*'
      }
      this.$res.post(url, data, { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }).then(res => {
        this.$u.vuex('access_token', res.data.access_token)
      })
    }
  }
}
</script>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';

/* H5 兼容 pc 所需 */
/* #ifdef H5 */

@media screen and (min-width: 768px) {
  body {
    overflow-y: scroll;
  }
  body.pages-content-pad uni-page-body{
        /* padding-left: 37px; */
  }
  .pages-content-pad {
    overflow-y: hidden;
  background: #0b0d20 !important;
}

}

/* 顶栏通栏样式 */
/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */
/* #endif */
</style>
