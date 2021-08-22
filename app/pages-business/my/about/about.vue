<!-- 关于腾讯云课堂 -->
<template>
	<view class="about">
		<image class="image-about" mode="widthFix" src="../../../static/images/index/smbanner.png"></image>
		<view class="title text-bold">我们是腾讯云课堂</view>
		<view class="text">我是介绍文案我是我是介绍文案我是介绍文案 介绍文案我是介绍文案我是介绍文案我是介绍文案 我是介绍文案我是介我是介绍文案我是介绍文案</view>
		<view class="text">欢迎与我们合作联系。</view>
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
.about {
	padding: 0 70rpx;
	height: 100%;
	font-size: 28rpx;
	line-height: 1.5;
	text-align: center;
	background-color: #F4F5F9;
	.image-about{
		margin-top: 40rpx;
		width: 50%;
		height: auto;
	}
	.title{
		margin-top:24rpx;
		font-size: 32rpx;
	}
	.text{
		margin-top: 16rpx;
		color: #666666;
	}
}
</style>
