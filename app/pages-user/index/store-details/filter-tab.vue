<template>
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
		name:'filter-tab',
		data() {
			return {
				
			};
		},
		methods:{
			// 打开弹窗
			openPopup(refName) {
				this.$refs[refName].open();
			},
		}
	}
</script>

<style lang="less" src="./style.less"></style>
