<template>
	<view class="guide-view">
		<swiper :indicator-dots="true" :autoplay="false"  class="guide-image" @change="guideChange">
			<swiper-item>
				<image src="../../static/images/launch/guide.png" mode="aspectFit" class="guide-image"></image>
			</swiper-item>
		</swiper>
		<view class="jumpBtn" @click="jumpClick">跳过</view>
	</view>
</template>

<script>
	import config from '../../utils/config.js';
	
	export default {
		data() {
			return {
				
			};
		},
		onShow() { 
			uni.setStorage({
				data:'ok',
				key:config.storageKeys.guideKey
			})
		},
		methods:{
			guideChange(event){
				const index = event.detail.current
				console.log(index);
			},
			jumpClick(){
				// 从本地恢复登录信息;
				uni.getStorage({
					key: config.storageKeys.loginUserKey,
					success: res => {
						const user = res.data;
						if (user.token) {
							this.$tool.login(user);
						}
					},
					fail(err) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.guide-view{
		height: 100vh;
		width: 100vw;
	}
	
	.guide-image{
		height: 100vh;
		width: 100vw;
	}
	
	.jumpBtn{
		width: 160rpx;
		height: 64rpx;
		border-radius: 32rpx;
		position: absolute;
		display: flex;
		top: 100rpx;
		right: 20rpx;
		background-color: #eeeeee;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 32rpx;
	}
</style>
