<!-- 第一步 签订入驻协议 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<view class="protocol-title text-bold">入驻协议</view>
		<scroll-view scroll-y="true" class="protocol">
			<view v-html="content" class="h5-content"></view>
			</scroll-view>
		<view class="flex-center agree-row">
			<!-- 选中 类名 on -->
			<view class="radio" :class="{ on: isAgree }" @click="setAgree"></view>
			<view class="flex-center text">我已阅读并同意入驻协议</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name:"stepOne",
	props:{
		isAgree:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			content:'',
		};
	},
	mounted() {
		this.queryAgreement();
	},
	methods: {
		// 同意协议
		setAgree() {
			this.$emit('isAgreeAction',!this.isAgree)
		},
		// 查询入驻协议
		queryAgreement(){
			this.$http.post('/value/config/batchQuery',{codeList:['PERSONAL_SETTLED_AGREEMENT']}).then(res=>{
				const data = res[0];
				this.content = data.content;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
