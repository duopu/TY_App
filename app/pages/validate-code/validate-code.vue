<!-- 验证码登录 -->
<template>
	<view class="code-page">
		<view class="title">请输入验证码</view>
		<view class="subtitle">未注册手机号验证后自动注册</view>
		<input placeholder="请输入验证码" class="input" placeholder-class="input-placeholder" type="number" />
		<button class="submit-btn disabled" :disabled="disabled">获取验证码(42)</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			disabled:true
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
