<!-- 验证码登录 -->
<template>
	<view class="code-page">
		<view class="title">请输入验证码</view>
		<view class="subtitle">未注册手机号验证后自动注册</view>
		<input placeholder="请输入验证码" class="input" placeholder-class="input-placeholder" type="number"
			v-model="smsCode" />
		<button class="submit-btn" :class="{'disabled':waitSms}" :disabled="waitSms" @click="sendSmsCode">{{waitSms ? `获取验证码(${smsCodeCountDown})` : '获取验证码'}}</button>

		<button class="submit-btn" @click="loginBtnClick">注册</button>

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
				roleStatus:'user',
				smsCodeCountDown:60
			};
		},
		computed:{
			waitSms(){
				return this.smsCodeCountDown > 0
			}
		},
		onLoad(data) {
			this.phone = data.phone
			this.roleStatus = data.roleStatus
			this.startTimer()
		},
		methods: {
			// 发送验证码
			sendSmsCode() {
				if (this.waitSms) {
					this.$tool.showToast(`请${this.smsCodeCountDown}秒之后重新发送`)
					return
				}
				this.$http.get('/user/getSmsCode',{phone:this.phone,smsType:1},true).then(res=>{
					this.startTimer();
				})
			},
			startTimer(){
				// 开始倒计时
				this.smsCodeCountDown = 60;
				const timer = setInterval(() => {
					if (this.smsCodeCountDown <= 0) {
						clearInterval(timer);
					}else{
						this.smsCodeCountDown -= 1;
					}
				}, 1000)
			},
			loginBtnClick() {
				if (!this.smsCode) {
					this.$tool.showToast('请输入验证码')
					return
				}
				const source = this.roleStatus == 'user' ? 3 : 2
				
				const param =  {
					phone: this.phone,
					smsCode: this.smsCode,
					loginType: 1,
					source
				}
				
				this.$http.post('/user/login', param, true).then(res => {
					this.$tool.showSuccess('注册成功',()=>{
						// 打开App 或者 打开App下载页面
						this.$tool.openApp();
					})
				})
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
