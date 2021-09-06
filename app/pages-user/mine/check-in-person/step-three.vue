<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<view class="form-row flex-center-between m-top-60">
			<text class="label text-bold">*头像</text>
			<view class="right flex-center-between flex-1">
				<image class="image-avatar" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
				<image class="icon-right" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">*店铺名称</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.goodsName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-between">
			<text class="label text-bold">*主营类目</text>
			<view class="right flex-center-between flex-1">
				<textarea v-model="formState.classify" type="text" class="input textarea h-180" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-between">
			<text class="label text-bold">*店铺简介</text>
			<view class="right flex-center-between flex-1">
				<textarea v-model="formState.profile" type="text" class="input textarea h-300" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'StepThree',
	data() {
		return {
			formState: {
				avatar: '',
				goodsName: '',
				classify: '',
				profile: ''
			}
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
