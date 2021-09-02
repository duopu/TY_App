<!-- 金币抵扣 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-center">
				<text class="title text-bold">金币抵扣</text>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view class="popup-content" scroll-y="true">
				<view class="row flex-center-between" @click="changeDiscount(0)">
					<view class="text">500金币 可抵扣5元</view>
					<view class="radio" :class="{ on: selectDiscount === 0 }"></view>
				</view>
				<view class="row flex-center-between" @click="changeDiscount(1)">
					<view class="text">不使用金币抵扣</view>
					<view class="radio" :class="{ on: selectDiscount === 1 }"></view>
				</view>
			</scroll-view>
			<view class="popup-bottom"><button class="btn" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'confirm-dicount-popup',
	data() {
		return {
			selectDiscount: 0
		};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 选择折扣
		changeDiscount(value) {
			if(this.selectDiscount === value) return;
			this.selectDiscount = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
