<!-- 支付方式弹窗 -->
<template>
	<uni-popup ref="popup" class="popup">
		<view class="popup-main">
			<view class="popup-title flex-center-between">
				<view class="title">支付方式</view>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="popup-content">
				<view class="flex-center-center row" @click="selectPay(0)">
					<image class="image" src="../../static/images/login/wx.png" mode="aspectFill"></image>
					<text class="text flex-1">微信支付</text>
					<view class="radio" :class="{ on: payIndex === 0 }"></view>
				</view>
				<view class="flex-center-center row" @click="selectPay(1)">
					<image class="image" src="../../static/images/login/zfb.png" mode="aspectFill"></image>
					<text class="text flex-1">支付宝支付</text>
					<view class="radio" :class="{ on: payIndex === 1 }"></view>
				</view>
				<view class="flex-center-center row" @click="selectPay(2)">
					<image class="image" src="../../static/images/login/package.png" mode="aspectFill"></image>
					<view class="flex-1 flex-column-between">
						<text class="text">账户余额支付</text>
						<text class="desc">可用余额:¥1000.00</text>
					</view>
					<view class="radio" :class="{ on: payIndex === 2 }"></view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'common-payment-popup',
	data() {
		return {
			payIndex: 0
		};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 选择支付方式
		selectPay(value) {
			if (this.payIndex === value) return;
			this.payIndex = value;
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
