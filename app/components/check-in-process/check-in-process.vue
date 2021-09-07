<!-- 入驻的进度 -->
<template>
	<view class="flex-center-between process-lists">
		<view class="item flex-column-center" :class="{ on: index >= itemIndex + 1, line: itemIndex + 1 !== 4 }" v-for="(item, itemIndex) in data" :key="itemIndex">
			<view class="number">{{ itemIndex + 1 }}</view>
			<view class="text">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'check-in-process',
	props: {
		index: {
			type: Number,
			default: 1
		},
		data: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
