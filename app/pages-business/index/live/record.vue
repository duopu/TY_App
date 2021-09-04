<!-- 查看直播记录 -->
<template>
	<scroll-view scroll-y="true" class="live record">
		<!-- 记录 -->
		<view class="record-lists-item">
			<image class="image" src="../../../static/images/other/good_banner.png" mode="aspectFill"></image>
			<!-- 直播 -->
			<view class="row flex-center-between">
				<view class="left flex-column flex-1">
					<view class="flex-center">
						<text class="circle"></text>
						<text class="text-bold">20200414</text>
						<text class="color-6">直播</text>
					</view>
				</view>
				<!-- 直播-live -->
				<view class="right flex-center-center live"><image class="icons" src="../../../static/images/icons/icon-live-play.svg" mode="aspectFill"></image></view>
			</view>
			<!-- 回放 -->
			<view class="row flex-center-between">
				<view class="left flex-column flex-1">
					<view class="flex-center">
						<text class="circle"></text>
						<text class="text-bold">20200414</text>
						<text class="color-6">直播</text>
					</view>
					<view class="time">【回放】2021年5月29日 20:00-21:30</view>
				</view>
				<!-- 回放 -->
				<view class="right flex-center-center"><image class="icons" src="../../../static/images/icons/icon-live-playback.svg" mode="aspectFill"></image></view>
			</view>
			<!-- 回放 -->
			<view class="row flex-center-between">
				<view class="left flex-column flex-1">
					<view class="flex-center">
						<text class="circle"></text>
						<text class="text-bold">20200414</text>
						<text class="color-6">直播</text>
					</view>
					<view class="time">【回放】2021年5月29日 20:00-21:30</view>
				</view>
				<!-- 回放 -->
				<view class="right flex-center-center"><image class="icons" src="../../../static/images/icons/icon-live-playback.svg" mode="aspectFill"></image></view>
			</view>
		</view>
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
