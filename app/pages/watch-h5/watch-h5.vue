<template>
	<view class="h5-content" v-html="content" >
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
				content:''
			};
		},
		onLoad(option) {
			this.code = option.code;
			this.queryDictInfo()
		},
		methods:{
			// 查询字段详情
			queryDictInfo(){
				this.$http.post('/value/config/batchQuery',{codeList:[this.code]}).then(res=>{
					const data = res[0];
					uni.setNavigationBarTitle({
						title:data.name
					})
					this.content = data.content;
				})
			}
		}
	}
</script>

<style lang="scss">
	.h5-content{
		height: 100%;
		line-height: 50rpx;
		font-size: 28rpx;
	}
</style>
