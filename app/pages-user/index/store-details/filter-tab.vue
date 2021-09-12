<template>
	<view class="flex-center filter">
		<view class="filter-item flex-1 flex-center-center" @click="openPopup('sortPopup')">
			<text>{{sortItem.name || '综合排序'}}</text>
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
		<classify-sort-popup ref="sortPopup" @select="getSortIndex"></classify-sort-popup>
		<!-- 分类 -->
		<classify-cloud-popup ref="cloudPopup" :category="categoryItem" @select="getCategory"></classify-cloud-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup" @submit="filterSubmit"></classify-filter-popup>
	</view>
</template>

<script>
	export default {
		name: 'filter-tab',
		data() {
			return {
				sortItem: {},
				categoryItem: {
					categoryName: '全部',
					categoryId: undefined
				},
				filterForm:{},
			};
		},
		methods: {
			// 打开弹窗
			openPopup(refName) {
				this.$refs[refName].open();
			},
			// 排序选中回调
			getSortIndex(item) {
				this.sortItem = item
				console.log(item);
				this.submitFilter()
			},
			// 分类选中回调
			getCategory(item) {
				this.categoryItem = item;
				console.log(item);
				this.submitFilter()
			},
			/** 筛选提交回调
			 * @param {Object} form
			 */
			filterSubmit(form) {
				this.filterForm = form;
				console.log(form);
				this.submitFilter()
			},
			// 提交条件
			submitFilter(){
				const param = {
					sort:this.sortItem.value,
					categoryId:this.categoryItem.categoryId,
					...this.filterForm
				}
				this.$emit('filterParam',param)
			}
		}
	}
</script>

<style lang="less" src="./style.less"></style>
