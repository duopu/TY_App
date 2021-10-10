<!-- 忘记密码 -->
<template>
	<view class="code-reset pd">
		<view class="title">绑定手机号</view>
		<view class="form">
			<input class="input item" placeholder-class="input-placeholder" type="number" v-model="phone"
				placeholder="请输入手机号" />
			<view class="item">
				<input class="input" placeholder-class="input-placeholder" type="number" v-model="smsCode"
					placeholder="请输入验证码" />
				<view class="getCode" :disable="waitSms" @click="sendSmsCode">
					{{waitSms ? `获取验证码(${smsCodeCountDown})` : '获取验证码'}}</view>
			</view>
		</view>
		<view class="login-btn" @click="bindPhone">绑定手机号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				smsCode: '',
				roleStatus: 'user',
				openId:'',
				provider:'weixin',
				smsCodeCountDown: 0
			};
		},
		onLoad(data) {
			this.roleStatus = data.roleStatus;
			this.provider = data.provider
			this.openId = data.openId
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
					smsType: 4
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
			bindPhone() {
				if (!this.phone) {
					this.$tool.showToast('请输入手机号')
					return
				}
				if (!this.smsCode) {
					this.$tool.showToast('请输入验证码')
					return
				}
				
				this.$http.post('/user/bindPhone', {
					phone: this.phone,
					bindCode: this.smsCode,
					openId: this.openId,
					sourceType: this.provider == 'weixin' ? 1:2
				}, true).then(res => {
					this.$tool.showSuccess('绑定手机号成功',()=>{
						// 登录成功
						this.$tool.login( {...res,roleStatus:this.roleStatus})
					})
				})
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
