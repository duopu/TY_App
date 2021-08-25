<!-- 自定义搜素 -->
<template>
	<view class="flex-center custom-search-bar">
		<input v-model="searchInput" 
		placeholder-class="input-placeholder" 
		class="input"
		 type="text" 
		 :placeholder="placeholder" 
		 @input="inputHandle"/>
		<button class="btn-yellow" @click="onSearch">搜索</button>
	</view>
</template>

<script>
export default {
	name: 'custom-search',
	emits:['input','search'],
	props:{
		placeholder:{
			type:String,
			default:""
		},
		value:{
			type:String,
			default:""
		}
	},
	data() {
		return {
			searchInput:''
		};
	},
	watch: {
		value(newV, oldV){
			this.searchInput = newV;
		}
	},
	methods:{
		inputHandle(event){
			this.$emit('input',event.detail.value);
		},
		// 搜索
		onSearch(){
			if(this.searchInput.length > 0){
				this.$emit('search',this.searchInput);
			}else {
				this.$tool.showToast("请输入关键字");
			}
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
