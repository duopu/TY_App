<!-- 系统设置 -->
<template>
	<view class="setting">
		<view class="row flex-center-between">
			<text>版本更新</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text>联系我们</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text>关于我们</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text>意见反馈</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<!-- 退出登录 -->
		<button class="btn" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			// 退出登录
			logout(){
				this.$tool.logout();
			}
		}
	}
</script>

<style lang="less">
.setting{
	position: relative;
	height: 100%;
	padding: 20rpx 20rpx 40rpx 30rpx;
	background-color: #FFFFFF;
	overflow: hidden;
	box-sizing: border-box;
	.row{
		padding: 42rpx 0;
		font-size: 28rpx;
		font-weight: bold;
	}
	.icon-arrow{
		width: 48rpx;
		height: 48rpx;
	}
	.btn{
		position: absolute;
		bottom: 60rpx;
		left: 0;
		right: 0;
		width: 60%;
		height: 96rpx;
		font-size: 26rpx;
		line-height: 96rpx;
		color: #FFFFFF;
		background-color: #FF705B;
		border-radius: 48rpx;
		box-sizing: border-box;
	};
}
</style>
