<!-- 入驻项 -->
<template>
	<view class="form-row" :class="align === 'center' ? 'flex-center-between' : 'flex'">
		<text class="label text-bold">{{ label }}</text>
		<view class="right flex-center-between flex-1" @click="rowClick">
			<slot></slot>
			<image v-if="arrow" class="icon-right" mode="aspectFill" src="../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'check-on-form-item',
	data() {
		return {};
	},
	props: {
		align: {
			type: String,
			default: 'center'
		},
		label: {
			type: String,
			default: ''
		},
		arrow: {
			type: Boolean,
			default: false
		}
	},
	methods:{
		rowClick(){
			this.$emit('rowClick')
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
