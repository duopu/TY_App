<!-- 登录页面 -->
<template>
	<view class="login-page">
		<view class="top">
			<view class="logo flex-center-center">
				<image class="logo-image" src="../../../static/images/logo.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="form-wrapper">

			<input class="input" placeholder-class="input-placeholder" type="number" v-model="phone"
				placeholder="请输入手机号或用户名" />
			<view class="flex-center-between input-with-icon">
				<input class="input" placeholder-class="input-placeholder" :type="eye == 1 ? 'password' : 'text'"
					v-model="pwd" placeholder="请输入密码" />
				<image class="icon" v-if="eye == 1" @click="toggleEye" src="../../../static/images/login/eye-close.png"
					mode="aspectFill"></image>
				<image class="icon" v-if="eye == 2" @click="toggleEye" src="../../../static/images/login/eye.png"
					mode="aspectFill"></image>
			</view>

			<view class="login-btn" @click="pwdLogin">绑定</view>

		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'

	export default {
		data() {
			return {
				roleStatus: 'business', //user-用户版 business-商家版
				eye: 1, // 密码登录， 密码输入框的那个小眼睛 标记
				phone: '', // 手机号
				pwd: '', // 密码
			};
		},
		methods: {

			toggleEye() {
				this.eye = this.eye == 1 ? 2 : 1;
			},
			// 验证码 按钮
			onGetCode() {
				if (!this.phone) {
					this.$tool.showToast('请输入手机号')
					return
				}
				// 发送验证码
				this.$http.get('/user/getSmsCode', {
					phone: this.phone,
					smsType: 1
				}, true).then(res => {
					uni.navigateTo({
						url: `/pages/validate-code/validate-code?phone=${this.phone}&roleStatus=${this.roleStatus}`
					});
				})
			},
			// 密码登录
			pwdLogin() {
				if (!this.phone) {
					this.$tool.showToast('请输入手机号')
					return
				}
				if (!this.pwd) {
					this.$tool.showToast('请输入密码')
					return
				}
				const pwd = md5(this.pwd).substr(2,28)
				this.$http.post('/storeUser/relate',{userName:this.phone,password:pwd},true).then(res=>{
					uni.navigateBack({})
					this.$tool.showSuccess('绑定成功')
				}) 
			},
			// 跳转忘记密码
			onForgetPwd() {
				uni.navigateTo({
					url: `/pages/reset-password/reset-password?roleStatus=${this.roleStatus}`
				})
			},
			// QQ登录
			qqLogin() {
				this.authLogin('qq')
			},
			// 微信登录
			wechatLogin() {
				this.authLogin('weixin')
			},
			authLogin(provider) {
				uni.showLoading({
					title: '登录中...'
				})
				uni.login({
					provider: provider,
					success: ({
						authResult
					}) => {
						console.log('微信登录', authResult);
						const source = this.roleStatus == 'user' ? 3 : 2
						const loginType = provider == 'weixin' ? 3 : 4
						this.$http.post('/user/login', {
							loginType,
							openId: authResult.openid,
							source
						}, true).then(res => {
							this.authResultTodo(provider, authResult.openid, res)
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				});
			},
			authResultTodo(provider, openId, data) {
				if (data.isBind) {
					// 登录成功
					this.$tool.login({
						...data,
						roleStatus: this.roleStatus
					})
				} else {
					// 未绑定手机号
					uni.navigateTo({
						url: `/pages/bind-phone/bind-phone?roleStatus=${this.roleStatus}&openId=${openId}&provider=${provider}`
					})
				}
			},
			// 查看用户服务协议
			watchServerAgreement() {
				uni.navigateTo({
					url: '/pages/watch-h5/watch-h5?code=USER_AGREEMENT'
				})
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
