<!-- 我的 -->
<template>
	<view class="my">
		<!-- 顶部 -->
		<view class="my-top flex-center-between">
			<view class="flex-center">
				<image class="icons" @click="gotoSystemSet" src="../../../static/images/icons/icon-setting.svg"
					mode="aspectFill"></image>
				<image class="icons m-left-20" @click="openScan" src="../../../static/images/icons/icon-scan.svg"
					mode="aspectFill"></image>
			</view>
			<view class="right" @click="toMessageList">
				<image class="icons" src="../../../static/images/icons/icon-message2.svg" mode="aspectFill"></image>
				<text class="tips-number">12</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="my-content">
			<!-- 头像 -->
			<view class="flex-center avatar" @click="gotoSetMineInfo">
				<image class="avatar-image" :src="mineInfo.avatar" mode="aspectFill"></image>
				<view class="right">
					<view class="flex-center">
						<text class="name">{{mineInfo.nickName || '--'}}</text>
						<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
					</view>
					<view class="level">LV{{mineInfo.level || 1}}</view>
				</view>
			</view>
			<!-- 任务 -->
			<view class="flex-center task-lists">
				<view class="item">
					<text class="text">{{(learnInfo.minuteTotal || 0) / 60}}小时</text>
					<text class="desc">学习超过</text>
				</view>
				<view class="item">
					<text class="text">{{learnInfo.beyondPlatformTotal || 0}}%学员</text>
					<text class="desc">超过平台</text>
				</view>
				<view class="item">
					<text class="text">{{learnInfo.daskNum || 0}}次</text>
					<text class="desc">完成任务</text>
				</view>
			</view>
			<!-- 会员 -->
			<view class="vip flex-center-between" @click="gotoVipInfo">
				<view class="flex-center">
					<image class="vip-image" src="../../../static/images/my/vip.png" mode="aspectFill"></image>
					<text class="name">vip会员</text>
				</view>
				<view class="flex-center desc">查看我的会员权益 ></view>
			</view>

			<view class="my-list-box">
				<!-- 我的服务 -->
				<view class="title">我的服务</view>
				<view class="service-lists">
					<view class="item" v-for="(item,index) in serviceLists" :key="index" @click="jumpPage(item.page)">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<text class="text">{{item.text}}</text>
					</view>
				</view>
				<!-- 课程中心 -->
				<view class="title">课程中心</view>
				<view class="course-lists">
					<view class="item" v-for="(item,index) in courseLists" :key="index" @click="sourseClick(item)">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<text class="text">{{item.text}}</text>
					</view>
				</view>
				<!-- 其他服务 -->
				<view class="title">其他服务</view>
				<view class="other-lists">
					<view class="flex-center-between item" @click="gotoSecondhand">
						<image class="item-image" src="../../../static/images/icons/icon-my-account.svg"
							mode="aspectFill"></image>
						<view class="flex-center-between right">
							<text class="text">二手商品专区</text>
							<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex-center-between item" @click="gotoAccountSet">
						<image class="item-image" src="../../../static/images/icons/icon-my-account.svg"
							mode="aspectFill"></image>
						<view class="flex-center-between right">
							<text class="text">账户与安全</text>
							<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex-center-between item" @click="gotoSystemSet">
						<image class="item-image" src="../../../static/images/icons/icon-my-setting.svg"
							mode="aspectFill"></image>
						<view class="flex-center-between right">
							<text class="text">设置中心</text>
							<image class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"
								mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serviceLists: [{
						image: '../../../static/images/my/my-money.png',
						text: '我的钱包',
						page: '/pages-user/mine/wallet/wallet'
					},
					{
						image: '../../../static/images/my/my-order.png',
						text: '我的订单',
						page: '/pages-user/mine/order/order'
					},
					{
						image: '../../../static/images/my/my-cart.png',
						text: '购物车',
						page: '/pages-user/mine/cart/cart'
					},
					{
						image: '../../../static/images/my/my-task.png',
						text: '每日任务',
						page: '/pages-user/mine/sign-in/sign-in'
					},
					{
						image: '../../../static/images/my/my-ticket.png',
						text: '优惠券',
						page: '/pages-user/mine/ticket/ticket'
					},
					{
						image: '../../../static/images/my/my-storage.png',
						text: '收藏/足迹',
						page: '/pages-user/mine/collect/collect'
					}
				],
				courseLists: [{
						image: '../../../static/images/my/my-kcfx.png',
						text: '课程分销',
						page: 'kcfx'
					},
					{
						image: '../../../static/images/my/my-wyrz.png',
						text: '我要入驻',
						page: '/pages-user/mine/check-in/check-in'
					},
					{
						image: '../../../static/images/my/my-lxkf.png',
						text: '联系客服',
						page: '/pages-user/mine/online-service/online-service'
					},
					{
						image: '../../../static/images/my/my-swhz.png',
						text: '商务合作',
						page: '/pages-user/mine/cooperate/cooperate'
					}
				],
				// 我的信息
				mineInfo: {},
				// 学习情况信息
				learnInfo: {},
			};
		},
		onPullDownRefresh() {
			this.queryMineInfo()
		},
		onShow() {
			this.queryMineInfo()
		},
		methods: {
			// 查询我的信息
			queryMineInfo() {
				this.$http.get('/member/queryMemberDetail').then(res => {
					this.mineInfo = res;
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			// 查询学习情况
			queryLearnInfo() {
				this.$http.get('/dailyTask/queryLearnStatistic').then(res => {
					this.learnInfo = res;
				})
			},
			// 跳转设置我的信息
			gotoSetMineInfo() {
				uni.navigateTo({
					url: '/pages-user/mine/information/information'
				})
			},
			// 跳转Vip  会员权益页面
			gotoVipInfo() {
				uni.navigateTo({
					url: '/pages-user/mine/benefit/benefit'
				})
			},
			// 跳转消息列表
			toMessageList() {
				this.$tool.toMessageList();
			},
			/**
			 * 页面跳转
			 * @param {Object} page 页面路由
			 */
			jumpPage(page) {
				console.log(page);
				uni.navigateTo({
					url: page
				})
			},
			// 课程中心点击事件
			sourseClick(item) {
				if (item.page == 'kcfx') {
					// 跳转课程分销页面
					uni.switchTab({
						url: '/pages-user/index/index/index'
					})
					// 打开首页，活动,分销大使
					uni.$emit('activity-open',2)
				} else {
					uni.navigateTo({
						url: item.page
					})
				}
			},
			// 跳转二手商品专区
			gotoSecondhand(){
				uni.navigateTo({
					url: '/pages-user/mine/secondhand/secondhand'
				})
			},
			// 跳转账户与安全
			gotoAccountSet() {
				uni.navigateTo({
					url: '/pages-user/mine/account/account'
				})
			},
			// 跳转系统设置
			gotoSystemSet() {
				uni.navigateTo({
					url: '/pages-user/mine/setting/setting'
				})
			},
			// 打开扫码功能
			openScan() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			// 退出登陆
			logOut() {
				this.$tool.logout()
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
