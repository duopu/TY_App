<!-- 介绍 -->
<template>
	<view class="tabs-brief">
		<!-- 店铺名称 -->
		<merchanism-lists-item :type="1" :data="storeInfo"></merchanism-lists-item>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
export default {
	name: 'tabsBrief',
	props: {
		goodsInfo:{ //商品信息
			type:Object,
			required:true
		}
	},
	data() {
		return {
			storeInfo:{
				storeName: this.goodsInfo.storeName,
				storeDesc: this.goodsInfo.storeDesc,
				avatar: this.goodsInfo.avatar,
				score: this.goodsInfo.compositeScore,
				type: this.goodsInfo.type
			},
			content:this.goodsInfo.content || "" //产品内
		};
	},
	watch:{
		goodsInfo(newV,oldV){
			this.storeInfo = {
				storeName: newV.storeName,
				storeDesc: newV.storeDesc,
				avatar: newV.avatar,
				score: newV.compositeScore,
				type: newV.type
			};
			this.content = newV.content || "";
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped>
</style>
