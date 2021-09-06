<!-- 开始-->
<template>
	<view class="tabs-goods">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（{{commentList.length}}）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">考试评分</text>
				<rate class="rate" :number="score"></rate>
			</view>
			<view class="flex-center" @click="moreComment()">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item,index) in commentList.length > 3 ? commentList.slice(0,3) : commentList" 
		:key="`comment-entity-${index}`">
			<comment-lists-item :data="item"></comment-lists-item>
		</block>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
export default {
	name: 'tabsExam',
	props:{
		examVO:{ //考试信息
			type:Object,
			required:true
		},
		examCommentVOList:{ //考题评论
			type:Array,
			required:true
		}
	},
	data() {
		return {
			commentList:this.examCommentVOList, //考题评论
			score:this.examVO.score, //考题评分
			content:this.examVO.conent //考题内容
		};
	},
	watch:{
		examVO(newV, oldV){
			this.score = newV.score;
			this.content = newV.content;
		},
		examCommentVOList(newV, oldV){
			this.commentList = newV;
		}
	},
	methods:{
		
		// 更多评论点击
		moreComment(){
			let that = this;
			uni.navigateTo({
				url: `/pages-user/index/goods-comment/goods-comment`,
				success: function(res) {
				    // 通过eventChannel向被打开页面传送数据
				    res.eventChannel.emit('commentList', {type:"考试",commentList:that.commentList})
				}
			});
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
