<!-- 分类详情 -->
<template>
	<view class="page-wrapper classify-details">
		<!-- 头部 -->
		<view class="flex-center classify-details-top">
			<image @click="onBack" mode="aspectFill" src="../../../static/images/login/back.png" class="icon-arrow"></image>
			<custom-search placeholder="搜索" @search="getSearchInput"></custom-search>
		</view>
		<view class="flex-center filter">
			<view class="filter-item flex-center-center flex-1" :class="filterSelect('sortPopup')" @click="openPopup('sortPopup')">
				<text>{{ sortItem.name }}</text>
				<text class="arrow-image"></text>
			</view>
			<view class="filter-item flex-center-center flex-1" :class="filterSelect('cloudPopup')" @click="openPopup('cloudPopup')">
				<text>{{ categoryItem.categoryName }}</text>
				<text class="arrow-image"></text>
			</view>
			<view class="filter-item flex-center-center flex-1" :class="filterSelect('filterPopup')" @click="openPopup('filterPopup')">
				<text>筛选</text>
				<text class="arrow-image"></text>
			</view>
		</view>
		<my-scroll-view ref="list" class="classify-details-lists" :pageSize="queryParams.size" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-lists-item v-for="(item, index) in slotProps.list" :key="index" :data="item"></course-lists-item>
			</template>
		</my-scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup" @select="getSortIndex" @change="(value)=>changePopup('sortPopup',value)"></classify-sort-popup>
		<!-- 分类 -->
		<classify-cloud-popup ref="cloudPopup" :category="categoryItem" @select="getCategory" @change="(value)=>changePopup('cloudPopup',value)"></classify-cloud-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup" @submit="filterSubmit" @change="(value)=>changePopup('filterPopup',value)"></classify-filter-popup>
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
			categoryItem: { categoryName: '全部', categoryId: undefined },
			// 弹窗
			popupRefInfos: {
				sortPopup: {
					show: false
				},
				cloudPopup: {
					show: false
				},
				filterPopup: {
					show: false
				}
			}
		};
	},
	onLoad(option) {
		this.queryParams.categoryId = option.categoryId;
		this.categoryItem = { categoryName: option.categoryName, categoryId: option.categoryId };
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
		// 打开弹窗(关闭其他弹窗)
		openPopup(refName) {
			for (let i in this.popupRefInfos) {
				if (i === refName) {
					this.$refs[i].toggle();
				} else if (this.popupRefInfos[i].show) {
					this.$refs[i].close();
				}
			}
		},
		// 弹窗 显示或关闭状态
		changePopup(refName,show){
			this.popupRefInfos[refName].show = show; 
		},
		// 弹窗 选中class
		filterSelect(refName){
			return this.popupRefInfos[refName].show ? 'on':''
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
		onLoadData(page, pageSize, callback) {
			this.queryParams.page = page;
			this.queryParams.source = 5; //查询除了二手商品以外的全部商品
			this.$http
				.get('/category/goods/queryPage', this.queryParams, true)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(null);
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
