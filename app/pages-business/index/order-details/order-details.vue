<!-- 订单详情(订单和消息交易) -->
<template>
	<scroll-view scroll-y="true" class="order-details">
		<!-- 商家 -->
		<view class="box store">
			<view class="flex-center-between top">
				<view class="flex-center">
					<image class="icon-store" src="../../../static/images/icons/icon-store.svg" mode="aspectFill"></image>
					<text>xx商家</text>
				</view>
				<image class="icon-dy" src="../../../static/images/icons/icon-dy.svg" mode="aspectFill"></image>
			</view>
			<view class="flex-center content">
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view class="flex-column content-column">
					<text class="name">5天英语全能挑战名称可能很长可能是两行</text>
					<view class="flex-center-between">
						<view class="tag-item">型号一</view>
						<view class="flex-baseline">
							<view class="price color-yellow text-bold">
								<text class="unit">¥</text>
								500
							</view>
							<text class="number">× 1</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="box message">
			<view class="title">订单信息</view>
			<view class="flex row">
				<text class="label">收货信息:</text>
				<view class="text flex-1">李华，15877358842，江苏省徐州市江湾 区江湾区街道绿色华府中心西苑3栋1103室</view>
			</view>
			<view class="flex row">
				<text class="label">订单编号:</text>
				<view class="text flex-1">16478729355747</view>
			</view>
			<view class="flex row">
				<text class="label">创建时间:</text>
				<view class="text flex-1">2021-5-20 16:30:00</view>
			</view>
		</view>
		<!-- 优惠信息 -->
		<view class="box discount">
			<view class="title">优惠信息</view>
			<view class="row">
				<text class="label">商品原价:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>500
				</view>
			</view>
			<view class="row">
				<text class="label">优惠券:</text>
				<view class="price color-grey text-bold">
					- <text class="unit">¥</text>500
				</view>
			</view>
			<view class="row">
				<text class="label">实际支付:</text>
				<view class="price color-yellow text-bold">
					<text class="unit">¥</text>500
				</view>
			</view>
		</view>
		<!-- 待发货 -->
		<button v-if="false" class="btn">发货</button>
		<!-- 待收货 -->
		<button class="btn">物流详情</button>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
