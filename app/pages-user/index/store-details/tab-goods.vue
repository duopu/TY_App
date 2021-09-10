<!-- 一级 商品 -->
<template>
	<!-- 全部宝贝 -->
	<tab-common></tab-common>
</template>

<script>
import TabCommon from './tab-common.vue';
export default {
	name: 'tab-goods',
	components: {
		TabCommon
	},
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['推荐', '全部宝贝', '新品'],
			queryParams:{
				searchText
			}
		};
	},
	methods: {
		
		// 获取搜索内容
		getSearchInput(value) {
			this.queryParams.searchText = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>