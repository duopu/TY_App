<!-- 收藏或足迹 -->
<template>
	<view class="collect">
		<!-- top -->
		<custom-horizontal-tabs class="collect-top" :data="tabsData" :currentIndex="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		<!-- 商品收藏 -->
		<tabs-goods v-if="tabsIndex === 0"></tabs-goods>
		<!-- 店铺收藏 -->
		<tabs-store v-else-if="tabsIndex === 1"></tabs-store>
		<!-- 底部 -->
		<view class="collect-bottom flex-center-between">
			<view class="left flex-center">
				<view class="radio"></view>
				<text>全选</text>
			</view>
			<button class="btn">删除</button>
		</view>
	</view>
</template>

<script>
import TabsGoods from './tabs-goods.vue';
import TabsStore from './tabs-store.vue';
export default {
	components: {
		TabsStore,
		TabsGoods
	},
	data() {
		return {
			tabsData: ['商品收藏', '店铺收藏', '我的足迹'],
			tabsIndex: 0
		};
	},
	methods: {
		// 获取 tabs Index
		getTabsIndex(value) {
			this.tabsIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
