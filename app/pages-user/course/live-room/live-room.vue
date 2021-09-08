<!-- 观看课程 -->
<template>
	<view class="live-room">
		<!-- 视频 -->
		<view class="live-room-top">
			<video class="video" src="" controls></video>
			<view class="flex-center-between text-bold process">
				<text class="title text-bold">2021教师资格证课程</text>
				<text class="color-red">10%</text>
			</view>
		</view>

		<!-- 目录 -->
		<scroll-view class="live-room-category" scroll-y="true">
			<!-- 列表 -->
			<view class="lists-item" @click="collapseItem()" v-for="(item, index) in ['', '', '']">
				<view class="row flex-center-between">
					<text class="text-bold title">1、教师资格证笔试</text>
					<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill"></image>
				</view>
				<view class="collapse-content">
					<view class="flex collapse-item" v-for="(subItem, subIndex) in ['', '', '']" :key="subIndex">
						<image class="icon-video" src="../../../static/images/icons/icon-video.svg" mode="aspectFill"></image>
						<view class="flex-column flex-1">
							<view class="flex-center">
								<text>第一节知识的力量</text>
								<text class="tag">上次学到</text>
							</view>
							<view class="flex-center desc">
								<text>10分钟</text>
								<text class="m-left-40">已学习</text>
								<text class="color-red">20%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="live-room-bottom flex-center-between">
			<view class="item flex-column-center">
				<image class="icon" src="../../../static/images/icons/icon-colorful-download.svg" mode="aspectFill"></image>
				<text>下载</text>
			</view>
			<view class="item flex-column-center">
				<image class="icon" src="../../../static/images/icons/icon-color-kf.svg" mode="aspectFill"></image>
				<text>联系客服</text>
			</view>
			<view class="item flex-column-center">
				<image class="icon" src="../../../static/images/icons/icon-colorful-evaluate.svg" mode="aspectFill"></image>
				<text>写评价</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		// 展开目录
		collapseItem() {
			event.currentTarget.classList.toggle('on')
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
