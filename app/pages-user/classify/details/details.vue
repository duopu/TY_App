<!-- 分类详情 -->
<template>
	<view class="page-wrapper classify-details">
		<!-- 头部 -->
		<view class="flex-center classify-details-top">
			<image mode="aspectFill" src="" class="icon-arrow"></image>
			<custom-search placeholder="搜索" @input="getSearchInput"></custom-search>
		</view>
		<view class="flex-center filter">
			<view class="filter-item" @click="openSortPopup">综合排序</view>
			<view class="filter-item">云计算</view>
			<view class="filter-item">筛选</view>
		</view>
		<scroll-view scroll-y="true" class="classify-details-lists">
			<course-lists-item v-for="(item, index) in ['', '', '', '', '', '', '', '', '', '']" :key="index"></course-lists-item>
		</scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup" @select="getSortIndex"></classify-sort-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchInput: '',
			sortIndex:0,
		};
	},
	methods: {
		// 获取搜索内容
		getSearchInput(value) {
			this.searchInput = value;
		},
		// 打开综合排序弹窗
		openSortPopup() {
			this.$refs.sortPopup.open();
		},
		// 当前综合排序
		getSortIndex(value){
			this.sortIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
