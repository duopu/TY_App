<!-- 交卷 弹窗 -->
<template>
	<uni-popup ref="popup">
		<view class="popup-main">
			<image class="image-success" src="../../static/images/gantanhao.png" mode="aspectFill"></image>
			<view class="text-bold title">还有20道题未完成，确定交卷？</view>
			<button class="btn btn-block" @click="close()">确定</button>
			<button class="btn btn-text" @click="close()">取消</button>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'course-exam-submit',
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
