<!-- 申请分销说明弹窗 -->
<template>
	<uni-popup ref="popup">
		<view class="popup-main">
			<view class="title">申请说明</view>
			<view class="text" v-if="state === 0">请在商品详情页中选择申请分销，待商家审核通过后即可进行分销。</view>
			<view class="text" v-if="state === 1">请在店铺首页中选择申请分销，待商家审核通过后即可进行分销。</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'sales-apply-popup',
	data() {
		return {};
	},
	props:{
		state:{
			type:Number,
			default:0
		}
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
