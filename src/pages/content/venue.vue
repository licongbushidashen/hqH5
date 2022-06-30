<template>
	<view>
    <u-modal :show="show" @confirm="confirm" ref="uModal" :asyncClose="true" :show-cancel-button="true" @cancel="show=false">
      	<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
    </u-modal>
		<u-toast ref="uToast"></u-toast>
		<!--  @scrolltolower="scrolltolower" -->
		<u-list v-if="value==0">
			<u-list-item v-for="(item, index) in indexList" :key="index" class="yy_list_item">
				<div class="yy_list" @click="open(item)">
					<u-image slot="icon" shape="square" :src="item.banner" class="yy_list_img"></u-image>
					<div class="yy_list_det">
						<p class="yy_list_title">{{item.name}}

						</p>
						<div>
							<span class="yy_list_all" style="color:#fff">已有0人参加</span>
							<span class="yy_list_ment">立即预约</span>
						</div>
					</div>
				</div>
			</u-list-item>
		</u-list>
		<u-list v-if="value==1">
			<u-list-item v-for="(item, index) in indexList1" :key="index" class="yy_list_item1">
				<div class="yy_list1" style="position: relative;">
					<div class="yy_list_det">
            		<p class="yy_list_val">
							<label>预约类型:</label>
							<span>{{item.schedule.space.category.name}}</span>
						</p>
						<p class="yy_list_val">
							<label>预约场馆:</label>
							<span>{{item.schedule.space.name}}</span>
						</p>
						<p class="yy_list_val">
							<label>预约地址:</label>
							<span>{{item.schedule.space.address}}</span>
						</p>
            	<p class="yy_list_val">
							<label>预约日期:</label>
							<span>{{item.schedule.day | formatDate('yyyy-MM-dd')}}</span>
						</p>
						<p class="yy_list_val">
							<label>预约场次:</label>
							<span>{{item.schedule.site.name}}({{item.schedule.site.startOn}}-{{item.schedule.site.endOn}})</span>
						</p>
					

						<!-- <p class="yy_list_val">
                            <label>手机号:</label>
                            <span>18733575555</span>
                        </p> -->
						<div>

							<span class="yy_list_ment1" v-if="item.flag==1" @click="listput(item)">取消预约</span>
							<img v-else src='../../static/img/quxiao.png' style="position: absolute;    top: 15px;    right: 15px; width:160rpx" alt="">
						</div>
					</div>
				</div>
			</u-list-item>
		</u-list>
		<!-- <u-tabbar :value="value" @change="change" :fixed="false" :placeholder="false" :safeAreaInsetBottom="false">
            <u-tabbar-item text="预约" icon="home"></u-tabbar-item>
            <u-tabbar-item text="我的预约" icon="photo"></u-tabbar-item>
        </u-tabbar> -->
	</view>
</template>
<script>
export default {
	data() {
		return {
			value: 0,
			indexList: [],
			indexList1: [],
      	show: false,
        val:{},
        content:'是否确认取消'
		}
	},
	onLoad: function (option) {
		if (option.value == 1) {
			this.value = 1
		} else {
			this.value = 0
		}
		// this.spaceId = option.id
	},
	mounted() {
		// this.list()
		this.list1()
	},
	methods: {
		open(item) {
			uni.navigateTo({
				url: `/pages/content/venueDe?id=${item.id}`,
			})
		},
		change(e) {
			console.log(e)
			this.value = e
		},
		scrolltolower() {
			this.list()
		},
		list1() {
			this.$res
				.get(`${this.https}/api/logistics/reservations/reservation`, {
					UserId: localStorage.getItem('vuex_userId'),
				})
				.then((res) => {
					this.indexList1 = res.data.items
				})
		},
		listput(val) {
      this.show=true
		this.val=val
		},
    confirm(){
      	let data = {
				flag: 0,
				userId: this.val.userId,
				scheduleId: this.val.scheduleId,
			}
			this.$res
				.put(
					`${this.https}/api/logistics/reservations/reservation?id=${this.val.id}`,
					data
				)
				.then((res) => {
          this.show = false;
					this.$refs.uToast.show({
						type: 'default',
						message: '取消成功',
					})
					this.list1()
				})
    },
		list() {
			this.$res
				.get(
					`${this.https}/api/logistics/reservations/spaceCategory`,
					{}
				)
				.then((res) => {
					this.indexList = res.data.items
				})
		},
	},
}
</script>
<style lang="scss" scoped>
.yy_list_ment1 {
	background: #ffffff;
	border-radius: 16px;
	border: 1px solid #5282ec;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #5282ec !important;
	width: 90%;
	text-align: center;
	margin-top: 20px;
	height: 36px;
	line-height: 36px;
      display: inline-block;
    margin-left: 8px !important;
}
.yy_list_ment1.yy_list_ment12 {
	background: #ffffff;
	border-radius: 16px;
	border: 1px solid #282828;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #282828 !important;
	padding: 6px 16px;
	float: right;
	opacity: 0.5;
}
.yy_list_item1 {
	padding: 0px 16px;
}
.yy_list1 {
	width: 100%;
	background: #ffffff;
	box-shadow: 5px 5px 20px 10px rgba(0, 0, 0, 0.03);
	border-radius: 16px;
	margin-top: 16px;
	margin-top: 16px;
	padding-bottom: 15px;
}
.yy_list_det {
	padding: 16px 24px 16px 35px;
	span {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #282828;
		margin-left: 20px;
	}
	label {
		width: 70px;
		display: inline-block;
		text-align: end;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		height: 36px;
		line-height: 36px;
	}
}
.u-tabbar {
	position: fixed;
	bottom: 0px;
	width: 100%;
	::v-deep .u-border-top {
		border-top-style: none;
		box-shadow: 0px -5px 25px 0px rgba(0, 0, 0, 0.05);
	}
	::v-deep.u-tabbar__content__item-wrapper {
		height: 70px;
	}
}
.yy_list {
	padding: 0px 24px;
	margin-top: 16px;
	.yy_list_img {
		width: 100%;
		height: 327rpx;
		::v-deep uni-image {
			width: 100% !important;
			height: 327rpx !important;
			border-top-left-radius: 16px !important;
			border-top-right-radius: 16px !important;
		}
	}
	.yy_list_det {
		background: #ffffff;
		box-shadow: 0px 4px 12px 0px rgba(32, 154, 223, 0.1);
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		padding: 17px;
	}
	.yy_list_title {
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #202020;
		margin-bottom: 3px;
	}
	.yy_list_all {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.yy_list_ment {
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #ffffff;
		background: #5282ec;
		border-radius: 12px;
		padding: 5px 17px;
		float: right;
	}
}
</style>
