<!-- 视频目录 -->
<template>
	<view class="catalogue-item">
		<view class="flex-center-between root-item">
			<text class="serial-number">1</text>
			<text class="text flex-1 text-ellipsis">教师资格证笔试</text>
			<view class="flex-center">
				<image src="../../static/images/icons/icon-video.svg" class="image-video" mode="aspectFill"></image>
				<text class="color-yellow">试看</text>
			</view>
		</view>
		<view class="sub">
			<view class="flex-center-between sub-item" v-for="(item,index) in ['','','','','','','','']" :key="index">
				<text class="serial-number">1.1</text>
				<text class="text flex-1 text-ellipsis">教师资格证笔试</text>
				<view class="flex-center">
					<image src="../../static/images/icons/icon-video.svg" class="image-video" mode="aspectFill"></image>
					<text class="color-yellow">试看</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'video-catalogue-item',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
