<!-- 商品 参数 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="title flex-center">参数</view>
				<view class="flex-center row-item">
					<text class="label">课时：</text>
						<text class="text">50课时</text>
			</view>
				<view class="flex-center row-item">
					<text class="label">课程方式：</text>
					<text class="text">录播课</text>
				</view>
				<view class="flex-center row-item">
					<text class="label">题库数量：</text>
					<text class="text">500题</text>
				</view>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom"><button class="btn btn-block">确定</button></view>
		</view>
	</uni-popup>
</template>
<script>
export default {
	name: 'goods-parameter-popup',
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
