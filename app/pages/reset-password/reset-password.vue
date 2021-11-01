<!-- 忘记密码 -->
<template>
	<view class="code-reset pd">
		<view class="title">重置密码</view>
		<view class="form">
			<input class="input item" placeholder-class="input-placeholder" type="text" v-model="phone"
				placeholder="请输入手机号" />
			<view class="item">
				<input class="input" placeholder-class="input-placeholder" type="text" v-model="smsCode"
					placeholder="请输入验证码" />
				<view class="getCode"  :disable="waitSms" @click="sendSmsCode">
					{{waitSms ? `获取验证码(${smsCodeCountDown})` : '获取验证码'}}</view>
			</view>
			<view class="item">
				<input class="input" placeholder-class="input-placeholder" :type="eye == 1 ? 'password' : 'text'"
					v-model="pwd" placeholder="请输入密码(6～20位任意字符组合)" />
				<image class="icon" v-if="eye == 1" @click="()=>eye=2" src="../../static/images/login/eye-close.png"
					mode="aspectFill"></image>
				<image class="icon" v-if="eye == 2" @click="()=>eye=1" src="../../static/images/login/eye.png"
					mode="aspectFill"></image>
			</view>
			<view class="item">
				<input class="input" placeholder-class="input-placeholder" :type="eye == 1 ? 'password' : 'text'"
					v-model="pwdAgain" placeholder="请再次输入密码" />
				<image class="icon" v-if="eye == 1" @click="()=>eye=2" src="../../static/images/login/eye-close.png"
					mode="aspectFill"></image>
				<image class="icon" v-if="eye == 2" @click="()=>eye=1" src="../../static/images/login/eye.png"
					mode="aspectFill"></image>
			</view>
		</view>
		<view class="login-btn" @click="onResetPwd">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eye: 1,
				phone: '',
				smsCode: '',
				//user-用户版 business-商家版
				roleStatus: 'user',
				pwd: '',
				pwdAgain: '',
				smsCodeCountDown: 0
			};
		},
		onLoad(data) {
			this.roleStatus = data.roleStatus
		},
		computed: {
			waitSms() {
				return this.smsCodeCountDown > 0
			}
		},
		methods: {
			// 发送验证码
			sendSmsCode() {
				if (!this.phone) {
					this.$tool.showToast('请输入手机号')
					return
				}
				if (this.waitSms) {
					this.$tool.showToast(`请${this.smsCodeCountDown}秒之后重新发送`)
					return
				}
				this.$http.get('/user/getSmsCode', {
					phone: this.phone,
					smsType: 3
				}, true).then(res => {
					this.startTimer();
				})
			},
			startTimer() {
				// 开始倒计时
				this.smsCodeCountDown = 60;
				const timer = setInterval(() => {
					if (this.smsCodeCountDown <= 0) {
						clearInterval(timer);
					} else {
						this.smsCodeCountDown -= 1;
					}
				}, 1000)
			},
			onResetPwd() {
				if (!this.phone) {
					this.$tool.showToast('请输入手机号')
					return
				}
				if (!this.smsCode) {
					this.$tool.showToast('请输入验证码')
					return
				}
				if (!this.pwd) {
					this.$tool.showToast('请输入新密码')
					return
				}
				if (this.pwd !== this.pwdAgain) {
					this.$tool.showToast(`两次密码输入不一致`)
					return
				}

				const url = this.roleStatus == 'user' ? '/user/resetPassword' : '/storeUser/resetPassword';
				const param = {
					phone: this.phone,
					phoneSmsCode: this.smsCode,
					newPassword: this.pwd,
					confirmPassword: this.pwdAgain
				}
				this.$http.post(url,param , true).then(res => {
					this.$tool.showSuccess('密码重置成功',()=>{
						uni.navigateBack({})
					})
				})
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
