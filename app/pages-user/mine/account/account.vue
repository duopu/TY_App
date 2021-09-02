<!-- 账号与安全 -->
<template>
	<view class="account">
		<view class="row flex-center-between">
			<text>手机号</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">15839584958</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text>密码修改</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text>邮箱</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">尚未绑定</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text>支付宝</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">尚未绑定</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text>微信</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">尚未绑定</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text>QQ</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">尚未绑定</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
.account {
	height: 100%;
	padding: 20rpx 20rpx 40rpx 30rpx;
	background-color: #ffffff;
	overflow: hidden;
	box-sizing: border-box;
	.row {
		padding: 42rpx 0;
		font-size: 28rpx;
		font-weight: bold;
	}
	.color-6{
		color: #666666;
	}
	.icon-arrow {
		margin-left: 24rpx;
		width: 48rpx;
		height: 48rpx;
	}
}
</style>
