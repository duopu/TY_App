<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<!-- 头部 -->
		<view class="flex-center-between store-top">
			<image @click="goBack" class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
			<custom-search v-if="tabbarIndex === 1" placeholder="搜索" @search="getSearchInput"></custom-search>
		</view>
		<!-- 店铺-->
		<tab-store v-if="tabbarIndex === 0"></tab-store>
		<!-- 商品 -->
		<tab-goods v-else-if="tabbarIndex === 1"></tab-goods>
		<!-- 底部 tabbar -->
		<view class="store-bottom flex-center">
			<view class="item flex flex-column-center" v-for="(item, index) in tabbarData" :key="index" @click="changeTabsContent(index)">
				<image class="image" :src="tabbarIndex === index ? item.iconSelectPath : item.iconPath" mode="aspectFill"></image>
				<text :class="{ on: tabbarIndex === index }">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import TabStore from './tab-store.vue';
import TabGoods from './tab-goods.vue';
export default {
	components: {
		TabStore,
		TabGoods
	},
	data() {
		return {
			tabbarIndex: 0,
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
		// 切换content，点击客服进行跳转
		changeTabsContent(index) {
			if (index < 2) this.tabbarIndex = index;
		},
		//  返回上一级
		goBack() {
			uni.navigateBack({
				delta: -1
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
