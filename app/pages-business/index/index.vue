<!--  -->
<template>
	<scroll-view class="index">
		<!-- 商品 -->
		<view class="flex-center-between index-title">
			<text class="text">商品</text>
			<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<view class="lists">
			<view class="flex-center-between lists-row">
				<text>已上架</text>
				<view class="flex-center">
					<view class="number">5</view>
					<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
				</view>
			</view>
			<view class="flex-center-between lists-row">
				<text>未上架</text>
				<view class="flex-center">
					<view class="number">5</view>
					<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
				</view>
			</view>
			<view class="flex-center-between lists-row">
				<text>回收站</text>
				<view class="flex-center">
					<view class="number">15</view>
					<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="flex-center-between index-title">
			<text class="text">优惠卷</text>
			<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
		</view>
		<!-- 已创建 -->
		<view class="lists">
			<view class="flex-center-between lists-row">
				<view class="flex-center">
					<image class="icons" src="" mode="aspectFill"></image>
					<text>已创建</text>
				</view>
				<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
			<view class="flex-center-between lists-row">
				<view class="flex-center">
					<image class="icons" src="" mode="aspectFill"></image>
					<text>已生效</text>
				</view>
				<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode=""></image>
			</view>
		</view>
		<!-- 创建优惠券 -->
		<view class="lists">
			<view class="flex-center-between lists-row">
				<view class="flex-center">
					<image class="icons" src="" mode="aspectFill"></image>
					<text>创建优惠劵</text>
				</view>
				<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode="aspectFill"></image>
			</view>
			<view class="flex-center-between lists-row">
				<view class="flex-center">
					<image class="icons" src="" mode="aspectFill"></image>
					<text>直播</text>
				</view>
				<image class="icon-arrow" src="../../static/images/icons/icon-arrow-right.svg" mode=""></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'businessIndex',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
