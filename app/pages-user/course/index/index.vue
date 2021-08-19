<!-- 课程-首页 -->
<template>
	<view class="page-wrapper">
		<view class="top">
			<view class="item flex-center">
				<view class="flex-center">
					<text class="color-yellow">20</text>
					<text>分钟</text>
				</view>
				<view class="color-6">今日学习</view>
			</view>
		</view>
		<!-- 横向菜单 -->
		<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		<!--列表 -->
		<scroll-view class="course-lists">
			<!-- 项 -->
			<view class="course-lists-item">
				<image src="../../../static/images/index/live_img.png" mode="aspectFill" class="item-image"></image>
				<view class="item-content">
					<view>
						<view class="name text-bold text-ellipsis">5天英语全能挑战</view>
						<view class="color-6">
							已学习
							<text class="color-red">80%</text>
						</view>
					</view>
					<view class="flex-center-between">
						<view class="flex-center flex-1">
							<image src="../../../static/images/course/shop.png" mode="aspectFill" class="icon-image"></image>
							<text>商家名</text>
						</view>
						<button class="btn btn-block black">观看学习</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['我的课程', '我的题库', '缓存课程'],
			tabsIndex: 0
		};
	},
	methods: {
		getTabsIndex(value) {
			this.tabsIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
