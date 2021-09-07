<!-- 填写个人信息 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<check-in-form-item label="*公司名称" class="m-top-60">
			<input v-model="formState.userName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*营业执照" align="start" class="no-border">
			<view class="upload-image small">
				<!-- 上传后的图片 -->
				<image v-if="false" src="../../../static/images/check-in-banner.png" mode="aspectFill"></image>
				<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*营业执照有效期" class="no-border">
			<view class="select-time flex-center-between">
				<picker mode="time" class="select-time-picker flex-1">
					<view class="flex-center-between">
						<view class="text placeholder">请选择</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill"></image>
					</view>
				</picker>
				<text class="line">—</text>
				<picker mode="time" class="select-time-picker flex-1">
					<view class="flex-center-between">
						<view class="text placeholder">请选择</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill"></image>
					</view>
				</picker>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*教育资质证书" align="start" class="no-border">
			<view class="flex-column">
				<!-- 单选 -->
				<view class="single-radio flex-center">
					<view class="item agree-row flex-center-center">
						<view class="radio on"></view>
						<text>有</text>
					</view>
					<view class="item agree-row flex-center-center">
						<view class="radio"></view>
						<text>无</text>
					</view>
				</view>
				<view class="upload-image small m-top-60">
					<!-- 上传后的图片 -->
					<image v-if="false" src="../../../static/images/check-in-banner.png" mode="aspectFill"></image>
					<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
				</view>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*教育资质证书有效期" class="no-border">
			<view class="select-time flex-center-between">
				<picker mode="time" class="select-time-picker flex-1">
					<view class="flex-center-between">
						<view class="text placeholder">请选择</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill"></image>
					</view>
				</picker>
				<text class="line">—</text>
				<picker mode="time" class="select-time-picker flex-1">
					<view class="flex-center-between">
						<view class="text placeholder">请选择</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill"></image>
					</view>
				</picker>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*负责人姓名">
			<input v-model="formState.userName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*负责人手机号">
			<input v-model="formState.phone" type="number" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="验证码">
			<input v-model="formState.validator" type="number" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			<button class="btn-text" @click="getValidateCode">获取验证码</button>
		</check-in-form-item>
		<check-in-form-item label="*身份证号">
			<input v-model="formState.identity" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<!-- 身份证上传 -->
		<view class="identity-image-lists flex-center">
			<view class="item upload-image">
				<!-- 替换已上传的图片 -->
				<image class="image" src="../../../static/images/check-in-identity1.png" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="item upload-image">
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
