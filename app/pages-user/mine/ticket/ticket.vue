<!-- 优惠券 -->
<template>
	<view class="ticket">
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 未使用 -->
		<scroll-view scroll-y="true" class="ticket-lists">
			<!-- 平台优惠券 -->
			<view class="title">平台优惠券</view>
			<block v-for="(item, index) in ['', '', '', '']" :key="index"><ticket-lists-item></ticket-lists-item></block>
			<!-- 商家优惠券 -->
			<view class="title">商家优惠券</view>
			<block v-for="(item, index) in ['', '']" :key="index">
				<view class="flex-center goods-item">
					<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
					<text>商家品品</text>
				</view>
				<block v-for="(item, index) in ['', '', '']" :key="index"><ticket-lists-item></ticket-lists-item></block>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['未使用', '已使用', '已过期']
		};
	},
	methods: {
		// 获得当前tab index
		getTabsIndex(value) {
			this.tabsIndex = value;
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
