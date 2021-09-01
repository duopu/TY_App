<template>
	<view class="ticket">
		<view class="ticket-top">
			<business-common-navigation></business-common-navigation>
			<!-- tabs -->
			<custom-horizontal-tabs :data="tabsData" :currentIndex="tabsIndex" class="custom-tabs"></custom-horizontal-tabs>
		</view>
		<!-- 优惠卷 -->
		<scroll-view scroll-y="true">
			<view class="ticket-item flex-center-between">
				<view class="left flex-column">
					<view class="price flex">
						<view class="unit">¥</view>
						5
					</view>
					<view class="desc">满20元可用</view>
				</view>
				<view class="middle flex-column">
					<view class="text">
						产品
						<text class="color-red">5</text>
						元优惠券
					</view>
					<view class="tag red">永久</view>
				</view>
				<view class="right flex-center-center"><image src="../../../static/images/icons/icon-copy.svg" class="icon-copy" mode="aspectFill"></image></view>
			</view>
			<view class="action">
				<view class="flex-center-between record-row">
					<text class="text">领取使用记录</text>
					<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
				</view>
				<view class="flex-center-between">
					<view class="btn yellow">复制优惠券</view>
					<view class="btn red">删除</view>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="ticket-item flex-center-between">
				<view class="left flex-column">
					<view class="price flex">
						<view class="unit">¥</view>
						5
					</view>
					<view class="desc">满20元可用</view>
				</view>
				<view class="middle flex-column">
					<view class="text">
						产品
						<text class="color-red">5</text>
						元优惠券
					</view>
					<view class="tag yellow">剩余XXX天失效</view>
				</view>
				<view class="right flex-center-center"><image src="../../../static/images/icons/icon-copy.svg" class="icon-copy" mode="aspectFill"></image></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['已创建', '已失效'],
			tabsIndex: 0
		};
	}
};
</script>

<style src="./style.less" lang="less"></style>
