<!-- 商家申请入驻 -->
<template>
	<view class="check-in-person">
		<!-- 进度 -->
		<check-in-process :index="processIndex" :data="processData"></check-in-process>
		<!-- 内容 -->
		<!-- step 1 签订入住协议 -->
		<step-one v-if="processIndex === 1" @isAgreeAction="a => isAgree = a" :isAgree="isAgree"></step-one>
		<!-- step 2 填写机构信息 -->
		<step-two v-else-if="processIndex === 2" @changeMechanismInfo="m=>mechanismInfo=m" :mechanismInfo="mechanismInfo"></step-two>
		<!-- step 3  填写店铺信息-->
		<step-three v-else-if="processIndex === 3" @changeShopInfo="s=>shopInfo=s" :shopInfo="shopInfo"></step-three>
		<!-- step 4  签署承诺书-->
		<step-four v-else @changeContractInfo="c=>contractInfo=c" :contractInfo="contractInfo"></step-four>
		<!-- 底部 -->
		<view class="flex-center-center bottom">
			<button v-show="processIndex > 1" class="btn btn-border text-bold" @click="onPervious">上一步</button>
			<button class="btn btn-block text-bold" @click="onNext">{{ processIndex === 4 ? '提交' : '下一步' }}</button>
		</view>
	</view>
</template>

<script>
import StepOne from './step-one.vue';
import StepTwo from './step-two.vue';
import StepThree from './step-three.vue';
import StepFour from './step-four.vue';
export default {
	components: {
		StepOne,
		StepTwo,
		StepThree,
		StepFour
	},
	data() {
		return {
			processIndex: 1,
			processData: [
				{
					text: '签订入驻协议'
				},
				{
					text: '填写机构信息'
				},
				{
					text: '填写店铺信息'
				},
				{
					text: '签署承诺书'
				}
			],
			// 是否同意协议
			isAgree:false,
			// 机构信息
			mechanismInfo:{
				educationStatus:'1',
			},
			// 店铺信息
			shopInfo:{},
			// 承诺书信息
			contractInfo:{},
		};
	},
	methods: {
		//上一步
		onPervious() {
			this.processIndex--;
		},
		//下一步
		onNext() {
			if(this.processIndex == 1){
				if(!this.isAgree){
					this.$tool.showToast('请同意入驻协议')
				}else{
					this.processIndex++;
				}
			}else if(this.processIndex == 2){
				console.log(this.mechanismInfo);
				
				if(!this.mechanismInfo.companyName) {
					this.$tool.showToast('请输入公司名称')
				}else if(!this.mechanismInfo.businessLicense){
					this.$tool.showToast('请上传营业执照')
				}else if(!this.mechanismInfo.businessStartDate || !this.mechanismInfo.businessEndDate){
					this.$tool.showToast('请输入营业执照有效期')
				}else if(this.mechanismInfo.educationStatus == '1' && !this.mechanismInfo.educationLicense ){
					this.$tool.showToast('请上传教育资质证书')
				}else if(this.mechanismInfo.educationStatus == '1' && (!this.mechanismInfo.educationStartDate || !this.mechanismInfo.educationEndDate)){
					this.$tool.showToast('请输入教育资质证书有效期')
				}else if(!this.mechanismInfo.realName){
					this.$tool.showToast('请输入负责人姓名')
				}else if(!this.mechanismInfo.phone){
					this.$tool.showToast('请输入负责人手机号')
				}else if(!this.mechanismInfo.phoneCode){
					this.$tool.showToast('请输入验证码')
				}else if(!this.mechanismInfo.idCardNumber){
					this.$tool.showToast('请输入身份证号')
				}else if(!this.mechanismInfo.idCardFront){
					this.$tool.showToast('请输入上传身份证头像面')
				}else if(!this.mechanismInfo.idCardObverse){
					this.$tool.showToast('请输入上传身份证国徽面')
				}else{
					this.processIndex++;
				}

			}else if(this.processIndex == 3){
				if(!this.shopInfo.avatar) {
					this.$tool.showToast('请选择头像')
				}else if(!this.shopInfo.storeName){
					this.$tool.showToast('请输入店铺名称')
				}else if(!this.shopInfo.mainDesc){
					this.$tool.showToast('请输入主营类目')
				}else if(!this.shopInfo.storeDesc){
					this.$tool.showToast('请输入机构简介')
				}else{
					this.processIndex++;
				}
				console.log(this.shopInfo);
			}else if(this.processIndex == 4){
				console.log(this.contractInfo);
				if(!this.contractInfo.commitmentBook) {
					this.$tool.showToast('请上传手持承诺书照片')
				}else{
					const param = {
						...this.mechanismInfo,
						...this.shopInfo,
						...this.contractInfo
					}
					this.$http.post('/merchantSettle/register',param,true).then(res=>{
						this.$tool.showSuccess('入驻申请提交成功',()=>{
							uni.navigateBack({})
						})
					})
				}
			}
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
