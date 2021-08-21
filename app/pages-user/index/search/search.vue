<!-- 搜索界面 -->
<template>
	<view class="page-wrapper search">
		<!-- 头部 -->
		<view class="flex-center search-top">
			<image mode="aspectFill" src="" class="icon-arrow"></image>
			<custom-search placeholder="搜索课程、机构、老师" @input="getSearchInput"></custom-search>
		</view>
		<!-- 内容 -->
		<!-- 默认 -->
		<search-default v-if="!searchInput"></search-default>
		<!-- 结果 -->
		<search-result v-else="searchInput"></search-result>
	</view>
</template>

<script>
import searchDefault from './search-default.vue';
import searchResult from './search-reuslt.vue';
export default {
	components: {
		searchResult,
		searchDefault
	},
	data() {
		return {
			searchInput: '',
			
		};
	},
	methods: {
		// 获取搜索内容
		getSearchInput(value) {
			this.searchInput = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
