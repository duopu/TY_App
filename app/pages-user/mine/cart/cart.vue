<!-- 购物车 -->
<template>
	<view class="cart">
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="cart-content">
			<!-- 列表 -->
			<view class="lists-item" v-for="(item, index) in ['', '']" :key="index">
				<view class="flex-center top">
					<view class="radio"></view>
					<view class="shop-name">xx商家</view>
				</view>
				<!-- 多个商品 -->
				<view class="content flex" v-for="(subItem, subIndex) in ['', '']" :key="subIndex">
					<!-- 选中效果 -->
					<view class="radio" :class="{ on: subIndex === 0 }"></view>
					<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					<view class="flex-column flex-1 right">
						<view class="flex-between">
							<!-- 截取字符创 -->
							<view class="name">5天英语全能挑战名称可能很长可能是两行</view>
							<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill"></image>
						</view>
						<view class="tag"><view class="tag-item">型号一</view></view>
						<view class="flex-center-between">
							<view class="price">
								<text class="unit">¥</text>
								500
							</view>
							<uni-number-box :min="1" class="com-nunmber-box"></uni-number-box>
						</view>
					</view>
				</view>
			</view>

			<!-- 猜你喜欢 -->
			<view class="title text-bold">猜你喜欢</view>
			<view class="favorite-lists">
				<view class="item" v-for="(item, index) in ['', '', '']" :key="index">
					<image class="image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
					<view class="text text-bold">{{ spliceStr('5天英语全能挑战名称可能很长可能是两长可能是两长可能是两') }}</view>
					<view class="price text-bold">
						<text class="unit">￥</text>
						<text>500</text>
					</view>
				</view>
			</view>
			<!-- 占位符 -->
			<view class="slot-item"></view>
		</scroll-view>
		<!-- 底部 -->
		<view class="cart-bottom flex-center-between">
			<view class="flex-center">
				<view class="radio on"></view>
				<text>全选</text>
			</view>
			<view class="right flex-center">
				<text class="color-6">合计：</text>
				<text class="price">￥124.0</text>
				<button class="btn">结算(2)</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		// 截取字符串
		spliceStr(value) {
			return value.length < 18 ? value : `${value.substring(0, 18)}...`;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
