<!-- 账号与安全 -->
<template>
	<view class="account">
		<view class="flex-center-between row">
			<text class="label">手机号</text>
			<text class="text">{{user.phone}}</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row" @click="resetPassword">
			<text class="label">密码修改</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row" @click="bindWx">
			<text class="label">微信</text>
			<text class="text">{{wxBind ? '已绑定' : '尚未绑定' }}</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row" @click="bindAliPay">
			<text class="label">支付宝</text>
			<text class="text">{{aliBind ? '已绑定' : '尚未绑定' }}</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
	</view>
</template>

<script>
	const PPAliPay = uni.requireNativePlugin('PP-Alipay');

	export default {
		data() {
			return {
				user:getApp().globalData.user
			};
		},
		onLoad() {

		},
		computed: {
			wxBind() {
				return !!this.user.openId
			},
			aliBind() {
				return !!this.user.aliPayId
			}
		},
		methods: {
			resetPassword() {
				uni.navigateTo({
					url: '/pages/reset-password/reset-password?roleStatus=business'
				})
			},
			bindWx() {
				console.log('绑定微信');
				if (this.wxBind) return;
				uni.login({
					provider: 'weixin',
					success: ({
						authResult
					}) => {
						console.log('微信登录', authResult);
						this.$http.post('/storeUser/bindOpenId', {
							sourceType: 1,
							openId: authResult.openid
						}, true).then(res => {
							this.refreshUser({
								...this.user,
								openId: res.openId
							})
						})
					}
				});
			},
			bindAliPay() {
				console.log('绑定支付宝');
				if (this.aliBind) return;
				this.$http.get('/storeUser/getAliOauth', {}, true).then(res => {
					const authInfo = res.content;
					PPAliPay.login({
						authInfo,
						appScheme: 'tyjy'
					}, result => {
						console.log('返回结果', result);
						if(result.code == 200){
							const data = result.data
							this.$http.post('/storeUser/bindOpenId', {
								sourceType: 3,
								openId: data.userId
							}, true).then(res => {
								this.refreshUser({
									...this.user,
									aliPayId: res.aliPayId
								})
							})
						}else{
							this.$tool.showToast(`支付宝授权失败,${result.msg}`)
						}
						//{"code":200,"data":{"alipayOpenId":"xx","authCode":"xx","resultCode":"xx","userId":"xxx"},"msg":"登录完成"}
					});
				})
			},
			refreshUser(user){
				this.$tool.saveUserStorage(user);
				this.user = user;
			}
		}
	}
</script>

<style lang="less">
	.account {
		padding-top: 20rpx;
		font-size: 28rpx;
		height: 100%;
		background-color: #f4f5f9;

		.row {
			padding: 24rpx 20rpx 24rpx 40rpx;
			margin-bottom: 8rpx;
			background-color: #FFFFFF;

			.icon-arrow {
				margin-left: 16rpx;
				width: 32rpx;
				height: 32rpx;
			}

			.text {
				flex: 1;
				color: #999999;
				text-align: right;
			}
		}
	}
</style>
