<!-- 配送至 -->
<template>
	<view class="address">
		<!-- 列表 -->
		<scroll-view scroll-y="auto" class="address-lists address-content">
			<!-- 当前配送地址 -->
			<view class="title">当前配送地址</view>
			<!-- 地址 -->
			<address-lists-item></address-lists-item>
			<!-- 我的其他收货地址 -->
			<view class="title">我的其他收货地址</view>
			<!-- 地址 -->
			<block v-for="(item, index) in ['', '', '', '']" :key="index"><address-lists-item></address-lists-item></block>
			<view class="slot-item"></view>
		</scroll-view>
		<!-- 底部 -->
		<view class="address-bottom"><button class="btn btn-block">添加收获地址</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
