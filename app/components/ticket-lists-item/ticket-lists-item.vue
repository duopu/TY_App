<template>
	<view class="ticket-lists-item">
		<view class="left flex-column-center">
			<view class="price">
				<text class="unit">¥</text>
				35
			</view>
			<view class="sum">满299元可用</view>
		</view>
		<view class="right flex-center">
			<view class="flex-column flex-1">
				<view class="name">商城产品优惠券</view>
				<view class="flex-center desc ">
					<image class="icon" src="../../static/images/icons/icon-gth.svg" mode="aspectFill"></image>
					<text >优惠券说明</text>
				</view>
				<view class="time">2021.03.21-2021.05.12</view>
			</view>
			<!-- 商品领取 -->
			<button v-if="state === 1" class="btns text-bold">领取</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ticket-lists-item',
	props:{
		state:{
			type:Number,
			default:0 // 1-商品
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
