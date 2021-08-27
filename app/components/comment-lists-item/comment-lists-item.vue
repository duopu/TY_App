<!-- 评论项 -->
<template>
	<view class="commnent-lists-item">
		<view class="flex-center-between">
			<image mode="aspectFill" class="avatar-image" src="../../static/images/other/girl.png"></image>
			<view class="flex-column flex-1">
				<view class="user-name">燕**yu</view>
				<rate :number="2"></rate>
			</view>
			<view class="time">2020-04-18</view>
		</view>
		<view class="message">宝贝到手了，还没用，期待出来好效果～</view>
	</view>
</template>

<script>
export default {
	name: 'comment-lists-item',
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
