<!-- 在线客服 -->
<template>
	<view class="online">
		<view class="flex-center row">
			<image class="icons" src="../../../static/images/icons/icon-yellow-phone.svg" mode="aspectFill"></image>
			<text>平台客服电话:{{info.mobile}}</text>
		</view>
		<view class="flex-center row">
			<image class="icons" src="../../../static/images/icons/icon-yellow-qq.svg" mode="aspectFill"></image>
			<text>QQ:{{info.qq}}</text>
		</view>
		<view class="flex-center row">
			<image class="icons" src="../../../static/images/icons/icon-yellow-email.svg" mode="aspectFill"></image>
			<text>邮箱:{{info.email}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			};
		},
		onLoad() {
			this.queryInfo()
		},
		methods:{
			queryInfo(){
				this.$http.get('/online/queryDetail',{},true).then(res=>{
					this.info = res
				})
			}
		}
	}
</script>

<style lang="less">
	.online{
		padding: 40rpx 20rpx;
		height: 100%;
		font-size: 28rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		box-sizing: border-box;
		.row{
			margin-top: 40rpx;
		}
		.icons{
			margin-right: 24rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
