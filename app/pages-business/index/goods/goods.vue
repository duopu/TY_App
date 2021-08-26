<!-- 商品 -->
<template>
	<view class="goods">
		<!-- 头部 -->
		<view class="goods-top"></view>
		<scroll-view scroll-y="auto" class="goods-content">
			
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodList: [],
			page: 1,
			size: 10,
		};
	},
	created(){

	},
	methods:{
		// 获取商品列表
		queryGoodList(params){
			this.$http.post('/goods/queryPage',{page,size},true).then(res =>{
				this.goodList = res.data;
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
