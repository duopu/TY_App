<!-- 退款服务 -->
<template>
	<scroll-view scroll-y="true" class="refund">
		<merchanism-order-lists-item class="store" :state="2"></merchanism-order-lists-item>
		<!-- 退款原因 -->
		<view class="box discount">
			<view class="discount-row flex-center-between">
				<text class="label">退款原因*</text>
				<picker mode="selector" class="flex-1">
					<view class="color-9">请选择</view>
				</picker>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款金额*</text>
				<text class="flex-1">¥500</text>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
			</view>
			<view class="discount-row">
				<text class="label">补充描述*</text>
				<textarea class="textarea" placeholder="请详细描述退款原因及要求" placeholder-class="input-placeholder" />
			</view>
			<view class="discount-row image-lists">
				<view class="flex-center-center image-item">
					<image class="icon-carme" src="../../../static/images/icons/icon-carme.svg" mode="aspectFill"></image>
				</view>
				<!-- 显示上传后的照片 -->
				<view v-if="false" class="image-item flex-center-center">
					<image class="upload-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 提交退款 -->
		<button class="btn">提交退款申请</button>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
