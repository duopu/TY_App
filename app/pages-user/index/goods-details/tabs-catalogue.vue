<!-- 商品 -->
<template>
	<view class="tabs-catalogue">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（{{commentList.length}}）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">课程评分</text>
				<rate class="rate" :number="score"></rate>
				<text>{{score}}</text>
			</view>
			<view class="flex-center" @click="moreComment()">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item,index) in commentList.length > 3 ? commentList.slice(0,3) : commentList" 
		:key="`comment-course-${index}`">
			<comment-lists-item :data="item"></comment-lists-item>
		</block>
		<!-- 视频目录 -->
		<view class="video-catalogue">
			<block v-for="(item,index) in courseClassVOList">
				<video-catalogue-item :data="item" :index="`${index+1}`"></video-catalogue-item>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabsProduct',
	props:{
		courseVO:{
			type:Object,
			required:true
		},
		courseCommentVOList:{ //课程评论
			type:Array,
			required:true
		}
	},
	data() {
		return {
			commentList:this.courseCommentVOList, //课程评论
			score:this.courseVO.score, //课程评分
			courseClassVOList:this.courseVO.courseClassVOList //目录
		};
	},
	watch:{
		courseVO(newV, oldV){
			this.score = newV.score;
			this.courseClassVOList = newV.courseClassVOList;
		},
		courseCommentVOList(newV, oldV){
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
				    res.eventChannel.emit('commentList', {type:"课程",commentList:that.commentList})
				}
			});
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
