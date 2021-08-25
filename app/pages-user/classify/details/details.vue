<!-- 分类详情 -->
<template>
	<view class="page-wrapper classify-details">
		<!-- 头部 -->
		<view class="flex-center classify-details-top">
			<image mode="aspectFill" src="" class="icon-arrow"></image>
			<custom-search placeholder="搜索" @search="getSearchInput"></custom-search>
		</view>
		<view class="flex-center filter">
			<view class="filter-item" @click="openSortPopup()">{{sortItem.name}}</view>
			<view class="filter-item" @click="opencloudPopup()">{{categoryItem.categoryName}}</view>
			<view class="filter-item" @click="openFilterPopup()">筛选</view>
		</view>
		<my-scroll-view ref="list" class="classify-details-lists" :pageSize="queryParams.size" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-lists-item
				v-for="(item, index) in slotProps.list"
				:key="index" 
				:data="item"
				@itemClick="goodsItemClick(item)"></course-lists-item>
			</template>
		</my-scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup" @select="getSortIndex"></classify-sort-popup>
		<!-- 分类 -->
		<classify-cloud-popup ref="cloudPopup" @select="getCategory"></classify-cloud-popup>
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
				page:1,
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
			sortItem:{name:"综合排序",value:1},
			categoryItem:{categoryName:"全部",categoryId:undefined}
		};
	},
	onLoad(option) {
		// option.categoryId
		// // 文章已读
		// this.$http.post('/article/read',{articleId:option.articleId},false);
		
		// // 查询文章详情
		// this.$http.get('/article/queryInfo',{articleId:option.articleId},true).then(res=>{
		// 	this.detail = res;
		// 	this.aboutList = res.relevantArticleVOList;
		// })
	},
	methods: {
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
		// 排序选中回调
		getSortIndex(item) {
			this.sortItem = item;
			this.queryParams.sort = item.value;
			this.$refs.list.onRefresh();
		},
		// 分类选中回调
		getCategory(item){
			this.categoryItem = item;
			this.queryParams.categoryId = item.categoryId;
			this.$refs.list.onRefresh();
		},
		/** 筛选提交回调
		 * @param {Object} form
		 */
		filterSubmit(form){
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
		onLoadData(page, callback){
			this.queryParams.page = page;
			this.$http.get('/category/goods/queryPage',this.queryParams,true).then(res=>{
				callback(res);
			}).catch(err => {
				callback(null);
			})
		},
		
		/**
		 * 商品行点击
		 * @param {Object} item
		 */
		goodsItemClick(item){
			//TODO: 跳转到商品详情页
			console.log("商品行点击 == ",item);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
