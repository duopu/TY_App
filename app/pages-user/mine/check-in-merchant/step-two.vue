<!-- 填写个人信息 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<check-in-form-item label="*公司名称" class="m-top-60">
			<input v-model="mechanismInfo.companyName" type="text" class="input" placeholder-class="input-placeholder"
				placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*营业执照" align="start" class="no-border">
			<view class="upload-image small" @click="uploadPic('businessLicense')">
				<!-- 上传后的图片 -->
				<image class="image-photo" v-if="mechanismInfo.businessLicense" :src="mechanismInfo.businessLicense"
					mode="aspectFill"></image>
				<image class="image-photo" v-else src="../../../static/images/check-in-photo.png" mode="aspectFill">
				</image>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*营业执照有效期" class="no-border">
			<view class="select-time flex-center-between">
				<picker mode="date" class="select-time-picker flex-1" @change="e=>dateChange(e,'businessStartDate')">
					<view class="flex-center-between">
						<view class="text placeholder">{{mechanismInfo.businessStartDate || '请选择'}}</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill">
						</image>
					</view>
				</picker>
				<text class="line">—</text>
				<picker mode="date" class="select-time-picker flex-1" @change="e=>dateChange(e,'businessEndDate')">
					<view class="flex-center-between">
						<view class="text placeholder">{{mechanismInfo.businessEndDate || '请选择'}}</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill">
						</image>
					</view>
				</picker>
			</view>
		</check-in-form-item>

		<check-in-form-item label="*教育资质证书" align="start" class="no-border">
			<!-- 单选 -->
			<view class="single-radio flex-center">
				<view class="item agree-row flex-center-center" @click="changeEducationStatus('1')">
					<view class="radio" :class="{'on':mechanismInfo.educationStatus == '1'}"></view>
					<text>有</text>
				</view>
				<view class="item agree-row flex-center-center"  @click="changeEducationStatus('2')">
					<view class="radio" :class="{'on':mechanismInfo.educationStatus !== '1'}"></view>
					<text>无</text>
				</view>
			</view>
		</check-in-form-item>

		<check-in-form-item label="*教育资质证书" align="start" class="no-border" v-if="mechanismInfo.educationStatus == '1'">
			<view class="upload-image" @click="uploadPic('educationLicense')">
				<view class="upload-image small m-top-60">
					<!-- 上传后的图片 -->
					<image class="image-photo" v-if="mechanismInfo.educationLicense" :src="mechanismInfo.educationLicense"
						mode="aspectFill"></image>
					<image class="image-photo" v-else src="../../../static/images/check-in-photo.png" mode="aspectFill">
					</image>
				</view>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*教育资质证书有效期" class="no-border" v-if="mechanismInfo.educationStatus == '1'">
			<view class="select-time flex-center-between">
				<picker mode="date" class="select-time-picker flex-1" @change="e=>dateChange(e,'educationStartDate')">
					<view class="flex-center-between">
						<view class="text placeholder">{{mechanismInfo.educationStartDate ||  '请选择'}}</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill">
						</image>
					</view>
				</picker>
				<text class="line">—</text>
				<picker mode="date" class="select-time-picker flex-1" @change="e=>dateChange(e,'educationEndDate')">
					<view class="flex-center-between">
						<view class="text placeholder">{{mechanismInfo.educationEndDate ||  '请选择'}}</view>
						<image class="icon-time" src="../../../static/images/icons/icon-time.svg" mode="aspectFill">
						</image>
					</view>
				</picker>
			</view>
		</check-in-form-item>
		<check-in-form-item label="*负责人姓名">
			<input v-model="mechanismInfo.realName" type="text" class="input" placeholder-class="input-placeholder"
				placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*负责人手机号">
			<input v-model="mechanismInfo.phone" type="number" class="input" placeholder-class="input-placeholder"
				placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="验证码">
			<input v-model="mechanismInfo.phoneCode" type="number" class="input" placeholder-class="input-placeholder"
				placeholder="请输入" />
			<button class="btn-text" @click="sendSmsCode">{{waitSms ? `获取验证码(${smsCodeCountDown})` : '获取验证码'}}</button>
		</check-in-form-item>
		<check-in-form-item label="*身份证号">
			<input v-model="mechanismInfo.idCardNumber" type="text" class="input" placeholder-class="input-placeholder"
				placeholder="请输入" />
		</check-in-form-item>
		<!-- 身份证上传 -->
		<view class="identity-image-lists flex-center">
			<view class="item upload-image" @click="uploadPic('idCardFront')">
				<!-- 替换已上传的图片 -->
				<image class="image" :src="idCardFront" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" v-if="!mechanismInfo.idCardFront"
					src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="item upload-image" @click="uploadPic('idCardObverse')">
				<image class="image" :src="idCardObverse" mode="widthFix"></image>
				<!-- 上传标识 -->
				<image class="image-photo" v-if="!mechanismInfo.idCardObverse"
					src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'StepTwo',
		props: {
			mechanismInfo: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				smsCodeCountDown: 0,
			};
		},
		computed: {
			idCardFront() {
				return this.mechanismInfo.idCardFront || '../../../static/images/check-in-identity1.png';
			},
			idCardObverse() {
				return this.mechanismInfo.idCardObverse || '../../../static/images/check-in-identity2.png'
			},
			waitSms() {
				return this.smsCodeCountDown > 0
			}
		},
		methods: {
			//上传图片
			uploadPic(type) {
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
							this.changeMechanismInfo(type, res)
						})
					}
				});
			},
			// 时间选择
			dateChange(event, type) {
				const value = event.detail.value;
				this.changeMechanismInfo(type, value);
			},
			// 教育资质证书 是否有
			changeEducationStatus(value){
				this.changeMechanismInfo('educationStatus', value);
			},
			// 发送验证码
			sendSmsCode() {
				if (this.waitSms) {
					this.$tool.showToast(`请${this.smsCodeCountDown}秒之后重新发送`)
				} else if (!this.mechanismInfo.phone || this.mechanismInfo.phone.length !== 11) {
					this.$tool.showToast(`请输入正确的手机号`)
				} else {
					this.$http.get('/merchantSettle/getSmsCode', {
						phone: this.mechanismInfo.phone
					}, true).then(res => {
						this.startTimer();
					})
				}
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
			// 更改机构信息
			changeMechanismInfo(key, value) {
				let tempMechanismInfo = {
					...this.mechanismInfo
				};
				tempMechanismInfo[key] = value
				this.$emit('changeMechanismInfo', tempMechanismInfo)
			}

		}
	};
</script>

<style lang="less" src="./style.less"></style>
