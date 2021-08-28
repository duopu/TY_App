<!-- 商品-属性分类 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="flex">
					<image class="avatar-image" mode="aspectFill" src="../../static/images/other/demo.png"></image>
					<view class="price">
						<text class="unit">¥</text>
						500
					</view>
				</view>
				<!-- 属性分类 -->
				<view class="title text-bold">属性分类</view>
				<view class="lists">
					<view class="item on">型号一</view>
					<view class="item">型号二</view>
					<view class="item">型号三</view>
				</view>
				<!-- 数量 -->
				<view class="title text-bold">数量</view>
				<uni-number-box class="com-nunmber-box"></uni-number-box>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom"><button class="btn btn-block">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-classify-popup',
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
