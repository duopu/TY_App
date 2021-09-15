<!-- 填写个人信息 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<check-in-form-item label="*姓名" class="m-top-60">
			<input v-model="userInfo.realName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*手机号">
			<input v-model="userInfo.phone" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
			<button class="btn-text" @click="sendSmsCode">{{waitSms ? `获取验证码(${smsCodeCountDown})` : '获取验证码'}}</button>
		</check-in-form-item>
		<check-in-form-item label="*验证码">
			<input v-model="userInfo.smsCode" type="number" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		
		<check-in-form-item label="邮箱">
			<input v-model="userInfo.email" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		
		<check-in-form-item label="QQ">
			<input v-model="userInfo.qq" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		
		<check-in-form-item label="*身份证号">
			<input v-model="userInfo.idCardNumber" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		
		<!-- 身份证上传 -->
		<view class="identity-image-lists flex-center">
			
			<view class="item" @click="uploadIdcardImg('idCardFront')">
				<!-- 替换已上传的图片 -->
				<image class="image" :src="idCardFront" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" v-if="!userInfo.idCardFront" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="item" @click="uploadIdcardImg('idCardObverse')">
				<image class="image" :src="idCardObverse" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" v-if="!userInfo.idCardObverse" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'StepTwo',
	props:{
		userInfo:{
			type:Object,
			default:()=>{}
		}
	},
	computed:{
		idCardFront(){
			return this.userInfo.idCardFront || '../../../static/images/check-in-identity1.png';
		},
		idCardObverse(){
			return this.userInfo.idCardObverse || '../../../static/images/check-in-identity2.png'
		},
		waitSms(){
			return this.smsCodeCountDown > 0
		}
	},
	data() {
		return {
			smsCodeCountDown:0,
		};
	},
	
	methods: {
		// 发送验证码
		sendSmsCode() {
			if (this.waitSms) {
				this.$tool.showToast(`请${this.smsCodeCountDown}秒之后重新发送`)
			}else if(!this.userInfo.phone || this.userInfo.phone.length !== 11){
				this.$tool.showToast(`请输入正确的手机号`)
			}else{
				this.$http.get('/merchantSettle/getSmsCode',{phone:this.userInfo.phone},true).then(res=>{
					this.startTimer();
				})
			}
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
		uploadIdcardImg(type){
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: (e) => {
					let formData = { 
						file: e.tempFiles[0],
						path: e.tempFilePaths[0]
					}
					// 上传图片
					this.$http.upload(formData).then(res => {
						let userInfo = {...this.userInfo}
						if(type == 'idCardFront'){
							userInfo.idCardFront = res
						}else{
							userInfo.idCardObverse = res
						}
						this.$emit('changeUserInfo',userInfo)
					})
				}
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
