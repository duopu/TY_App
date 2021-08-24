<!-- 分类详情 -->
<template>
	<view class="page-wrapper classify-details">
		<!-- 头部 -->
		<view class="flex-center classify-details-top">
			<image mode="aspectFill" src="" class="icon-arrow"></image>
			<custom-search placeholder="搜索" @input="getSearchInput"></custom-search>
		</view>
		<view class="flex-center filter">
			<view class="filter-item" @click="openSortPopup()">综合排序</view>
			<view class="filter-item" @click="opencloudPopup()">云计算</view>
			<view class="filter-item" @click="openFilterPopup()">筛选</view>
		</view>
		<scroll-view scroll-y="true" class="classify-details-lists">
			<block v-for="(item, index) in ['', '', '', '', '', '', '', '', '', '']" :key="index">
				<course-lists-item :data="{}"></course-lists-item>
			</block>
		</scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup" @select="getSortIndex"></classify-sort-popup>
		<!-- 云计算 -->
		<classify-cloud-popup ref="cloudPopup"></classify-cloud-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup"></classify-filter-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchInput: '',
			sortIndex: 0
		};
	},
	methods: {
		// 获取搜索内容
		getSearchInput(value) {
			this.searchInput = value;
		},
		// 打开综合排序弹窗
		openSortPopup() {
			this.$refs.cloudPopup.close();
			this.$refs.sortPopup.toggle();
		},
		//云计算
		opencloudPopup(){
			this.$refs.sortPopup.close();
			this.$refs.cloudPopup.toggle();
		},
		//筛选
		openFilterPopup(){
			this.$refs.sortPopup.close();
			this.$refs.cloudPopup.close();
			this.$refs.filterPopup.toggle();
		},
		// 当前综合排序
		getSortIndex(value) {
			this.sortIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
