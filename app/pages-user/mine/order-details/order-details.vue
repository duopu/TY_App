<!-- 订单详情 -->
<template>
	<scroll-view class="order-details" scroll-y="true" >
		<!-- 订单状态 -->
		<view class="flex-center-center order-state">
			<image class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
			<text class="text-bold">待收货</text>
		</view>
		<!-- 商品 -->
		<merchanism-order-lists-item :storeGoodsVO="{}"></merchanism-order-lists-item>
		<!-- 地址 -->
		<view class="flex-center address" @click="jumpChooseAddress">
			<image src="../../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">李梅梅 138****4762</view>
				<view class="desc">江苏省徐州市江湾区江湾区街道绿色华府中心西苑3栋1103室</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="box">
			<view class="flex-center row">
				<text class="text-bold">订单编号：</text>
				<view class="flex-1 text-left">183849582950285</view>
			</view>
			<view class="flex-center row">
				<text class="text-bold">创建时间：</text>
				<view class="flex-1 text-left">2020-12-21  16:30:15</view>
			</view>
		</view>
		<!-- 优惠信息 -->
		<view class="box">
			<view class="title text-bold">优惠信息</view>
			<view class="row flex-center-between">
				<text class="label">商品原价</text>
				<text class="flex-1">¥500</text>
			</view>
			<view class="row flex-center-between">
				<text class="label">平台优惠</text>
				<text class="flex-1 color-9">无可用优惠券</text>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
			<view class="row flex-center-between">
				<text class="label">商家优惠</text>
				<text class="flex-1 color-9">无可用优惠券</text>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
			<view class="row flex-center-between">
				<text class="label">金币抵扣</text>
				<text class="flex-1 color-9">无可用金币</text>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
			<view class="row flex-center-between">
				<text class="label">实际支付</text>
				<text class="flex-1">¥500</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
