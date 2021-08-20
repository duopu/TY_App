<!-- 验证码登录 -->
<template>
	<view class="code-page">
		<view class="title">请输入验证码</view>
		<view class="subtitle">未注册手机号验证后自动注册</view>
		<input placeholder="请输入验证码" class="input" placeholder-class="input-placeholder" type="number"
			v-model="smsCode" />
		<button class="submit-btn disabled" :disabled="disabled">获取验证码(42)</button>

		<button class="submit-btn" @click="loginBtnClick">登录</button>

	</view>
</template>

<script>
	import config from '../../utils/config.js';
	export default {
		data() {
			return {
				disabled: true,
				phone: '',
				smsCode: '',
				roleStatus:'0'
			};
		},
		onLoad(data) {
			this.phone = data.phone
			this.roleStatus = data.roleStatus
		},
		methods: {
			loginBtnClick() {
				if (!this.smsCode) {
					this.$tool.showToast('请输入验证码')
					return
				}
				const param =  {
					phone: this.phone,
					smsCode: this.smsCode,
					loginType: 1
				}
				this.$http.post('/user/login', param, true).then(res => {
					// 本地保存
					uni.setStorage({
						key: config.storageKeys.loginUserKey,
						data: res
					});
					
					if(this.roleStatus == '0'){
						// 跳转首页页面
						uni.reLaunch({
							url: '/pages-user/main/index/index'
						});
					}else{
						// 跳转首页页面
						uni.reLaunch({
							url: '/pages-business/main/index/index'
						});
					}
					
				})
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
