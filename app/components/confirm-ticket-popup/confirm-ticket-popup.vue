<!-- 商家优惠券 弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-top flex-center-center">
				<text class="title text-bold">商家优惠券</text>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view class="popup-content" scroll-y="true">
				<block v-for="(item, index) in ['', '', '']" :key="index"><ticket-lists-item :isSelect="true"></ticket-lists-item></block>
			</scroll-view>
			<view class="popup-bottom"><button class="btn" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'confirm-ticket-popup',
	data() {
		return {};
	},
	methods: {
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
