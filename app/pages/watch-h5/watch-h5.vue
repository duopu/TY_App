<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:''
			};
		},
		onLoad(option) {
			this.code = option.code;
			this.queryDictInfo()
		},
		methods:{
			// 查询字段详情
			queryDictInfo(){
				this.$http.post('/value/config/batchQuery',{configDTO:{codeList:[this.code]}}).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
