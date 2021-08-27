<template>
	<view class="payment-item">
		<view class="item-content">
			<image class="goods-image" src="../../static/images/other/good_banner.png" mode="aspectFill"></image>
			<view class="title text-bold text-ellipsis">5天英语全能挑战名称可能很长可能是两行可能是...</view>
			<view class="flex-center-between">
				<view class="tips">型号一</view>
				<view class="number">24</view>
			</view>
			<view class="flex-center m-top-16">
				<view class="price text-bold">
					<text class="unit">￥</text>
					500
				</view>
				<image class="icons" src="../../static/images/icons/icon-update.svg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="item-bottom flex-center-between">
			<view class="user-box flex-center">
				<image class="avatar-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
				<text class="name text-bold">用户A</text>
				<text class="color-9">江苏省南京市</text>
			</view>
			<view class="color-9">2021-05-20 14:20:00</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'order-payment-lists-item',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
