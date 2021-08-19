<!-- 自定义：横向-菜单 -->
<template>
	<scroll-view scroll-x="true" class="custom-tabs">
		<view v-for="(item, index) in data" :key="index" class="custom-tabs-item" :class="{ on: currentIndex === index }" @click="onChangeTab(index)">{{ item }}</view>
	</scroll-view>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => []
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {};
	},
	methods: {
		// 切换内容
		onChangeTab(value) {
			this.$emit('change', value);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
