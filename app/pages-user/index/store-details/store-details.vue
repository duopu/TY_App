<!-- 店铺详情 -->
<template>
	<view class="store flex-column">
		<!-- 头部 -->
		<view class="flex-center-between store-top">
			<image @click="goBack" class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
			<custom-search v-if="tabbarIndex === 1" placeholder="搜索" @search="getSearchInput"></custom-search>
		</view>
		<scroll-view scroll-y="true" class="store-content">
			<!-- 店铺信息-->
			<view class="store-message-item flex">
				<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
				<view class="right flex-1 flex-column-between">
					<view class="item-top flex-center-between">
						<view class="flex-column flex-1">
							<view class="flex-center">
								<view class="text-bold">店铺名称</view>
								<image class="icon-company" src="../../../static/images/index/company-tag.png" mode="aspectFill"></image>
							</view>
							<text class="desc">补充说明</text>
						</view>
						<view class="flex-column-center save">
							<image class="icon" src="../../../static/images/icons/icon-save.svg" mode="aspectFill"></image>
							<text class="text">已收藏</text>
						</view>
						<view class="flex-column-center">
							<image class="icon" src="../../../static/images/icons/icon-share2.svg" mode="aspectFill"></image>
							<text class="text">申请分销</text>
						</view>
					</view>
					<!-- 得分 -->
					<view class="rate flex-center">
						<text>综合评分</text>
						<rate :max="5" class="rate-star"></rate>
					</view>
				</view>
			</view>
			<!-- 店铺-->
			<tab-store class="store-content" v-if="tabbarIndex === 0"></tab-store>
			<!-- 商品 -->
			<tab-goods class="store-content" v-else-if="tabbarIndex === 1"></tab-goods>
		</scroll-view>

		<!-- 底部 tabbar -->
		<view id="botom" class="store-bottom flex-center">
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
	onLoad() {},
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
