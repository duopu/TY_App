<!-- 发布文章 -->
<template>
	<view class="article">
		<view class="article-top flex-center">
			<text class="color-9">取消</text>
			<text class="title text-bold">发布文章</text>
			<text>发布</text>
		</view>
		<view class="article-content">
			<view class="flex-column text">
				<view>已跳转至</view>
				<view>https://huaban.com/search/?q=%E5%A4%8D%E5%88%B6%E7%BD%91%E5%9D%80&sort=all&category=web_app_icon</view>
			</view>
			<button class="btn-yellow">复制链接</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'publishArticle',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
