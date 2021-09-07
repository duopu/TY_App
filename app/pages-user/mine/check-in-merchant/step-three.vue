<template>
	<scroll-view scroll-y="true" class="check-in-form">
		<check-in-form-item label="*头像" :arrow="true" class="m-top-60"><image class="image-avatar" src="../../../static/images/other/girl.png" mode="aspectFill"></image></check-in-form-item>
		<check-in-form-item label="*店铺名称">
			<input v-model="formState.goodsName" type="text" class="input" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*主营类目" align="start">
			<textarea v-model="formState.classify" type="text" class="input textarea h-180" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
		<check-in-form-item label="*机构简介" align="start">
			<textarea v-model="formState.profile" type="text" class="input textarea h-300" placeholder-class="input-placeholder" placeholder="请输入" />
		</check-in-form-item>
	</scroll-view>
</template>

<script>
export default {
	name: 'StepThree',
	data() {
		return {
			formState: {
				avatar: '',
				goodsName: '',
				classify: '',
				profile: ''
			}
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
