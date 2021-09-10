<!-- 系统通知 -->
<template>
	<scroll-view scroll-y="true" class="message-scroll-content">
		<view class="system-item flex-center-between"  v-for="(item,index) in ['','','','','','']" :key="index">
			<image class="image" src="../../../static/images/gantanhao.png" mode="aspectFill"></image>
			<view class="name text-bold flex-1">商城已于4月21日开放！</view>
			<view class="font-24 color-9 ">2020-12-21</view>
			<view class="new-circle"></view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'tab-system',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
