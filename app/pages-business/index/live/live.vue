<!-- 直播 -->
<template>
	<scroll-view scroll-y="true" class="live">
		<view class="title text-bold">历史直播</view>
		<view class="live-lists">
			<view class="item flex-column" v-for="(item,index) in ['','','','','']" :key="index">
				<image class="image" src="../../../static/images/other/good_banner.png" mode="aspectFill"></image>
				<view class="flex-center-between bottom">
					<view class="text-ellipsis flex">
						<text class="text-bold">20200414</text>
						<text class="color-6">直播</text>
					</view>
					<view class="time">1小时</view>
				</view>
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
