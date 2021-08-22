<!-- 公告 -->
<template>
	<view class="notice-lists">
		<view class="notice-lists-item" :key="index" v-for="(item, index) in ['', '', '', '', '', '', '', '', '']">
			<view class="flex-center">
				<text class="dot"></text>
				<text class="text">关于开放线上商城的公告</text>
			</view>
			<view class="time">2021-05-20 14:20:00</view>
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

<style src="./style.less" lang="less"></style>
