<template>
	<view>
		<view class="flex-center filter">
			<view class="filter-item flex-1 flex-center-center" :class="filterSelect('sortPopup')" @click="openPopup('sortPopup')">
				<text>{{ sortItem.name || '综合排序' }}</text>
				<text class="arrow-image"></text>
			</view>
			<view class="filter-item flex-1 flex-center-center" :class="filterSelect('cloudPopup')" @click="openPopup('cloudPopup')">
				<text>{{ categoryItem.categoryName || '全部'}}</text>
				<text class="arrow-image"></text>
			</view>
			<view class="filter-item flex-1 flex-center-center" :class="filterSelect('filterPopup')" @click="openPopup('filterPopup')">
				<text>筛选</text>
				<text class="arrow-image"></text>
			</view>
		</view>

		<!-- 综合排序 -->
		<classify-sort-popup class="popup-top-height" ref="sortPopup" @select="getSortIndex" @change="value => changePopup('sortPopup', value)"></classify-sort-popup>
		<!-- 分类 -->
		<classify-type-popup class="popup-top-height" ref="cloudPopup" :category="categoryItem" @select="getCategory" @change="value => changePopup('cloudPopup', value)"></classify-type-popup>
		<!-- 筛选 -->
		<classify-filter-popup ref="filterPopup" @submit="filterSubmit" @change="value => changePopup('filterPopup', value)"></classify-filter-popup>
	</view>
</template>

<script>
import classifyTypePopup from './classify-cloud-popup/classify-cloud-popup.vue';
export default {
	name: 'filter-tab',
	components: {classifyTypePopup},
	data() {
		return {
			sortItem: {},
			categoryItem: {
				categoryName: '全部',
				categoryId: undefined
			},
			filterForm: {},
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
			},
		};
	},
	watch:{
		popupRefInfos:{
			handler(newValue){
				for (let i in this.popupRefInfos) {
					if(this.popupRefInfos[i].show) return this.$emit('hide',true);
					this.$emit('hide',false)
				}
			},
			deep:true,
			immediate:true
		}
	},
	methods: {
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
		changePopup(refName, show) {
			this.popupRefInfos[refName].show = show;
		},
		// 弹窗 选中class
		filterSelect(refName) {
			return this.popupRefInfos[refName].show ? 'on' : '';
		},
		// 排序选中回调
		getSortIndex(item) {
			this.sortItem = item;
			console.log(item);
			this.submitFilter();
		},
		// 分类选中回调
		getCategory(item) {
			this.categoryItem = item;
			console.log(item);
			this.submitFilter();
		},
		/** 筛选提交回调
		 * @param {Object} form
		 */
		filterSubmit(form) {
			this.filterForm = form;
			console.log(form);
			this.submitFilter();
		},
		// 提交条件
		submitFilter() {
			const param = {
				sort: this.sortItem.value,
				categoryId: this.categoryItem.categoryId,
				...this.filterForm
			};
			this.$emit('filterParam', param);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
