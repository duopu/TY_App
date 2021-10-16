<!-- 开始-->
<template>
	<view class="tabs-goods">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（{{commentList.length}}）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">题库评分</text>
				<rate class="rate" :number="score"></rate>
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
	name: 'tabsBank',
	props:{
		score: { //题库评分
			type: Number,
			default: 0
		},
		questionBankVO:{ //题库信息
			type:Object,
			required:true
		},
		questionCommentVOList:{ //题库评论
			type:Array,
			required:true
		}
	},
	data() {
		return {
			commentList:this.questionCommentVOList, //题库评论
			questionScore:this.score, //题库评分
			content:this.questionBankVO.conent || "" //题库内容
		};
	},
	watch:{
		score(newV, oldV){
			this.questionScore = newV;
		},
		questionBankVO(newV, oldV){
			this.content = newV.content || "";
		},
		questionCommentVOList(newV, oldV){
			this.commentList = newV;
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
