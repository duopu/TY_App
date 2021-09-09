<template>
	<view class="classify-details">
		<view class="flex-center filter">
			<view class="filter-item flex-1 flex-center-center" @click="openPopup('sortPopup')">
				<text>综合排序</text>
				<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill"></image>
			</view>
			<view class="filter-item flex-1 flex-center-center" @click="openPopup('cloudPopup')">
				<text>云计算</text>
				<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill"></image>
			</view>
			<view class="filter-item flex-1 flex-center-center" @click="openPopup('filterPopup')">
				<text>筛选</text>
				<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill"></image>
			</view>
		</view>
		<my-scroll-view ref="list" class="classify-details-lists" :pageSize="queryParams.size" @loadData="onLoadData">
			<template v-slot:list="slotProps">
				<course-lists-item v-for="(item, index) in slotProps.list" :key="index" :data="item" @itemClick="goodsItemClick(item)"></course-lists-item>
			</template>
		</my-scroll-view>
		<!-- 综合排序 -->
		<classify-sort-popup :current-index="sortIndex" ref="sortPopup"></classify-sort-popup>
		<!-- 分类 -->
		<classify-cloud-popup ref="cloudPopup"></classify-cloud-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup"></classify-filter-popup>
	</view>
</template>

<script>
export default {
	name: 'tab-common',
	data() {
		return {
			slotProps: {
				list: []
			},
			queryParams: {
				size: 20
			}
		};
	},
	methods: {
		// 点击商品跳转
		goodsItemClick() {},
		// 打开弹窗
		openPopup(refName) {
			// uni.pageScrollTo({
			// 	scrollTop:120
			// })
			this.$refs[refName].open();
		},
		// 加载数据
		onLoadData() {}
	}
};
</script>

<style lang="less" src="./style.less"></style>
