<!-- 优惠活动 -->
<template>
	<scroll-view scroll-y="true" class="ticket">
		<view class="title">商家优惠券</view>
		<!-- 优惠券 -->
		<ticket-lists-item :state="1"></ticket-lists-item>
		<!-- 适用商品 -->
		<view class="sub-title"><text class="text">适用商品</text></view>
		<scroll-view class="goods-lists" scroll-x="true">
			<view class="flex-column goods-lists-item" v-for="(item, index) in ['', '', '', '', '', '']" :key="index">
				<image class="goods-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view class="text text-ellipsis">商品名称商品···</view>
			</view>
		</scroll-view>
		<view class="title">平台优惠券</view>
		<block v-for="(item, index) in ['', '', '', '']" :key="index"><ticket-lists-item  :state="1"></ticket-lists-item></block>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
