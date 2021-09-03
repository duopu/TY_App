<template>
	<scroll-view class="collect-content" scroll-y="true">
		<view class="goods-lists-item" v-for="(item, index) in ['', '', '']" :key="index">
			<view class="flex-center top">
				<view class="radio"></view>
				<view class="shop-name">xx商家</view>
			</view>
			<!-- 多个商品 -->
			<view class="content flex-center">
				<!-- 选中效果 -->
				<view class="radio" :class="{ on: index === 0 }"></view>
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view class="flex-column-between flex-1">
					<view class="name">5天英语全能挑战名称可能很长可能是两行</view>
					<view class="price">
						<text class="unit">¥</text>
						500
					</view>
				</view>
				<image class="icon-clear" src="../../../static/images/icons/icon-black-clear.svg" mode="aspectFill"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'tabs-goods',
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
