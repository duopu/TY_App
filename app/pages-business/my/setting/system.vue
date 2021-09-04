<!-- 消息免打扰设置 -->
<template>
	<view class="setting">
		<view class="flex-center-between row">
			<text class="label">通知时段</text>
			<picker class="text" mode="selector">
				<view>全天</view>
			</picker>
			<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			
		</view>
		<view class="flex-center-between row">
			<text class="label">交易消息免打扰</text>
			<view class="blue-switch on" @click="setState"><view class="circle"></view></view>
		</view>
		<view class="flex-center-between row">
			<text class="label">店铺消息免打扰</text>
			<view class="blue-switch on"><view class="circle"></view></view>
		</view>
		<navigator url="./setting/system" class="flex-center-between row">
			<text class="label">客户消息免打扰</text>
			<view class="blue-switch on" @click="setState"><view class="circle"></view></view>
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
