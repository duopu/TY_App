<template>
	<view v-show="show" class="no-data">
		<image class="icon" :src="img" mode="aspectFill"></image>
		<text class="text">{{text}}</text>
	</view>
</template>

<script>
	export default {
		name:"my-empty",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: '暂无数据'
			},
			img: {
				default: require('../../static/images/icons/icon-dots.svg')
			}
		},
		data() {
			return {
				isShow: this.show
			};
		},
		watch: {
			show(newV, oldV){
				this.isShow = newV;
			}
		},
	}
</script>

<style lang="scss" scoped>
.no-data {
	width: 100%;
	min-height: 400rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	.icon {
		width: 100rpx;
		height: 100rpx;
	}
	
	.text {
		margin-top: 40rpx;
		size: 32rpx;
		color: #999999;
	}
}
</style>
