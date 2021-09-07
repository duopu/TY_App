<!-- 基本信息 -->
<template>
	<view class="information">
		<view class="flex-column-center">
			<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<text class="text">点击更换</text>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">昵称</text>
			<text class="color-6 flex-1">尚未绑定</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">性别</text>
			<text class="color-6 flex-1">尚未绑定</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
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
.information {
	height: 100%;
	padding: 40rpx 20rpx 40rpx 30rpx;
	background-color: #ffffff;
	overflow: hidden;
	box-sizing: border-box;
	.avatar-image {
		width: 144rpx;
		height: 144rpx;
		border: 4rpx solid #FFFFFF;
		border-radius: 50%;
	}
	.text {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}
	.row {
		padding: 40rpx 0;
		font-size: 28rpx;
	}
	.color-6 {
		text-align: right;
		color: #666666;
	}
	.icon-arrow {
		margin-left: 24rpx;
		width: 48rpx;
		height: 48rpx;
	}
}
</style>
