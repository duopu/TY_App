<!-- 商家申请入驻 -->
<template>
	<view class="check-in-person">
		<!-- 进度 -->
		<check-in-process :index="processIndex" :data="processData"></check-in-process>
		<!-- 内容 -->
		<!-- step 1 签订入住协议 -->
		<step-one v-if="processIndex === 1"></step-one>
		<!-- step 2 填写机构信息 -->
		<step-two v-else-if="processIndex === 2"></step-two>
		<!-- step 3  填写店铺信息-->
		<step-three v-else-if="processIndex === 3"></step-three>
		<!-- step 4  签署承诺书-->
		<step-four v-else></step-four>
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
			]
		};
	},
	methods: {
		//上一步
		onPervious() {
			this.processIndex--;
		},
		//下一步
		onNext() {
			if (this.processIndex < 4) this.processIndex++;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
