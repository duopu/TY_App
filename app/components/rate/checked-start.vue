<template>
	<view class="checked-star-box" @click="click">
		<image v-if="num === 0" class="icon-star" src="../../static/images/icons/icon-star.png" mode="aspectFill"></image>
		<image v-else-if="num === 100" class="icon-star" src="../../static/images/icons/icon-star-selected.svg" mode="aspectFill"></image>
		<image v-else class="icon-star" src="../../static/images/icons/icon-star-half.svg" mode="aspectFill"></image>
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
				this.num = newV;
			}
		},
		data(){
			return {
				num: this.number
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
		
		&:first-child {
			margin-left: 0;
		}
	}
</style>
