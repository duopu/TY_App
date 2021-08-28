<!-- 商品 拼团 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="title text-bold">
				拼团详情
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="row">
				<text class="label text-bold">团购开始时间：</text>
				<text class="color-6">2020-04-16 10:00:00</text>
			</view>
			<view class="row">
				<text class="label text-bold">团购结束时间：</text>
				<text class="color-6">2020-04-16 10:00:00</text>
			</view>
			<view class="row">
				<text class="label text-bold">拼团规则：</text>
				<text class="color-6">1.活动时间: 2017年8月14日0:00:00-2017年8月20日23:59:59。参与条件: 1、所购买商品为指定自营家用电器和家装建材(含彩电、冰洗、厨卫、空调、生活电器、建材六个品类,不含虚拟商品)</text>
			</view>
			<view class="row">
				<text class="label text-bold">已参团人数：</text>
				<text class="color-6">23</text>
			</view>
			<view class="row price">
				最低折扣：¥2000
			</view>
			<view class="flex-center-between popup-bottom">
				<view class="flex-column-center">
					<image class="icon" src="" mode="aspectFill"></image>
					<text>客服</text>
				</view>
				<button class="btn flex-1">参与拼团</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-group-popup',
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
