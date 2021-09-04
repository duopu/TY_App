<!-- 新消息通知设置 -->
<template>
	<view class="setting">
		<view class="flex-center-between row">
			<text class="label">通知栏常驻</text>
			<view class="blue-switch on" @click="setState"><view class="circle"></view></view>
		</view>
		<view class="flex-center-between row">
			<text class="label">消息免打扰设置</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="flex-center-between row">
			<text class="label">锁屏提醒</text>
			<view class="blue-switch"><view class="circle"></view></view>
		</view>
		<navigator url="./system" class="flex-center-between row">
			<text class="label">系统通知消息</text>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		// switch 切换
		setState(event){
			console.log(event);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
