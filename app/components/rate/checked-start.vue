<template>
	<view class="checked-star-box" @click="click">
		<view class="color-star" v-bind:style="{background:background}"></view>
		<image class="icon-star" src="../../static/images/icons/icon-star.png" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		name:'checked-start',
		emits: ['click'],
		props:{ //星星填充分值  0-100
			number:{
				type:Number,
				default:0
			}
		},
		watch:{
			number(newV, oldV){
				this.background = `linear-gradient(90deg, #ff9340 ${newV}%, #FFFFFF 20%)`
			}
		},
		data(){
			return {
				background: `linear-gradient(90deg, #ff9340 ${this.number}%, #FFFFFF 20%)`
			}
		},
		methods: {
			// 星星被点击
			click(){
				this.$emit('click');
			}
		}
	}
</script>

<style lang="less" scoped>
	.checked-star-box {
		position: relative;
		width: 24rpx;
		height: 24rpx;
		margin-left: 16rpx;
		display: flex;
		
		.icon-star {
			width: 24rpx;
			height: 24rpx;
		}
		
		.color-star {
			position: absolute;
			width: 24rpx;
			height: 24rpx;
			background: linear-gradient(90deg, #ff9340 0%, #FFFFFF 0%);
		}
		
		&:first-child {
			margin-left: 0;
		}
	}
</style>
