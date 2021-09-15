<!-- 账号与安全 -->
<template>
	<view class="account">
		<view class="flex-center-between row">
			<text class="label">手机号</text>
			<text class="text">{{phone}}</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row" @click="jump('resetPassword')">
			<text class="label">密码修改</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row">
			<text class="label">微信</text>
			<text class="text">尚未绑定</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row">
			<text class="label">支付宝</text>
			<text class="text">尚未绑定</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: getApp().globalData.user.phone
			};
		},
		onLoad(){
		},
		methods:{
			jump(type){

			}
		}
	}
</script>

<style lang="less">
.account{
	padding-top: 20rpx;
	font-size: 28rpx;
	height: 100%;
	background-color: #f4f5f9;
	.row{
		padding: 24rpx 20rpx 24rpx 40rpx;
		margin-bottom: 8rpx;
		background-color: #FFFFFF;
		.icon-arrow{
			margin-left: 16rpx;
			width: 32rpx;
			height: 32rpx;
		}
		.text{
			flex: 1;
			color: #999999;
			text-align: right;
		}
	}
}
</style>
