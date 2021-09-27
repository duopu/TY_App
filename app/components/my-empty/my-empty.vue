<template>
	<view v-show="show" class="no-data">
		<image class="image" :src="img" mode="aspectFill"></image>
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
				default: require('../../static/images/no-list-message.png')
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
	height: 80%;
	min-height: 400rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.image {
		width: 376rpx;
		height: 276rpx;
	}

	.text {
		margin-top: 40rpx;
		font-size: 32rpx;
		color: #999999;
	}
}
</style>
