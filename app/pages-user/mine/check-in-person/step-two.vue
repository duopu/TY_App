<!-- 填写个人信息 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<view class="form-row flex-center-between m-top-60">
			<text class="label text-bold">*姓名</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.userName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">*手机号</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.phone" type="number" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
				<button class="btn-text" @click="getValidateCode">获取验证码</button>
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">*验证码</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.validator" type="number" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">邮箱</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.email" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">QQ</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.qq" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<view class="form-row flex-center-between">
			<text class="label text-bold">*身份证号</text>
			<view class="right flex-center-between flex-1">
				<input v-model="formState.identity" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			</view>
		</view>
		<!-- 身份证上传 -->
		<view class="identity-image-lists flex-center-between">
			<view class="item">
				<!-- 替换已上传的图片 -->
				<image class="image" src="../../../static/images/check-in-identity1.png" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="item">
				<image class="image" src="../../../static/images/check-in-identity2.png" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'StepTwo',
	data() {
		return {
			formState: {
				userName: '',
				phone: '',
				validator: '',
				email: '',
				qq: '',
				identity: ''
			}
		};
	},
	methods: {
		//获取验证码
		getValidateCode() {}
	}
};
</script>

<style lang="less" src="./style.less"></style>
