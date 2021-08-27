<!-- 题库-->
<template>
	<view class="tabs-product">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（20）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">题库评分</text>
				<rate class="rate"></rate>
				<text>1.35</text>
			</view>
			<view class="flex-center">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item,index) in ['','','','']" :key="index">
			<comment-lists-item></comment-lists-item>
		</block>
		<image class="product-image" src="../../../static/images/other/banner.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
export default {
	name: 'tabsBank',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
