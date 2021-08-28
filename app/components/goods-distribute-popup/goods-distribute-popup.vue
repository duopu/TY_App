<!-- 商品 分销弹窗 -->
<template>
	<uni-popup ref="popup">
		<view class="popup-main">
			<image class="image-success" src="../../static/images/gou.png" mode="aspectFill"></image>
			<view class="text-bold title">分销申请已提交成功！</view>
			<view class="msg">后台审核通过后，即可进行分销</view>
			<button class="btn" @click="close()">确定</button>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-distribute-popup',
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
