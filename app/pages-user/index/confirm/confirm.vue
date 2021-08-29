<!-- 订单确认 -->
<template>
	<view class="order-confirm">
		<scroll-view class="order-confirm-content" scroll-y="true">
			<view class="flex-center address">
				<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
				<view class="flex-column flex-1">
					<view class="name">李梅梅 138****4762</view>
					<view class="desc">江苏省徐州市江湾区江湾区街道绿色华府中心西苑3栋1103室</view>
				</view>
				<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
			</view>
			<!-- 商家 -->
			<view class="store-order-lists-item">
				<view class="flex-center-between top">
					<view class="name">xx商家</view>
				</view>
				<view class="cotent">
					<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					<view class="flex-column right">
						<view class="title">5天英语全能挑战名称可能很长可能是两行</view>
						<view class="tag-item">型号一</view>
						<view class="flex-center-between">
							<view class="price">
								<text class="unit">¥</text> 500
							</view>
							<text class="number">1</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 折扣 -->
			<view class="box discount">
				<view class="discount-row flex-center-between">
					<text class="label">商品原价</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">平台优惠</text>
					<text>无可用优惠券</text>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">商家优惠</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">金币抵扣</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center-between">
					<text class="label">实际支付</text>
					<text>¥500</text>
				</view>
				<view class="discount-row flex-center">
					<view class="radio"></view>
					<view>同意<navigator url="">《腾云课堂服务协议》</navigator></view>
				</view>
				<view class="discount-row flex-center">
					<view class="radio"></view>
					<view>同意<navigator url="">同意将您的联系方式告知服务商</navigator></view>
				</view>
			</view>
		</scroll-view>
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
