<!-- 商品 -->
<template>
	<view class="tabs-catalogue">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（20）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">课程评分</text>
				<rate class="rate"></rate>
				<text>1.35</text>
			</view>
			<view class="flex-center">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item, index) in ['', '', '', '']" :key="index"><comment-lists-item></comment-lists-item></block>
		<!-- 视频目录 -->
		<view class="video-catalogue">
			<block v-for="(item, index) in ['', '', '', '']" :key="index"><video-catalogue-item></video-catalogue-item></block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabsProduct',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
