<!-- 商品 -->
<template>
	<view class="tabs-catalogue">
		<!-- 标题 -->
		<view class="flex-center-between comment-title">
			<view class="title">全部评论（20）</view>
			<view class="flex-center flex-1 color-yellow">
				<text class="color-yellow">课程评分</text>
				<rate class="rate"></rate>
				<text>1.35</text>
			</view>
			<view class="flex-center">
				更多
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<!-- 评论列表 -->
		<block v-for="(item, index) in ['', '', '', '']" :key="index"><comment-lists-item></comment-lists-item></block>
		<!-- 视频目录 -->
		<view class="video-catalogue">
			<block v-for="(item,index) in list">
				<video-catalogue-item :data="item" :index="`${index+1}`" @courseToogle="courseToogle()"></video-catalogue-item>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tabsProduct',
	emits:["folderToogle"],
	data() {
		return {
			list:[{
				courseClassId:1,
				courseClassName:"目录一",
				parentId:0,
				nodes:[{
					courseClassId:11,
					courseClassName:"课程英语",
					parentId:1,
					nodes:[{
						courseClassId:111,
						courseClassName:"Hello",
						parentId:11
					}]
				},{
					courseClassId:12,
					courseClassName:"课程数学",
					parentId:1
				}]
			},{
				courseClassId:2,
				courseClassName:"目录二",
				parentId:0,
				nodes:[{
					courseClassId:22,
					courseClassName:"课程体育",
					parentId:2,
					nodes:[{
						courseClassId:221,
						courseClassName:"长跑",
						parentId:22
					}]
				},{
					courseClassId:222,
					courseClassName:"课程美术",
					parentId:22
				}]
			}]
		};
	},
	methods:{
		/**
		 * 目录展开关闭回调
		 */
		courseToogle(){
			this.$emit("folderToogle");
			
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
