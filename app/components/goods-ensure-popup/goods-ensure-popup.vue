<!-- 保障 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="title flex-center">保障</view>
				<view class="flex text-end row-item">
					<text class="label">企业认证：</text>
					<image class="auth-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
					<image class="auth-image" src="../../static/images/other/girl.png" mode="aspectFill"></image>
				</view>
				<view class="flex-center row-item">
					<text class="label">平台认证：</text>
					<text class="text">14857492389</text>
				</view>
				<view class="flex-center row-item">
					<text class="label">保证金：</text>
					<text class="text">500929948832003</text>
				</view>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom"><button class="btn btn-block">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-ensure-popup',
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
