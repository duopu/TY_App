<!-- 搜索界面 -->
<template>
	<view class="page-wrapper search">
		<!-- 头部 -->
		<view class="flex-center search-top">
			<image @click="onBack" mode="aspectFill" src="../../../static/images/login/back.png" class="icon-arrow"></image>
			<custom-search placeholder="搜索课程、机构、老师" :value="searchInput" @search="onSearch" @input="inputHandle"></custom-search>
		</view>
		<!-- 内容 -->
		<!-- 默认 -->
		<search-default v-show="!searchInput" @tagClick="tagHandle"></search-default>
		<!-- 结果 -->
		<search-result v-show="searchInput" :searchText="searchInput" :currentTabIndex="tabIndex"></search-result>
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
			tabIndex: 0
		};
	},
	methods: {
		//返回上一级
		onBack(){
			uni.navigateBack({
				delta: 1
			});
		},
		// 搜索事件
		onSearch(value) {
			if(value == null || value.length === 0){
				this.$tool.showToast("请输入关键字");
				return
			}
			this.searchInput = value;
			// 保存搜索记录
			this.$store.commit('addHistorySearch',value);
		},
		
		// 搜索框内容改变
		inputHandle(value){
			if(value.length == 0){
				this.searchInput = '';
			}
		},
		
		// 搜索标签点击
		tagHandle({search,tabType}){
			this.searchInput = search;
			this.tabIndex = tabType;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
