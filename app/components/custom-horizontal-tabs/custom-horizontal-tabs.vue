<!-- 自定义：横向-菜单 -->
<template>
	<view class="custom-tabs">
		<view v-for="(item, index) in tabs" 
		:key="`custom-tabs-${index}`" 
		class="custom-tabs-item" 
		:class="{ on: currentIndex === index }" 
		@click="onChangeTab(index)">{{ item }}</view>
	</view>
</template>

<script>
export default {
	name:"custom-horizontal-tabs",
	emits:['change'],
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
		return {
			tabs:this.data
		};
	},
	watch: {
		data(newV, oldV){
			this.tabs = newV;
		}
	},
	methods: {
		// 切换内容
		onChangeTab(value) {
			if (this.currentIndex === value) return;
			this.$emit('change', value);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
