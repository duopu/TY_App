<!-- 商品 -->
<template>
	<view class="tabs-goods">
		
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（{{commentList.length}}）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">商品评分</text>
				<rate class="rate" :number="goodsScore"></rate>
			</view>
			<view class="flex-center">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item,index) in commentList.length > 2 ? commentList.slice(0,2) : commentList" 
		:key="`comment-entity-${index}`">
			<comment-lists-item :data="item"></comment-lists-item>
		</block>
		<!-- 评论列表为空 -->
		<my-empty :show="commentList.length === 0" text="暂无评论"></my-empty>
		<!-- 介绍富文本 -->
		<view class="rich-text">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabsGoods',
	props: {
		score: { //商品评分
			type: Number,
			default: 0
		},
		entityGoodsVO:{ //商品信息
			type:Object,
			required:true
		},
		entityCommentVOList:{ //商品评论
			type:Array,
			required:true
		}
	},
	data() {
		return {
			commentList:this.entityCommentVOList, //商品评论
			goodsScore:this.score || 5, //商品评分
			content:this.entityGoodsVO.conent || "" //商品内容
		};
	},
	watch:{
		score(newV, oldV){
			this.goodsScore = newV || 5;
		},
		entityGoodsVO(newV, oldV){
			this.content = newV.content || "";
		},
		entityCommentVOList(newV, oldV){
			this.commentList = newV;
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
