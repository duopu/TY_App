<!-- 我的订单 -->
<template>
	<view class="order flex-column">
		<view class="order-top">
			<!-- 导航 -->
			<view class="flex-center">
				<image class="icon-arrow" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
				<custom-search @search="getSearchInput"></custom-search>
				<image class="icon-message" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
			</view>
			<!-- 菜单 -->
			<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :currentIndex="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		</view>

		<!-- 待付款 -->
		<scroll-view scroll-y="true" class="order-content">
			<!-- 商家列表 -->
			<block v-for="(item, index) in ['', '', '', '','','']" :key="index">
				<merchanism-order-lists-item :state="index"></merchanism-order-lists-item>
			</block>
			<!-- 占位符 -->
			<view class="slot-item"></view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['待付款', '待发货', '待收货', '已完成'],
			tabsIndex: 0,
			searchInput:''
		};
	},
	methods: {
		// 获取当前id
		getTabsIndex(value) {
			this.tabsIndex = value;
		},
		// 获取输入的内容
		getSearchInput(value){
			this.searchInput = value;
			console.log(this.searchInput);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
