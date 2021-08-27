<!-- 大咖直播 -->
<template>
	<view class="page-wrapper live">
		<view class="live-time flex-center">
			<image class="image-live" src="../../../static/images/live/new-live.png" mode="aspectFill"></image>
			<text class="text">2021-04-21 18:00</text>
		</view>
		<!-- 商家信息 -->
		<view class="flex-center-between live-profile">
			<text class="text-bold">直播名称吧啦吧啦</text>
			<view class="flex-center">
				<image class="image-name" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<text class="font-24">商家名</text>
			</view>
		</view>
		<!-- 广告 -->
		<view class="live-advertise">
			<image class="image-advertise" src="../../../static/images/index/live_img.png" mode="aspectFill"></image>
			<button class="btn btn-block yellow">预约直播</button>
		</view>
		<!-- 往期回放 -->
		<view class="title text-bold">往期回放</view>
		<!-- 列表 -->
		<view class="live-lists">
			<view class="live-lists-item flex-center-between" v-for="(item, index) in ['', '', '', '', '', '']" :key="index">
				<image class="item-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<view class="item-right">
					<view class="name text-bold">5天英语全能挑战</view>
					<view class="flex-center-between">
						<view class="flex-center">
							<image class="image-name" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
							<text class="font-24">商家名</text>
						</view>
						<button class="btn yellow">查看回放</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
