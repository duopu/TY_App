<!-- 商家详情 -->
<template>
	<scroll-view scroll-y="true" class="message-scroll-content">
		<view class="goods-item" v-for="(item,index) in ['','','','','','']" :key="index">
			<!-- 商家 -->
			<view class="flex-center-between top">
				<view class="name">xx商家</view>
				<view class="desc">2020-12-21  06:45:00</view>
			</view>
	
			<!-- 商品 -->
			<view class="content flex">
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">5天英语全能挑战名称可能很长可能是两行</view>
					<view class="tag"><view class="tag-item">型号一</view></view>
					<view class="flex-center-between">
						<view class="price text-bold">
							<text class="font-24">¥</text>
							<text>500</text>
						</view>
						<view class="number font-24">×2</view>
					</view>
				</view>
			</view>	
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'tab-goods',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
