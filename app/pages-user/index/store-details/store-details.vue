<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<!-- 内容 -->
		<tab-store></tab-store>
		<!-- 底部 tabbar -->
		<view class="store-bottom flex-center">
			<view class="item flex flex-column-center" v-for="(item, index) in tabbarData" :key="index" @click="changeTabsContent(index)">
				<image class="image" :src="tabsIndex === index ? item.iconSelectPath : item.iconPath" mode="aspectFill"></image>
				<text :class="{ on: tabsIndex === index }">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import TabStore from './tab-store.vue';
export default {
	components: {
		TabStore
	},
	data() {
		return {
			tabsIndex: 0,
			tabbarData: [
				{
					iconPath: '../../../static/images/tabbars/store-tabbar-store.png',
					iconSelectPath: '../../../static/images/tabbars/store-tabbar-store-select.png',
					text: '店铺'
				},
				{
					iconPath: '../../../static/images/tabbars/store-tabbar-goods.png',
					iconSelectPath: '../../../static/images/tabbars/store-tabbar-goods-select.png',
					text: '商品'
				},
				{
					iconPath: '../../../static/images/tabbars/store-tabbar-kf.png',
					iconSelectPath: '',
					text: '客服'
				}
			]
		};
	},
	methods: {
		/**
		 * 切换content
		 * 点击客服进行跳转
		 * */
		changeTabsContent(index) {
			if (index < 2) this.tabsIndex = index;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
