<template>
	<!-- <scroll-view class="scrolls "> -->
	<view class="scrolls">
		<u-toast ref="uToast"></u-toast>
		<view class="home">
			<view class="search" v-if="false">
				<u-search placeholder="请输入搜索关键词" v-model="keyword" :showAction="false"></u-search>
			</view>
			<u-tabs v-if="false" :current="current" style="margin-top: 24rpx" @click="changes" :list="list" lineColor="#282828" lineHeight="6" lineWidth="120" :is-scroll="false" :activeStyle="{
          color: '#202020',
          fontWeight: 'bold',
          fontSize: '54rpx',
          transform: 'scale(1.05)'
        }" :inactiveStyle="{
          color: '#202020',
          fontSize: '36rpx',
          transform: 'scale(1)'
        }"></u-tabs>
			<!-- <view class="tabs_new">
        <div v-for="(item,index) in list" :key="index" @click="changes" :class="current==index?'active':''">
          <text>{{item.name}}</text>
        </div>
      </view> -->
			<view v-if="urls == 0">
				<u-swiper class="swipersIMG" style="margin-top: 32rpx; margin-left: 20px" height="600rpx" @click="swiperOpen" :list="list1s" previousMargin="0" nextMargin="120" circular :autoplay="false" radius="5" bgColor="#ffffff"></u-swiper>
				<!-- :class="swiperList1==0?'not_dot':''" -->
				<swiper :indicator-dots="swiperList1.length ? true : false" class="swiper" style="margin-top: 48rpx" :style="heightlg()">
					<swiper-item>
						<u-grid :border="true">
							<u-grid-item :customStyle="{ width: '25%' }" v-for="(item, index) in swiperList" :index="index" :key="index" @click="swiperOpen1(item)">
								<!-- <u-icon :customStyle="{paddingTop:20+'rpx'}" :size="22" class="icon icon-tongzhi"></u-icon> -->
								<u--image :src="urlhttp + item.icon" width="51px" height="51px" />
								<text class="grid-text" style="margin: 12px 0px 20px 0px; color: #6E6E6E;font-weight: 400; font-size: 13px;font-family: PingFangSC-Regular, PingFang SC;">{{ item.name }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
					<swiper-item v-if="swiperList1.length > 0">
						<u-grid :border="true">
							<u-grid-item :customStyle="{ width: '25%' }" v-for="(item, index) in swiperList1" :index="index + 9" :key="index" @click="swiperOpen1(item)">
								<u--image :src="urlhttp + item.icon" width="51px" height="51px" />
								<text class="grid-text" style="margin: 8px 0px; color: #282828; font-size: 14px">{{ item.name }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
					<swiper-item v-if="swiperList2.length > 0">
						<u-grid :border="true">
							<u-grid-item :customStyle="{ width: '25%' }" v-for="(item, index) in swiperList2" :index="index + 9" :key="index" @click="swiperOpen1(item)">
								<u--image :src="urlhttp + item.icon" width="51px" height="51px" />
								<text class="grid-text" style="margin: 8px 0px; color: #282828; font-size: 14px">{{ item.name }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<!-- <u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
          <view v-for="(item, index) in swiperList" :key="index">
            <u-icon :customStyle="{paddingTop:20+'rpx'}" :size="22" class="icon icon-tongzhi"></u-icon>
            <text class="grid-text">{{item.title}}</text>
          </view>
        </u-scroll-list> -->
				<view class="fw">
					<view class="fw_flex">
						<view class="fw_flex_title">后勤综合事务 </view>
						<p href="tel:0571-58005104"  @click="openphone('0571-58005104')"><a href="tel:0571-58005104" @click="openphone('0571-58005104')">0571-58005104</a></p>
						<span class="zxfw" @click="serviceManual()">查看专项服务</span>
						<i class="fzbg"></i>
					</view>
				</view>
				<view class="zjsh">
					<h1>之江生活</h1>
					<view class="zjsh_all">
						<view v-for="(item, index) in zjsh" :key="index" style="position: relative" class="zjsh_all_one" :style="zjshbg(item, index)" @click="swiperOpen1(item)">
							<h1>{{ item.title }}</h1>
							<p v-html="item.intro"></p>
							<u--image mode="aspectFit" :src="urlhttp + item.coverImage" :width="item.fill > 0 ? '127px' : '40px'" :height="item.fill > 0 ? '80px' : '40px'" style="position: absolute; right: 14px; bottom: 25%" :class="item.fill > 0 ? 'posta' : ''" />
						</view>
					</view>
				</view>
				<view class="notice">
					<h1>
						公告通知
						<!-- openAll -->
						<span @click="articles(10)">更多
							<i>></i>
						</span>
					</h1>
					<u-list  class="unheight">
						<u-list-item class="list_notice" v-for="(item, index) in indexList" :key="index">
							<h1  @tap="article(item)">{{ item.title }}</h1>
							<p  @tap="article(item)"  style="margin-top: 4px">
								<!-- 来源：{{item.creatorId}} -->
								{{ item.creationTime | formatDate }}
							</p>
							<view  @tap="article(item)" class="item-attachments" v-if="item.imgs.length > 0" :style="stylegl(item.imgs.length)">
								<view v-for="(img, index) in item.imgs" :key="index">
									<image :src="img" mode="aspectFill"> </image>
								</view>
							</view>
							<u-cell title="停车坐爱枫林晚" :isLink="true" arrow-direction="left"></u-cell>
						</u-list-item>
					</u-list>
				</view>
			</view>
			<!-- <view class="tabs1" v-if="urls==1"></view> -->
			<view v-if="urls == 1">
				<Service />
			</view>
			<Consult v-if="urls == 2" />
		</view>
	</view>
	<!-- </scroll-view> -->
</template>
<script>
document.getElementsByTagName('title')[0].innerText = '之江后勤服务'
import Service from './service.vue'
import Consult from './consult.vue'
// import test from '../../../static/img/test.png'
import qd from '../../../static/img/qd.png'
import sc from '../../../static/img/sc.png'
export default {
	components: {
		Service,
		Consult,
	},
	data() {
		return {
			current: 0,
			indicator: true,
			urls: 0,
			indexList: [],
			zjsh: [],
			zjsh2: [],
			keyword: '',
			src1: sc,
			src2: qd,
			flag: false,
			swiperList: [],
			swiperList1: [],
			swiperList2: [],
			list1: [],
			list1s: [],
			list: [
				{
					name: '推荐',
				},
				{
					name: '服务',
				},
				{
					name: '通知',
				},
				{
					name: '关于',
				},
			],
		}
	},
	mounted() {
		// document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.width = '50px'
		// document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.left = `-20px`
		var query = this.$route.query
		// this.$res.get(this.rzs, {}, { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }).then(res => {
		//   this.contentToken(res.data.token_endpoint)
		//   this.$u.vuex('token_endpoint', res.data.token_endpoint)
		// })
		if( query.accessToken){
		this.$u.vuex('query_token', query.accessToken)
		}


		if (query.accessToken || localStorage.getItem('query_token')) {
			if (query.accessToken) {
				localStorage.setItem('query_token', query.accessToken)
			}
			// var params = {
			//   grant_type: 'onekey',
			//   access_token: query.accessToken,
			//   client_id: 'Feedbacks_App',
			//   client_secret: '1q2w3e*'
			// }
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
						this.articleList()
						this.banner(1)
						this.banner(0)
						this.recommend()
						this.$res
							.get(
								`${this.https}/api/abp/application-configuration`
							)
							.then((info) => {
								if (!res.error) {
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
								}
							})
					} else {
						this.title = '对不起'
						this.info = '进入系统失败，错误码:10021'
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
		zjshbg(item, index) {
			// item.fill
			let cindex = (index + 1) % 2
			let rindex = Math.round(index / 2)
			let style = ''
			if (item.fill) {
				if (cindex == 0 && this.zjsh.length - (index + 1) >= 2) {
					style = `background:${item.bgColor};grid-column-start:${
						cindex + 2
					};grid-column-end:${
						cindex + 2
					};grid-row-start:${rindex};grid-row-end:${
						rindex + 2
					};height:100%`
				}
				if (cindex == 1 && this.zjsh.length - (index + 1) >= 2) {
					style = `background:#fff;grid-column-start:${cindex};grid-column-end:${cindex};grid-row-start:${
						rindex + 1
					};grid-row-end:${rindex + 3};height:100%`
				}
				if (cindex == 0 && this.zjsh.length - (index + 1) < 2) {
					style = `background:#fff;grid-column-start:${
						cindex + 2
					};grid-column-end:${
						cindex + 2
					};grid-row-start:${rindex};grid-row-end:${
						rindex + 12
					};height:100%`
				}
				if (cindex == 1 && this.zjsh.length - (index + 1) < 2) {
					style = `background:#fff;grid-column-start:${cindex};grid-column-end:${cindex};grid-row-start:${
						rindex + 1
					};grid-row-end:${rindex + 12};height:100%`
				}
				//         if(index==1){
				//    style= `background:${item.bgColor};grid-column-start:${index+1};grid-column-end:${index+1};grid-row-start:${index};grid-row-end:${index+2};height:100%`
				//         } if(index==2){
				//  style= `background:${item.bgColor};grid-column-start:1;grid-column-end:1;grid-row-start:${index};grid-row-end:${index+2};height:100%`
				//         } if(index==3){
				//  style= `background:${item.bgColor};grid-column-start:2;grid-column-end:2;grid-row-start:${index-1};grid-row-end:${index+1};height:100%`
				//         } if(index==4){
				//   style= `background:${item.bgColor};grid-column-start:1;grid-column-end:1;grid-row-start:${index-1};grid-row-end:18;height:100%`
				//         } if(index==5){
				//   style= `background:${item.bgColor};grid-column-start:2;grid-column-end:2;grid-row-start:3;grid-row-end:18;height:100%`
				//         }
				return style
			} else {
				return `background:#fff`
			}
		},
		heightlg() {
			let m =
				this.swiperList1.length > 0 ? 'height:400rpx' : 'height:355rpx'
			return m
		},
		stylegl(len) {
			if (len > 6) {
				return ' grid-template-rows: repeat(3, 120px);'
			} else if (len > 3) {
				return ' grid-template-rows: repeat(2, 120px);'
			} else {
				return ' grid-template-rows: repeat(1, 120px);'
			}
		},
		openAll() {
			this.current = 2
			this.urls = 2
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100,
			})
		},
		article(item) {
			uni.navigateTo({
				url: `/pages/content/index?id=${item.id}`,
			})
		},
		articles(item) {
			uni.navigateTo({
				url: `/pages/tabBar/home/list?id=${item}`,
			})
		},
		venue(item) {
			uni.navigateTo({
				url: `/pages/content/venue?id=${item}`,
			})
		},
		serviceManual() {
			uni.navigateTo({
				url: `/pages/content/serviceManual`,
			})
		},
		swiperOpen(index) {
			if (this.list1[index].flag == 0 && !this.list1[index].url) {
				return
			} else {
				if (this.list1[index].url.indexOf('http') >= 0) {
					this.openUrlWin(this.list1[index].url, this)
				} else {
					uni.navigateTo({
						url: this.list1[index].url,
					})
				}
			}
			// window.location.href = 'http://www.baidu.com'
			// window.location.href = `${this.list1[index].url}`
		},
		swiperOpen1(item) {
			if (item.flag == 0 && !item.url) {
				this.$refs.uToast.show({
					// type: 'error',
					message: '正在建设，敬请期待',
				})
			} else {
				if (item.url.indexOf('http') >= 0) {
					  if(item.url.indexOf('bpm')>-1){
							item.url=item.url+'&accessToken='+localStorage.query_token+'#/form/detail'
							 window.location.href=item.url
						}else{
this.openUrlWin(item.url, this)
						}
						
					// 
				} else {
					uni.navigateTo({
						url: item.url,
					})
				}
			}
		},
		contentToken(url) {
			let data = {
				grant_type: 'password',
				username: 'admin',
				password: '1q2w3E*',
				client_id: 'Logistics_App',
				client_secret: '1q2w3e*',
			}
			this.$res
				.post(url, data, {
					'content-type':
						'application/x-www-form-urlencoded;charset=UTF-8',
				})
				.then((res) => {
					this.$u.vuex('access_token', res.data.access_token)
					this.articleList()
					this.banner(1)
					this.recommend()
				})
		},
		articleList() {
			let data = { Category: 10 }
			this.$res
				.get(`${this.https}/api/logistics/article`, data)
				.then((res) => {
					for (let i = 0; i < res.data.items.length; i++) {
						let imgs = res.data.items[i].coverImage.split(',')
						imgs = imgs.filter((e) => {
							if (e != '') {
								return e
							}
						})
						for (let i = 0; i < imgs.length; i++) {
							imgs[i] = this.urlhttp + imgs[i]
						}
						res.data.items[i].imgs = imgs
					}
					console.log(res.data.items)
					this.indexList = res.data.items.splice(0,5)
				})
		},
		recommend() {
			let data = {}
			this.$res
				.get(`${this.https}/api/logistics/appInfo/recommend`, data)
				.then((res) => {
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].icon = `${res.data[i].icon}?accessToken=${
							this.$store.state.query_token ||
							localStorage.getItem('query_token')
						}`
					}
					if (res.data.length > 16) {
						this.swiperList = res.data.splice(0, 8)
						this.swiperList1 = res.data.splice(0, 8)
						this.swiperList2 = res.data
					} else if (res.data.length > 8) {
						this.swiperList = res.data.splice(0, 8)
						this.swiperList1 = res.data
					} else {
						this.swiperList = res.data
					}
				})
		},
		banner(val) {
			let data = { category: val }
			this.$res
				.get(`${this.https}/api/logistics/banner`, data)
				.then((res) => {
					if (val == 0) {
						for (var i = 0; i < res.data.items.length; i++) {
							res.data.items[i].image =
								res.data.items[i].coverImage
							this.list1s.push(
								`${this.urlhttp}${res.data.items[i].coverImage}`
							)
						}
						this.list1 = res.data.items
					} else {
						for (var i = 0; i < res.data.items.length; i++) {
							res.data.items[i].intro = res.data.items[i].intro
								? res.data.items[i].intro.replace(
										/\r\n/,
										'<br/>'
								  )
								: res.data.items[i].intro
						}
						this.zjsh = res.data.items
					}
				})
		},
		changes(item) {
			console.log(item)
			item.currentTarget
			this.urls = item.index
			// if (item.index == 3) {
			//   this.flag = true
			//   document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.width = item.rect.width + 'px'
			//   document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.left = `-70px`
			// } else {
			//   document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.width = item.rect.width - 33 + 'px'
			//   if (this.flag) {
			//     this.flag = false
			//     if (this.urls == 0) {
			//       document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.left = `-11px`
			//     } else {
			//       document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.left = this.urls == 2 ? `20px` : `0px`
			//     }
			//   } else {
			//     document.getElementsByClassName('u-tabs__wrapper__nav__line')[0].style.left = `-20px`
			//   }
			// }
		},
	},
}
</script>
<style lang="scss">
.swipersIMG{
background: none !important;
}
.tabs_new {
	display: flex;
	position: relative;

	> div {
		flex: 1;
		color: #202020;
		font-size: 36rpx;
	}
	.active {
		color: #202020;
		font-weight: bold;
		font-size: 54rpx;
	}
}
.tabs_new::after {
	content: '';
	background: #282828;
	height: 3px;
	display: block;
	position: absolute;
	bottom: -3px;
	transform: translate(94.8359px);
	transition-duration: 300ms;
	width: 10px;
}
.tabs1 {
	z-index: -9;
	position: absolute;
	top: 80rpx;
	background: url('../../../static/img/stz.png');
	height: 600px;
	width: 100%;
}
.notice .list_notice {
	background: #FFFFFF;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 10px;
	h1 {
		font-size: 16px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #1E243A;
	}
	p {
		font-size: 12px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #A3A9B0;
		// &::after {
		// 	content: '';
		// 	display: block;
		// 	height: 1px;
		// 	background: #efefef;
		// 	width: 100%;
		// 	margin: 12px 0px;
		// }
		span {
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			float: none;
			margin-left: 16px;
		}
	}
}
.notice {
	padding: 0px 16px;
	margin-top: 20px;
	> h1 {
		font-size: 20px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #282828;
		margin-bottom: 16px;
	}
	span {
		float: right;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		i {
			font-size: 10px;
			color: #cccccc;
		}
	}
}
// .zjsh_all_one:nth-child(2n) {
//   margin-left: 9px;
//   margin-bottom: 8px;
// }
.zjsh_all_one:last-child {
	margin-left: 0px;
	margin-bottom: 0px;
}
.zjsh_all_one0 {
	background: url('../../../static/img/yikatong.png');
	position: relative;
}
.zjsh_all_one1 {
	grid-column-start: 1;
	grid-column-end: 1;
	grid-row-start: 3;
	grid-row-end: 5;
	height: 100% !important;
}
.zjsh_all_one1:nth-child(2) {
	grid-column-start: 1;
	grid-column-end: 1;
	grid-row-start: 1;
	grid-row-end: 3;
	height: 100% !important;
}
.zjsh_all_one2 {
	background: url('../../../static/img/bgs.png');
}
.zjsh_all_one3 {
	background: url('../../../static/img/hys.png');
}
.zjsh_all_one4 {
	background: url('../../../static/img/aqzj.png');
	height: 176px !important;
}
.zjsh_all_one5 {
	background: url('../../../static/img/car.png') no-repeat;
	background-size: 36% 62%;
	background-color: #ddeaf3;
	border-radius: 4px;
	background-position-x: 180rpx;
	background-position-y: 20rpx;
}
.zjsh_all_one6 {
	background: url('../../../static/img/ril.png') no-repeat;
	background-color: #f9e5e1;
	background-size: 31%;
	border-radius: 4px;
	background-position-x: 180rpx;
	background-position-y: 36rpx;
	position: absolute;
	bottom: 0px;
	right: 0px;
}
.zjsh_all {
	position: relative;
	display: grid;
	flex-wrap: wrap;
	justify-content: space-around;
	grid-template-columns: repeat(2, 50%);
	grid-column-gap: 8px;
	grid-row-gap: 8px;
	> .zjsh_all_one {
		min-width: 334rpx;
		height: 83px;
		border-radius: 8px;
		h1 {
			margin: 14px 0px 0px 10px;
			margin-bottom: 5px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #282828;
		}
		p {
			white-space: pre-wrap;
			margin-left: 10px;
			font-size: 10px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #282828;
		}
	}
}
.zjsh {
	padding: 0px 32rpx;
	h1 {
		margin: 18px 0px;
		font-size: 20px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #282828;
	}
}
.fw_flex_img {
	padding-top: 20rpx;
}
.fw {
	padding: 10px 12px;
	position: relative;
	// display: flex;
	height: 240rpx;
	margin-top: 5px;
	.fw_flex {
		height: 100%;
		padding-top: 11px;
		background: #d1f8eb;
		border-radius: 4px;
		padding-left: 58rpx;
		.fzbg {
			background: url('../../../static/img/fzbg.png');
			width: 256rpx;
			height: 210rpx;
			display: inline-block;
			position: absolute;
			top: 50rpx;
			right: 60rpx;
		}
		.zxfw {
			background: #00b8bb;
			border-radius: 11px;
			padding: 5rpx 23rpx;
			font-size: 13px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
			margin-top: 32rpx;
			display: inline-block;
		}
		.phone {
			background: url('../../../static/img/phone.png');
			width: 32px;
			height: 32px;
			display: inline-block;
			position: absolute;
			right: 10%;
			bottom: 22%;
		}
		p {
			padding: 4px 8px;
			width: 300rpx;
			background: rgba(255, 255, 255, 0.9);
			border-radius: 11px;
			position: relative;
			&::after {
				content: '';
				background: url('../../../static/img/phone.png');
				width: 80rpx;
				height: 80rpx;
				display: inline-block;
				position: absolute;
				top: -3px;
				right: -8px;
			}
			a {
				font-size: 15px;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #19c6cb;
				letter-spacing: 1px;
				text-decoration: none;
				position: relative;
				top: -1px;
			}
			.uni-label-pointer {
				width: 90px;
				display: inline-block;
			}
		}
		.fw_flex_title {
			font-size: 18px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #284772;
			letter-spacing: 1px;
			width: 290rpx;
			margin-bottom: 24rpx;
		}
	}
}
.icon {
	font-weight: normal !important;
}
.u-border-bottom {
	border-bottom-width: 0px !important;
}
.u-border-right {
	border-right-width: 0px !important;
	border-color: #dadbde !important;
	border-right-style: solid;
}
.swiper {
	// padding: 0px 16px;
}
.tabs_now {
}
.back {
	height: 20px;
}
.scrolls {
	padding-top: 20rpx;
}
.search {
	padding: 0px 16px;
	.u-search__content {
		height: 36px !important;
	}
}
.mc {
	background: #0000003d;
	width: 61px;
	height: 61px;
	position: absolute;
	top: 0px;
}
.posta {
	right: 12% !important;
	bottom: 12% !important;
}
</style>

<style lang="scss">
.not_dot {
	::v-deep .uni-swiper-dots {
		display: none !important;
	}
}
.item-attachments {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-template-rows: repeat(2, 100px);
	margin: 8px 0px;
	grid-row-gap: 2%;
	grid-column-gap: 1%;
	uni-image {
		height: 100% !important;
		width: 100% !important;

		div {
			background-position: center center;
			background-size: 100% !important;
			background-repeat: no-repeat;
		}
	}
}
::v-deep .u-album__row__wrapper {
	flex: 1;
	height: 75px;
	max-width: 33%;
	justify-content: left;
}
::v-deep .u-album__row {
	margin-bottom: 10px;
}
.album {
	@include flex;
	align-items: flex-start;

	&__avatar {
		background-color: $u-bg-color;
		padding: 5px;
		border-radius: 3px;
	}

	&__content {
		margin-left: 10px;
		flex: 1;
	}
}.unheight{
	height: auto !important;
}
</style>
