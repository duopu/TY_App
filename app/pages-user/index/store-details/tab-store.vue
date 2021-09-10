<!-- 一级 店铺详情 -->
<template>
	<view class="store-content">
		<!-- 菜单 -->
		<custom-horizontal-tabs class="custom-tabs" @change="changeTab" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 推荐 -->
		<tab-store-recommend v-if="tabsIndex === 0"></tab-store-recommend>
		<!-- 全部宝贝/新品 -->
		<tab-common v-if="tabsIndex !== 0"></tab-common>
	</view>
</template>

<script>
import TabStoreRecommend from './tab-store-recommend.vue';
import TabCommon from './tab-common.vue';
export default {
	name: 'tab-store',
	components: {
		TabStoreRecommend,
		TabCommon
	},
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['推荐', '全部宝贝', '新品']
		};
	},
	methods: {
		// 切换菜单
		changeTab(value) {
			this.tabsIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
