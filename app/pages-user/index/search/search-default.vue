<!-- 搜索的默认列表 -->
<template>
	<scroll-view scroll-y="true" class="search-content">
		<!-- 历史搜索 -->
		<view class="title text-bold">历史搜索</view>
		<view class="history-lists">
			<view class="item">一级建造师</view>
			<view class="item">注册会计师</view>
			<view class="item">注册会计师</view>
		</view>
		<!-- 热门搜索 -->
		<view class="title text-bold">热门搜索</view>
		<view class="history-lists">
			<view class="item">中级经济师</view>
			<view class="item">题库</view>
		</view>
		<!--热门课程/热搜机构/优秀教师 -->
		<scroll-view scroll-x="true" class="hot-lists">
			<!-- 热门课程 -->
			<view class="lists-item yellow">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot1.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotkc.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row" v-for="(item, index) in ['', '', '', '', '', '', '', '', '', '']" :key="index">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">教师资格证基础</text>
				</view>
			</view>
			<!-- 热搜机构 -->
			<view class="lists-item blue">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot2.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotjg.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row" v-for="(item, index) in ['', '', '', '', '', '', '', '', '', '']" :key="index">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">商家弦子</text>
				</view>
			</view>
			<!-- 优秀教师 -->
			<view class="lists-item red">
				<view class="flex-center hot-title">
					<image class="icon-hot" src="../../../static/images/search/hot3.png" mode="aspectFill"></image>
					<image class="icon-text" src="../../../static/images/search/hotjs.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row" v-for="(item, index) in ['', '', '', '', '', '', '', '', '', '']" :key="index">
					<text class="serial-number text-bold" :class="{ on: index < 3 }">{{ index + 1 }}</text>
					<text class="text-ellipsis text">教师的山</text>
				</view>
			</view>
		</scroll-view>
	</scroll-view>
</template>

<script>
export default {
	name: 'searchDefault',
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
