<!-- 课程-首页 -->
<template>
	<view class="page-wrapper">
		<!-- 头部-今日学习 -->
		<view class="top flex-center-between">
			<view class="top-item flex-center">
				<view class="flex-end">
					<text class="color-yellow number">{{ learnStatistic.minuteDay }}</text>
					<text class="font-24">分钟</text>
				</view>
				<view class="color-6 desc">今日学习</view>
			</view>
			<view class="line"></view>
			<view class="top-item flex-center">
				<view class="flex-end">
					<text class="color-yellow number">{{ learnStatistic.beyondPlatform }}%</text>
					<text class="font-24">学员</text>
				</view>
				<view class="color-6 desc">超过平台</view>
			</view>
			<view class="line"></view>
			<view class="top-item flex-center">
				<view class="flex-end">
					<text class="color-yellow number">{{ learnStatistic.gold }}</text>
					<text class="font-24">金币</text>
				</view>
				<view class="color-6 desc">获得金币</view>
			</view>
		</view>
		<!-- 横向菜单 -->
		<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :current-index="tabsIndex" @change="getTabsIndex"></custom-horizontal-tabs>
		<!--列表 -->

		<!-- 我的课程 -->
		<tab-my-course v-if="tabsIndex === 0" />

		<!-- 我的题库 -->
		<tab-question-bank v-else-if="tabsIndex === 1" />

		<!-- 缓存课程 -->
		<tab-storage-course v-else-if="tabsIndex === 2" />
	</view>
</template>

<script>
import TabMyCourse from './tab-my-course.vue';
import TabStorageCourse from './tab-storage-course.vue';
import TabQuestionBank from './tab-question-bank.vue';
export default {
	components: {
		TabMyCourse,
		TabStorageCourse,
		TabQuestionBank
	},
	data() {
		return {
			tabsData: ['我的课程', '我的题库', '缓存课程'],
			tabsIndex: 0,
			learnStatistic: {}
		};
	},
	onLoad() {
		this.queryLearnStatistic();
	},
	methods: {
		// 获取当前 tab index
		getTabsIndex(value) {
			this.tabsIndex = value;
		},

		async queryLearnStatistic() {
			const data = (await this.$http.get('/dailyTask/queryLearnStatistic', {}, true)) || {};
			this.learnStatistic = data;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
