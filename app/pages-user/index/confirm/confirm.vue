<!-- 订单确认 -->
<template>
	<view class="order-confirm">
		<scroll-view class="order-confirm-content" scroll-y="true">
			<!-- 收获地址 -->
			<view class="flex-center address">
				<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
				<view class="flex-column flex-1">
					<view class="name">李梅梅 138****4762</view>
					<view class="desc">江苏省徐州市江湾区江湾区街道绿色华府中心西苑3栋1103室</view>
				</view>
				<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
			</view>
			<!-- 商家 -->
			<merchanism-order-lists-item></merchanism-order-lists-item>
			<!-- 折扣 -->
			<view class="box discount">
				<view class="discount-row flex-center-between">
					<text class="label">商品原价</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">平台优惠</text>
					<text class="flex-1">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">商家优惠</text>
					<text class="flex-1">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">金币抵扣</text>
					<text class="flex-1">无可用金币</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">实际支付</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center">
					<view class="radio on"></view>
					<view class="flex-center agree">同意<navigator class="service" url="">《腾云课堂服务协议》</navigator></view>
				</view>
				<view class="discount-row flex-center">
					<view class="radio"></view>
					<view class="flex-center agree">同意将您的联系方式告知服务商</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部合计 -->
		<view class="order-confirm-bottom flex-center-between">
			<view class="flex left">
				<text>合计:</text>
				<text class="price">¥178.00</text>
			</view>
			<button class="btn">提交订单</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
