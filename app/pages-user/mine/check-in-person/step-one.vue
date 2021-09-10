<!-- 第一步 签订入驻协议 -->
<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<view class="protocol-title text-bold">入驻协议</view>
		<scroll-view scroll-y="true" class="protocol"><view></view></scroll-view>
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
		};
	},
	methods: {
		// 同意协议
		setAgree() {
			this.$emit('isAgreeAction',!this.isAgree)
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
