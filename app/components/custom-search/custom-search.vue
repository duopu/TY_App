<!-- 自定义搜素 -->
<template>
	<view class="flex-center custom-search-bar">
		<input v-model="searchInput" placeholder-class="input-placeholder" class="input" type="text" :placeholder="placeholder" />
		<button class="btn-yellow" @click="onSearch">搜索</button>
	</view>
</template>

<script>
export default {
	name: 'custom-search',
	props:{
		placeholder:{
			type:String,
			default:""
		}
	},
	data() {
		return {
			searchInput:''
		};
	},
	methods:{
		// 搜索
		onSearch(){
			this.$emit('input',this.searchInput);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
