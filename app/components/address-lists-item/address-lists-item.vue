<!-- 收货地址 -->
<template>
	<!-- 地址 -->
	<view class="address-item">
		<view class="flex-center">
			<image src="../../static/images/icons/icon-location.svg" class="icons" mode="aspectFill"></image>
			<view class="flex-column flex-1">
				<view class="name">李梅梅 138****4762</view>
				<view class="desc">江苏省徐州市江湾区江湾区街道绿色华府中心西苑3栋1103室</view>
			</view>
			<image class="icons" src="../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
		</view>
		<view class="flex-center-between item-bottom">
			<!-- 选中 on -->
			<view class="radio on"></view>
			<text class="flex-1">默认地址</text>
			<image mode="aspectFill" class="icons" src="../../static/images/icons/icon-black-clear.svg"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'address-lists-item',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
