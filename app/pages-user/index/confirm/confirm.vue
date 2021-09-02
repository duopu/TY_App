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

			<!-- 购买列表 -->
			<view class="box" v-for="(item, index) in ['', '']" :key="index">
				<!-- 商家 -->
				<merchanism-order-lists-item></merchanism-order-lists-item>
				<view class="row flex-center-between">
					<text class="label">商品原价</text>
					<text>¥500</text>
				</view>
				<view class="row flex-center-between">
					<text class="label">运费</text>
					<text>¥12</text>
				</view>
				<view class="row flex-center-between"  @click="openPopup('ticketPopup')">
					<text class="label">商家优惠</text>
					<!-- 金额红色样式 color-red -->
					<text class="flex-1 color-9">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view class="row flex-center-between" @click="openPopup('dicountPopup')">
					<text class="label">金币抵扣</text>
					<!-- 金额红色样式 color-red -->
					<text class="flex-1 color-9">无可用金币</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
			</view>
			<!-- 平台优惠券 -->
			<view class="box platform">
				<view class="row flex-center-between">
					<text class="label">平台优惠</text>
					<!-- 金额红色样式 color-red -->
					<text class="flex-1 color-9">无可用优惠券</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
			</view>
			<!-- 同意协议 -->
			<view class="flex-center agree-row">
				<!-- 选中 类名 on -->
				<view class="radio on"></view>
				<view class="flex-center text">
					同意
					<navigator class="service" url="">《腾云课堂服务协议》</navigator>
				</view>
			</view>
		</scroll-view>
		<!-- 底部合计 -->
		<view class="order-confirm-bottom flex-center-between">
			<view class="flex left">
				<text>合计:</text>
				<text class="price">¥178.00</text>
			</view>
			<button class="btn" @click="openPopup('paymentPopup')">提交订单</button>
		</view>
		<!-- 直选支付方式 弹窗 -->
		<common-payment-popup ref="paymentPopup"></common-payment-popup>
		<!-- 金币抵扣弹窗 -->
		<confirm-dicount-popup ref="dicountPopup"></confirm-dicount-popup>
		<!-- 商家优惠券 -->
		<confirm-ticket-popup ref="ticketPopup"></confirm-ticket-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		// 打开 支付方式弹窗
		openPopup(value) {
			this.$refs[value].open();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
