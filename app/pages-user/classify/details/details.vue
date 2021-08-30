<!-- 分类详情 -->
<template>
	<view class="page-wrapper classify-details">
		<!-- 头部 -->
		<view class="flex-center classify-details-top">
			<image @click="onBack" mode="aspectFill" src="../../../static/images/login/back.png" class="icon-arrow"></image>
			<custom-search placeholder="搜索" @search="getSearchInput"></custom-search>
		</view>
		<view class="flex-center filter">
			<view class="filter-item" @click="openSortPopup()">{{ sortItem.name }}</view>
			<view class="filter-item" @click="opencloudPopup()">{{ categoryItem.categoryName }}</view>
			<view class="filter-item" @click="openFilterPopup()">筛选</view>
		</view>
		<my-scroll-view ref="list" class="classify-details-lists" :pageSize="queryParams.size" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-lists-item v-for="(item, index) in slotProps.list" :key="index" :data="item" @itemClick="goodsItemClick(item)"></course-lists-item>
			</template>
		</my-scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup" @select="getSortIndex"></classify-sort-popup>
		<!-- 分类 -->
		<classify-cloud-popup ref="cloudPopup" :category="categoryItem" @select="getCategory"></classify-cloud-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup" @submit="filterSubmit"></classify-filter-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sortIndex: 0,
			queryParams: {
				page: 1,
				size: 20,
				categoryId: undefined,
				maxPrice: undefined,
				minPrice: undefined,
				mechanismType: undefined,
				resourceType: undefined,
				searchText: undefined,
				sort: 1,
				type: undefined
			},
			sortItem: { name: '综合排序', value: 1 },
			categoryItem: { categoryName: '全部', categoryId: undefined }
		};
	},
	onLoad(option) {
		this.queryParams.categoryId = option.categoryId;
		this.categoryItem = { categoryName: option.categoryName, categoryId: option.categoryId};
	},
	methods: {
		//返回 上一级
		onBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 获取搜索内容
		getSearchInput(value) {
			this.queryParams.searchText = value;
			this.$refs.list.onRefresh();
		},
		// 打开综合排序弹窗
		openSortPopup() {
			this.$refs.cloudPopup.close();
			this.$refs.sortPopup.toggle();
		},
		//云计算
		opencloudPopup() {
			this.$refs.sortPopup.close();
			this.$refs.cloudPopup.toggle();
		},
		//筛选
		openFilterPopup() {
			this.$refs.sortPopup.close();
			this.$refs.cloudPopup.close();
			this.$refs.filterPopup.toggle();
		},
		// 排序选中回调
		getSortIndex(item) {
			this.sortItem = item;
			this.queryParams.sort = item.value;
			this.$refs.list.onRefresh();
		},
		// 分类选中回调
		getCategory(item) {
			this.categoryItem = item;
			this.queryParams.categoryId = item.categoryId;
			this.$refs.list.onRefresh();
		},
		/** 筛选提交回调
		 * @param {Object} form
		 */
		filterSubmit(form) {
			this.queryParams.maxPrice = form.maxPrice;
			this.queryParams.minPrice = form.minPrice;
			this.queryParams.mechanismType = form.mechanismType;
			this.queryParams.resourceType = form.resourceType;
			this.queryParams.type = form.type;
			this.$refs.list.onRefresh();
		},

		/**
		 * 查询商品列表
		 */
		onLoadData(page, callback) {
			this.queryParams.page = page;
			this.$http
				.get('/category/goods/queryPage', this.queryParams, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		},

		/**
		 * 商品行点击
		 * @param {Object} item
		 */
		goodsItemClick(item) {
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${item.goodsId}`
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
