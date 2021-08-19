<!-- 分类 首页 -->
<template>
	<view class="page-wrapper">
		<!-- 我的兴趣 -->
		<view class="title text-bold">我的兴趣</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" v-for="(item, index) in ['', '']" :key="index">
				<image class="item-image" src="" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">二级类目</text>
			</view>
			<view class="classify-lists-item">
				<view class="item-border">+</view>
				<text class="text-bold text-ellipsis">更多</text>
			</view>
		</view>
		<!-- 热门分类 -->
		<view class="title text-bold">热门分类</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" v-for="(item, index) in ['', '', '', '','','','','','']" :key="index">
				<image class="item-image" src="" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">二级类目</text>
			</view>
		</view>
		<!-- 一级类目 -->
		<view class="title text-bold">一级类目</view>
		<view class="classify-lists block-box">
			<view class="classify-lists-item" v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
				<image class="item-image" src="" mode="aspectFill"></image>
				<text class="text-bold text-ellipsis">二级类目</text>
			</view>
		</view>
		<!-- slot -->
		<view class="slot-item"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
