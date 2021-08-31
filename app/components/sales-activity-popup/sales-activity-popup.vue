<!-- 分销活动详情弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="bottom" :safeArea="false">
		<view class="popup-main">
			<view class="title text-bold">
				活动详情
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="row">
				<text class="label text-bold">活动名称：</text>
				<text class="color-6">xxxx有奖竞猜活动</text>
			</view>
			<view class="row">
				<text class="label text-bold">活动规则：</text>
				<text class="color-6">1.活动时间: 2017年8月14日0:00:00-2017年8月20日23:59:59。参与条件: 1、所购买商品为指定自营家用电器和家装建材(含彩电、冰洗、厨卫、空调、生活电器、建材六个品类,不含虚拟商品)</text>
			</view>
			<view class="row">
				<text class="label text-bold">活动奖品：</text>
				<text class="color-6">iphone20</text>
			</view>
			<view class="row flex-center-between">
				<input type="text">
				<button>立即参加</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'sales-activity-popup',
	data() {
		return {};
	},
	methods:{
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
